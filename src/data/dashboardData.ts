// Mock data based on real campaign reports

export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'completed';
  views: number;
  clicks: number;
  ctr: number;
  watchTime: number;
  screenTime: number;
  timesShown: number;
  chatClicks: number;
  streamers: string[];
  categories: { name: string; percentage: number }[];
  regions: { country: string; percentage: number }[];
  devices: { type: string; percentage: number }[];
  dailyStats: { date: string; views: number; clicks: number }[];
  bestDay: string;
}

export interface Streamer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  avgViewers: number;
  totalViews: number;
  totalClicks: number;
  avgCtr: number;
  uniqueViewers: number;
  campaignCount: number;
  regions: { name: string; percentage: number }[];
  devices: { type: string; percentage: number }[];
  ageGroups: { range: string; percentage: number }[];
  topCategories: { name: string; percentage: number }[];
  campaignHistory: { id: string; name: string; date: string; views: number }[];
}

export interface DashboardMetrics {
  thisMonth: {
    views: number;
    clicks: number;
    ctr: number;
    activeStreamers: number;
  };
  allTime: {
    views: number;
    clicks: number;
    ctr: number;
    totalStreamers: number;
    campaigns: number;
  };
}

export const campaigns: Campaign[] = [
  {
    id: 'samsung-s25',
    name: 'Samsung S25 Ultra',
    startDate: '2025-01-05',
    endDate: '2025-01-22',
    status: 'ongoing',
    views: 86900,
    clicks: 417,
    ctr: 0.48,
    watchTime: 386.2,
    screenTime: 7.44,
    timesShown: 1234,
    chatClicks: 12,
    streamers: ['datrope', 'kiskoo', 'henna37', 'the_katjaanaa', 'lainebruce', 'emmelie', 'pernataia', 'aienia', 'streamer9'],
    categories: [
      { name: 'Just Chatting', percentage: 40 },
      { name: 'Grand Theft Auto V', percentage: 25 },
      { name: 'Jurassic World', percentage: 20 },
      { name: 'Counter-Strike 2', percentage: 10 },
      { name: 'Fortnite', percentage: 5 },
    ],
    regions: [
      { country: 'Norge', percentage: 95 },
      { country: 'Sverige', percentage: 2 },
      { country: 'Tyskland', percentage: 1 },
      { country: 'Andre', percentage: 2 },
    ],
    devices: [
      { type: 'Desktop', percentage: 79.9 },
      { type: 'Mobil', percentage: 20.1 },
    ],
    dailyStats: [
      { date: '2025-01-05', views: 3200, clicks: 15 },
      { date: '2025-01-06', views: 4100, clicks: 19 },
      { date: '2025-01-07', views: 5600, clicks: 27 },
      { date: '2025-01-08', views: 4800, clicks: 23 },
      { date: '2025-01-09', views: 6200, clicks: 30 },
      { date: '2025-01-10', views: 7100, clicks: 34 },
      { date: '2025-01-11', views: 9500, clicks: 46 },
      { date: '2025-01-12', views: 8300, clicks: 40 },
      { date: '2025-01-13', views: 6900, clicks: 33 },
      { date: '2025-01-14', views: 7400, clicks: 35 },
      { date: '2025-01-15', views: 6100, clicks: 29 },
      { date: '2025-01-16', views: 5800, clicks: 28 },
      { date: '2025-01-17', views: 4900, clicks: 24 },
      { date: '2025-01-18', views: 7000, clicks: 34 },
    ],
    bestDay: '2025-01-11',
  },
  {
    id: 'kristiania-voting',
    name: 'Kristiania – Voting',
    startDate: '2025-02-19',
    endDate: '2025-04-05',
    status: 'ongoing',
    views: 140000,
    clicks: 847,
    ctr: 0.72,
    watchTime: 512.5,
    screenTime: 12.3,
    timesShown: 2456,
    chatClicks: 34,
    streamers: ['datrope', 'kiskoo', 'henna37', 'the_katjaanaa', 'lainebruce', 'emmelie'],
    categories: [
      { name: 'Just Chatting', percentage: 55 },
      { name: 'Grand Theft Auto V', percentage: 20 },
      { name: 'Fortnite', percentage: 15 },
      { name: 'Minecraft', percentage: 10 },
    ],
    regions: [
      { country: 'Norge', percentage: 94 },
      { country: 'Sverige', percentage: 3 },
      { country: 'Danmark', percentage: 2 },
      { country: 'Andre', percentage: 1 },
    ],
    devices: [
      { type: 'Desktop', percentage: 82 },
      { type: 'Mobil', percentage: 18 },
    ],
    dailyStats: [
      { date: '2025-02-19', views: 4500, clicks: 32 },
      { date: '2025-02-20', views: 5200, clicks: 37 },
      { date: '2025-02-21', views: 6100, clicks: 44 },
      { date: '2025-02-22', views: 7800, clicks: 56 },
      { date: '2025-02-23', views: 8200, clicks: 59 },
    ],
    bestDay: '2025-02-23',
  },
  {
    id: 'saily',
    name: 'Saily',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    status: 'completed',
    views: 102000,
    clicks: 612,
    ctr: 0.60,
    watchTime: 298.4,
    screenTime: 8.2,
    timesShown: 1876,
    chatClicks: 28,
    streamers: ['datrope', 'kiskoo', 'henna37', 'the_katjaanaa'],
    categories: [
      { name: 'Just Chatting', percentage: 45 },
      { name: 'IRL', percentage: 30 },
      { name: 'Grand Theft Auto V', percentage: 25 },
    ],
    regions: [
      { country: 'Norge', percentage: 92 },
      { country: 'Sverige', percentage: 5 },
      { country: 'Andre', percentage: 3 },
    ],
    devices: [
      { type: 'Desktop', percentage: 78 },
      { type: 'Mobil', percentage: 22 },
    ],
    dailyStats: [],
    bestDay: '2024-06-15',
  },
  {
    id: 'surfshark',
    name: 'Surfshark VPN',
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    status: 'completed',
    views: 91000,
    clicks: 455,
    ctr: 0.50,
    watchTime: 276.3,
    screenTime: 6.8,
    timesShown: 1654,
    chatClicks: 19,
    streamers: ['datrope', 'kiskoo', 'lainebruce'],
    categories: [
      { name: 'Grand Theft Auto V', percentage: 50 },
      { name: 'Just Chatting', percentage: 30 },
      { name: 'Counter-Strike 2', percentage: 20 },
    ],
    regions: [
      { country: 'Norge', percentage: 96 },
      { country: 'Sverige', percentage: 2 },
      { country: 'Andre', percentage: 2 },
    ],
    devices: [
      { type: 'Desktop', percentage: 81 },
      { type: 'Mobil', percentage: 19 },
    ],
    dailyStats: [],
    bestDay: '2024-04-22',
  },
  {
    id: 'norstat',
    name: 'Norstat',
    startDate: '2024-06-10',
    endDate: '2024-06-25',
    status: 'completed',
    views: 70000,
    clicks: 350,
    ctr: 0.50,
    watchTime: 198.5,
    screenTime: 5.4,
    timesShown: 1234,
    chatClicks: 15,
    streamers: ['datrope', 'henna37'],
    categories: [
      { name: 'Just Chatting', percentage: 60 },
      { name: 'IRL', percentage: 25 },
      { name: 'Fortnite', percentage: 15 },
    ],
    regions: [
      { country: 'Norge', percentage: 98 },
      { country: 'Andre', percentage: 2 },
    ],
    devices: [
      { type: 'Desktop', percentage: 77 },
      { type: 'Mobil', percentage: 23 },
    ],
    dailyStats: [],
    bestDay: '2024-06-18',
  },
  {
    id: 'shure-mv6',
    name: 'Shure MV6',
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    status: 'completed',
    views: 85000,
    clicks: 510,
    ctr: 0.60,
    watchTime: 245.2,
    screenTime: 7.1,
    timesShown: 1567,
    chatClicks: 22,
    streamers: ['datrope', 'kiskoo', 'the_katjaanaa', 'lainebruce'],
    categories: [
      { name: 'Just Chatting', percentage: 50 },
      { name: 'Grand Theft Auto V', percentage: 35 },
      { name: 'Music', percentage: 15 },
    ],
    regions: [
      { country: 'Norge', percentage: 94 },
      { country: 'Sverige', percentage: 4 },
      { country: 'Andre', percentage: 2 },
    ],
    devices: [
      { type: 'Desktop', percentage: 83 },
      { type: 'Mobil', percentage: 17 },
    ],
    dailyStats: [],
    bestDay: '2024-05-17',
  },
  {
    id: 'philips-oneblade',
    name: 'Philips OneBlade',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    status: 'completed',
    views: 78000,
    clicks: 390,
    ctr: 0.50,
    watchTime: 212.8,
    screenTime: 5.9,
    timesShown: 1345,
    chatClicks: 18,
    streamers: ['datrope', 'kiskoo', 'henna37'],
    categories: [
      { name: 'Just Chatting', percentage: 55 },
      { name: 'IRL', percentage: 30 },
      { name: 'Grand Theft Auto V', percentage: 15 },
    ],
    regions: [
      { country: 'Norge', percentage: 93 },
      { country: 'Sverige', percentage: 4 },
      { country: 'Danmark', percentage: 2 },
      { country: 'Andre', percentage: 1 },
    ],
    devices: [
      { type: 'Desktop', percentage: 79 },
      { type: 'Mobil', percentage: 21 },
    ],
    dailyStats: [],
    bestDay: '2024-04-12',
  },
  {
    id: 'nki',
    name: 'NKI',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    status: 'completed',
    views: 65000,
    clicks: 325,
    ctr: 0.50,
    watchTime: 187.3,
    screenTime: 4.8,
    timesShown: 1123,
    chatClicks: 14,
    streamers: ['datrope', 'henna37', 'the_katjaanaa'],
    categories: [
      { name: 'Just Chatting', percentage: 65 },
      { name: 'Grand Theft Auto V', percentage: 20 },
      { name: 'Fortnite', percentage: 15 },
    ],
    regions: [
      { country: 'Norge', percentage: 97 },
      { country: 'Andre', percentage: 3 },
    ],
    devices: [
      { type: 'Desktop', percentage: 80 },
      { type: 'Mobil', percentage: 20 },
    ],
    dailyStats: [],
    bestDay: '2024-02-20',
  },
];

