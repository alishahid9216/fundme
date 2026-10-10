import React from "react";

export function StatsBanner() {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center rounded-full bg-[#dcfce7] px-4 py-1.5 text-xs sm:text-sm font-bold text-[#005e3a] mb-6">
          No fee to start fundraising
        </div>

        {/* Big Stat Headline */}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-5xl sm:leading-tight">
          More than $50 million is raised every week on GoFundMe.*
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl font-normal leading-relaxed text-[#4b5563]">
          Get started in just a few minutes — with helpful new tools, it&apos;s easier than ever to pick the perfect title, write a compelling story, and share it with the world.
        </p>
      </div>
    </section>
  );
}
