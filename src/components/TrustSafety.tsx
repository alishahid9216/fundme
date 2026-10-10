import React from "react";
import Link from "next/link";

export function TrustSafety() {
  return (
    <section className="bg-[#00321f] py-20 sm:py-28 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center rounded-full bg-[#a3e6be] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#00321f]">
              We&apos;ve got you covered.
            </div>

            {/* Huge Headline */}
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.08]">
              trusted leader in online fundraising.
            </h2>

            {/* Description with Underlined Links */}
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-normal">
              With{" "}
              <Link
                href="#pricing"
                className="font-semibold text-white underline hover:text-[#a3e6be] transition-colors"
              >
                simple pricing
              </Link>{" "}
              and a team of{" "}
              <Link
                href="#trust-and-safety"
                className="font-semibold text-white underline hover:text-[#a3e6be] transition-colors"
              >
                Trust &amp; Safety
              </Link>{" "}
              experts in your corner, you can raise money or make a donation with peace of mind.
            </p>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80"
                alt="Volunteers carrying water bottles"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
