import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  Home,
  Users,
  Layers,
  ListChecks,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react";

/* ── Streamer breakdown for donut ── */
const streamerBreakdown = [
  { name: "Danniz", color: "#ef4444" },
  { name: "LaSanias", color: "#84cc16" },
  { name: "RubenGKS", color: "#ef4444" },
  { name: "Calsiphere", color: "#b91c1c" },
  { name: "sneakjeks1x", color: "#06b6d4" },
  { name: "ForsteGir", color: "#3b82f6" },
  { name: "WettisTV", color: "#f59e0b" },
  { name: "Geir", color: "#ec4899" },
  { name: "FjOlsenFN", color: "#a855f7" },
  { name: "Others", color: "#94a3b8" },
];

/* ── Nav config ── */
const sidebarNav = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "streamer-explorer", label: "Streamer Explorer", icon: Search },
  { id: "category-explorer", label: "Category Explorer", icon: Layers, badge: "NEW" },
  { id: "streamer-lists", label: "My Streamer Lists", icon: ListChecks },
  { id: "users", label: "Users", icon: Users },
];

const topTabs = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "streamer-explorer", label: "Streamers", icon: Search },
  { id: "category-explorer", label: "Category", icon: Layers, badge: "NEW" },
  { id: "streamer-lists", label: "My List", icon: ListChecks },
  { id: "users", label: "Users", icon: Users },
];

/* ── Shared: small donut component ── */
const MiniDonut = ({ segments, size = 32 }: { segments: { pct: number; color: string }[]; size?: number }) => {
  let offset = 0;
  return (
    <svg viewBox="0 0 36 36" style={{ width: size, height: size }}>
      {segments.map((s, i) => {
        const el = <circle key={i} cx="18" cy="18" r="13" fill="none" stroke={s.color} strokeWidth="5" strokeDasharray={`${s.pct} ${100 - s.pct}`} strokeDashoffset={-offset} />;
        offset += s.pct;
        return el;
      })}
    </svg>
  );
};

/* ───────── DASHBOARD VIEW ───────── */
/* ── Animated bar chart for hero dashboard ── */
const HeroChart = () => {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 500); }, []);
  const bars = [28,35,32,45,42,55,52,65,72,78,85,92,88,95,90,82,78,85,90,88,92,86,80,75,70,68,72,78];
  return (
    <div className="h-24 flex items-end justify-between gap-[2px] px-1">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-red-400 rounded-t-[1px] transition-all ease-out"
          style={{
            height: show ? `${Math.max(h * 1.1, 3)}%` : '0%',
            transitionDuration: `${400 + i * 20}ms`,
            transitionDelay: `${i * 20}ms`,
          }}
        />
      ))}
    </div>
  );
};


