"use client";

import React from "react";
import Link from "next/link";

interface HeroCard {
  id: number;
  imageSrc: string;
  alt: string;
  rotation: string;
  translateY: string;
}

const heroCards: HeroCard[] = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80",
    alt: "Mother and smiling baby",
    rotation: "-rotate-[22deg]",
    translateY: "translate-y-16 lg:translate-y-24",
  },
  {
    id: 2,
    imageSrc: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=600&auto=format&fit=crop&q=80",
    alt: "Volunteer community worker in safety gear",
    rotation: "-rotate-[10deg]",
    translateY: "translate-y-6 lg:translate-y-8",
  },
  {
    id: 3,
    imageSrc: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
    alt: "Happy rescue dog with loving owner",
    rotation: "rotate-0",
    translateY: "translate-y-0",
  },
  {
    id: 4,
    imageSrc: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80",
    alt: "Young athletes carrying rowing boat",
    rotation: "rotate-[10deg]",
    translateY: "translate-y-6 lg:translate-y-8",
  },
  {
    id: 5,
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    alt: "Smiling artisan founder in workshop",
    rotation: "rotate-[22deg]",
    translateY: "translate-y-16 lg:translate-y-24",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9f8] pt-14 pb-20 sm:pt-20 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-4 py-1.5 text-sm font-bold text-[#005e3a] mb-6">
          <span>#1 crowdfunding platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-[#1d2c22] sm:text-6xl sm:leading-[1.08] lg:text-[68px]">
          Where successful<br className="hidden sm:inline" /> fundraisers start
        </h1>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-[#024731] hover:bg-[#003823] px-8 py-4 text-base font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Start a GoFundMe
          </Link>
        </div>

        {/* Tilted Photo Card Arch */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="flex items-end justify-center gap-3 sm:gap-4 md:gap-6 px-2">
            {heroCards.map((card) => (
              <Link
                href="/create"
                key={card.id}
                className={`group relative w-28 sm:w-44 md:w-56 lg:w-64 aspect-[3/4] flex-shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer ${card.rotation} ${card.translateY}`}
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-bold rounded-full bg-black/60 backdrop-blur-sm px-3 py-1">
                    Start yours →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
