// ─── Types ─────────────────────────────────────────────────────────────────

export type Niche = "Meme" | "Politics" | "Content Creation" | "Crypto" | "Finance" | "General";
export type CampaignStatus = "Active" | "Paused" | "Completed" | "Pending";
export type ClipStatus = "Pending" | "Approved" | "Rejected";
export type TransactionType = "Deposit" | "Withdrawal" | "Escrow Release" | "Refund" | "Payout";
export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type DisputeStatus = "Open" | "Under Review" | "Resolved" | "Escalated";

export interface Campaign {
  id: string;
  title: string;
  niche: Niche;
  contentLink: string;
  description: string;
  cpm: number; // ₦ per 1,000 impressions
  budget: number; // ₦
  spent: number; // ₦
  status: CampaignStatus;
  clippers: number;
  maxClippers?: number;
  maxPayoutPerClipper?: number;
  impressions: number;
  createdAt: string;
  durationDays?: number;
}

export interface Clipper {
  id: string;
  name: string;
  avatar: string;
  totalEarnings: number;
  activeOffers: number;
}

export interface ClipSubmission {
  id: string;
  clipperId: string;
  clipperName: string;
  clipperAvatar: string;
  campaignId: string;
  postLink: string;
  platform: "TikTok" | "Instagram" | "YouTube Shorts" | "Twitter/X";
  impressions: number;
  earnings: number;
  status: ClipStatus;
  submittedAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
}

export interface Dispute {
  id: string;
  campaignId: string;
  campaignTitle: string;
  clipperId?: string;
  clipperName?: string;
  reason: string;
  evidence?: string;
  status: DisputeStatus;
  createdAt: string;
  adminResponse?: string;
}

export interface Offer {
  id: string;
  campaignId: string;
  title: string;
  niche: Niche;
  cpm: number;
  budgetRemaining: number;
  totalBudget: number;
  description: string;
  contentLink: string;
  maxPayoutPerClipper?: number;
  rules?: string;
  clippersJoined: number;
  maxClippers?: number;
}

// ─── Mock Campaigns (Creator view) ─────────────────────────────────────────

export const mockCampaigns: Campaign[] = [
  {
    id: "c001",
    title: "CryptoX Awareness Push",
    niche: "Crypto",
    contentLink: "https://youtube.com/watch?v=xyz123",
    description: "Spread awareness for our new DeFi protocol launch. Focus on key features and APY.",
    cpm: 500,
    budget: 250000,
    spent: 87400,
    status: "Active",
    clippers: 24,
    maxClippers: 50,
    maxPayoutPerClipper: 5000,
    impressions: 174800,
    createdAt: "2026-03-15",
    durationDays: 30,
  },
  {
    id: "c002",
    title: "FinanceHub Podcast Clips",
    niche: "Finance",
    contentLink: "https://youtube.com/watch?v=abc456",
    description: "Clip highlights from our latest podcast episode on Nigerian stock market trends.",
    cpm: 300,
    budget: 150000,
    spent: 150000,
    status: "Completed",
    clippers: 38,
    impressions: 500000,
    createdAt: "2026-02-01",
  },
  {
    id: "c003",
    title: "Meme Viral Challenge",
    niche: "Meme",
    contentLink: "https://tiktok.com/@creator/video/789",
    description: "Push this meme challenge to as many platforms as possible. Highest engagement possible.",
    cpm: 200,
    budget: 80000,
    spent: 12000,
    status: "Paused",
    clippers: 8,
    maxClippers: 100,
    impressions: 60000,
    createdAt: "2026-03-28",
    durationDays: 14,
  },
  {
    id: "c004",
    title: "Creator Academy Promo",
    niche: "Content Creation",
    contentLink: "https://youtube.com/watch?v=promo01",
    description: "Short-form clips from our Creator Academy launch video. Focus on the value proposition.",
    cpm: 400,
    budget: 120000,
    spent: 0,
    status: "Pending",
    clippers: 0,
    impressions: 0,
    createdAt: "2026-04-01",
    durationDays: 21,
  },
];

// ─── Mock Clip Submissions ──────────────────────────────────────────────────

