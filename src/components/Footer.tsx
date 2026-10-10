"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDownIcon,
  FacebookIcon,
  YouTubeIcon,
  XTwitterIcon,
  InstagramIcon,
  GooglePlayBadge,
  AppStoreBadge,
} from "./icons";

export function Footer() {
  const [moreResourcesOpen, setMoreResourcesOpen] = useState(false);

  return (
    <footer className="bg-white pt-12 pb-16 text-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Disclaimer Note */}
        <p className="border-b border-gray-100 pb-12 text-xs text-gray-500 font-normal">
          *Statistics on this page are averaged figures based on 2023–2024 GoFundMe data.
        </p>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 gap-8 pt-12 md:grid-cols-4 lg:gap-12">
          {/* Column 1: Donate */}
          <div>
            <h4 className="text-sm font-bold text-[#1d2c22]">Donate</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#categories" className="hover:text-[#005e3a] transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#crisis-relief" className="hover:text-[#005e3a] transition-colors">
                  Crisis relief
                </Link>
              </li>
              <li>
                <Link href="#social-impact" className="hover:text-[#005e3a] transition-colors">
                  Social Impact Funds
                </Link>
              </li>
              <li>
                <Link href="#supporter-space" className="hover:text-[#005e3a] transition-colors">
                  Supporter Space
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Fundraise */}
          <div>
            <h4 className="text-sm font-bold text-[#1d2c22]">Fundraise</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/create" className="hover:text-[#005e3a] transition-colors">
                  How to start a GoFundMe
                </Link>
              </li>
              <li>
                <Link href="#categories" className="hover:text-[#005e3a] transition-colors">
                  Fundraising categories
                </Link>
              </li>
              <li>
                <Link href="#team-fundraising" className="hover:text-[#005e3a] transition-colors">
                  Team fundraising
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-[#005e3a] transition-colors">
                  Fundraising Blog
                </Link>
              </li>
              <li>
                <Link href="#charity" className="hover:text-[#005e3a] transition-colors">
                  Charity fundraising
                </Link>
              </li>
              <li>
                <Link href="#nonprofit-signup" className="hover:text-[#005e3a] transition-colors">
                  Sign up as a nonprofit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="text-sm font-bold text-[#1d2c22]">About</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#how-it-works" className="hover:text-[#005e3a] transition-colors">
                  How GoFundMe works
                </Link>
              </li>
              <li>
                <Link href="#guarantee" className="hover:text-[#005e3a] transition-colors">
                  GoFundMe Giving Guarantee
                </Link>
              </li>
              <li>
                <Link href="#countries" className="hover:text-[#005e3a] transition-colors">
                  Supported countries
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#005e3a] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#help-center" className="hover:text-[#005e3a] transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#005e3a] transition-colors">
                  About GoFundMe
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Other / Corporate */}
          <div>
            <h4 className="text-sm font-bold text-[#1d2c22] opacity-0 md:opacity-100">&nbsp;</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#newsroom" className="hover:text-[#005e3a] transition-colors">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="#careers" className="hover:text-[#005e3a] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#org" className="hover:text-[#005e3a] transition-colors">
                  GoFundMe.org
                </Link>
              </li>
              <li>
                <Link href="#partnerships" className="hover:text-[#005e3a] transition-colors">
                  GoFundMe Partnerships
                </Link>
              </li>
              <li>
                <Link href="#pro" className="hover:text-[#005e3a] transition-colors">
                  GoFundMe Pro for nonprofits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* More Resources Accordion */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() => setMoreResourcesOpen(!moreResourcesOpen)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-800 hover:text-[#005e3a] transition-colors cursor-pointer"
          >
            <span>More resources</span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform duration-200 ${
                moreResourcesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {moreResourcesOpen && (
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-600 sm:grid-cols-4 animate-in fade-in duration-150">
              <div>
                <span className="font-bold text-gray-800">Popular Causes</span>
                <ul className="mt-2 space-y-1.5">
                  <li><Link href="#medical-fundraising" className="hover:underline">Medical Fundraising</Link></li>
                  <li><Link href="#emergency-fundraising" className="hover:underline">Emergency Fundraising</Link></li>
                  <li><Link href="#memorial-fundraising" className="hover:underline">Memorial Fundraising</Link></li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-gray-800">Ideas &amp; Guides</span>
                <ul className="mt-2 space-y-1.5">
                  <li><Link href="#fundraising-ideas" className="hover:underline">Fundraising Ideas</Link></li>
                  <li><Link href="#success-stories" className="hover:underline">Success Stories</Link></li>
                  <li><Link href="#charity-tips" className="hover:underline">Charity Tips</Link></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Country, Social, Legal */}
        <div className="mt-12 border-t border-gray-200 pt-8 space-y-8">
          {/* Row with Country & Socials */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Country Selector */}
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
            >
              <span className="text-base">🇺🇸</span>
              <span>United States · English</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <Link href="https://facebook.com" aria-label="Facebook" className="text-gray-700 hover:text-black">
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube" className="text-gray-700 hover:text-black">
                <YouTubeIcon className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com" aria-label="X (Twitter)" className="text-gray-700 hover:text-black">
                <XTwitterIcon className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram" className="text-gray-700 hover:text-black">
                <InstagramIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Copyright, Legal, App Store Badges */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-xs text-gray-600">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>© 2010–2026 GoFundMe</span>
              <Link href="#terms" className="hover:underline">Terms</Link>
              <Link href="#privacy" className="hover:underline">Privacy Notice</Link>
              <Link href="#legal" className="hover:underline">Legal</Link>
              <Link href="#accessibility" className="hover:underline">Accessibility Statement</Link>
              <Link href="#cookie-policy" className="hover:underline">Cookie Policy</Link>
              <Link href="#manage-cookies" className="hover:underline">Manage Cookie Preferences</Link>
              <Link href="#privacy-choices" className="inline-flex items-center gap-1 hover:underline">
                <span>Your Privacy Choices</span>
                <span className="rounded bg-blue-600 px-1 py-0.2 text-[9px] font-bold text-white">✓✕</span>
              </Link>
            </div>

            {/* App Badges */}
            <div className="flex items-center gap-3">
              <GooglePlayBadge />
              <AppStoreBadge />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
