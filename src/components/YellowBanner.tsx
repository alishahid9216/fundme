import React from "react";
import Link from "next/link";

export function YellowBanner() {
  return (
    <section className="relative overflow-hidden bg-[#fae896] py-20 sm:py-28 text-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center rounded-full bg-[#2f220f] px-4 py-1.5 text-xs sm:text-sm font-bold text-white mb-6">
          We&apos;ve got you covered.
        </div>

        {/* Big Headline */}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#2b1f09] sm:text-5xl sm:leading-[1.15]">
          Get what you need to help your fundraiser succeed on GoFundMe
        </h2>

        {/* Subtitle with underlined links */}
        <p className="mx-auto mt-8 max-w-3xl text-lg sm:text-xl font-medium leading-relaxed text-[#3a2c13]">
          From{" "}
          <Link href="#memorial" className="underline font-bold hover:text-black transition-colors">
            memorial
          </Link>{" "}
          tributes and funerals to{" "}
          <Link href="#medical" className="underline font-bold hover:text-black transition-colors">
            medical
          </Link>{" "}
          emergencies and{" "}
          <Link href="#nonprofits" className="underline font-bold hover:text-black transition-colors">
            nonprofits
          </Link>
          . Whenever you need help, you can ask here.
        </p>

        {/* Bottom Help Question */}
        <div className="mt-8">
          <p className="text-sm sm:text-base font-semibold text-[#453417]">
            Still have questions?{" "}
            <Link href="#how-it-works" className="underline hover:text-black transition-colors">
              Learn more about how GoFundMe works
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
