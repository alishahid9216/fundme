"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoFundMeLogo, SearchIcon, BellIcon, ChevronDownIcon } from "./icons";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
        isScrolled
          ? "border-b border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          : "border-b border-gray-100"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Navigation */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full p-2 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5 text-gray-700" />
            <span className="hidden md:inline text-sm font-medium text-gray-800">Search</span>
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-800">
            <button className="flex items-center gap-1.5 hover:text-[#005e3a] transition-colors cursor-pointer">
              Donate <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
            </button>
            <button className="flex items-center gap-1.5 hover:text-[#005e3a] transition-colors cursor-pointer">
              Fundraise <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
            </button>
            <Link
              href="#giving-funds"
              className="flex items-center gap-1.5 hover:text-[#005e3a] transition-colors"
            >
              Giving Funds
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-purple-700">
                New
              </span>
            </Link>
          </nav>
        </div>

        {/* Center Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="inline-flex items-center" aria-label="GoFundMe Home">
            <GoFundMeLogo className="h-8 w-auto text-[#005e3a]" />
          </Link>
        </div>

        {/* Right Navigation / CTA */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-800">
            <button className="flex items-center gap-1.5 hover:text-[#005e3a] transition-colors cursor-pointer">
              About <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-1.5 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <Link
              href="#sign-in"
              className="text-sm font-semibold text-gray-800 hover:text-[#005e3a] transition-colors"
            >
              Sign in
            </Link>
          </div>

          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full bg-[#024731] hover:bg-[#003823] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 cursor-pointer"
          >
            Start a GoFundMe
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-gray-200 bg-white px-4 pt-2 pb-6 lg:hidden shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            <Link
              href="/create"
              className="px-3 py-2.5 text-base font-bold text-white bg-[#024731] rounded-full text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start a GoFundMe
            </Link>
            <Link
              href="#donate"
              className="px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate
            </Link>
            <Link
              href="/create"
              className="px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fundraise
            </Link>
            <Link
              href="#giving-funds"
              className="flex items-center justify-between px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Giving Funds</span>
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-bold uppercase text-purple-700">
                New
              </span>
            </Link>
            <Link
              href="#about"
              className="px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#sign-in"
              className="px-3 py-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
