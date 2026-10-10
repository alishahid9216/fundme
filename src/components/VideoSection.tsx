"use client";

import React, { useState } from "react";
import { PlayIcon, PauseIcon, VolumeIcon, SettingsIcon, MaximizeIcon } from "./icons";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-5xl">
          How GoFundMe works
        </h2>

        {/* Video Player Card */}
        <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-[#a6dd9b] p-3 sm:p-6 shadow-md">
          {/* Top floating goal tag */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-2.5 shadow-lg">
            <span className="text-sm font-bold text-[#1d2c22]">Swim for a cure</span>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-emerald-500 text-[10px] font-extrabold text-emerald-700">
              50%
            </div>
          </div>

          {/* Sound toggle button in corner */}
          <div className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md">
            <VolumeIcon className="w-5 h-5" />
          </div>

          {/* Video / Photo Triptych */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-900 flex items-center justify-center">
            {/* 3 Photos forming the video banner */}
            <div className="grid grid-cols-3 h-full w-full gap-1">
              <div className="h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80"
                  alt="Swimmer in swimming pool"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop&q=80"
                  alt="Volunteers providing food"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80"
                  alt="Mother and daughter smiling"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Play Button Overlay */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-20 flex h-16 w-24 items-center justify-center rounded-2xl bg-[#024731]/90 hover:bg-[#024731] text-white shadow-2xl transition-transform hover:scale-105 cursor-pointer"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <PauseIcon className="w-8 h-8 fill-current" /> : <PlayIcon className="w-8 h-8 fill-current ml-1" />}
            </button>

            {/* Bottom Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 text-white text-xs">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setIsPlaying(!isPlaying)} className="cursor-pointer">
                  {isPlaying ? <PauseIcon className="w-4 h-4 fill-current" /> : <PlayIcon className="w-4 h-4 fill-current" />}
                </button>
                <span className="font-semibold">1:15</span>
              </div>

              {/* Scrubber */}
              <div className="mx-4 flex-1 h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer">
                <div className="h-full w-1/3 bg-white rounded-full" />
              </div>

              <div className="flex items-center gap-3">
                <VolumeIcon className="w-4 h-4 cursor-pointer" />
                <SettingsIcon className="w-4 h-4 cursor-pointer" />
                <MaximizeIcon className="w-4 h-4 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
