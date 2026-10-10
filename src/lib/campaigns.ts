import { getPublicSupabase } from "@/lib/supabase/browser";
import type { Campaign, CampaignUpdate, Donor } from "@/types/campaign";

interface CampaignRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  country: string;
  currency: string;
  goal_amount: number | string;
  story: string;
  cover_image_url: string | null;
  organizer_name: string;
  organizer_location: string | null;
  beneficiary_name: string | null;
  is_verified: boolean;
  created_at: string;
}

interface DonationRow {
  id: string;
  amount: number | string;
  currency: string;
  donor_name: string;
  message: string | null;
  is_anonymous: boolean;
  created_at: string;
}

interface UpdateRow {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface StatsRow {
  campaign_id: string;
  raised_amount: number | string;
  donor_count: number;
}

const DEFAULT_COVER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#dcfce7"/></svg>`
  );

function initialsAvatar(name: string): string {
  const letter = (name.trim().charAt(0) || "?").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="100%" height="100%" fill="#005e3a"/><text x="50%" y="55%" font-family="Arial" font-size="96" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle">${letter.replace(/[<>&"']/g, "")}</text></svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

export function timeAgo(iso: string): string {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toISOString().slice(0, 10);
}

function mapCampaign(
  row: CampaignRow,
  stats: StatsRow | undefined,
  donations: DonationRow[],
  updates: UpdateRow[]
): Campaign {
  const donors: Donor[] = donations.map((d) => ({
    id: d.id,
    name: d.is_anonymous ? "Anonymous" : d.donor_name,
    amount: Number(d.amount),
    currency: d.currency,
    timestamp: timeAgo(d.created_at),
    message: d.message ?? undefined,
    isAnonymous: d.is_anonymous,
    likes: 0,
  }));

  const max = donors.reduce((m, d) => Math.max(m, d.amount), 0);
  if (max >= 100) {
    const top = donors.find((d) => d.amount === max);
    if (top) top.isTopDonor = true;
  }

  const mappedUpdates: CampaignUpdate[] = updates.map((u) => ({
    id: u.id,
    title: u.title,
    content: u.content,
    date: timeAgo(u.created_at),
    authorName: row.organizer_name,
  }));

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    country: row.country,
    currency: row.currency,
    targetGoal: Number(row.goal_amount),
    raisedAmount: Number(stats?.raised_amount ?? 0),
    donorCount: stats?.donor_count ?? 0,
    coverImage: row.cover_image_url || DEFAULT_COVER,
    story: row.story,
    createdAt: row.created_at.slice(0, 10),
    createdAtIso: row.created_at,
    organizer: {
      name: row.organizer_name,
      avatarUrl: initialsAvatar(row.organizer_name),
      location: row.organizer_location ?? row.country,
      isVerified: row.is_verified,
      beneficiaryName: row.beneficiary_name ?? undefined,
    },
    updates: mappedUpdates,
    donors,
  };
}

/** Published campaigns, newest first, each with computed raised amount and donor count. */
export async function fetchPublishedCampaigns(limit = 5): Promise<Campaign[]> {
  const db = getPublicSupabase();
  const { data, error } = await db
    .from("campaigns")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as CampaignRow[];
  if (rows.length === 0) return [];

  const { data: stats, error: statsError } = await db
    .from("campaign_stats")
    .select("*")
    .in("campaign_id", rows.map((r) => r.id));
  if (statsError) throw new Error(statsError.message);
  const byId = new Map((stats as StatsRow[]).map((s) => [s.campaign_id, s]));
  return rows.map((r) => mapCampaign(r, byId.get(r.id), [], []));
}

/** One published campaign with its donors and updates, or null if it does not exist. */
export async function fetchCampaignBySlug(slug: string): Promise<Campaign | null> {
  const db = getPublicSupabase();
  const { data, error } = await db
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const row = data as CampaignRow;

  const [stats, donations, updates] = await Promise.all([
    db.from("campaign_stats").select("*").eq("campaign_id", row.id).maybeSingle(),
    db
      .from("donations")
      .select("id, amount, currency, donor_name, message, is_anonymous, created_at")
      .eq("campaign_id", row.id)
      .eq("status", "succeeded")
      .order("created_at", { ascending: false })
      .limit(50),
    db
      .from("campaign_updates")
      .select("id, title, content, created_at")
      .eq("campaign_id", row.id)
      .order("created_at", { ascending: false }),
  ]);
  if (stats.error) throw new Error(stats.error.message);
  if (donations.error) throw new Error(donations.error.message);
  if (updates.error) throw new Error(updates.error.message);

  return mapCampaign(
    row,
    (stats.data as StatsRow | null) ?? undefined,
    (donations.data ?? []) as DonationRow[],
    (updates.data ?? []) as UpdateRow[]
  );
}

export interface CreateCampaignInput {
  title: string;
  category: string;
  country: string;
  currency: string;
  goalAmount: number;
  story: string;
  coverImageUrl?: string;
  organizerName: string;
  organizerLocation?: string;
  beneficiaryName?: string;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as { error?: string } & T;
  if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
  return json;
}

export function createCampaign(input: CreateCampaignInput): Promise<{ slug: string }> {
  return postJson("/api/campaigns", input);
}

export interface CreateDonationInput {
  amount: number;
  tipAmount: number;
  donorName: string;
  donorEmail: string;
  message?: string;
  isAnonymous: boolean;
}

export function createDonation(slug: string, input: CreateDonationInput): Promise<{ status: string }> {
  return postJson(`/api/campaigns/${encodeURIComponent(slug)}/donations`, input);
}
