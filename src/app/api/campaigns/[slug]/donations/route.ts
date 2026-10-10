import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";

interface Ctx {
  params: Promise<{ slug: string }>;
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;

  if (!rateLimit(`donate:${clientIp(req)}`, 20, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const tipAmount = Number(body.tipAmount ?? 0);
  const email = str(body.donorEmail, 200);
  const isAnonymous = body.isAnonymous === true;
  const donorName = isAnonymous ? "Anonymous" : str(body.donorName, 80) || "Supporter";
  const message = str(body.message, 500) || null;

  if (!Number.isFinite(amount) || amount < 1 || amount > 10000) {
    return NextResponse.json({ error: "Amount must be between 1 and 10,000." }, { status: 400 });
  }
  if (!Number.isFinite(tipAmount) || tipAmount < 0 || tipAmount > amount * 0.3 + 0.01) {
    return NextResponse.json({ error: "Invalid tip." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const db = getAdminSupabase();
  const { data: campaign, error: campaignError } = await db
    .from("campaigns")
    .select("id, currency")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (campaignError) {
    console.error("donation: campaign lookup failed", campaignError.message);
    return NextResponse.json({ error: "Could not process the donation." }, { status: 500 });
  }
  if (!campaign) return NextResponse.json({ error: "Fundraiser not found." }, { status: 404 });

  // Real payments: a donation stays "pending" until the payment provider confirms it (webhook).
  // DEMO_PAYMENTS lets local development show fake donations; it is ignored in production.
  const demo = process.env.DEMO_PAYMENTS === "true" && process.env.NODE_ENV !== "production";
  const status = demo ? "succeeded" : "pending";

  const { data: donation, error } = await db
    .from("donations")
    .insert({
      campaign_id: campaign.id,
      amount,
      tip_amount: tipAmount,
      currency: campaign.currency,
      donor_name: donorName,
      message,
      is_anonymous: isAnonymous,
      status,
    })
    .select("id")
    .single();
  if (error || !donation) {
    console.error("donation insert failed", error?.message);
    return NextResponse.json({ error: "Could not process the donation." }, { status: 500 });
  }

  const { error: privateError } = await db
    .from("donation_private")
    .insert({ donation_id: donation.id, donor_email: email });
  if (privateError) console.error("donation_private insert failed", privateError.message);

  return NextResponse.json({ status }, { status: 201 });
}
