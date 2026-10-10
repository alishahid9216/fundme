"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";
import { fetchPublishedCampaigns } from "@/lib/campaigns";
import type { Campaign } from "@/types/campaign";

const CURRENCY_SYMBOLS: Record<string, string> = { USD: "$", GBP: "£", EUR: "€", CAD: "$", AUD: "$" };

function raisedLabel(c: Campaign): string {
  return `${CURRENCY_SYMBOLS[c.currency] ?? "$"}${c.raisedAmount.toLocaleString()} raised`;
}

function progressOf(c: Campaign): number {
  return Math.min(100, Math.round((c.raisedAmount / c.targetGoal) * 100));
}

export function DiscoverFundraisers() {
  const [selectedFilter, setSelectedFilter] = useState("Nearby");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterOptions = ["Nearby", "Trending", "Medical", "Emergency", "Education"];
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedCampaigns(5)
      .then((list) => {
        if (!cancelled) setCampaigns(list);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const largeCard = campaigns?.[0];
  const smallCards = campaigns?.slice(1, 5) ?? [];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-4xl">
          Discover fundraisers inspired by what you care about
        </h2>

        {/* Filter and Navigation Row */}
        <div className="mt-8 flex items-center justify-between">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-bold text-gray-800 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{selectedFilter}</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </button>

            {filterDropdownOpen && (
              <div className="absolute left-0 mt-2 w-44 rounded-2xl bg-white p-1.5 shadow-xl border border-gray-200 z-20">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedFilter(opt);
                      setFilterDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-sm font-bold rounded-xl transition-colors cursor-pointer ${
                      selectedFilter === opt
                        ? "bg-[#eafaf1] text-[#024731]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Previous fundraisers"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="Next fundraisers"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {campaigns === null && !loadFailed && (
          <div className="mt-8 h-64 animate-pulse rounded-2xl bg-gray-100" aria-busy="true" />
        )}

        {loadFailed && (
          <div className="mt-8 rounded-2xl bg-gray-50 p-10 text-center text-gray-600">
            Could not load fundraisers right now. Please refresh the page.
          </div>
        )}

        {campaigns !== null && campaigns.length === 0 && (
          <div className="mt-8 rounded-2xl bg-gray-50 p-10 text-center">
            <p className="text-lg font-bold text-[#1d2c22]">No fundraisers yet</p>
            <p className="mt-1 text-sm text-gray-600">Be the first to start one.</p>
            <Link
              href="/create"
              className="mt-5 inline-flex rounded-full bg-[#024731] px-6 py-3 text-sm font-bold text-white hover:bg-[#003823]"
            >
              Start a fundraiser
            </Link>
          </div>
        )}

        {largeCard && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Large Card */}
            <Link href={`/f/${largeCard.slug}`} className="lg:col-span-5 flex flex-col group cursor-pointer">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={largeCard.coverImage}
                  alt={largeCard.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                  {largeCard.category}
                </span>
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-between">
                <h3 className="text-xl font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors leading-snug">
                  {largeCard.title}
                </h3>
                <div className="mt-4">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-[#005e3a]" style={{ width: `${progressOf(largeCard)}%` }} />
                  </div>
                  <p className="mt-2 text-sm font-bold text-[#1d2c22]">{raisedLabel(largeCard)}</p>
                </div>
              </div>
            </Link>

            {/* Right grid of small cards */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {smallCards.map((card) => (
                <Link key={card.id} href={`/f/${card.slug}`} className="flex flex-col group cursor-pointer">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                    <img
                      src={card.coverImage}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                      {card.category}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-1 flex-col justify-between">
                    <h3 className="text-base font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors line-clamp-2 leading-snug">
                      {card.title}
                    </h3>
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full rounded-full bg-[#005e3a]" style={{ width: `${progressOf(card)}%` }} />
                      </div>
                      <p className="mt-2 text-sm font-bold text-[#1d2c22]">{raisedLabel(card)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
