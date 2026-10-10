export interface Donor {
  id: string;
  name: string;
  amount: number;
  currency: string;
  timestamp: string;
  message?: string;
  isAnonymous?: boolean;
  isTopDonor?: boolean;
  likes?: number;
}

export interface CampaignUpdate {
  id: string;
  title: string;
  content: string;
  date: string;
  authorName: string;
  imageUrl?: string;
}

export interface Organizer {
  name: string;
  avatarUrl: string;
  location: string;
  isVerified: boolean;
  beneficiaryName?: string;
}

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  category: string;
  country: string;
  currency: string;
  targetGoal: number;
  raisedAmount: number;
  donorCount: number;
  coverImage: string;
  story: string;
  createdAt: string;
  organizer: Organizer;
  updates: CampaignUpdate[];
  donors: Donor[];
  isCustom?: boolean;
}
