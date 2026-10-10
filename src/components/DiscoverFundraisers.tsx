"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ArrowLeftIcon, ArrowRightIcon } from "./icons";

interface Fundraiser {
  id: string;
  title: string;
  raised: string;
  progressPercent: number;
  badge: string;
  imageSrc: string;
}

const largeCardData: Fundraiser = {
  id: "carmine-street",
  title: "Fund NYC's Iconic Carmine Street Guitars",
  raised: "$67,890 raised",
  progressPercent: 78,
  badge: "3 miles away",
  imageSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
};

const smallCardsData: Fundraiser[] = [
  {
    id: "ran-blake",
    title: "Help Ran Blake, a Musical Pioneer, with Medical Costs",
    raised: "$42,844 raised",
    progressPercent: 65,
    badge: "3 miles away",
    imageSrc: "https://images.unsplash.com/photo-1520523839898-507121404c00?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "victoria-kids",
    title: "Help Victoria And Her Kids Not End Up Homeless ❤️",
    raised: "$23,520 raised",
    progressPercent: 82,
    badge: "3 miles away",
    imageSrc: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "sophia-scholarship",
    title: "Sophia Lynn Donath Legacy Scholarship",
    raised: "$74,847 raised",
    progressPercent: 94,
    badge: "3 miles away",
    imageSrc: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "village-works",
    title: "Support VILLAGE WORKS - Keep NYC Culture Alive",
    raised: "$13,387 raised",
    progressPercent: 45,
    badge: "3 miles away",
    imageSrc: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80",
  },
];

export function DiscoverFundraisers() {
  const [selectedFilter, setSelectedFilter] = useState("Nearby");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterOptions = ["Nearby", "Trending", "Medical", "Emergency", "Education"];

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
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Large Card */}
          <Link
            href={`/f/${largeCardData.id}`}
            className="lg:col-span-5 flex flex-col group cursor-pointer"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={largeCardData.imageSrc}
                alt={largeCardData.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                {largeCardData.badge}
              </span>
            </div>

            <div className="mt-4 flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors leading-snug">
                  {largeCardData.title}
                </h3>
              </div>

              <div className="mt-4">
                {/* Progress bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#005e3a]"
                    style={{ width: `${largeCardData.progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-bold text-[#1d2c22]">
                  {largeCardData.raised}
                </p>
              </div>
            </div>
          </Link>

          {/* Right 2x2 Grid of Small Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {smallCardsData.map((card) => (
              <Link
                key={card.id}
                href={`/f/${card.id}`}
                className="flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={card.imageSrc}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                    {card.badge}
                  </span>
                </div>

                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <h3 className="text-base font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors line-clamp-2 leading-snug">
                    {card.title}
                  </h3>

                  <div className="mt-3">
                    {/* Progress bar */}
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#005e3a]"
                        style={{ width: `${card.progressPercent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#1d2c22]">
                      {card.raised}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