const DashboardView = () => (
  <div className="p-4">
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
      {[
        { label: "Views", value: "412,847", hl: true },
        { label: "Clicks", value: "5,842", hl: true },
        { label: "CTR", value: "1.41 %", hl: true },
        { label: "Spend", value: "€18,450", hl: true },
        { label: "Exposure Time", value: "42.3 hrs" },
        { label: "Watch Time", value: "2,841 hrs" },
      ].map((s) => (
        <div key={s.label} className="px-2.5 py-2 bg-white rounded-lg border border-gray-100">
          <p className={`text-[8px] font-medium uppercase ${s.hl ? "text-red-500" : "text-gray-400"}`}>{s.label}</p>
          <p className="text-sm font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
      {[
        { label: "Sponsored Streamers", value: "48" },
        { label: "Sponsored Streams", value: "612" },
        { label: "Total Followers", value: "2.1M" },
        { label: "Categories", value: "34" },
        { label: "Cost per Hour", value: "€6.49" },
        { label: "Chat Mentions", value: "4,291" },
      ].map((s) => (
        <div key={s.label} className="px-2.5 py-2 bg-white rounded-lg border border-gray-100">
          <p className="text-[8px] text-gray-400 uppercase">{s.label}</p>
          <p className="text-sm font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
    <div className="flex gap-2 mb-3">
      <div className="flex-1 bg-white rounded-lg border border-gray-100 p-3">
        <div className="flex items-center justify-end mb-2">
          <div className="px-2 py-0.5 border border-gray-200 rounded text-[8px] text-gray-500">Export as .CSV</div>
        </div>
        <HeroChart />
        <div className="flex justify-between mt-1 text-[7px] text-gray-400 px-1">
          <span>Mon,Jan 06</span><span>Thu,Jan 23</span><span>Sun,Feb 08</span><span>Wed,Feb 25</span><span>Sat,Mar 14</span>
        </div>
      </div>
      <div className="hidden sm:block w-56 bg-white rounded-lg border border-gray-100 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[9px] font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">Streamers</span>
          <span className="text-[9px] text-gray-400">Campaigns</span>
          <span className="text-[9px] text-gray-400">Categories</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="space-y-0.5">
            {streamerBreakdown.map((s) => (
              <div key={s.name} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: s.color }} />
                <span className="text-[7px] text-gray-600">{s.name}</span>
              </div>
            ))}
          </div>
          <MiniDonut size={80} segments={streamerBreakdown.map((s, i) => ({ pct: [20,14,12,10,9,8,7,6,5,9][i], color: s.color }))} />
        </div>
      </div>
    </div>
    {/* Campaign table — hidden on mobile: too wide for 375px viewports */}
    <div className="hidden sm:block bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">Campaigns</span>
          <span className="text-[9px] text-gray-400">Categories</span>
          <span className="text-[9px] text-gray-400">Streamers</span>
        </div>
        <div className="px-2 py-0.5 border border-gray-200 rounded text-[8px] text-gray-500">Export as .CSV</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-50">
            {["Campaign","Status","Start Date","End Date","Budget","Views","Clicks","CTR","Ad Spend"].map((h) => (
              <th key={h} className="text-left text-[8px] font-medium text-gray-400 uppercase px-3 py-1.5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Samsung Galaxy S25", status: "active", start: "2026-01-06", end: "2026-03-22", budget: "€20,000", views: "412,847", clicks: "5,842", ctr: "%1.41", spend: "€18,450" },
            { name: "Samsung Galaxy Tab", status: "draft", start: "2026-03-25", end: "2026-04-30", budget: "€12,000", views: "-", clicks: "-", ctr: "-", spend: "-" },
          ].map((r) => (
            <tr key={r.name} className="border-b border-gray-50 last:border-0">
              <td className="px-3 py-2 text-[9px] font-medium text-gray-900">{r.name}</td>
              <td className="px-3 py-2"><span className={`text-[8px] font-medium ${r.status === "active" ? "text-green-600" : "text-gray-400"}`}>{r.status}</span></td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.start}</td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.end}</td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.budget}</td>
              <td className="px-3 py-2 text-[9px] text-gray-900 font-medium">{r.views}</td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.clicks}</td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.ctr}</td>
              <td className="px-3 py-2 text-[9px] text-gray-500">{r.spend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ───────── STREAMER EXPLORER VIEW (matching real app) ───────── */
const StreamerExplorerView = () => (
  <div className="p-4">
    {/* Top stats row — 5 cards like real app */}
    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-3">
      {[
        { label: "Streamers", value: "39,456", icon: "👥", color: "border-l-blue-400" },
        { label: "Total Followers", value: "2.0B", icon: "❤️", color: "border-l-pink-400" },
        { label: "Total Avg. Concurrent Viewers", value: "7.5M", icon: "👁️", color: "border-l-green-400" },
        { label: "Avg. Engagement", value: "6 / 10", icon: "⚡", color: "border-l-yellow-400" },
        { label: "Avg. Brand Safety", value: "6.8 / 10", icon: "🛡️", color: "border-l-purple-400" },
      ].map((s) => (
        <div key={s.label} className={`px-2.5 py-2 bg-white rounded-lg border border-gray-100 border-l-2 ${s.color}`}>
          <p className="text-[7px] text-gray-400 uppercase flex items-center gap-1"><span className="text-[9px]">{s.icon}</span> {s.label}</p>
          <p className="text-sm font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>

    {/* Second row: category donut, air time, watch time, gender, audience */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
      <div className="bg-white rounded-lg border border-gray-100 p-2">
        <p className="text-[7px] text-gray-400 uppercase mb-1">Most Streamed Categories</p>
        <div className="flex items-center gap-2">
          <div className="space-y-0.5 text-[7px] text-gray-600">
            <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-red-500" /> Just Chatting 24.3%</div>
            <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-green-500" /> RESIDENT Evil... 8.1%</div>
            <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-sm bg-blue-500" /> League of Leg... 4.5%</div>
          </div>
          <MiniDonut size={36} segments={[{ pct: 24, color: "#ef4444" }, { pct: 8, color: "#22c55e" }, { pct: 5, color: "#3b82f6" }, { pct: 63, color: "#e5e7eb" }]} />
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-100 p-2">
        <p className="text-[7px] text-gray-400 uppercase mb-1">Total Air Time</p>
        <p className="text-base font-bold text-gray-900">3.1M h</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-100 p-2">
        <p className="text-[7px] text-gray-400 uppercase mb-1">Total Watch Time</p>
        <p className="text-base font-bold text-gray-900">767.4M h</p>
      </div>
      <div className="bg-white rounded-lg border border-gray-100 p-2">
        <p className="text-[7px] text-gray-400 uppercase mb-1">Streamer Gender</p>
        <div className="flex items-center gap-2">
          <MiniDonut size={28} segments={[{ pct: 67, color: "#3b82f6" }, { pct: 32, color: "#ec4899" }, { pct: 1, color: "#94a3b8" }]} />
          <div className="text-[6px] text-gray-500 space-y-0.5">
            <div>Male 66.8%</div>
            <div>Female 32.3%</div>
          </div>
        </div>
      </div>
    </div>

    {/* Search + filter bar */}
    <div className="flex items-center gap-2 mb-2">
      <div className="flex-1 h-7 bg-white border border-gray-200 rounded flex items-center px-2 gap-1.5">
        <Search className="w-3 h-3 text-gray-400" />
        <span className="text-[9px] text-gray-400">Search by name...</span>
      </div>
      <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center text-[9px] text-gray-500">Sort by: Default <ChevronDown className="w-2.5 h-2.5 ml-1" /></div>
      <div className="hidden sm:flex h-7 px-2 bg-white border border-gray-200 rounded text-[9px] text-gray-500">Export as .CSV</div>
      <div className="hidden sm:flex h-7 px-2 bg-white border border-gray-200 rounded text-[9px] text-gray-500">+ Add All to List</div>
    </div>

    {/* Streamer table — matching real columns */}
    <div className="bg-white rounded-lg border border-gray-100 overflow-x-auto">
      <table className="min-w-max w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["","Streamer","Platform","Country","Language","Gender","Brand Safety","Engagement","Followers"].map((h) => (
              <th key={h} className="text-left text-[8px] font-medium text-gray-400 uppercase px-2 py-1.5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "zeon", platform: "Kick", country: "🇹🇷 Türkiye", lang: "Turkish", gender: "Male", safety: "Good", engagement: "Average", followers: "44.9K", avatar: "https://files.kick.com/images/user/6029147/profile_image/conversion/79871c94-44fb-40a2-8a14-b307a96bb309-fullsize.webp" },
            { name: "superior", platform: "Kick", country: "🇹🇷 Türkiye", lang: "Turkish", gender: "Male", safety: "Average", engagement: "Average", followers: "40.2K", avatar: "https://files.kick.com/images/user/26266127/profile_image/conversion/6fbc286c-67d2-4acd-a27d-174500e9ec42-fullsize.webp" },
            { name: "DirkNeuen...", platform: "Twitch", country: "🇩🇪 Germany", lang: "German", gender: "Male", safety: "Good", engagement: "Average", followers: "66.0K", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/b2acc472-b97a-4fd5-9b38-5053577b2452-profile_image-300x300.png" },
            { name: "Rammus53", platform: "Kick", country: "🇹🇷 Türkiye", lang: "Turkish", gender: "Male", safety: "Fair", engagement: "Average", followers: "311.7K", avatar: "https://files.kick.com/images/user/1342416/profile_image/conversion/973fd8a3-c6c0-497d-b22b-c44b08f41fed-fullsize.webp" },
            { name: "zelalbade", platform: "Twitch", country: "🇹🇷 Türkiye", lang: "Turkish", gender: "Female", safety: "Excellent", engagement: "Excellent", followers: "36.0K", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/041e3a47-1262-4428-95e0-da015767d9f6-profile_image-300x300.png" },
            { name: "spajKK", platform: "Twitch", country: "🇨🇿 Czech R.", lang: "Czech", gender: "Male", safety: "Average", engagement: "Excellent", followers: "140.5K", avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/29be8cb8-cb1c-403a-a50a-0fbf7326664c-profile_image-300x300.png" },
            { name: "SHRBRK", platform: "Kick", country: "🇹🇷 Türkiye", lang: "Turkish", gender: "Male", safety: "Good", engagement: "Average", followers: "13.7K", avatar: "https://files.kick.com/images/user/11419340/profile_image/conversion/1bf05c3c-d8b1-46a2-ad36-8221b7eb8cfd-fullsize.webp" },
          ].map((r) => (
            <tr key={r.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
              <td className="px-2 py-1.5"><input type="checkbox" className="w-3 h-3 rounded border-gray-300" disabled /></td>
              <td className="px-2 py-1.5 text-[9px] font-medium text-gray-900 flex items-center gap-1.5">
                <img src={r.avatar} alt={r.name} className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                {r.name}
              </td>
              <td className="px-2 py-1.5 text-[9px] text-gray-600 flex items-center gap-1">
                <img src={r.platform === "Kick" ? "https://beta.business.livad.stream/assets/icons/Platforms/kick-icon.png" : "https://beta.business.livad.stream/assets/icons/Platforms/twitch-icon.png"} alt={r.platform} className="w-3 h-3" />
                <span className={`px-1 py-0.5 rounded text-[7px] font-medium ${r.platform === "Kick" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>{r.platform}</span>
              </td>
              <td className="px-2 py-1.5 text-[8px] text-gray-600">{r.country}</td>
              <td className="px-2 py-1.5 text-[8px] text-gray-600">{r.lang}</td>
              <td className="px-2 py-1.5 text-[8px] text-gray-600">{r.gender}</td>
              <td className="px-2 py-1.5">
                <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded ${
                  r.safety === "Excellent" ? "bg-green-100 text-green-700" :
                  r.safety === "Good" ? "bg-blue-100 text-blue-700" :
                  r.safety === "Fair" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-600"
                }`}>{r.safety}</span>
              </td>
              <td className="px-2 py-1.5">
                <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded ${
                  r.engagement === "Excellent" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>{r.engagement}</span>
              </td>
              <td className="px-2 py-1.5 text-[9px] text-gray-600">{r.followers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ───────── CATEGORY EXPLORER VIEW (matching real app) ───────── */
const CategoryExplorerView = () => (
  <div className="p-4">
    {/* Search + sort */}
    <div className="flex items-center gap-2 mb-3">
      <div className="flex-1 h-7 bg-white border border-gray-200 rounded flex items-center px-2 gap-1.5">
        <Search className="w-3 h-3 text-gray-400" />
        <span className="text-[9px] text-gray-400">Search by name...</span>
      </div>
      <div className="h-7 px-2 bg-white border border-gray-200 rounded flex items-center text-[9px] text-gray-500">Sort by: Watch Time <ChevronDown className="w-2.5 h-2.5 ml-1" /></div>
      <div className="hidden sm:flex h-7 px-2 bg-white border border-gray-200 rounded items-center text-[9px] text-gray-500">Export as .CSV</div>
    </div>

    {/* Category table — matching real columns */}
    <div className="bg-white rounded-lg border border-gray-100 overflow-x-auto">
      <table className="min-w-max w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["Category","Genres","Active Streamers","Total Views","Avg. Viewers","Live Viewers","Air Time","Watch Time"].map((h) => (
              <th key={h} className="text-left text-[8px] font-medium text-gray-400 uppercase px-2.5 py-1.5">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "Just Chatting", genres: "-", streamers: "9,587", views: "1.3B", avg: "421", live: "158,924", air: "937.1K h", watch: "394.2M h", img: "https://files.kick.com/images/subcategories/15/banner/conversion/b697a8a3-62db-4779-aa76-e4e47662af97-banner.webp" },
            { name: "RESIDENT EVIL: requ...", genres: "Adventure, Puzzle, Shooter", streamers: "3,620", views: "281.7M", avg: "450", live: "17,403", air: "398.8K h", watch: "179.5M h", img: "https://files.kick.com/images/subcategories/12248/banner/conversion/3b5d8f1b-01e2-4a8f-8dfd-334e26ea747c-banner.webp" },
            { name: "League of Legends", genres: "MOBA, Role-playing", streamers: "1,913", views: "642.5M", avg: "543", live: "32,611", air: "203.8K h", watch: "110.6M h", img: "https://files.kick.com/images/subcategories/5/banner/conversion/lol-banner.webp" },
            { name: "Counter-Strike", genres: "Shooter", streamers: "1,661", views: "338.6M", avg: "596", live: "20,721", air: "174.2K h", watch: "103.9M h", img: "https://files.kick.com/images/subcategories/1552/banner/conversion/555d5ee4-5863-4546-8c4c-6ebca28dc60d-banner.webp" },
            { name: "Marathon", genres: "Shooter", streamers: "1,478", views: "97.8M", avg: "447", live: "10,729", air: "192.8K h", watch: "86.1M h", img: "https://files.kick.com/images/subcategories/10209/banner/conversion/8ac1c556-9f24-4b9c-b277-cad35532bf48-banner.webp" },
            { name: "Grand Theft Auto V", genres: "Adventure, Racing", streamers: "1,667", views: "489.1M", avg: "463", live: "39,976", air: "179.4K h", watch: "83.1M h", img: "https://files.kick.com/images/subcategories/8/banner/conversion/8110f223-9654-4536-bfee-6a324bbf03f9-banner.webp" },
            { name: "IRL", genres: "-", streamers: "1,160", views: "270.4M", avg: "547", live: "12,338", air: "148.1K h", watch: "81.0M h", img: "https://files.kick.com/images/subcategories/8549/banner/conversion/3b142fca-b643-48d9-8ed0-405d454181d1-banner.webp" },
          ].map((r) => (
            <tr key={r.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
              <td className="px-2.5 py-2 text-[9px] font-medium text-gray-900 flex items-center gap-1.5">
                <img src={r.img} alt={r.name} className="w-5 h-7 rounded object-cover flex-shrink-0" />
                {r.name}
              </td>
              <td className="px-2.5 py-2">
                {r.genres !== "-" ? (
                  <div className="flex flex-wrap gap-0.5">
                    {r.genres.split(", ").map((g) => (
                      <span key={g} className="text-[7px] px-1 py-0.5 bg-gray-100 text-gray-500 rounded">{g}</span>
                    ))}
                  </div>
                ) : <span className="text-[8px] text-gray-400">-</span>}
              </td>
              <td className="px-2.5 py-2 text-[9px] text-gray-600">👥 {r.streamers}</td>
              <td className="px-2.5 py-2 text-[9px] text-gray-600">👁 {r.views}</td>
              <td className="px-2.5 py-2 text-[9px] text-gray-600">👤 {r.avg}</td>
              <td className="px-2.5 py-2 text-[9px] text-red-500 font-medium">🔴 {r.live}</td>
              <td className="px-2.5 py-2 text-[9px] text-gray-600">⏱️ {r.air}</td>
              <td className="px-2.5 py-2 text-[9px] text-gray-600">⏳ {r.watch}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-3 py-1.5 text-right text-[8px] text-gray-400 border-t border-gray-50">
        1–50 of 8265 &nbsp; ‹ &nbsp; ›
      </div>
    </div>
  </div>
);

/* ───────── STREAMER LISTS VIEW (card layout like real app) ───────── */
const StreamerListsView = () => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-5">
      <span className="text-sm font-semibold text-red-500">My Streamer Lists</span>
      <div className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-[10px] font-semibold flex items-center gap-1">
        <Plus className="w-3 h-3" /> Create a New List
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {[
        { name: "Favorite Streamers", avatars: 5, date: "06/01/2026", by: "LIVAD Technologies" },
        { name: "Samsung Galaxy Campaign", avatars: 3, date: "01/06/2026", by: "James Crawford" },
        { name: "Nordic Gaming List", avatars: 8, date: "02/15/2026", by: "Emma Lindqvist" },
        { name: "My Streamer List", avatars: 1, date: "12/02/2026", by: "Andreas Myraune" },
      ].map((list) => (
        <div key={list.name} className="bg-white rounded-xl border border-gray-100 p-4 hover:border-red-200 transition-colors relative">
          <div className="flex items-center justify-between mb-3 gap-2">
            <span className="text-[11px] font-semibold text-gray-900 truncate min-w-0">{list.name}</span>
            <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          </div>
          {/* Avatar stack */}
          <div className="flex -space-x-2 mb-3">
            {[...Array(Math.min(list.avatars, 4))].map((_, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">{String.fromCharCode(65 + i)}</span>
              </div>
            ))}
            {list.avatars > 4 && (
              <div className="w-7 h-7 rounded-full border-2 border-white bg-green-500 flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">+{list.avatars - 4}</span>
              </div>
            )}
          </div>
          <div className="space-y-1 text-[9px] text-gray-500">
            <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Created date: {list.date}</div>
            <div className="flex items-center gap-1"><User className="w-3 h-3" /> Created by: {list.by}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ───────── USERS VIEW (WPP team) ───────── */
const UsersView = () => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-medium text-gray-900">Team Members</span>
      <div className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-[10px] font-semibold flex items-center gap-1">
        <Plus className="w-3 h-3" /> Invite User
      </div>
    </div>
    <div className="bg-white rounded-lg border border-gray-100 overflow-x-auto">
      <table className="min-w-[450px] w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            {["User","Email","Role","Last Active","Status"].map((h) => (
              <th key={h} className="text-left text-[9px] font-medium text-gray-400 uppercase px-3 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "James Crawford", initials: "JC", email: "j.crawford@wpp.com", role: "Admin", lastActive: "Just now", online: true },
            { name: "Emma Lindqvist", initials: "EL", email: "e.lindqvist@groupm.com", role: "Campaign Mgr", lastActive: "1 hour ago", online: true },
            { name: "Oliver Hansen", initials: "OH", email: "o.hansen@mindshare.com", role: "Manager", lastActive: "3 hours ago", online: true },
            { name: "Sophie Karlsson", initials: "SK", email: "s.karlsson@wavemaker.com", role: "Analyst", lastActive: "Yesterday", online: false },
            { name: "Thomas Berg", initials: "TB", email: "t.berg@essencemediacom.com", role: "Viewer", lastActive: "Mar 18, 2026", online: false },
          ].map((u) => (
            <tr key={u.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
              <td className="px-3 py-2.5 text-[10px] font-medium text-gray-900 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center relative">
                  <span className="text-[7px] font-bold text-red-500">{u.initials}</span>
                  {u.online && <span className="absolute -bottom-0 -right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />}
                </div>
                {u.name}
              </td>
              <td className="px-3 py-2.5 text-[10px] text-gray-500">{u.email}</td>
              <td className="px-3 py-2.5">
                <span className={`text-[9px] font-medium px-2 py-0.5 rounded-full ${u.role === "Admin" ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"}`}>{u.role}</span>
              </td>
              <td className="px-3 py-2.5 text-[10px] text-gray-500">{u.lastActive}</td>
              <td className="px-3 py-2.5">
                <span className={`text-[9px] font-medium ${u.online ? "text-green-500" : "text-gray-400"}`}>{u.online ? "Online" : "Offline"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ── View map ── */
const viewMap: Record<string, React.FC> = {
  "dashboard": DashboardView,
  "streamer-explorer": StreamerExplorerView,
  "category-explorer": CategoryExplorerView,
  "streamer-lists": StreamerListsView,
  "users": UsersView,
};

/* ═══════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════ */
export const SPHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [starClicks, setStarClicks] = useState(0);
  const [starEgg, setStarEgg] = useState(false);
  const ActiveView = viewMap[activeTab] || DashboardView;

  const handleStarClick = () => {
    const next = starClicks + 1;
    setStarClicks(next);
    if (next >= 7) {
      setStarEgg(true);
      setStarClicks(0);
      setTimeout(() => setStarEgg(false), 3000);
    }
  };

  return (
    <section className="relative overflow-hidden" aria-label="Hero">
      {/* Oslo aurora background — both modes */}
      <div className="absolute inset-0">
        {/* fetchpriority="high": above-the-fold hero bg is the visual LCP candidate — tell the browser to prioritize it */}
        <img
          src="/lovable-uploads/hero-bg-oslo.jpg"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Dark overlay for text readability + fade to page bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
        {/* Film grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 md:pt-32 lg:pt-36 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white mb-5">
            Run, Launch & Scale<br />
            <span style={{ fontFamily: "'Instrument Serif', serif" }} className="italic font-normal">Native Ads</span> on Streams
          </h1>
          <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10 max-w-lg mx-auto">
            Overlays on Twitch, YouTube & Kick that bypass adblock, reach Gen Z, and deliver 3-5x higher engagement than traditional ads.
          </p>
          <div className="flex flex-wrap gap-3 mb-8 md:mb-16 justify-center">
            <Link to="/demo">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-12 px-7 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button size="lg" className="bg-white/15 border border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm h-12 px-7 text-sm font-semibold rounded-full transition-[transform,box-shadow,background-color,color,border-color] duration-300 hover:-translate-y-0.5 hover:shadow-md">
                Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="relative z-10 flex justify-center mb-0 px-3 sm:px-4 overflow-x-auto">
        {/* Accessibility fix: role="tablist" required as parent container of role="tab" buttons (WCAG 1.3.1 / ARIA spec) */}
        <div role="tablist" aria-label="Dashboard views" className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1.5 rounded-full bg-muted/60 border border-border/50 backdrop-blur-sm">
          {topTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                aria-label={tab.label}
                className={`flex items-center gap-1.5 px-2.5 sm:px-4 py-2 min-h-[44px] min-w-[44px] rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                {"badge" in tab && tab.badge && (
                  <span className="text-[7px] font-bold bg-red-500 text-white px-1 py-0.5 rounded ml-0.5">NEW</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 mt-6 animate-float-slow overflow-x-hidden">
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent z-20 pointer-events-none" />
          <div className="w-full rounded-t-2xl border border-border dark:border-white/[0.08] bg-white shadow-2xl shadow-black/10 dark:shadow-black/50 dark:ring-1 dark:ring-white/[0.06] overflow-hidden">
            <div className="flex min-w-0">
              <div className="w-44 border-r border-gray-200 bg-white p-3 hidden md:flex flex-col shrink-0">
                <div className="mb-5">
                  <img src="/lovable-uploads/logo-color.png" alt="Beta Ads" className="h-5 w-auto" />
                </div>
                {sidebarNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[10px] mb-0.5 w-full text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
                        isActive ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {item.label}
                      {item.badge && (
                        <span className="ml-auto text-[7px] font-bold bg-red-500 text-white px-1 py-0.5 rounded">{item.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="flex-1 min-w-0 bg-gray-50">
                <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 gap-2">
                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 shrink-0">
                    <span className="text-red-500 text-[9px] font-medium">Start Date</span>
                    <div className="px-2 py-0.5 border border-gray-200 rounded text-gray-700 bg-white text-[9px]">01/06/2026</div>
                    <span className="text-red-500 text-[9px] font-medium">End Date</span>
                    <div className="px-2 py-0.5 border border-gray-200 rounded text-gray-700 bg-white text-[9px]">03/22/2026</div>
                    <div className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 text-[9px] font-medium">Apply</div>
                  </div>
                  <div className="px-2.5 py-1 bg-red-500 text-white rounded-lg text-[9px] font-semibold flex items-center gap-1 ml-auto shrink-0">
                    <Plus className="w-2.5 h-2.5" /> New Campaign
                  </div>
                </div>
                <div className="h-[400px] sm:h-[520px] overflow-hidden">
                  <ActiveView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