export const mockClipSubmissions: ClipSubmission[] = [
  {
    id: "s001",
    clipperId: "cl001",
    clipperName: "TikiMaster_NG",
    clipperAvatar: "TM",
    campaignId: "c001",
    postLink: "https://tiktok.com/@tikimaster/video/111",
    platform: "TikTok",
    impressions: 48200,
    earnings: 24100,
    status: "Approved",
    submittedAt: "2026-03-18",
  },
  {
    id: "s002",
    clipperId: "cl002",
    clipperName: "ShortQueenAbi",
    clipperAvatar: "SA",
    campaignId: "c001",
    postLink: "https://youtube.com/shorts/abi123",
    platform: "YouTube Shorts",
    impressions: 31600,
    earnings: 15800,
    status: "Approved",
    submittedAt: "2026-03-19",
  },
  {
    id: "s003",
    clipperId: "cl003",
    clipperName: "CryptoKlipa",
    clipperAvatar: "CK",
    campaignId: "c001",
    postLink: "https://twitter.com/cryptoklipa/status/999",
    platform: "Twitter/X",
    impressions: 0,
    earnings: 0,
    status: "Pending",
    submittedAt: "2026-04-02",
  },
  {
    id: "s004",
    clipperId: "cl004",
    clipperName: "ReelsRookie",
    clipperAvatar: "RR",
    campaignId: "c001",
    postLink: "https://instagram.com/reel/rr456",
    platform: "Instagram",
    impressions: 9200,
    earnings: 4600,
    status: "Rejected",
    submittedAt: "2026-03-22",
  },
];

// ─── Mock Transactions ──────────────────────────────────────────────────────

export const mockCreatorTransactions: Transaction[] = [
  { id: "t001", date: "2026-04-01", type: "Deposit", amount: 250000, status: "Completed", description: "Wallet top-up via Paystack" },
  { id: "t002", date: "2026-03-28", type: "Escrow Release", amount: -87400, status: "Completed", description: "CryptoX Awareness Push — campaign spend" },
  { id: "t003", date: "2026-03-15", type: "Deposit", amount: 150000, status: "Completed", description: "Wallet top-up via bank transfer" },
  { id: "t004", date: "2026-02-28", type: "Refund", amount: 5000, status: "Completed", description: "Refund — rejected clip payout reversed" },
  { id: "t005", date: "2026-02-01", type: "Deposit", amount: 150000, status: "Completed", description: "FinanceHub campaign fund" },
];

export const mockClipperTransactions: Transaction[] = [
  { id: "tp001", date: "2026-04-02", type: "Payout", amount: 24100, status: "Completed", description: "CryptoX Awareness Push — TikTok clip earnings" },
  { id: "tp002", date: "2026-03-30", type: "Payout", amount: 15800, status: "Pending", description: "CryptoX Awareness Push — Shorts clip earnings" },
  { id: "tp003", date: "2026-03-18", type: "Withdrawal", amount: -30000, status: "Completed", description: "Withdrawal to GTBank ****4821" },
  { id: "tp004", date: "2026-03-05", type: "Payout", amount: 8400, status: "Completed", description: "FinanceHub Podcast Clips — earnings" },
];

// ─── Mock Disputes ──────────────────────────────────────────────────────────

export const mockCreatorDisputes: Dispute[] = [
  {
    id: "d001",
    campaignId: "c001",
    campaignTitle: "CryptoX Awareness Push",
    clipperId: "cl004",
    clipperName: "ReelsRookie",
    reason: "Clip did not follow brand guidelines — contained unrelated promotional content mid-video.",
    evidence: "Screenshot provided showing third-party logo at 0:45 mark.",
    status: "Under Review",
    createdAt: "2026-03-24",
  },
];

export const mockClipperDisputes: Dispute[] = [
  {
    id: "d002",
    campaignId: "c002",
    campaignTitle: "FinanceHub Podcast Clips",
    reason: "Clip was approved but earnings were not released after 7 days. Balance still shows pending.",
    evidence: "Screenshot of approved status + wallet showing 0 balance.",
    status: "Open",
    createdAt: "2026-04-01",
    adminResponse: undefined,
  },
];

// ─── Mock Available Offers (Clipper view) ───────────────────────────────────

