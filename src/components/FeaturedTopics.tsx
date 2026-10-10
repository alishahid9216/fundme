import React from "react";
import Link from "next/link";
import { ChevronRightIcon, HeartIcon } from "./icons";

export function FeaturedTopics() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-4xl">
          Featured topics
        </h2>

        {/* Top Large Smart Coaching Card */}
        <div className="mt-8 overflow-hidden rounded-3xl bg-[#f8faf9] border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Phone Mockup Column */}
            <div className="lg:col-span-6 bg-[#0b3823] p-8 sm:p-12 relative flex items-center justify-center min-h-[340px]">
              {/* Badge New */}
              <span className="absolute top-6 left-6 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase text-purple-700">
                New
              </span>

              {/* iPhone UI Mockup */}
              <div className="w-full max-w-[280px] rounded-3xl bg-white p-4 shadow-2xl border-4 border-gray-900/10">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 text-[11px] text-gray-500 font-medium">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-black"></span>
                    <span className="h-2 w-3 rounded-sm bg-black"></span>
                  </div>
                </div>

                <div className="mt-3 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border-2 border-[#005e3a]">
                    <span className="text-xs font-bold text-[#005e3a]">Goal</span>
                  </div>
                  <div className="mt-2 text-base font-extrabold text-[#1d2c22]">$6,500 raised</div>
                  <p className="text-[11px] text-gray-500">Help Max recover</p>
                </div>

                <div className="mt-4 rounded-xl bg-gray-50 p-3 text-left">
                  <div className="text-[11px] font-bold text-gray-800">Avery&apos;s daily plan</div>
                  <div className="mt-1 flex items-start gap-2 text-[10px] text-gray-600">
                    <span className="rounded-full bg-purple-100 p-1 text-purple-600">✨</span>
                    <div>Celebrate reaching 75% of your goal with the ones who got you there</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="lg:col-span-6 p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1d2c22]">
                Fundraise with smart coaching
              </h3>
              <p className="mt-4 text-base sm:text-lg text-[#4b5563] leading-relaxed">
                GoFundMe includes smart coaching to guide you as you create and manage your fundraiser. Built on what we&apos;ve learned from millions of fundraisers.
              </p>
              <div className="mt-6">
                <Link
                  href="#smart-coaching"
                  className="inline-flex items-center gap-1 text-base font-bold text-[#1d2c22] hover:text-[#005e3a] transition-colors"
                >
                  Learn more <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 3 Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Giving Funds */}
          <div className="group flex flex-col overflow-hidden rounded-3xl bg-[#f8faf9] border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="relative aspect-[16/11] w-full bg-[#d4eedb] p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase text-purple-700">
                New
              </span>
              {/* Stacked Cards Illustration */}
              <div className="w-44 rounded-xl bg-white p-3 shadow-lg border border-gray-100 transform -rotate-3 transition-transform group-hover:rotate-0">
                <div className="text-xs text-gray-500 font-medium">Your Giving Fund</div>
                <div className="text-lg font-black text-[#1d2c22]">$987.00</div>
                <div className="mt-2 flex -space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-[9px] font-bold text-red-700">DR</div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-[9px] font-bold text-orange-700">WCK</div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[9px] font-bold text-blue-700">FSC</div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors">
                GoFundMe Giving Funds
              </h3>
              <div className="mt-6">
                <Link
                  href="#giving-funds"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1d2c22] hover:text-[#005e3a] transition-colors"
                >
                  Learn more <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Washington Wildfire */}
          <div className="group flex flex-col overflow-hidden rounded-3xl bg-[#f8faf9] border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="relative aspect-[16/11] w-full bg-[#d0eec9] p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase text-purple-700">
                Urgent
              </span>
              {/* Map silhouette illustration with heart */}
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-32 text-[#68a364] fill-current opacity-80" viewBox="0 0 100 80">
                  <path d="M10,20 Q30,10 60,15 T95,30 Q90,70 60,75 T15,65 Z" />
                </svg>
                <div className="absolute top-4 right-6 text-black/80">
                  <HeartIcon className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors">
                How you can help: Washington wildfire relief
              </h3>
              <div className="mt-6">
                <Link
                  href="#wildfire-relief"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1d2c22] hover:text-[#005e3a] transition-colors"
                >
                  Learn more <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Venezuela Earthquakes */}
          <div className="group flex flex-col overflow-hidden rounded-3xl bg-[#f8faf9] border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="relative aspect-[16/11] w-full bg-[#f6d7dd] p-6 flex flex-col items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase text-purple-700">
                Urgent
              </span>
              {/* Map silhouette illustration with heart */}
              <div className="relative flex items-center justify-center">
                <svg className="w-40 h-32 text-[#e39ba8] fill-current opacity-80" viewBox="0 0 100 80">
                  <path d="M15,15 Q50,5 85,20 T80,70 Q45,80 20,65 Z" />
                </svg>
                <div className="absolute top-2 right-10 text-black/80">
                  <HeartIcon className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#1d2c22] group-hover:text-[#005e3a] transition-colors">
                How you can help: Venezuela earthquakes
              </h3>
              <div className="mt-6">
                <Link
                  href="#earthquake-relief"
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#1d2c22] hover:text-[#005e3a] transition-colors"
                >
                  Learn more <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
