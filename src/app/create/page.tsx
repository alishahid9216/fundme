"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoFundMeLogo, ChevronRightIcon, ArrowLeftIcon, ShieldCheckIcon } from "@/components/icons";
import { createCampaign } from "@/lib/campaigns";
import { 
  Sparkles, 
  Image as ImageIcon, 
  Stethoscope,
  AlertTriangle,
  GraduationCap,
  Flower2,
  Dog,
  Users,
  TreePine,
  Palette
} from "lucide-react";

interface CategoryOption {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  defaultImages: string[];
}

const CATEGORIES: CategoryOption[] = [
  {
    id: "Medical",
    name: "Medical",
    icon: Stethoscope,
    description: "Surgeries, medical bills, therapies, and health recovery",
    defaultImages: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Emergency",
    name: "Emergency",
    icon: AlertTriangle,
    description: "Accidents, housing crises, disaster relief, and urgent relief",
    defaultImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Education",
    name: "Education",
    icon: GraduationCap,
    description: "Tuition, student scholarships, classroom equipment, and books",
    defaultImages: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Memorial",
    name: "Memorial",
    icon: Flower2,
    description: "Funeral services, memorial tributes, and family support",
    defaultImages: [
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Animals",
    name: "Animals & Pets",
    icon: Dog,
    description: "Veterinary surgeries, animal rescues, and shelter support",
    defaultImages: [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Community",
    name: "Community",
    icon: Users,
    description: "Neighborhood initiatives, local landmarks, and public projects",
    defaultImages: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Environment",
    name: "Environment",
    icon: TreePine,
    description: "Conservation, wildlife habitat restoration, and clean energy",
    defaultImages: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "Creative",
    name: "Creative & Arts",
    icon: Palette,
    description: "Music albums, films, theater, independent publishing, art spaces",
    defaultImages: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    ],
  },
];

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "USD - US Dollar" },
  { code: "CAD", symbol: "CA$", name: "CAD - Canadian Dollar" },
  { code: "GBP", symbol: "£", name: "GBP - British Pound" },
  { code: "EUR", symbol: "€", name: "EUR - Euro" },
  { code: "AUD", symbol: "A$", name: "AUD - Australian Dollar" },
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Ireland",
  "Spain",
  "Italy",
  "Netherlands",
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Form State
  const [country, setCountry] = useState<string>("United States");
  const [postalCode, setPostalCode] = useState<string>("10001");
  const [category, setCategory] = useState<string>("Medical");
  const [recipientType, setRecipientType] = useState<"myself" | "someone_else" | "charity">("myself");
  const [beneficiaryName, setBeneficiaryName] = useState<string>("");

  // Step 2: Goal
  const [currency, setCurrency] = useState<string>("USD");
  const [targetGoal, setTargetGoal] = useState<number>(10000);

  // Step 3: Story & Photo
  const [title, setTitle] = useState<string>("");
  const [story, setStory] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>(CATEGORIES[0].defaultImages[0]);
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [organizerName, setOrganizerName] = useState<string>("Alex Morgan");
  const [locationName, setLocationName] = useState<string>("New York, NY");

  // Step 4: Agreement
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Helper to change category and auto-assign image
  const handleSelectCategory = (catId: string) => {
    setCategory(catId);
    const matched = CATEGORIES.find((c) => c.id === catId);
    if (matched && matched.defaultImages.length > 0) {
      setCoverImage(matched.defaultImages[0]);
    }
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];

  // Validation before step navigation
  const validateStep = (step: number): boolean => {
    setErrorMessage("");
    if (step === 1) {
      if (!category) {
        setErrorMessage("Please select a fundraising category.");
        return false;
      }
      if (recipientType === "someone_else" && !beneficiaryName.trim()) {
        setErrorMessage("Please enter the name of the beneficiary you are raising funds for.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      if (!targetGoal || targetGoal < 50) {
        setErrorMessage("Please enter a valid fundraising goal of at least $50.");
        return false;
      }
      return true;
    }
    if (step === 3) {
      if (!title.trim() || title.length < 8) {
        setErrorMessage("Please enter a clear title for your fundraiser (at least 8 characters).");
        return false;
      }
      if (!story.trim() || story.length < 30) {
        setErrorMessage("Please provide a story describing your cause (at least 30 characters).");
        return false;
      }
      if (!coverImage) {
        setErrorMessage("Please select or upload a cover image for your fundraiser.");
        return false;
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // AI Prompt Helper
  const appendStoryPrompt = (promptText: string) => {
    setStory((prev) => (prev ? `${prev}\n\n${promptText}` : promptText));
  };

  // Publish Campaign
  const handlePublish = async () => {
    if (!agreedTerms) {
      setErrorMessage("Please agree to the GoFundMe terms and Giving Guarantee to publish.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { slug } = await createCampaign({
        title: title.trim(),
        category,
        country,
        currency,
        goalAmount: Number(targetGoal),
        story: story.trim(),
        coverImageUrl: customImageUrl.trim() || coverImage,
        organizerName: organizerName.trim() || "Fundraiser Organizer",
        organizerLocation: locationName.trim() || country,
        beneficiaryName: recipientType === "someone_else" ? beneficiaryName.trim() : undefined,
      });
      router.push(`/f/${slug}?published=true`);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Could not publish your fundraiser. Please try again.");
      setIsSubmitting(false);
    }
  };

  const progressPercentage = ((currentStep - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#1d2c22] flex flex-col selection:bg-[#02a95c] selection:text-white">
      {/* Top Wizard Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="inline-flex items-center" aria-label="GoFundMe Home">
              <GoFundMeLogo className="h-7 w-auto text-[#024731]" />
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              Fundraiser Creator
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-semibold text-gray-800">
              Step {currentStep} of 4
            </span>
            <Link
              href="/"
              className="text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              Exit
            </Link>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100">
          <div
            className="h-full bg-[#02a95c] transition-all duration-300 ease-out"
            style={{ width: `${Math.max(progressPercentage, 10)}%` }}
          />
        </div>
      </header>

      {/* Main Wizard Form Container */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Step Headers */}
          <div className="mb-8 text-center sm:text-left">
            {currentStep === 1 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#02a95c]">Step 1</span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1d2c22]">
                  Where will the funds go?
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Select your country and the category that best matches your cause.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#02a95c]">Step 2</span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1d2c22]">
                  Set your fundraising goal
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  You can always adjust your goal amount at any time during your campaign.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#02a95c]">Step 3</span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1d2c22]">
                  Tell your story &amp; add a cover photo
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  A compelling title and clear story help donors connect with your fundraiser.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#02a95c]">Step 4</span>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#1d2c22]">
                  Review and publish your fundraiser
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Everything looks ready! Preview your campaign and launch it to the world.
                </p>
              </div>
            )}
          </div>

          {/* Validation Error Box */}
          {errorMessage && (
            <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm font-medium text-red-700 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Wizard Step Content Card */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-gray-200">
            {/* STEP 1: BASICS */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Country */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Where do you live?
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Postal Code & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      Postal Code / ZIP
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="e.g. 10001"
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      City, State
                    </label>
                    <input
                      type="text"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      placeholder="e.g. New York, NY"
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none"
                    />
                  </div>
                </div>

                {/* Who are you raising money for? */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Who are you raising funds for?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setRecipientType("myself")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        recipientType === "myself"
                          ? "border-[#02a95c] bg-[#eafaf1] text-[#024731] font-bold ring-2 ring-[#02a95c]/20"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50"
                      }`}
                    >
                      <span className="text-sm">Myself</span>
                      <span className="text-xs text-gray-500 font-normal mt-0.5">Funds go to your bank</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRecipientType("someone_else")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        recipientType === "someone_else"
                          ? "border-[#02a95c] bg-[#eafaf1] text-[#024731] font-bold ring-2 ring-[#02a95c]/20"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50"
                      }`}
                    >
                      <span className="text-sm">Someone else</span>
                      <span className="text-xs text-gray-500 font-normal mt-0.5">Invite them to receive funds</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRecipientType("charity")}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        recipientType === "charity"
                          ? "border-[#02a95c] bg-[#eafaf1] text-[#024731] font-bold ring-2 ring-[#02a95c]/20"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50"
                      }`}
                    >
                      <span className="text-sm">A Charity</span>
                      <span className="text-xs text-gray-500 font-normal mt-0.5">Direct nonprofit grant</span>
                    </button>
                  </div>

                  {recipientType === "someone_else" && (
                    <div className="mt-3 animate-in fade-in duration-200">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Beneficiary Name
                      </label>
                      <input
                        type="text"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        placeholder="e.g. Sophia Vance"
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Category Selection Grid */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    What best describes why you&apos;re fundraising?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = category === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => handleSelectCategory(cat.id)}
                          className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#02a95c] bg-[#eafaf1] text-[#024731] ring-2 ring-[#02a95c]/20"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div
                            className={`p-2.5 rounded-xl flex-shrink-0 ${
                              isSelected ? "bg-[#02a95c] text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900">{cat.name}</div>
                            <div className="text-xs text-gray-500 line-clamp-1">{cat.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: GOAL */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Currency & Amount Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    How much would you like to raise?
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="rounded-2xl border border-gray-300 bg-white px-3 py-4 text-base font-bold text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                    >
                      {CURRENCIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} ({c.symbol})
                        </option>
                      ))}
                    </select>

                    <div className="relative flex-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-xl font-bold text-gray-400">
                        {CURRENCIES.find((c) => c.code === currency)?.symbol || "$"}
                      </div>
                      <input
                        type="number"
                        min="50"
                        step="100"
                        value={targetGoal || ""}
                        onChange={(e) => setTargetGoal(Math.max(0, Number(e.target.value)))}
                        placeholder="5,000"
                        className="w-full rounded-2xl border border-gray-300 bg-white py-4 pl-10 pr-4 text-2xl font-extrabold text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Starting Chips */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Popular Goal Starting Points
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1000, 2500, 5000, 10000, 25000, 50000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTargetGoal(amt)}
                        className={`rounded-full px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
                          targetGoal === amt
                            ? "bg-[#02a95c] text-white shadow-sm"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        ${amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 0% Platform Fee Guarantee Info Box */}
                <div className="rounded-2xl bg-[#eafaf1] border border-[#a3e6be] p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[#02a95c] p-1.5 text-white">
                      <ShieldCheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#024731]">
                        0% GoFundMe Platform Fee
                      </h4>
                      <p className="mt-1 text-xs text-[#135d41] leading-relaxed">
                        GoFundMe has a 0% platform fee for organizers, relying on optional tips from generous donors. Standard industry payment processing (2.9% + $0.30 per donation) applies to safely transfer funds directly to your bank.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Organizer Display Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Your Full Name (Fundraiser Organizer)
                  </label>
                  <input
                    type="text"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This builds trust with donors and appears on the fundraiser page.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3: STORY & PHOTO */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-800">
                      Fundraiser Title
                    </label>
                    <span className="text-xs text-gray-500 font-medium">
                      {title.length}/80 characters
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={80}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Help Marcus & Family Rebuild After Urgent Fire"
                    className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-lg font-bold text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    Tip: Mention who it is for and why help is needed.
                  </p>
                </div>

                {/* Story Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-800">
                      Tell your story
                    </label>
                    <span className="text-xs text-gray-500 font-medium">
                      {story.length} chars
                    </span>
                  </div>

                  {/* AI & Writing Helper Pills */}
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#02a95c]" /> Prompts:
                    </span>
                    <button
                      type="button"
                      onClick={() => appendStoryPrompt("Hi friends and community, thank you for reading our story.")}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      + Warm opening
                    </button>
                    <button
                      type="button"
                      onClick={() => appendStoryPrompt("The funds raised will be used directly for medical treatment, daily living essentials, and rehabilitation.")}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      + Where funds go
                    </button>
                    <button
                      type="button"
                      onClick={() => appendStoryPrompt("Even if you cannot donate, sharing this link with your network helps us tremendously.")}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      + Call to share
                    </button>
                  </div>

                  <textarea
                    rows={6}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Explain who this is for, what happened, and how the donations will make an impact..."
                    className="w-full rounded-2xl border border-gray-300 bg-white p-4 text-base text-gray-900 shadow-sm focus:border-[#02a95c] focus:ring-2 focus:ring-[#02a95c]/20 outline-none leading-relaxed"
                  />
                </div>

                {/* Cover Image Picker */}
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2">
                    Cover Photo
                  </label>

                  {/* Active Preview */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-inner mb-4">
                    <img
                      src={customImageUrl.trim() || coverImage}
                      alt="Cover Preview"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" /> Selected Cover
                    </span>
                  </div>

                  {/* Preset Selector for Category */}
                  <div>
                    <span className="text-xs font-bold text-gray-600 block mb-2">
                      Choose from {selectedCategoryObj.name} photos or paste an image URL:
                    </span>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {selectedCategoryObj.defaultImages.map((imgUrl, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setCoverImage(imgUrl);
                            setCustomImageUrl("");
                          }}
                          className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                            coverImage === imgUrl && !customImageUrl
                              ? "border-[#02a95c] ring-2 ring-[#02a95c]/30"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={imgUrl} alt="preset" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom URL Input */}
                  <div className="mt-3">
                    <input
                      type="url"
                      value={customImageUrl}
                      onChange={(e) => setCustomImageUrl(e.target.value)}
                      placeholder="Or paste any custom image URL (https://...)"
                      className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2.5 text-xs sm:text-sm text-gray-900 shadow-sm focus:border-[#02a95c] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & PUBLISH */}
            {currentStep === 4 && (
              <div className="space-y-6">
                {/* Live Preview Card */}
                <div className="rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-md">
                  <div className="relative aspect-[16/9] w-full bg-gray-100">
                    <img
                      src={customImageUrl.trim() || coverImage}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-bold text-white">
                        {category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-extrabold text-[#1d2c22] leading-snug">
                      {title || "Untitled Fundraiser"}
                    </h3>

                    {/* Progress Preview */}
                    <div className="mt-4">
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full bg-[#02a95c] w-0" />
                      </div>
                      <div className="mt-2 flex items-baseline justify-between text-sm">
                        <span className="font-extrabold text-[#1d2c22] text-lg">$0 raised</span>
                        <span className="text-gray-500 font-medium">
                          of ${targetGoal.toLocaleString()} {currency} goal
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
                      <div>
                        Organized by <span className="font-bold text-gray-900">{organizerName}</span>
                        {recipientType === "someone_else" && (
                          <span> for <span className="font-bold text-gray-900">{beneficiaryName}</span></span>
                        )}
                      </div>
                      <div>{locationName}</div>
                    </div>
                  </div>
                </div>

                {/* Summary Table with Edit shortcuts */}
                <div className="rounded-2xl bg-gray-50 p-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-500">Category &amp; Country</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <span>{category} · {country}</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-[#02a95c] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-500">Target Goal</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <span>${targetGoal.toLocaleString()} {currency}</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-[#02a95c] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-500">Story</span>
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <span>{story.substring(0, 30)}...</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="text-[#02a95c] font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-[#02a95c] focus:ring-[#02a95c] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    I confirm that the information provided is accurate and agree to the{" "}
                    <span className="font-bold text-[#024731] underline">GoFundMe Terms of Service</span> and{" "}
                    <span className="font-bold text-[#024731] underline">Giving Guarantee</span>.
                  </span>
                </label>
              </div>
            )}

            {/* Step Action Buttons (Back / Next / Publish) */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-full bg-[#02a95c] hover:bg-[#008748] px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
                >
                  Continue <ChevronRightIcon className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting || !agreedTerms}
                  className={`inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-md transition-all duration-150 cursor-pointer ${
                    isSubmitting || !agreedTerms
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#02a95c] hover:bg-[#008748] hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Publish fundraiser
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
