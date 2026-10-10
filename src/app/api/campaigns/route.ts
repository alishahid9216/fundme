import { NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const CURRENCIES = ["USD", "GBP", "EUR", "CAD", "AUD"];

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
      .slice(0, 50)
      .replace(/-$/, "") || "fundraiser"
  );
}

export async function POST(req: Request) {
  if (!rateLimit(`create:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many fundraisers created. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const title = str(body.title, 120);
  const story = str(body.story, 20000);
  const category = str(body.category, 40);
  const country = str(body.country, 60);
  const currency = str(body.currency, 3).toUpperCase();
  const organizerName = str(body.organizerName, 80);
  const goal = Number(body.goalAmount);

  if (title.length < 8) return NextResponse.json({ error: "Title must be at least 8 characters." }, { status: 400 });
  if (story.length < 30) return NextResponse.json({ error: "Story must be at least 30 characters." }, { status: 400 });
  if (!category || !country) return NextResponse.json({ error: "Category and country are required." }, { status: 400 });
  if (!CURRENCIES.includes(currency)) return NextResponse.json({ error: "Unsupported currency." }, { status: 400 });
  if (!organizerName) return NextResponse.json({ error: "Organizer name is required." }, { status: 400 });
  if (!Number.isFinite(goal) || goal < 50 || goal > 10_000_000) {
    return NextResponse.json({ error: "Goal must be between 50 and 10,000,000." }, { status: 400 });
  }

  let coverImageUrl: string | null = str(body.coverImageUrl, 500) || null;
  if (coverImageUrl && !/^https:\/\//i.test(coverImageUrl)) coverImageUrl = null; // https images only

  const db = getAdminSupabase();
  const base = slugify(title);

  // Slugs are unique: retry with a short random suffix if the name is taken.
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = attempt === 0 ? base : `${base}-${Math.random().toString(36).slice(2, 6)}`;
    const { error } = await db.from("campaigns").insert({
      slug,
      title,
      category,
      country,
      currency,
      goal_amount: goal,
      story,
      cover_image_url: coverImageUrl,
      organizer_name: organizerName,
      organizer_location: str(body.organizerLocation, 80) || null,
      beneficiary_name: str(body.beneficiaryName, 80) || null,
      status: "published",
      // is_verified stays false: verification must be a manual/admin decision.
    });
    if (!error) return NextResponse.json({ slug }, { status: 201 });
    if (error.code !== "23505") {
      console.error("create campaign failed", error.message);
      return NextResponse.json({ error: "Could not create the fundraiser." }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "Could not find a free link for this title. Try another title." }, { status: 409 });
}
