import { Campaign, Donor } from "@/types/campaign";

export const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: "sample-campaign",
    slug: "sample-campaign",
    title: "Help Sophia Recover from Emergency Heart Surgery & Care",
    category: "Medical",
    country: "United States",
    currency: "USD",
    targetGoal: 50000,
    raisedAmount: 38420,
    donorCount: 284,
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&auto=format&fit=crop&q=80",
    story: `Hi everyone, thank you so much for stopping by and taking the time to read Sophia's story.

Two weeks ago, what started as routine fatigue turned into an unexpected medical emergency. Sophia was diagnosed with an acute cardiovascular condition requiring emergency surgery and intensive specialized cardiac recovery care. 

While the surgery was a success thanks to the incredible team at Mount Sinai Hospital, the path to full rehabilitation and recovery will take months. As many of you know, Sophia is a loving mother, community art teacher, and someone who always puts others before herself.

The funds raised here will directly help cover:
• Specialized post-operative intensive care and rehabilitation therapy
• Prescriptions, cardiac monitoring equipment, and recovery aids
• Living expenses while she is unable to return to teaching during recovery

Every donation, share, and prayer means the world to our family during this difficult time. Thank you from the bottom of our hearts for your overwhelming generosity, warmth, and support.`,
    createdAt: "2026-08-15",
    organizer: {
      name: "Marcus & Elena Vance",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      location: "New York, NY",
      isVerified: true,
      beneficiaryName: "Sophia Vance",
    },
    updates: [
      {
        id: "u1",
        title: "Sophia is out of the ICU and breathing on her own! 🎉",
        content: "Huge milestone today! The doctors gave us the green light to move Sophia from the ICU to the step-down cardiac recovery unit. She was able to sit up, smile, and look through all of the touching messages and prayers you've left here. We are forever grateful.",
        date: "3 days ago",
        authorName: "Marcus Vance",
      },
      {
        id: "u2",
        title: "Surgery Completed Successfully",
        content: "The surgeons confirmed that the 6-hour procedure went as smoothly as possible. Now begins the critical monitoring and rest period.",
        date: "12 days ago",
        authorName: "Marcus Vance",
      },
    ],
    donors: [
      {
        id: "d1",
        name: "Anonymous",
        amount: 2500,
        currency: "USD",
        timestamp: "1 hour ago",
        message: "Sending all our love and healing prayers to Sophia and the Vance family. Stay strong!",
        isTopDonor: true,
        likes: 18,
      },
      {
        id: "d2",
        name: "David & Clara Miller",
        amount: 500,
        currency: "USD",
        timestamp: "3 hours ago",
        message: "Sophia has touched so many lives in our neighborhood art class. Wishing a rapid and painless recovery!",
        likes: 9,
      },
      {
        id: "d3",
        name: "Liam O'Connor",
        amount: 100,
        currency: "USD",
        timestamp: "5 hours ago",
        message: "Stay strong Sophia! Thinking of you all.",
        likes: 4,
      },
      {
        id: "d4",
        name: "Jessica Chen",
        amount: 250,
        currency: "USD",
        timestamp: "12 hours ago",
        message: "From your students at P.S. 41, we miss you Ms. Sophia! Get well soon! 🎨❤️",
        likes: 14,
      },
      {
        id: "d5",
        name: "Robert Taylor",
        amount: 50,
        currency: "USD",
        timestamp: "1 day ago",
        message: "Rooting for your quick recovery.",
        likes: 2,
      },
      {
        id: "d6",
        name: "Anonymous",
        amount: 1000,
        currency: "USD",
        timestamp: "2 days ago",
        message: "In support of an incredible educator.",
        isTopDonor: true,
        likes: 11,
      },
    ],
  },
  {
    id: "carmine-street",
    slug: "carmine-street",
    title: "Fund NYC's Iconic Carmine Street Guitars",
    category: "Community",
    country: "United States",
    currency: "USD",
    targetGoal: 85000,
    raisedAmount: 67890,
    donorCount: 512,
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&auto=format&fit=crop&q=80",
    story: `Carmine Street Guitars has been a cornerstone of New York City's musical heritage for over four decades. Handcrafting custom instruments from historic New York timber, our workshop has welcomed legends and aspiring musicians alike.

Due to unforeseen structural repairs needed on our historic Greenwich Village building and sharp increases in preservation compliance costs, we need our community's support to ensure the doors stay open for the next generation of artists.`,
    createdAt: "2026-08-01",
    organizer: {
      name: "Rick Kelly",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      location: "New York, NY",
      isVerified: true,
    },
    updates: [
      {
        id: "u1",
        title: "Restoration permits approved!",
        content: "Thank you to every music lover who contributed. The NYC Landmarks commission has approved the timber repair blueprints.",
        date: "5 days ago",
        authorName: "Rick Kelly",
      },
    ],
    donors: [
      {
        id: "d1",
        name: "Patti S.",
        amount: 5000,
        currency: "USD",
        timestamp: "1 day ago",
        message: "Keep the music alive in the Village forever.",
        isTopDonor: true,
        likes: 42,
      },
      {
        id: "d2",
        name: "Anonymous",
        amount: 500,
        currency: "USD",
        timestamp: "2 days ago",
        message: "Best guitar shop in the world.",
        likes: 7,
      },
    ],
  },
  {
    id: "ran-blake",
    slug: "ran-blake",
    title: "Help Ran Blake, a Musical Pioneer, with Medical Costs",
    category: "Medical",
    country: "United States",
    currency: "USD",
    targetGoal: 65000,
    raisedAmount: 42844,
    donorCount: 388,
    coverImage: "https://images.unsplash.com/photo-1520523839898-507121404c00?w=1200&auto=format&fit=crop&q=80",
    story: `Ran Blake has spent his entire life enriching our cultural landscape as an educator, pianist, and third-stream pioneer at the New England Conservatory. 

Now, in his 80s, Ran is dealing with progressive neurological medical costs and around-the-clock supportive care. Let's unite to return the harmony and care he gave the world.`,
    createdAt: "2026-08-10",
    organizer: {
      name: "Friends of Ran Blake",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      location: "Boston, MA",
      isVerified: true,
    },
    updates: [],
    donors: [
      {
        id: "d1",
        name: "Gary B.",
        amount: 1500,
        currency: "USD",
        timestamp: "4 hours ago",
        message: "Ran taught me the true meaning of listening. Honor him!",
        likes: 12,
      },
    ],
  },
  {
    id: "victoria-kids",
    slug: "victoria-kids",
    title: "Help Victoria And Her Kids Not End Up Homeless ❤️",
    category: "Emergency",
    country: "United States",
    currency: "USD",
    targetGoal: 28000,
    raisedAmount: 23520,
    donorCount: 198,
    coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80",
    story: `Victoria is a single mother of three young children who recently lost their housing due to an unexpected lease termination and family emergency. We are raising funds to secure a safe two-bedroom apartment deposit and 6 months of stable rent for the family while Victoria transitions to full-time nursing employment.`,
    createdAt: "2026-08-20",
    organizer: {
      name: "Victoria Sterling",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      location: "Austin, TX",
      isVerified: true,
    },
    updates: [],
    donors: [],
  },
  {
    id: "sophia-scholarship",
    slug: "sophia-scholarship",
    title: "Sophia Lynn Donath Legacy Scholarship",
    category: "Education",
    country: "United States",
    currency: "USD",
    targetGoal: 80000,
    raisedAmount: 74847,
    donorCount: 642,
    coverImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&auto=format&fit=crop&q=80",
    story: `The Sophia Lynn Donath Legacy Scholarship provides full-tuition support for underprivileged young women pursuing STEM careers and environmental research. Your contributions help ensure that passionate students have access to university education and laboratories.`,
    createdAt: "2026-07-28",
    organizer: {
      name: "Donath Family Foundation",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      location: "Chicago, IL",
      isVerified: true,
    },
    updates: [],
    donors: [],
  },
  {
    id: "village-works",
    slug: "village-works",
    title: "Support VILLAGE WORKS - Keep NYC Culture Alive",
    category: "Creative",
    country: "United States",
    currency: "USD",
    targetGoal: 30000,
    raisedAmount: 13387,
    donorCount: 140,
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
    story: `Village Works is an independent bookstore, community gallery, and literary hub on St. Marks Place in the East Village. Help us maintain our open community programming, author readings, and local press distribution.`,
    createdAt: "2026-08-12",
    organizer: {
      name: "Joseph Ferrara",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      location: "New York, NY",
      isVerified: true,
    },
    updates: [],
    donors: [],
  }
];

