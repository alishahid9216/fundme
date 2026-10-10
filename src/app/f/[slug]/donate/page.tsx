"use client";

import React, { use, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, X, CreditCard } from "lucide-react";
import { addDonation, getCampaignBySlug, subscribeToStore } from "@/lib/campaign-store";
import type { Campaign } from "@/types/campaign";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];
const MIN_DONATION = 1;
const MAX_DONATION = 10000;
const MAX_TIP_PERCENT = 30;

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "$",
  AUD: "$",
};

function formatMoney(value: number, symbol: string): string {
  return `${symbol}${value.toFixed(2)}`;
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, percent) / 100) * circumference;
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" className="shrink-0">
      <circle cx="22" cy="22" r={radius} fill="none" stroke="#dcfce7" strokeWidth="5" />
      <circle
        cx="22"
        cy="22"
        r={radius}
        fill="none"
        stroke="#02a95c"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 22 22)"
      />
    </svg>
  );
}

export default function DonatePage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();

  // The store lives in localStorage: the server snapshot is "not loaded", the client snapshot is the raw
  // stored string (a stable value, so React can compare it between renders).
  const storedRaw = useSyncExternalStore(
    subscribeToStore,
    () => {
      try {
        return localStorage.getItem("gofundme_custom_campaigns") ?? "";
      } catch {
        return "";
      }
    },
    () => null
  );
  const loaded = storedRaw !== null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const campaign: Campaign | null = useMemo(() => (loaded ? getCampaignBySlug(slug) ?? null : null), [loaded, slug, storedRaw]);

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [presetAmount, setPresetAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(15);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [hideName, setHideName] = useState(false);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const symbol = CURRENCY_SYMBOLS[campaign?.currency ?? "USD"] ?? "$";

  const amount = useMemo(() => {
    if (customAmount !== "") {
      const n = Number(customAmount);
      return Number.isFinite(n) ? n : 0;
    }
    return presetAmount ?? 0;
  }, [customAmount, presetAmount]);

  const amountValid = amount >= MIN_DONATION && amount <= MAX_DONATION;
  const tipAmount = amountValid ? Math.round(amount * tipPercent) / 100 : 0;
  const total = amountValid ? amount + tipAmount : 0;

  if (!loaded) {
    return <div className="min-h-screen bg-[#f6f6f4]" />;
  }

  if (!campaign) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f6f4] px-4 text-center">
        <h1 className="text-2xl font-extrabold text-[#1d2c22]">Fundraiser not found</h1>
        <p className="mt-2 text-sm text-gray-600">This fundraiser may have been removed or the link is wrong.</p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-[#02a95c] px-6 py-3 text-sm font-extrabold text-white hover:bg-[#008748]"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const progressPercent = Math.round((campaign.raisedAmount / campaign.targetGoal) * 100);
  const recentDonor = campaign.donors.find((d) => d.amount > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!amountValid) {
      setError(`Enter an amount between ${symbol}${MIN_DONATION} and ${symbol}${MAX_DONATION.toLocaleString()}.`);
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(donorEmail.trim())) {
      setError("Enter a valid email address for your receipt.");
      return;
    }

    setIsProcessing(true);
    // DEMO: replace this block with the real card payment (see CardPaymentSlot).
    setTimeout(() => {
      addDonation(campaign.slug, {
        donorName: hideName ? "Anonymous" : donorName.trim() || "Supporter",
        amount,
        currency: campaign.currency,
        isAnonymous: hideName,
      });
      router.push(`/f/${campaign.slug}?donated=${encodeURIComponent(String(amount))}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f6f6f4] px-4 py-6 text-[#1d2c22] sm:py-10">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:p-6">
        {/* Heading */}
        <div className="flex items-start gap-3">
          <ProgressRing percent={progressPercent} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-gray-600">Enter your donation for</p>
            <h1 className="mt-0.5 text-xl font-extrabold leading-snug">{campaign.title}</h1>
          </div>
          <Link
            href={`/f/${campaign.slug}`}
            aria-label="Close and return to fundraiser"
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5" noValidate>
          {/* Give once / Monthly */}
          <div>
            <div className="grid grid-cols-2 rounded-full bg-[#f0f0ee] p-1 text-sm font-bold" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={frequency === "once"}
                onClick={() => setFrequency("once")}
                className={`rounded-full py-2.5 transition-colors ${
                  frequency === "once" ? "bg-[#005e3a] text-white" : "text-gray-700"
                }`}
              >
                Give once
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={frequency === "monthly"}
                onClick={() => setFrequency("monthly")}
                className={`rounded-full py-2.5 transition-colors ${
                  frequency === "monthly" ? "bg-[#005e3a] text-white" : "text-gray-700"
                }`}
              >
                Monthly
              </button>
            </div>
            {frequency === "monthly" && (
              <p className="mt-2 text-xs text-amber-700">
                Monthly giving is not available yet. This donation will be charged once.
              </p>
            )}
          </div>

          {/* Preset amounts */}
          <div className="grid grid-cols-3 gap-2">
            {PRESET_AMOUNTS.map((amt) => {
              const selected = customAmount === "" && presetAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setPresetAmount(amt);
                    setCustomAmount("");
                    setError("");
                  }}
                  className={`rounded-lg border py-2.5 text-sm font-bold transition-colors ${
                    selected
                      ? "border-[#02a95c] bg-[#ecfdf3] text-[#005e3a]"
                      : "border-gray-300 text-gray-800 hover:border-gray-500"
                  }`}
                >
                  {symbol}
                  {amt.toLocaleString()}
                </button>
              );
            })}
          </div>

          {/* Big amount input */}
          <div className="flex items-center rounded-xl border-2 border-gray-300 px-4 py-3 focus-within:border-[#02a95c]">
            <div className="mr-3 leading-tight">
              <div className="text-2xl font-extrabold">{symbol}</div>
              <div className="text-[10px] font-bold text-gray-500">{campaign.currency}</div>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={MIN_DONATION}
              max={MAX_DONATION}
              step="0.01"
              aria-label="Donation amount"
              value={customAmount !== "" ? customAmount : presetAmount !== null ? String(presetAmount) : ""}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setPresetAmount(null);
                setError("");
              }}
              placeholder="0.00"
              className="w-full bg-transparent text-right text-5xl font-extrabold outline-none placeholder:text-gray-300"
            />
          </div>

          {recentDonor && (
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
                <ShieldCheck className="h-3 w-3" />
              </span>
              <span>
                {recentDonor.name} donated {symbol}
                {recentDonor.amount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Tip */}
          <div>
            <h2 className="text-sm font-extrabold">Tip GoFundMe services</h2>
            <p className="mt-1 text-xs text-gray-600">
              There is no platform fee for organizers. Only a transaction fee is deducted from each donation. This is
              made possible by optional donor tips.
            </p>
            <div className="mt-4 px-1">
              <div className="mb-1 text-center text-xs font-bold">{tipPercent}%</div>
              <input
                type="range"
                min={0}
                max={MAX_TIP_PERCENT}
                step={0.5}
                value={tipPercent}
                onChange={(e) => setTipPercent(Number(e.target.value))}
                aria-label="Tip percentage"
                className="w-full accent-[#02a95c]"
              />
            </div>
            <button
              type="button"
              onClick={() => setTipPercent(0)}
              className="mt-1 text-xs font-semibold text-[#005e3a] underline"
            >
              No tip
            </button>
          </div>

          {/* Your details */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold">Your details</h2>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              disabled={hideName}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#02a95c] disabled:bg-gray-100"
            />
            <input
              type="email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              placeholder="Email address (for your receipt)"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#02a95c]"
            />
          </div>

          {/* Payment method: card only */}
          <div>
            <h2 className="text-sm font-extrabold">Payment method</h2>
            <CardPaymentSlot />
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-800">
            <input
              type="checkbox"
              checked={hideName}
              onChange={(e) => setHideName(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#02a95c]"
            />
            <span>Don&apos;t display my name publicly on the fundraiser.</span>
          </label>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-sm font-extrabold">Your donation</h2>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-[#005e3a]">Your donation</dt>
                <dd>{formatMoney(amountValid ? amount : 0, symbol)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tip</dt>
                <dd>{formatMoney(tipAmount, symbol)}</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 font-extrabold">
                <dt>Total due today</dt>
                <dd>{formatMoney(total, symbol)}</dd>
              </div>
            </dl>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#02a95c] py-4 text-base font-extrabold text-white shadow-md transition-colors hover:bg-[#008748] disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {isProcessing ? "Processing..." : `Donate ${formatMoney(total, symbol)}`}
          </button>

          <p className="text-xs text-gray-600">
            By clicking Donate, you agree to the Terms of Service and Privacy Notice.
          </p>

          <div className="flex items-start gap-3 border-t border-gray-200 pt-4">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#005e3a]" />
            <p className="text-xs text-gray-600">
              <span className="font-extrabold text-[#1d2c22]">Your donation is protected.</span> Full-refund policy
              details will appear here once the real payment flow is live.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Card-only payment slot.
 *
 * Raw card number / CVC inputs must never be built by hand. When Stripe is wired up, mount Stripe's
 * Payment Element here (restricted to card) so card data goes straight to Stripe and never touches
 * this app or its database.
 */
function CardPaymentSlot() {
  return (
    <div className="mt-2 rounded-xl border border-gray-300">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-[#ecfdf3] px-4 py-3">
        <CreditCard className="h-5 w-5 text-[#005e3a]" />
        <span className="text-sm font-bold">Credit or debit card</span>
      </div>
      <div className="px-4 py-4 text-xs text-gray-600">
        <p className="font-semibold text-amber-700">Demo mode: no real payment is taken.</p>
        <p className="mt-1">The secure card field (Stripe) will appear here once payments are connected.</p>
      </div>
    </div>
  );
}