export const mockOffers: Offer[] = [
  {
    id: "o001",
    campaignId: "c001",
    title: "CryptoX Awareness Push",
    niche: "Crypto",
    cpm: 500,
    budgetRemaining: 162600,
    totalBudget: 250000,
    description: "Spread awareness for our new DeFi protocol launch. Focus on key features and APY.",
    contentLink: "https://youtube.com/watch?v=xyz123",
    maxPayoutPerClipper: 5000,
    rules: "No misleading claims. Must include #CryptoX hashtag. Min 30 seconds. Clips must be original edits, not reposts.",
    clippersJoined: 24,
    maxClippers: 50,
  },
  {
    id: "o002",
    campaignId: "c004",
    title: "Creator Academy Promo",
    niche: "Content Creation",
    cpm: 400,
    budgetRemaining: 120000,
    totalBudget: 120000,
    description: "Short-form clips from our Creator Academy launch video. Focus on the value proposition.",
    contentLink: "https://youtube.com/watch?v=promo01",
    maxPayoutPerClipper: 8000,
    rules: "Must tag @CreatorAcademy. No competitor mentions. Minimum 15s clip.",
    clippersJoined: 0,
    maxClippers: undefined,
  },
  {
    id: "o003",
    campaignId: "c-ext-01",
    title: "NaijaMeme Daily Pack",
    niche: "Meme",
    cpm: 180,
    budgetRemaining: 45000,
    totalBudget: 60000,
    description: "Repost the freshest naija meme compilation. The more platforms the better.",
    contentLink: "https://tiktok.com/@naijameme/video/555",
    clippersJoined: 12,
    rules: "General niche open. No explicit content. Tag original creator.",
  },
  {
    id: "o004",
    campaignId: "c-ext-02",
    title: "PoliticsNG Debate Clips",
    niche: "Politics",
    cpm: 350,
    budgetRemaining: 88000,
    totalBudget: 100000,
    description: "Clip key moments from the latest gubernatorial debate. Factual, no editorialising.",
    contentLink: "https://youtube.com/watch?v=debate99",
    maxPayoutPerClipper: 6000,
    clippersJoined: 7,
    maxClippers: 30,
    rules: "Clips must be verbatim. No overlaid commentary. Must include #PoliticsNG.",
  },
  {
    id: "o005",
    campaignId: "c-ext-03",
    title: "General Finance Tips Boost",
    niche: "General",
    cpm: 220,
    budgetRemaining: 200000,
    totalBudget: 200000,
    description: "Short personal finance tip clips. General audience. All niches welcome.",
    contentLink: "https://youtube.com/watch?v=fintips01",
    clippersJoined: 0,
    rules: "All clippers eligible. Include link in bio.",
  },
];

// ─── Mock Clipper My Campaigns ──────────────────────────────────────────────

export interface ClipperCampaign {
  id: string;
  campaignId: string;
  title: string;
  niche: Niche;
  cpm: number;
  earned: number;
  status: CampaignStatus;
  clipsSubmitted: number;
  clipsApproved: number;
}

export const mockClipperCampaigns: ClipperCampaign[] = [
  {
    id: "cc001",
    campaignId: "c001",
    title: "CryptoX Awareness Push",
    niche: "Crypto",
    cpm: 500,
    earned: 24100,
    status: "Active",
    clipsSubmitted: 2,
    clipsApproved: 1,
  },
  {
    id: "cc002",
    campaignId: "c002",
    title: "FinanceHub Podcast Clips",
    niche: "Finance",
    cpm: 300,
    earned: 8400,
    status: "Completed",
    clipsSubmitted: 3,
    clipsApproved: 3,
  },
];

// ─── Stats ──────────────────────────────────────────────────────────────────

export const creatorStats = {
  activeCampaigns: 1,
  totalSpend: 87400,
  totalImpressions: 234800,
  averageCpm: 350,
  walletBalance: 100000,
  escrowBalance: 87400,
};

export const clipperStats = {
  activeOffers: 2,
  totalImpressions: 89000,
  totalEarnings: 48300,
  availableBalance: 18300,
  pendingEarnings: 15800,
  lifetimeEarnings: 48300,
};