const STORAGE_KEY = "gofundme_custom_campaigns";
const EVENT_KEY = "gofundme_store_updated";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getAllCampaigns(): Campaign[] {
  if (!isClient()) return SAMPLE_CAMPAIGNS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SAMPLE_CAMPAIGNS;
    const stored: Campaign[] = JSON.parse(raw);
    
    // Merge stored campaigns with sample ones (stored overrides sample if same slug)
    const map = new Map<string, Campaign>();
    SAMPLE_CAMPAIGNS.forEach((c) => map.set(c.slug, c));
    stored.forEach((c) => map.set(c.slug, c));
    return Array.from(map.values());
  } catch (e) {
    console.error("Error reading campaigns from localStorage:", e);
    return SAMPLE_CAMPAIGNS;
  }
}

export function getCampaignBySlug(slug: string): Campaign | undefined {
  const campaigns = getAllCampaigns();
  return campaigns.find((c) => c.slug === slug || c.id === slug);
}

export function saveCampaign(campaign: Campaign): void {
  if (!isClient()) return;
  try {
    const current = getAllCampaigns();
    const filtered = current.filter((c) => c.slug !== campaign.slug && c.id !== campaign.id);
    const updated = [campaign, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: { slug: campaign.slug } }));
  } catch (e) {
    console.error("Error saving campaign to localStorage:", e);
  }
}