export const streamers: Streamer[] = [
  {
    id: 'datrope',
    name: 'DatRope',
    avatar: 'D',
    bio: 'Variety streamer | GTA V, Just Chatting, IRL',
    followers: 21500,
    avgViewers: 234,
    totalViews: 2340000,
    totalClicks: 1234,
    avgCtr: 1.44,
    uniqueViewers: 136800,
    campaignCount: 28,
    regions: [
      { name: 'Oslo', percentage: 14 },
      { name: 'Trøndelag', percentage: 12 },
      { name: 'Akershus', percentage: 10 },
      { name: 'Vestland', percentage: 8 },
      { name: 'Rogaland', percentage: 6 },
    ],
    devices: [
      { type: 'Desktop', percentage: 79.9 },
      { type: 'Mobil', percentage: 20.1 },
    ],
    ageGroups: [
      { range: '18-24', percentage: 76 },
      { range: '25-34', percentage: 24 },
    ],
    topCategories: [
      { name: 'Grand Theft Auto V', percentage: 56.7 },
      { name: 'Just Chatting', percentage: 22.2 },
      { name: 'IRL', percentage: 15.2 },
      { name: 'Counter-Strike 2', percentage: 5.9 },
    ],
    campaignHistory: [
      { id: 'samsung-s25', name: 'Samsung S25 Ultra', date: 'Jan 2025', views: 34100 },
      { id: 'kristiania-voting', name: 'Kristiania Voting', date: 'Feb-Apr 2025', views: 32000 },
      { id: 'saily', name: 'Saily', date: 'Jun 2024', views: 28500 },
      { id: 'norstat', name: 'Norstat', date: 'Jun 2024', views: 25200 },
    ],
  },
  {
    id: 'kiskoo',
    name: 'kiskoo',
    avatar: 'K',
    bio: 'Gaming streamer | CS2, Valorant',
    followers: 15200,
    avgViewers: 198,
    totalViews: 1850000,
    totalClicks: 987,
    avgCtr: 1.32,
    uniqueViewers: 98500,
    campaignCount: 22,
    regions: [
      { name: 'Oslo', percentage: 16 },
      { name: 'Akershus', percentage: 14 },
      { name: 'Trøndelag', percentage: 11 },
      { name: 'Vestland', percentage: 9 },
    ],
    devices: [
      { type: 'Desktop', percentage: 85 },
      { type: 'Mobil', percentage: 15 },
    ],
    ageGroups: [
      { range: '18-24', percentage: 82 },
      { range: '25-34', percentage: 18 },
    ],
    topCategories: [
      { name: 'Counter-Strike 2', percentage: 45 },
      { name: 'Valorant', percentage: 30 },
      { name: 'Just Chatting', percentage: 25 },
    ],
    campaignHistory: [
      { id: 'samsung-s25', name: 'Samsung S25 Ultra', date: 'Jan 2025', views: 18500 },
      { id: 'kristiania-voting', name: 'Kristiania Voting', date: 'Feb-Apr 2025', views: 24000 },
      { id: 'surfshark', name: 'Surfshark VPN', date: 'Mar-Jun 2024', views: 21000 },
    ],
  },
  {
    id: 'henna37',
    name: 'Henna37',
    avatar: 'H',
    bio: 'Creative streamer | Art, Just Chatting',
    followers: 12800,
    avgViewers: 187,
    totalViews: 1420000,
    totalClicks: 756,
    avgCtr: 1.28,
    uniqueViewers: 76300,
    campaignCount: 18,
    regions: [
      { name: 'Oslo', percentage: 18 },
      { name: 'Trøndelag', percentage: 13 },
      { name: 'Vestland', percentage: 12 },
    ],
    devices: [
      { type: 'Desktop', percentage: 72 },
      { type: 'Mobil', percentage: 28 },
    ],
    ageGroups: [
      { range: '18-24', percentage: 68 },
      { range: '25-34', percentage: 32 },
    ],
    topCategories: [
      { name: 'Just Chatting', percentage: 60 },
      { name: 'Art', percentage: 25 },
      { name: 'IRL', percentage: 15 },
    ],
    campaignHistory: [
      { id: 'samsung-s25', name: 'Samsung S25 Ultra', date: 'Jan 2025', views: 15200 },
      { id: 'kristiania-voting', name: 'Kristiania Voting', date: 'Feb-Apr 2025', views: 18000 },
      { id: 'norstat', name: 'Norstat', date: 'Jun 2024', views: 12000 },
    ],
  },
  {
    id: 'the_katjaanaa',
    name: 'the_katjaanaa',
    avatar: 'T',
    bio: 'Variety streamer | Games, Just Chatting',
    followers: 9500,
    avgViewers: 165,
    totalViews: 980000,
    totalClicks: 523,
    avgCtr: 1.18,
    uniqueViewers: 54200,
    campaignCount: 14,
    regions: [
      { name: 'Oslo', percentage: 15 },
      { name: 'Akershus', percentage: 13 },
      { name: 'Trøndelag', percentage: 10 },
    ],
    devices: [
      { type: 'Desktop', percentage: 76 },
      { type: 'Mobil', percentage: 24 },
    ],
    ageGroups: [
      { range: '18-24', percentage: 70 },
      { range: '25-34', percentage: 30 },
    ],
    topCategories: [
      { name: 'Just Chatting', percentage: 50 },
      { name: 'Fortnite', percentage: 30 },
      { name: 'Minecraft', percentage: 20 },
    ],
    campaignHistory: [
      { id: 'samsung-s25', name: 'Samsung S25 Ultra', date: 'Jan 2025', views: 11300 },
      { id: 'kristiania-voting', name: 'Kristiania Voting', date: 'Feb-Apr 2025', views: 14000 },
    ],
  },
  {
    id: 'lainebruce',
    name: 'LaineBruce',
    avatar: 'L',
    bio: 'Chill streamer | GTA V, Music',
    followers: 7800,
    avgViewers: 142,
    totalViews: 720000,
    totalClicks: 384,
    avgCtr: 1.05,
    uniqueViewers: 41500,
    campaignCount: 11,
    regions: [
      { name: 'Trøndelag', percentage: 17 },
      { name: 'Oslo', percentage: 14 },
      { name: 'Vestland', percentage: 11 },
    ],
    devices: [
      { type: 'Desktop', percentage: 80 },
      { type: 'Mobil', percentage: 20 },
    ],
    ageGroups: [
      { range: '18-24', percentage: 74 },
      { range: '25-34', percentage: 26 },
    ],
    topCategories: [
      { name: 'Grand Theft Auto V', percentage: 55 },
      { name: 'Just Chatting', percentage: 30 },
      { name: 'Music', percentage: 15 },
    ],
    campaignHistory: [
      { id: 'samsung-s25', name: 'Samsung S25 Ultra', date: 'Jan 2025', views: 7800 },
      { id: 'kristiania-voting', name: 'Kristiania Voting', date: 'Feb-Apr 2025', views: 9500 },
      { id: 'surfshark', name: 'Surfshark VPN', date: 'Mar-Jun 2024', views: 8200 },
    ],
  },
];

