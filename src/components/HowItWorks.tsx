"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PauseIcon, PlayIcon } from "./icons";

interface StepItem {
  number: number;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

const stepsData: StepItem[] = [
  {
    number: 1,
    title: "Use our tools to create your fundraiser",
    description:
      "You'll be guided by prompts to add fundraiser details and set your goal. Make updates anytime.",
    linkText: "Get tips for starting your fundraiser.",
    linkHref: "#tips",
  },
  {
    number: 2,
    title: "Reach donors by sharing",
    description:
      "Share your fundraiser link and use the resources in your dashboard to gain momentum.",
  },
  {
    number: 3,
    title: "Securely receive funds",
    description:
      "Add your bank information, or invite your fundraiser beneficiary to add theirs, and start receiving funds.",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Illustration / Animated Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#98d8be] p-8 sm:p-12 shadow-sm min-h-[420px] flex flex-col items-center justify-center">
              {/* Top Right Pause Button */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/40 text-gray-800 hover:bg-white/60 transition-colors cursor-pointer"
                aria-label={isPaused ? "Play animation" : "Pause animation"}
              >
                {isPaused ? <PlayIcon className="w-4 h-4 fill-current ml-0.5" /> : <PauseIcon className="w-3.5 h-3.5 fill-current" />}
              </button>

              {/* Central Mock Phone Card */}
              <div className="relative w-full max-w-xs rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl flex flex-col items-center">
                {/* Floating Social Circles */}
                <div className="relative w-full h-44 flex items-center justify-center">
                  {/* Gmail icon */}
                  <div className="absolute top-2 left-6 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transform hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-red-500">M</span>
                  </div>

                  {/* WhatsApp icon */}
                  <div className="absolute top-0 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transform hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.961.954 3.03.954 3.181 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.767-5.766-5.767zm0 10.378c-.899 0-1.782-.243-2.553-.7l-.183-.109-1.895.497.506-1.848-.119-.19c-.502-.8-.767-1.728-.767-2.678 0-2.541 2.068-4.609 4.611-4.609 2.542 0 4.61 2.068 4.611 4.609 0 2.542-2.068 4.61-4.612 4.61z" />
                    </svg>
                  </div>

                  {/* Facebook icon */}
                  <div className="absolute bottom-6 left-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-md transform hover:scale-110 transition-transform">
                    <span className="text-xl font-bold">f</span>
                  </div>

                  {/* TikTok icon */}
                  <div className="absolute top-14 left-24 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-md transform hover:scale-110 transition-transform">
                    <span className="text-sm font-bold">♪</span>
                  </div>

                  {/* Mail icon */}
                  <div className="absolute top-16 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0078D4] text-white shadow-md transform hover:scale-110 transition-transform">
                    <span className="text-base font-bold">✉</span>
                  </div>

                  {/* Instagram gradient icon */}
                  <div className="absolute -bottom-2 left-14 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg transform hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>

                  {/* LinkedIn icon */}
                  <div className="absolute -bottom-2 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-md transform hover:scale-110 transition-transform">
                    <span className="text-base font-bold">in</span>
                  </div>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-[#024731] py-2.5 px-6 text-sm font-bold text-white shadow hover:bg-[#003823] transition-colors"
                >
                  Ready to share
                </button>
              </div>
            </div>
          </div>

          {/* Right Steps Text Column */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-4xl">
              Fundraising on GoFundMe is easy, powerful, and trusted
            </h2>

            <div className="space-y-6">
              {stepsData.map((step) => {
                const isActive = activeStep === step.number;
                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(step.number)}
                    className={`flex items-start gap-5 p-4 rounded-2xl cursor-pointer transition-all ${
                      isActive ? "bg-gray-50/80" : "hover:bg-gray-50/50"
                    }`}
                  >
                    {/* Number Badge */}
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-base font-bold transition-colors ${
                        isActive
                          ? "bg-white text-[#005e3a] border-2 border-[#005e3a] shadow-sm"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-1.5 pt-0.5">
                      <h3 className="text-xl font-bold text-[#1d2c22]">
                        {step.title}
                      </h3>
                      <p className="text-base text-[#4b5563] leading-relaxed">
                        {step.description}
                      </p>
                      {step.linkText && (
                        <div className="pt-1">
                          <Link
                            href={step.linkHref || "#"}
                            className="text-sm font-medium text-gray-700 underline hover:text-[#005e3a] transition-colors"
                          >
                            {step.linkText}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
