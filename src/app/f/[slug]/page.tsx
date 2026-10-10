"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  getCampaignBySlug, 
  addDonation, 
  addSupportComment, 
  likeComment, 
  subscribeToStore 
} from "@/lib/campaign-store";
import { Campaign } from "@/types/campaign";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheckIcon } from "@/components/icons";
import { 
  Share2, 
  Heart, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  X, 
  CreditCard, 
  Lock, 
  MapPin, 
  Tag, 
  Award, 
  TrendingUp
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CampaignDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const searchParams = useSearchParams();
  const donatedParam = searchParams.get("donated");
  const isNewCampaignBanner = searchParams.get("published") === "true";

  const [campaign, setCampaign] = useState<Campaign | null>(() => getCampaignBySlug(slug) || null);
  const [activeTab, setActiveTab] = useState<"story" | "updates" | "words">("story");
  const [isStoryExpanded, setIsStoryExpanded] = useState<boolean>(false);
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showAllDonorsModal, setShowAllDonorsModal] = useState<boolean>(false);
  const [copySuccessToast, setCopySuccessToast] = useState<boolean>(false);
  const [donationSuccessBanner, setDonationSuccessBanner] = useState<string | null>(() => {
    const n = Number(donatedParam);
    return donatedParam && Number.isFinite(n) && n > 0
      ? `Thank you so much! Your donation of $${n.toLocaleString()} has been received.`
      : null;
  });

  // Donation Form Modal State
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [donorMessage, setDonorMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "paypal">("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Inline Word of Support State
  const [inlineCommentName, setInlineCommentName] = useState<string>("");
  const [inlineCommentMsg, setInlineCommentMsg] = useState<string>("");
  const [inlineSubmitting, setInlineSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!donationSuccessBanner) return;
    const t = setTimeout(() => setDonationSuccessBanner(null), 6000);
    return () => clearTimeout(t);
  }, [donationSuccessBanner]);

  useEffect(() => {
    const handleStoreUpdate = () => {
      const found = getCampaignBySlug(slug);
      if (found) {
        setCampaign(found);
      }
    };

    const unsubscribe = subscribeToStore(handleStoreUpdate);
    return () => unsubscribe();
  }, [slug]);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-white text-[#1d2c22] flex flex-col selection:bg-[#02a95c] selection:text-white">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-extrabold text-gray-900">Fundraiser Not Found</h1>
            <p className="text-gray-600">
              The fundraiser you are looking for does not exist or has been relocated.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-full bg-gray-100 hover:bg-gray-200 px-6 py-3 text-sm font-bold text-gray-800 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/create"
                className="rounded-full bg-[#02a95c] hover:bg-[#008748] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors"
              >
                Start a GoFundMe
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const effectiveAmount = customAmount ? Math.max(1, Number(customAmount)) : donationAmount;
  const tipAmount = (effectiveAmount * (tipPercentage / 100));
  const totalCharge = (effectiveAmount + tipAmount).toFixed(2);
  const progressPercent = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetGoal) * 100));

  // Handle Share Clipboard Copy
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccessToast(true);
      setTimeout(() => setCopySuccessToast(false), 3000);
    }
  };

  // Process Donation
  const handleCompleteDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount <= 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const updated = addDonation(campaign.slug, {
        donorName: isAnonymous ? "Anonymous" : donorName.trim() || "Supporter",
        amount: effectiveAmount,
        currency: campaign.currency,
        message: donorMessage.trim() || undefined,
        isAnonymous: isAnonymous,
      });

      if (updated) {
        setCampaign(updated);
      }

      setIsProcessing(false);
      setShowDonationModal(false);
      setDonationSuccessBanner(
        `Thank you so much! Your donation of $${effectiveAmount.toLocaleString()} has been received.`
      );
      setTimeout(() => setDonationSuccessBanner(null), 6000);

      // Reset form
      setCustomAmount("");
      setDonorMessage("");
    }, 800);
  };

  // Submit inline word of support
  const handleAddInlineComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineCommentMsg.trim()) return;

    setInlineSubmitting(true);
    const updated = addSupportComment(campaign.slug, {
      name: inlineCommentName.trim() || "Supporter",
      message: inlineCommentMsg.trim(),
    });

    if (updated) {
      setCampaign(updated);
    }
    setInlineCommentMsg("");
    setInlineCommentName("");
    setInlineSubmitting(false);
  };

  // Handle Like
  const handleLike = (donorId: string) => {
    likeComment(campaign.slug, donorId);
    const updated = getCampaignBySlug(campaign.slug);
    if (updated) setCampaign(updated);
  };

  const topDonor = campaign.donors.find((d) => d.isTopDonor) || campaign.donors[0];
  const recentDonors = campaign.donors.slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-[#1d2c22] flex flex-col selection:bg-[#02a95c] selection:text-white">
      {/* Header */}
      <Header />

      {/* Copy Toast Alert */}
      {copySuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-full bg-[#024731] px-6 py-3 text-sm font-bold text-white shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#a3e6be]" />
          Campaign link copied to clipboard!
        </div>
      )}

      {/* Donation Success Toast */}
      {donationSuccessBanner && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-11/12 rounded-2xl bg-[#02a95c] text-white px-6 py-4 shadow-2xl flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 flex-shrink-0" />
            <span className="text-sm sm:text-base font-bold">{donationSuccessBanner}</span>
          </div>
          <button
            onClick={() => setDonationSuccessBanner(null)}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Newly Published Celebration Banner */}
      {isNewCampaignBanner && (
        <div className="bg-[#eafaf1] border-b border-[#a3e6be] py-3.5 px-4">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2 text-sm font-bold text-[#024731]">
              <Sparkles className="w-5 h-5 text-[#02a95c]" />
              Your fundraiser is now live! Share it to start receiving donations.
            </div>
            <button
              onClick={() => handleCopyLink()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#024731] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#003823] cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" /> Copy Link
            </button>
          </div>
        </div>
      )}

      {/* Main Campaign Container */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Campaign Title & Category Row */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                <Tag className="w-3 h-3" /> {campaign.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                <MapPin className="w-3 h-3" /> {campaign.organizer.location}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#1d2c22] sm:text-4xl lg:text-5xl lg:leading-tight">
              {campaign.title}
            </h1>
          </div>

          {/* 2-Column Main Layout: Left Content, Right Sticky Sidebar */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            {/* LEFT COLUMN: Cover Image, Tabs, Narrative, Updates, Donors */}
            <div className="lg:col-span-8 space-y-8">
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-gray-100 shadow-md">
                <img
                  src={campaign.coverImage}
                  alt={campaign.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Organizer Badge */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3.5">
                  <img
                    src={campaign.organizer.avatarUrl}
                    alt={campaign.organizer.name}
                    className="h-12 w-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <div className="text-sm sm:text-base font-bold text-gray-900">
                      {campaign.organizer.name} is organizing this fundraiser.
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                      <span>Created {campaign.createdAt}</span>
                      <span>·</span>
                      <span>{campaign.category}</span>
                      {campaign.organizer.beneficiaryName && (
                        <>
                          <span>·</span>
                          <span>Beneficiary: <strong className="text-gray-800">{campaign.organizer.beneficiaryName}</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Guarantee Shield Badge */}
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#f0faf5] px-3.5 py-1.5 text-xs font-semibold text-[#005e3a] border border-[#a3e6be]">
                  <ShieldCheckIcon className="w-4 h-4 text-[#02a95c]" />
                  <span>Donation Protected</span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`border-b-2 py-4 px-1 text-base font-bold transition-colors cursor-pointer ${
                      activeTab === "story"
                        ? "border-[#02a95c] text-[#024731]"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Story
                  </button>

                  <button
                    onClick={() => setActiveTab("updates")}
                    className={`border-b-2 py-4 px-1 text-base font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === "updates"
                        ? "border-[#02a95c] text-[#024731]"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Updates
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                      {campaign.updates.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab("words")}
                    className={`border-b-2 py-4 px-1 text-base font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                      activeTab === "words"
                        ? "border-[#02a95c] text-[#024731]"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Words of Support
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                      {campaign.donors.filter((d) => d.message).length}
                    </span>
                  </button>
                </nav>
              </div>

              {/* TAB 1: STORY CONTENT */}
              {activeTab === "story" && (
                <div className="space-y-6">
                  <div
                    className={`prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line ${
                      !isStoryExpanded ? "line-clamp-6" : ""
                    }`}
                  >
                    {campaign.story}
                  </div>

                  {campaign.story.length > 300 && (
                    <button
                      type="button"
                      onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                      className="text-sm font-bold text-[#02a95c] hover:text-[#008748] hover:underline cursor-pointer"
                    >
                      {isStoryExpanded ? "Read less" : "Read more"}
                    </button>
                  )}

                  {/* Organizer Contact & Trust Box */}
                  <div className="mt-8 rounded-3xl bg-[#f8faf9] border border-gray-200 p-6 space-y-4">
                    <h3 className="text-base font-bold text-gray-900">
                      Organizer &amp; Trust Guarantee
                    </h3>
                    <div className="flex items-center gap-3">
                      <img
                        src={campaign.organizer.avatarUrl}
                        alt={campaign.organizer.name}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <div className="text-sm font-bold text-gray-900">{campaign.organizer.name}</div>
                        <div className="text-xs text-gray-500">Organizer · {campaign.organizer.location}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2 text-xs text-gray-600 border-t border-gray-200">
                      <ShieldCheckIcon className="w-5 h-5 text-[#02a95c] flex-shrink-0" />
                      <div>
                        <strong>GoFundMe Giving Guarantee:</strong> In the rare event something isn&apos;t right, we will work with you to determine if misuse occurred and issue a full refund.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UPDATES */}
              {activeTab === "updates" && (
                <div className="space-y-6">
                  {campaign.updates.length > 0 ? (
                    <div className="space-y-6">
                      {campaign.updates.map((update) => (
                        <div
                          key={update.id}
                          className="rounded-3xl border border-gray-200 p-6 bg-white space-y-3 shadow-sm"
                        >
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">{update.authorName}</span>
                            <span>{update.date}</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">{update.title}</h3>
                          <p className="text-base text-gray-700 leading-relaxed">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-500">
                      <p className="text-base font-medium">No updates posted yet.</p>
                      <p className="text-xs text-gray-400 mt-1">
                        The organizer will post updates here as the fundraiser progresses.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: WORDS OF SUPPORT */}
              {activeTab === "words" && (
                <div className="space-y-6">
                  {/* Inline Comment Form */}
                  <form
                    onSubmit={handleAddInlineComment}
                    className="rounded-3xl bg-[#f8faf9] border border-gray-200 p-6 space-y-3 shadow-sm"
                  >
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#02a95c] fill-current" /> Leave words of encouragement
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={inlineCommentName}
                        onChange={(e) => setInlineCommentName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={inlineCommentMsg}
                        onChange={(e) => setInlineCommentMsg(e.target.value)}
                        placeholder="Share a supportive message..."
                        className="rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={inlineSubmitting || !inlineCommentMsg.trim()}
                        className="rounded-full bg-[#02a95c] hover:bg-[#008748] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Post Message
                      </button>
                    </div>
                  </form>

                  {/* Words List */}
                  <div className="space-y-4">
                    {campaign.donors.filter((d) => d.message).length > 0 ? (
                      campaign.donors
                        .filter((d) => d.message)
                        .map((donor) => (
                          <div
                            key={donor.id}
                            className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm"
                          >
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#dcfce7] flex items-center justify-center text-sm font-bold text-[#005e3a]">
                              {donor.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-gray-900">{donor.name}</span>
                                <span className="text-xs text-gray-400">{donor.timestamp}</span>
                              </div>
                              {donor.amount > 0 && (
                                <div className="text-xs font-semibold text-[#02a95c]">
                                  Donated ${donor.amount.toLocaleString()} {donor.currency}
                                </div>
                              )}
                              <p className="text-sm text-gray-700 leading-relaxed pt-1">
                                {donor.message}
                              </p>
                              <div className="pt-2 flex items-center gap-3 text-xs text-gray-500">
                                <button
                                  type="button"
                                  onClick={() => handleLike(donor.id)}
                                  className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                  <Heart className="w-3.5 h-3.5 fill-current text-red-500" />
                                  <span>{donor.likes || 0}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="rounded-3xl bg-gray-50 p-8 text-center text-gray-500">
                        <p className="text-base font-medium">Be the first to leave words of support!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Donors List Section (Below Tab Content) */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Donations ({campaign.donorCount})
                  </h3>
                  {campaign.donors.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setShowAllDonorsModal(true)}
                      className="text-sm font-bold text-[#02a95c] hover:underline cursor-pointer"
                    >
                      See all ({campaign.donors.length})
                    </button>
                  )}
                </div>

                {/* Donors Preview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recentDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="flex items-center gap-3 p-3.5 rounded-2xl border border-gray-100 bg-gray-50/70"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7] text-sm font-bold text-[#005e3a]">
                        {donor.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-gray-900 truncate flex items-center gap-1.5">
                          <span>{donor.name}</span>
                          {donor.isTopDonor && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-800">
                              Top
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          <strong className="text-gray-900 font-bold">
                            ${donor.amount.toLocaleString()}
                          </strong>{" "}
                          · {donor.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY DONATION SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg space-y-6">
                {/* Metric Summary */}
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-[#1d2c22]">
                      ${campaign.raisedAmount.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-gray-500">
                      {campaign.currency} raised
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    of <strong className="text-gray-900">${campaign.targetGoal.toLocaleString()}</strong> goal · <strong>{campaign.donorCount}</strong> donations
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#02a95c] transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Quick Amount Chips */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Quick Donation Amount
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 50, 100, 250].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setDonationAmount(amt);
                          setCustomAmount("");
                          router.push(`/f/${slug}/donate`);
                        }}
                        className="rounded-xl border border-gray-200 bg-gray-50 py-2.5 text-center text-sm font-bold text-gray-800 hover:border-[#02a95c] hover:bg-[#eafaf1] hover:text-[#024731] transition-all cursor-pointer"
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Action CTAs: Donate Now & Share */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => router.push(`/f/${slug}/donate`)}
                    className="w-full rounded-full bg-[#02a95c] hover:bg-[#008748] py-4 text-center text-lg font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Donate now
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowShareModal(true)}
                    className="w-full rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 py-3.5 text-center text-base font-bold text-gray-800 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    Share fundraiser
                  </button>
                </div>

                {/* Top / Recent Donor Highlights Ticker */}
                {topDonor && (
                  <div className="rounded-2xl bg-gray-50 p-4 border border-gray-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>
                        Top donation: <strong className="text-gray-900">${topDonor.amount.toLocaleString()}</strong> by {topDonor.name}
                      </span>
                    </div>
                    {recentDonors.length > 1 && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <TrendingUp className="w-4 h-4 text-[#02a95c]" />
                        <span>
                          Recent donation: <strong className="text-gray-900">${recentDonors[0].amount.toLocaleString()}</strong> {recentDonors[0].timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* -------------------- DONATION CHECKOUT MODAL -------------------- */}
      {showDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#005e3a]">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-gray-900">Make a Donation</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{campaign.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDonationModal(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleCompleteDonation} className="overflow-y-auto p-6 space-y-5">
              {/* Amount Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  1. Select Donation Amount
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[25, 50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amt);
                        setCustomAmount("");
                      }}
                      className={`rounded-2xl py-3 text-center text-sm font-extrabold transition-all cursor-pointer ${
                        donationAmount === amt && !customAmount
                          ? "bg-[#02a95c] text-white shadow-md"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-base font-bold text-gray-400">
                    $
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Custom amount (USD)"
                    className="w-full rounded-2xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-base font-bold text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                  />
                </div>
              </div>

              {/* Tip GoFundMe Slider */}
              <div className="rounded-2xl bg-gray-50 p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-800">
                    Tip GoFundMe Services
                  </label>
                  <span className="text-xs font-bold text-[#02a95c]">
                    {tipPercentage}% (${tipAmount.toFixed(2)})
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mb-2">
                  GoFundMe has a 0% platform fee for organizers. Tips allow us to keep helping families worldwide.
                </p>
                <div className="flex gap-2">
                  {[0, 10, 15, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercentage(pct)}
                      className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition-all ${
                        tipPercentage === pct
                          ? "bg-[#024731] text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Contact Info */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  2. Your Information
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required={!isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Full Name"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Email Address (for receipt)"
                    className="rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-gray-700">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#02a95c] focus:ring-[#02a95c]"
                  />
                  <span>Don&apos;t display my name publicly on the campaign</span>
                </label>

                <div>
                  <textarea
                    rows={2}
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    placeholder="Add words of encouragement or a prayer (optional)..."
                    className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-xs sm:text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  3. Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl p-3 border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-[#02a95c] bg-[#eafaf1] text-[#024731]"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <CreditCard className="w-4 h-4" /> Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("apple")}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl p-3 border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === "apple"
                        ? "border-[#02a95c] bg-[#eafaf1] text-[#024731]"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <span>Pay / GPay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex items-center justify-center gap-1.5 rounded-2xl p-3 border text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === "paypal"
                        ? "border-[#02a95c] bg-[#eafaf1] text-[#024731]"
                        : "border-gray-200 bg-white text-gray-700"
                    }`}
                  >
                    <span>PayPal</span>
                  </button>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-2 rounded-2xl bg-gray-50 p-3.5 border border-gray-200">
                    <input
                      type="text"
                      placeholder="Card number (•••• •••• •••• ••••)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="123"
                        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Total & Submit Button */}
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                  <span>Total Donation:</span>
                  <span className="text-xl text-[#02a95c] font-black">${totalCharge} USD</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full rounded-full bg-[#02a95c] hover:bg-[#008748] py-4 text-center text-base font-extrabold text-white shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing securely...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Donate ${totalCharge}
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  Guaranteed safe 256-bit encrypted checkout with GoFundMe Guarantee.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- SHARE MODAL -------------------- */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-extrabold text-gray-900">Share this fundraiser</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Sharing a fundraiser is proven to increase donations by up to 5x.
            </p>

            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2">
              <input
                type="text"
                readOnly
                value={typeof window !== "undefined" ? window.location.href : ""}
                className="flex-1 bg-transparent px-2 text-xs text-gray-700 outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="rounded-full bg-[#024731] hover:bg-[#003823] px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold">
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-blue-50 text-[#1877F2] hover:bg-blue-100 transition-colors"
              >
                <span className="text-lg">f</span>
                <span>Facebook</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-green-50 text-[#25D366] hover:bg-green-100 transition-colors"
              >
                <span className="text-lg">💬</span>
                <span>WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                <span className="text-lg">✉</span>
                <span>Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- ALL DONORS MODAL -------------------- */}
      {showAllDonorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-extrabold text-gray-900">
                All Donations ({campaign.donors.length})
              </h3>
              <button
                onClick={() => setShowAllDonorsModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-3 divide-y divide-gray-100">
              {campaign.donors.map((d) => (
                <div key={d.id} className="pt-3 first:pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#dcfce7] flex items-center justify-center font-bold text-xs text-[#005e3a]">
                      {d.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{d.name}</div>
                      <div className="text-xs text-gray-400">{d.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-gray-900">
                      ${d.amount.toLocaleString()}
                    </div>
                    {d.isTopDonor && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        Top donation
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