export const dashboardMetrics: DashboardMetrics = {
  thisMonth: {
    views: 86900,
    clicks: 417,
    ctr: 0.48,
    activeStreamers: 9,
  },
  allTime: {
    views: 717900,
    clicks: 3906,
    ctr: 0.54,
    totalStreamers: 15,
    campaigns: 8,
  },
};

export const audienceInsights = {
  totalViewers: 407300,
  countries: [
    { name: 'Norge', flag: '🇳🇴', percentage: 95 },
    { name: 'Sverige', flag: '🇸🇪', percentage: 2.5 },
    { name: 'Danmark', flag: '🇩🇰', percentage: 1.5 },
    { name: 'Andre', flag: '🌍', percentage: 1 },
  ],
  regions: [
    { name: 'Oslo', percentage: 14 },
    { name: 'Trøndelag', percentage: 12 },
    { name: 'Akershus', percentage: 11 },
    { name: 'Vestland', percentage: 8 },
    { name: 'Rogaland', percentage: 6 },
    { name: 'Andre', percentage: 49 },
  ],
  devices: [
    { type: 'Desktop', icon: '💻', percentage: 79.9 },
    { type: 'Mobil', icon: '📱', percentage: 20.1 },
  ],
  ageGroups: [
    { range: '18-24', percentage: 76 },
    { range: '25-34', percentage: 24 },
  ],
  topCategories: [
    { name: 'Just Chatting', percentage: 40 },
    { name: 'Grand Theft Auto V', percentage: 25 },
    { name: 'Fortnite', percentage: 10 },
    { name: 'Counter-Strike 2', percentage: 8 },
    { name: 'Minecraft', percentage: 6 },
    { name: 'Andre', percentage: 11 },
  ],
};