export function addDonation(
  slug: string,
  donationData: {
    donorName: string;
    amount: number;
    currency?: string;
    message?: string;
    isAnonymous?: boolean;
  }
): Campaign | undefined {
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return undefined;

  const newDonor: Donor = {
    id: `don_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: donationData.isAnonymous ? "Anonymous" : donationData.donorName || "Supporter",
    amount: donationData.amount,
    currency: donationData.currency || campaign.currency || "USD",
    timestamp: "Just now",
    message: donationData.message?.trim() || undefined,
    isAnonymous: donationData.isAnonymous,
    likes: 0,
  };

  // Determine top donor status
  const currentMax = campaign.donors.reduce((max, d) => Math.max(max, d.amount), 0);
  if (donationData.amount >= currentMax && donationData.amount >= 100) {
    newDonor.isTopDonor = true;
  }

  const updatedCampaign: Campaign = {
    ...campaign,
    raisedAmount: campaign.raisedAmount + donationData.amount,
    donorCount: campaign.donorCount + 1,
    donors: [newDonor, ...campaign.donors],
  };

  saveCampaign(updatedCampaign);
  return updatedCampaign;
}

export function addSupportComment(
  slug: string,
  data: { name: string; message: string }
): Campaign | undefined {
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return undefined;

  const newDonor: Donor = {
    id: `supp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: data.name || "Supporter",
    amount: 0,
    currency: campaign.currency,
    timestamp: "Just now",
    message: data.message,
    likes: 0,
  };

  const updatedCampaign: Campaign = {
    ...campaign,
    donors: [newDonor, ...campaign.donors],
  };

  saveCampaign(updatedCampaign);
  return updatedCampaign;
}

export function likeComment(slug: string, donorId: string): void {
  const campaign = getCampaignBySlug(slug);
  if (!campaign) return;

  const updatedDonors = campaign.donors.map((d) => {
    if (d.id === donorId) {
      return { ...d, likes: (d.likes || 0) + 1 };
    }
    return d;
  });

  saveCampaign({
    ...campaign,
    donors: updatedDonors,
  });
}

export function subscribeToStore(callback: () => void): () => void {
  if (!isClient()) return () => {};
  const handler = () => callback();
  window.addEventListener(EVENT_KEY, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_KEY, handler);
    window.removeEventListener("storage", handler);
  };
}