// Helper functions
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const getCampaignProgress = (campaign: Campaign): number => {
  const start = new Date(campaign.startDate).getTime();
  const end = new Date(campaign.endDate).getTime();
  const now = Date.now();
  
  if (now >= end) return 100;
  if (now <= start) return 0;
  
  return Math.round(((now - start) / (end - start)) * 100);
};

export const getCampaignById = (id: string): Campaign | undefined => {
  return campaigns.find(c => c.id === id);
};

export const getStreamerById = (id: string): Streamer | undefined => {
  return streamers.find(s => s.id === id);
};

export const getTopStreamersForCampaign = (campaign: Campaign): { name: string; views: number; clicks: number; avgViewers: number }[] => {
  // Generate mock data based on campaign's total views
  const totalViews = campaign.views;
  const viewDistribution = [0.39, 0.21, 0.18, 0.13, 0.09]; // Distribution percentages
  
  return campaign.streamers.slice(0, 5).map((streamerId, index) => {
    const streamer = getStreamerById(streamerId);
    const views = Math.round(totalViews * (viewDistribution[index] || 0.05));
    const clicks = Math.round(views * (campaign.ctr / 100) * (1 + Math.random() * 0.5));
    
    return {
      name: streamer?.name || streamerId,
      views,
      clicks,
      avgViewers: streamer?.avgViewers || Math.round(150 + Math.random() * 100),
    };
  });
};
