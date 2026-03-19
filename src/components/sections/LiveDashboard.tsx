import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, YAxis } from "recharts";
import {
  Home, Search, ListChecks, Users,
  Download, Plus, Calendar,
  Moon, ChevronDown, Mail, Trash2, UserPlus,
  ArrowLeft, Heart, Monitor, Smartphone, Shield, Zap
} from "lucide-react";

// ── Data ──────────────────────────────────────────────

const barData = [
  { name: "Jan 19", v: 2400 }, { name: "Jan 22", v: 2800 }, { name: "Jan 25", v: 3100 },
  { name: "Jan 28", v: 3400 }, { name: "Jan 31", v: 3200 }, { name: "Feb 03", v: 3600 },
  { name: "Feb 06", v: 3300 }, { name: "Feb 09", v: 2900 }, { name: "Feb 12", v: 3500 },
  { name: "Feb 15", v: 3700 }, { name: "Feb 18", v: 3400 }, { name: "Feb 21", v: 3100 },
  { name: "Feb 24", v: 3600 }, { name: "Feb 27", v: 3800 }, { name: "Mar 02", v: 3500 },
  { name: "Mar 05", v: 3200 }, { name: "Mar 08", v: 2800 }, { name: "Mar 11", v: 2600 },
];

const donutData = [
  { name: "Danniz", value: 22, color: "#3b82f6" },
  { name: "LaSanias", value: 18, color: "#84cc16" },
  { name: "RubenGKS", value: 14, color: "#f59e0b" },
  { name: "Caisphere", value: 12, color: "#ef4444" },
  { name: "oreokjeks1x", value: 8, color: "#67e8f9" },
  { name: "ForsteGir", value: 8, color: "#6366f1" },
  { name: "VettisTV", value: 6, color: "#f97316" },
  { name: "Geir", value: 5, color: "#a855f7" },
  { name: "FjOlsenFN", value: 4, color: "#ec4899" },
  { name: "Others", value: 3, color: "#84cc16" },
];

const tableStreamers = [
  { name: "Danniz", avatar: "DA", color: "bg-purple-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "12.4K", engagement: "Good", safety: "8.7", age: 27, avgViewers: 245, airTime: "112.4", watchTime: "27.8K", engScore: 7.2, safetyScore: 8.7, brandMention: 7.8, categories: ["Just Chatting", "Fortnite", "Minecraft"], interests: ["Gaming", "Music", "Travel"], audienceGender: [82, 15, 3], audienceAge: [30, 35, 20, 5, 10], desktop: 85, mobile: 15 },
  { name: "LaSanias", avatar: "LS", color: "bg-blue-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "8.7K", engagement: "Average", safety: "5.4", age: 24, avgViewers: 134, airTime: "89.2", watchTime: "11.9K", engScore: 5.1, safetyScore: 5.4, brandMention: 6.2, categories: ["GTA V", "Valorant", "Just Chatting"], interests: ["Cars", "Fashion", "Music"], audienceGender: [78, 19, 3], audienceAge: [40, 30, 15, 8, 7], desktop: 78, mobile: 22 },
  { name: "VettisTV", avatar: "VT", color: "bg-green-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "5.2K", engagement: "Good", safety: "7.7", age: 29, avgViewers: 98, airTime: "67.1", watchTime: "6.6K", engScore: 6.5, safetyScore: 7.7, brandMention: 7.1, categories: ["Minecraft", "Pokémon", "IRL"], interests: ["Outdoor", "Tech", "Cooking"], audienceGender: [75, 22, 3], audienceAge: [25, 35, 25, 5, 10], desktop: 88, mobile: 12 },
  { name: "Caisphere", avatar: "CA", color: "bg-pink-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "3.8K", engagement: "Excellent", safety: "8.3", age: 22, avgViewers: 76, airTime: "45.3", watchTime: "3.4K", engScore: 8.2, safetyScore: 8.3, brandMention: 8.9, categories: ["Just Chatting", "Art", "ASMR"], interests: ["Art", "Fashion", "Wellness"], audienceGender: [55, 42, 3], audienceAge: [35, 30, 20, 10, 5], desktop: 65, mobile: 35 },
  { name: "ForsteGir", avatar: "FG", color: "bg-amber-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "6.1K", engagement: "Average", safety: "4.6", age: 31, avgViewers: 101, airTime: "63.6", watchTime: "6.4K", engScore: 4.2, safetyScore: 5.2, brandMention: 8.1, categories: ["Minecraft", "Pokémon TCG", "Just Chatting"], interests: ["Food", "Movies", "Tech"], audienceGender: [88, 10, 2], audienceAge: [25, 45, 20, 3, 7], desktop: 92, mobile: 8 },
  { name: "FjOlsenFN", avatar: "FO", color: "bg-red-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "4.5K", engagement: "Average", safety: "4.1", age: 19, avgViewers: 55, airTime: "38.7", watchTime: "2.1K", engScore: 4.8, safetyScore: 4.1, brandMention: 5.5, categories: ["Fortnite", "Call of Duty", "Apex"], interests: ["Gaming", "Sneakers", "Music"], audienceGender: [90, 8, 2], audienceAge: [45, 35, 12, 5, 3], desktop: 70, mobile: 30 },
  { name: "karbells", avatar: "KB", color: "bg-emerald-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "7.3K", engagement: "Good", safety: "7.3", age: 26, avgViewers: 142, airTime: "78.9", watchTime: "11.2K", engScore: 6.8, safetyScore: 7.3, brandMention: 7.6, categories: ["Just Chatting", "Sims 4", "Stardew Valley"], interests: ["Interior Design", "Cooking", "Fitness"], audienceGender: [48, 49, 3], audienceAge: [30, 35, 20, 8, 7], desktop: 72, mobile: 28 },
  { name: "Simontops", avatar: "SI", color: "bg-orange-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "3.1K", engagement: "Average", safety: "6.2", age: 23, avgViewers: 42, airTime: "31.5", watchTime: "1.3K", engScore: 5.5, safetyScore: 6.2, brandMention: 6.0, categories: ["League of Legends", "Valorant"], interests: ["Esports", "Anime", "Tech"], audienceGender: [85, 12, 3], audienceAge: [40, 35, 15, 5, 5], desktop: 90, mobile: 10 },
  { name: "GOOTHAROLD", avatar: "GH", color: "bg-indigo-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "9.8K", engagement: "Good", safety: "8.1", age: 28, avgViewers: 198, airTime: "95.2", watchTime: "18.9K", engScore: 7.1, safetyScore: 8.1, brandMention: 8.3, categories: ["Just Chatting", "IRL", "Minecraft"], interests: ["Travel", "Music", "Food"], audienceGender: [72, 25, 3], audienceAge: [28, 32, 25, 7, 8], desktop: 80, mobile: 20 },
  { name: "hanne1", avatar: "HA", color: "bg-rose-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "2.4K", engagement: "Excellent", safety: "9.2", age: 25, avgViewers: 38, airTime: "22.1", watchTime: "0.8K", engScore: 8.8, safetyScore: 9.2, brandMention: 9.1, categories: ["Art", "Just Chatting", "Music"], interests: ["Art", "Sustainability", "Books"], audienceGender: [40, 56, 4], audienceAge: [25, 30, 25, 10, 10], desktop: 60, mobile: 40 },
  { name: "iHenski", avatar: "IH", color: "bg-teal-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "5.6K", engagement: "Average", safety: "5.8", age: 20, avgViewers: 87, airTime: "52.3", watchTime: "4.5K", engScore: 5.3, safetyScore: 5.8, brandMention: 6.4, categories: ["GTA V", "FIFA", "Just Chatting"], interests: ["Football", "Cars", "Fashion"], audienceGender: [82, 15, 3], audienceAge: [42, 32, 15, 6, 5], desktop: 75, mobile: 25 },
  { name: "RubenGKS", avatar: "RG", color: "bg-lime-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "11.2K", engagement: "Good", safety: "7.9", age: 26, avgViewers: 210, airTime: "104.7", watchTime: "22.0K", engScore: 6.9, safetyScore: 7.9, brandMention: 7.5, categories: ["Fortnite", "Minecraft", "Just Chatting"], interests: ["Gaming", "Music", "Fitness"], audienceGender: [80, 17, 3], audienceAge: [35, 30, 20, 8, 7], desktop: 82, mobile: 18 },
];

// ═══════════════════════════════════════════════════════
// FULL-SIZE SCREENS (designed at 1080×910, then scaled)
// ═══════════════════════════════════════════════════════

const DashboardScreen: React.FC = () => (
  <div className="flex-1 flex flex-col gap-3">
    {/* Date range + New Campaign */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-[#e94f37] text-xs font-medium mb-1">Start Date</div>
          <div className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white">01/19/2026</div>
        </div>
        <div>
          <div className="text-[#e94f37] text-xs font-medium mb-1">End Date</div>
          <div className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-800 bg-white">03/17/2026</div>
        </div>
        <div className="border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-800 font-medium bg-white mt-5">Apply</div>
      </div>
      <div className="bg-[#e94f37] text-white rounded-lg px-3 py-1.5 text-sm font-medium flex items-center gap-1.5">
        <Plus className="w-3.5 h-3.5" /> New Campaign
      </div>
    </div>

    {/* Stats row 1 */}
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-6">
        {[
          { label: "Views", value: "1,312,847", red: true },
          { label: "Clicks", value: "15,754" },
          { label: "CTR", value: "1.20 %" },
          { label: "Spend", value: "€48,320" },
          { label: "Exposure Time", value: "142.6 hrs" },
          { label: "Watch Time", value: "8,412 hrs" },
        ].map((s, i) => (
          <div key={s.label} className={`px-3 py-2.5 ${i > 0 ? "border-l border-gray-100" : ""}`}>
            <div className={`text-[10px] font-semibold uppercase tracking-wider ${s.red ? "text-[#e94f37]" : "text-gray-400"}`}>{s.label}</div>
            <div className="text-lg font-bold text-gray-900 leading-tight mt-0.5">{s.value}</div>
            {s.red && <div className="h-[2px] bg-[#e94f37] mt-1 w-full rounded-full" />}
          </div>
        ))}
      </div>
    </div>

    {/* Stats row 2 */}
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="grid grid-cols-6">
        {[
          { label: "Streamers", value: "100" },
          { label: "Streams", value: "1,247" },
          { label: "Followers", value: "2.1M" },
          { label: "Categories", value: "63" },
          { label: "Cost/Hr", value: "€5.74" },
          { label: "Mentions", value: "24,319" },
        ].map((s, i) => (
          <div key={s.label} className={`px-3 py-2.5 ${i > 0 ? "border-l border-gray-100" : ""}`}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{s.label}</div>
            <div className="text-lg font-bold text-gray-900 leading-tight mt-0.5">{s.value}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Charts row */}
    <div className="grid grid-cols-5 gap-3 flex-1 min-h-0">
      {/* Bar chart */}
      <div className="col-span-3 border border-gray-100 rounded-xl bg-white p-3 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-semibold text-gray-700">Views Over Time</span>
          <span className="text-xs text-gray-400 flex items-center gap-1"><Download className="w-3 h-3" /> Export</span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={12} margin={{ left: 0, right: 4, top: 4, bottom: 0 }}>
              <YAxis tick={{ fontSize: 10, fill: '#aaa' }} axisLine={false} tickLine={false} width={36} />
              <Bar dataKey="v" fill="#e94f37" radius={[3, 3, 0, 0]} opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-1 text-[9px] text-gray-400 pl-9">
          <span>Jan 19</span><span>Jan 28</span><span>Feb 06</span><span>Feb 15</span><span>Feb 24</span><span>Mar 05</span>
        </div>
      </div>

      {/* Donut chart */}
      <div className="col-span-2 border border-gray-100 rounded-xl bg-white p-3 shadow-sm flex flex-col">
        <div className="flex gap-1.5 mb-2">
          {["Streamers", "Campaigns", "Categories"].map((t, i) => (
            <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${i === 0 ? "bg-[#e94f37]/10 text-[#e94f37] ring-1 ring-[#e94f37]/20" : "text-gray-400"}`}>{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-1 min-h-0">
          <div className="space-y-0.5">
            {donutData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-[10px] text-gray-700 leading-tight">{d.name}</span>
              </div>
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[140px] h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={35} outerRadius={64} paddingAngle={1.5} dataKey="value" stroke="none">
                    {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Campaigns table */}
    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
        {["Campaigns", "Categories", "Streamers"].map((t, i) => (
          <span key={t} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${i === 0 ? "bg-[#e94f37]/10 text-[#e94f37] ring-1 ring-[#e94f37]/20" : "text-gray-400"}`}>{t}</span>
        ))}
        <div className="ml-auto text-[10px] text-gray-400 flex items-center gap-1"><Download className="w-3 h-3" /> Export</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            {["Campaign", "Status", "Start", "End", "Budget", "Views", "Clicks", "CTR"].map((h) => (
              <th key={h} className="px-3 py-2 text-left text-[9px] uppercase tracking-wider text-gray-400 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-50">
            <td className="px-3 py-2 text-sm font-semibold text-gray-900 whitespace-nowrap">Samsung Galaxy S26</td>
            <td className="px-3 py-2"><span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span></td>
            <td className="px-3 py-2 text-xs text-gray-500">2026-01-19</td>
            <td className="px-3 py-2 text-xs text-gray-500">2026-03-17</td>
            <td className="px-3 py-2 text-xs text-gray-500">€48,320</td>
            <td className="px-3 py-2 text-xs font-medium text-gray-900">1,312,847</td>
            <td className="px-3 py-2 text-xs text-gray-500">15,754</td>
            <td className="px-3 py-2 text-xs text-gray-500">1.20%</td>
          </tr>
          <tr className="border-b border-gray-50">
            <td className="px-3 py-2 text-sm font-semibold text-gray-900 whitespace-nowrap">Foodora Spring</td>
            <td className="px-3 py-2"><span className="text-[9px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Scheduled</span></td>
            <td className="px-3 py-2 text-xs text-gray-500">2026-03-20</td>
            <td className="px-3 py-2 text-xs text-gray-500">2026-04-20</td>
            <td className="px-3 py-2 text-xs text-gray-500">€35,000</td>
            <td className="px-3 py-2 text-xs text-gray-400">—</td>
            <td className="px-3 py-2 text-xs text-gray-400">—</td>
            <td className="px-3 py-2 text-xs text-gray-400">—</td>
          </tr>
          <tr>
            <td className="px-3 py-2 text-sm font-semibold text-gray-900 whitespace-nowrap">Samsung S25 Ultra</td>
            <td className="px-3 py-2"><span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">Past</span></td>
            <td className="px-3 py-2 text-xs text-gray-500">2025-11-01</td>
            <td className="px-3 py-2 text-xs text-gray-500">2025-12-15</td>
            <td className="px-3 py-2 text-xs text-gray-500">€25,000</td>
            <td className="px-3 py-2 text-xs font-medium text-gray-900">524,310</td>
            <td className="px-3 py-2 text-xs text-gray-500">6,842</td>
            <td className="px-3 py-2 text-xs text-gray-500">1.30%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// ── Screen: Streamer Explorer ─────────────────────────

const StreamerExplorerScreen: React.FC<{ onSelectStreamer?: (s: typeof tableStreamers[0]) => void }> = ({ onSelectStreamer }) => (
  <div className="flex-1 flex flex-col gap-3">
    {/* Top bar */}
    <div className="flex items-center gap-2">
      <span className="text-[#e94f37] text-sm font-semibold">Filter by</span>
      <span className="text-xs text-gray-400">✕ Clear</span>
      <div className="flex-1 border border-gray-200 rounded-lg bg-white flex items-center gap-2 px-3 py-1.5">
        <Search className="w-3.5 h-3.5 text-gray-300" />
        <span className="text-sm text-gray-400">Search by name...</span>
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-1">Sort: <span className="font-medium">Default</span> <ChevronDown className="w-3 h-3" /></div>
      <div className="text-[10px] text-gray-500 flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
        <Download className="w-3 h-3" /> Export
      </div>
      <div className="text-[10px] text-gray-500 border border-gray-200 rounded-lg px-2 py-1.5 bg-white">+ Add All</div>
    </div>

    <div className="flex gap-3 flex-1 min-h-0">
      {/* Sidebar filters */}
      <div className="w-[130px] shrink-0 space-y-4 overflow-y-auto">
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1.5">Stream Activity</div>
          <label className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-[#e94f37] flex items-center justify-center text-white text-[7px]">✓</div><span className="text-xs text-gray-600">Recently Active</span></label>
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1.5">Platform</div>
          {["Twitch", "Kick", "YouTube", "Trovo"].map((p) => (
            <label key={p} className="flex items-center gap-1.5 mb-0.5"><div className="w-3.5 h-3.5 rounded border border-gray-300" /><span className="text-xs text-gray-500">{p}</span></label>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1.5">Languages</div>
          {["Arabic", "Chinese", "Czech", "Danish", "Dutch"].map((l) => (
            <label key={l} className="flex items-center gap-1.5 mb-0.5"><div className="w-3.5 h-3.5 rounded border border-gray-300" /><span className="text-xs text-gray-500">{l}</span></label>
          ))}
        </div>
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-1.5">Country</div>
          {["🇳🇴 Norway", "🇸🇪 Sweden", "🇩🇰 Denmark"].map((c) => (
            <label key={c} className="flex items-center gap-1.5 mb-0.5"><div className="w-3.5 h-3.5 rounded border border-gray-300" /><span className="text-xs text-gray-500">{c}</span></label>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/50">
              {["Streamer", "Platform", "Country", "Language", "Gender", "Safety", "Engage.", "Followers"].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[9px] uppercase tracking-wider text-gray-400 font-semibold whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableStreamers.map((s) => (
              <tr key={s.name} className="border-b border-gray-50">
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center gap-2 pointer-events-auto cursor-pointer" onClick={() => onSelectStreamer?.(s)}>
                    <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-white text-[8px] font-bold shrink-0`}>{s.avatar}</div>
                    <span className="text-xs font-medium text-gray-900 hover:text-[#e94f37] transition-colors">{s.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2"><div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded" style={{ backgroundColor: s.platformColor }} /><span className="text-xs text-gray-600">{s.platform}</span></div></td>
                <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{s.country}</td>
                <td className="px-3 py-2 text-xs text-gray-600 whitespace-nowrap">{s.lang}</td>
                <td className="px-3 py-2 text-xs text-gray-600">{s.gender}</td>
                <td className="px-3 py-2"><span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded-full font-medium">{s.safety}</span></td>
                <td className="px-3 py-2 text-xs text-gray-600">{s.engagement}</td>
                <td className="px-3 py-2 text-xs text-gray-700 font-medium">{s.followers}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right text-[10px] text-gray-400 py-1.5 pr-3">Showing 1–50 of 39,480 streamers</div>
      </div>
    </div>
  </div>
);

// ── Screen: Streamer Profile ──────────────────────────

const MiniDonut: React.FC<{ data: { value: number; color: string }[]; size?: number }> = ({ data, size = 60 }) => (
  <div style={{ width: size, height: size }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={size * 0.3} outerRadius={size * 0.48} paddingAngle={1} dataKey="value" stroke="none">
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const StreamerProfileScreen: React.FC<{ streamer: typeof tableStreamers[0]; onBack: () => void }> = ({ streamer, onBack }) => {
  const ageLabels = ["18-24", "25-34", "35-44", "13-17", "45+"];
  const ageColors = ["#3b82f6", "#6366f1", "#f59e0b", "#84cc16", "#94a3b8"];

  return (
    <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
      {/* Back button */}
      <div className="pointer-events-auto cursor-pointer flex items-center gap-1.5 text-sm text-[#e94f37] font-medium w-fit" onClick={onBack}>
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </div>

      {/* Header banner */}
      <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#e94f37] to-[#f59e0b] h-[50px] relative">
        <div className="absolute -bottom-4 left-4">
          <div className={`w-12 h-12 rounded-full ${streamer.color} border-[3px] border-white flex items-center justify-center text-white text-sm font-bold shadow-md`}>
            {streamer.avatar}
          </div>
        </div>
      </div>

      {/* Identity + Summary row */}
      <div className="flex gap-3 mt-2">
        {/* Left: Identity */}
        <div className="w-[200px] shrink-0 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-gray-900">{streamer.name}</span>
            <div className="w-3.5 h-3.5 rounded" style={{ backgroundColor: streamer.platformColor }} />
          </div>
          <div className="text-[10px] text-gray-500 mb-3">{streamer.followers} followers</div>
          <div className="space-y-1.5 text-[10px] text-gray-600">
            <div className="flex items-center gap-1.5">{streamer.gender}</div>
            <div className="flex items-center gap-1.5">{streamer.lang}</div>
            <div className="flex items-center gap-1.5">{streamer.country}</div>
            <div className="flex items-center gap-1.5">{streamer.age} Years Old</div>
          </div>
          <div className="mt-3 pt-2 border-t border-gray-100">
            <div className="text-[10px] font-semibold text-gray-700 mb-1.5">Interests</div>
            <div className="flex flex-wrap gap-1">
              {streamer.interests.map(i => (
                <span key={i} className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">{i}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Stats grid */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Stream stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Avg Viewers", value: streamer.avgViewers.toString() },
              { label: "Air Time", value: streamer.airTime + " hrs" },
              { label: "Watch Time", value: streamer.watchTime + " hrs" },
            ].map(s => (
              <div key={s.label} className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider">{s.label}</div>
                <div className="text-sm font-bold text-gray-900 mt-0.5">{s.value}</div>
                <div className="h-[2px] bg-[#e94f37]/20 mt-1 rounded-full"><div className="h-full bg-[#e94f37] rounded-full" style={{ width: '60%' }} /></div>
              </div>
            ))}
          </div>

          {/* Top Categories */}
          <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
            <div className="text-[10px] font-semibold text-gray-700 mb-1.5">Top Categories <span className="text-gray-400 font-normal">Last 28 days</span></div>
            <div className="flex gap-2">
              {streamer.categories.map(cat => (
                <span key={cat} className="text-[9px] bg-[#e94f37]/8 text-[#e94f37] px-2 py-1 rounded-lg font-medium">{cat}</span>
              ))}
            </div>
          </div>

          {/* Scores bar chart */}
          <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
            <div className="text-[10px] font-semibold text-gray-700 mb-2">Streamer Scores</div>
            <div className="space-y-2">
              {[
                { label: "Engagement", score: streamer.engScore, avg: 5.2 },
                { label: "Brand Safety", score: streamer.safetyScore, avg: 5.2 },
                { label: "Brand Mention", score: streamer.brandMention, avg: 8.5 },
              ].map(m => (
                <div key={m.label} className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 w-[70px] shrink-0">{m.label}</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="h-[6px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#e94f37] rounded-full" style={{ width: `${m.score * 10}%` }} />
                    </div>
                    <div className="h-[4px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 rounded-full" style={{ width: `${m.avg * 10}%` }} />
                    </div>
                  </div>
                  <span className="text-[9px] font-medium text-gray-700 w-[24px] text-right">{m.score}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-[8px] text-gray-400 mt-1">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#e94f37] rounded-sm" />{streamer.name}</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-300 rounded-sm" />Norwegian Avg</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audience row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Audience Gender */}
        <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
          <div className="text-[10px] font-semibold text-gray-700 mb-1">Audience Gender</div>
          <div className="flex items-center gap-2">
            <MiniDonut data={[
              { value: streamer.audienceGender[0], color: "#3b82f6" },
              { value: streamer.audienceGender[1], color: "#ec4899" },
              { value: streamer.audienceGender[2], color: "#94a3b8" },
            ]} size={50} />
            <div className="space-y-0.5 text-[9px]">
              <div className="text-gray-600">♂ {streamer.audienceGender[0]}%</div>
              <div className="text-gray-600">♀ {streamer.audienceGender[1]}%</div>
              <div className="text-gray-400">Other {streamer.audienceGender[2]}%</div>
            </div>
          </div>
        </div>

        {/* Audience Age */}
        <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
          <div className="text-[10px] font-semibold text-gray-700 mb-1">Audience Age</div>
          <div className="flex items-center gap-2">
            <MiniDonut data={streamer.audienceAge.map((v, i) => ({ value: v, color: ageColors[i] }))} size={50} />
            <div className="space-y-0.5 text-[9px]">
              {streamer.audienceAge.slice(0, 3).map((v, i) => (
                <div key={i} className="text-gray-600">{ageLabels[i]}: {v}%</div>
              ))}
            </div>
          </div>
        </div>

        {/* Device */}
        <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
          <div className="text-[10px] font-semibold text-gray-700 mb-1">Device</div>
          <div className="flex items-center gap-2">
            <MiniDonut data={[
              { value: streamer.desktop, color: "#1e293b" },
              { value: streamer.mobile, color: "#e94f37" },
            ]} size={50} />
            <div className="space-y-0.5 text-[9px]">
              <div className="flex items-center gap-1 text-gray-600"><Monitor className="w-2.5 h-2.5" /> {streamer.desktop}%</div>
              <div className="flex items-center gap-1 text-gray-600"><Smartphone className="w-2.5 h-2.5" /> {streamer.mobile}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Audience interests */}
      <div className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm">
        <div className="text-[10px] font-semibold text-gray-700 mb-1.5">Audience Interests</div>
        <div className="flex flex-wrap gap-1">
          {["Tactical Shooters", "PC Hardware", "Norwegian Pop Culture", "Gaming News", "Health & Fitness", "Outdoor Activities"].map(i => (
            <span key={i} className="text-[9px] bg-gray-50 border border-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Screen: My Streamer Lists ─────────────────────────

const StreamerListsScreen: React.FC = () => (
  <div className="flex-1 flex flex-col gap-5">
    <div className="flex items-center justify-between">
      <span className="text-[#e94f37] text-xl font-bold">My Streamer Lists</span>
      <div className="bg-[#e94f37] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
        <Plus className="w-4 h-4" /> Create a New List
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {[
        { name: "Favorite Streamers", count: 5, date: "06/01/2026", by: "LIVAD Technologies", avatars: [
          { i: "DA", c: "bg-purple-500" }, { i: "LS", c: "bg-blue-500" }, { i: "VT", c: "bg-green-500" }, { i: "CA", c: "bg-pink-500" }, { i: "+2", c: "bg-[#e94f37]/20", text: true },
        ]},
        { name: "My Streamer List", count: 1, date: "12/02/2026", by: "Andreas Myraune", avatars: [
          { i: "KB", c: "bg-emerald-500" },
        ]},
      ].map((list) => (
        <div key={list.name} className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="text-sm font-semibold text-gray-800 mb-3">{list.name}</div>
          <div className="flex -space-x-2 mb-3">
            {list.avatars.map((av, j) => (
              <div key={j} className={`rounded-full ${av.c} border-2 border-white flex items-center justify-center text-[10px] font-bold shadow-sm ${av.text ? 'text-[#e94f37]' : 'text-white'}`} style={{ width: 36, height: 36 }}>
                {av.i}
              </div>
            ))}
          </div>
          <div className="space-y-1 text-xs text-gray-400">
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Created: {list.date}</div>
            <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> By: {list.by}</div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent Activity */}
    <div className="flex-1 flex flex-col gap-2">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</div>
      <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 shadow-sm">
        <div className="space-y-3">
          {[
            { action: "Added Danniz to", list: "Favorite Streamers", time: "2 hours ago" },
            { action: "Created list", list: "My Streamer List", time: "1 day ago" },
            { action: "Added karbells to", list: "My Streamer List", time: "1 day ago" },
            { action: "Removed FjOlsenFN from", list: "Favorite Streamers", time: "3 days ago" },
            { action: "Added LaSanias to", list: "Favorite Streamers", time: "5 days ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e94f37]/40 shrink-0" />
              <span className="text-gray-600">{activity.action} <span className="font-semibold text-gray-800">{activity.list}</span></span>
              <span className="text-gray-400 ml-auto text-[10px]">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── Screen: Users ─────────────────────────────────────

const UsersScreen: React.FC = () => (
  <div className="flex-1 flex flex-col gap-5">
    <div>
      <div className="text-xl font-bold text-gray-900">Samsung / WPP Team</div>
      <div className="text-sm text-gray-500 mt-1">Invite or manage your organization's users</div>
    </div>

    <div className="flex items-center justify-end">
      <div className="bg-[#e94f37] text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2">
        <UserPlus className="w-4 h-4" /> Invite Member
      </div>
    </div>

    <div className="border border-gray-100 rounded-xl bg-white overflow-hidden shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            {["User", "Email", "Role", "Status", ""].map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { name: "James Whitfield", initials: "JW", email: "j.whitfield@wpp.com", role: "Owner", roleColor: "bg-amber-100 text-amber-700", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: false },
            { name: "Priya Sharma", initials: "PS", email: "p.sharma@samsung.com", role: "Admin", roleColor: "bg-blue-100 text-blue-700", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: true },
            { name: "Emma Thornton", initials: "ET", email: "e.thornton@wpp.com", role: "Admin", roleColor: "bg-blue-100 text-blue-700", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: true },
            { name: "Marcus Chen", initials: "MC", email: "m.chen@samsung.com", role: "Viewer", roleColor: "bg-gray-100 text-gray-600", status: "Invited", statusColor: "bg-yellow-100 text-yellow-700", canDelete: true },
          ].map((user) => (
            <tr key={user.email} className="border-b border-gray-50">
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e94f37] to-[#d4432d] flex items-center justify-center text-white text-[10px] font-bold shrink-0">{user.initials}</div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
              <td className="px-4 py-3">
                <span className={`text-[10px] ${user.roleColor} px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 w-fit`}>
                  {user.role} {user.role !== "Owner" && <ChevronDown className="w-2.5 h-2.5" />}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-[10px] ${user.statusColor} px-2.5 py-1 rounded-full font-semibold`}>{user.status}</span>
              </td>
              <td className="px-4 py-3">
                {user.canDelete && <Trash2 className="w-4 h-4 text-gray-300" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pending invitations */}
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
      <div className="text-sm font-semibold text-gray-700 mb-3">Invite via Email</div>
      <div className="flex gap-3">
        <div className="flex-1 border border-gray-200 rounded-lg bg-white flex items-center gap-2 px-3 py-2">
          <Mail className="w-4 h-4 text-gray-300" />
          <span className="text-sm text-gray-400">Enter email address...</span>
        </div>
        <div className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 flex items-center gap-1">
          Viewer <ChevronDown className="w-3 h-3" />
        </div>
        <div className="bg-[#e94f37] text-white rounded-lg px-4 py-2 text-sm font-medium">Send Invite</div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════
// MAIN COMPONENT — Uses CSS transform: scale() to fit
// ═══════════════════════════════════════════════════════

interface LiveDashboardProps {
  className?: string;
  compact?: boolean;
}

const NAV_SCREENS = [
  { label: "Dashboard", icon: Home },
  { label: "Streamer Explorer", icon: Search },
  { label: "My Streamer Lists", icon: ListChecks },
  { label: "Users", icon: Users },
];

const DASH_W = 1080;
const DASH_H = 910;
const AUTOPLAY_DURATIONS = [8000, 6000, 5000, 5000];

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "", compact = false }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [scale, setScale] = useState(0.5);
  const [selectedStreamer, setSelectedStreamer] = useState<typeof tableStreamers[0] | null>(null);

  const userInteracted = useRef(false);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout>>();

  const effectiveVisible = compact ? true : isVisible;

  // Click handler for sidebar navigation
  const handleScreenChange = useCallback((index: number) => {
    setActiveScreen(index);
    setSelectedStreamer(null);
    userInteracted.current = true;
    if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
  }, []);

  // Click handler for streamer name in explorer
  const handleSelectStreamer = useCallback((s: typeof tableStreamers[0]) => {
    setSelectedStreamer(s);
    userInteracted.current = true;
    if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
  }, []);

  // Dynamic scale via ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const updateScale = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w > 0 && h > 0) {
        setScale(Math.max(w / DASH_W, h / DASH_H));
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Autoplay: cycles through screens, stops permanently once user clicks
  useEffect(() => {
    if (!effectiveVisible) return;

    let cancelled = false;

    const cycle = (screenIndex: number) => {
      if (cancelled || userInteracted.current) return;

      setActiveScreen(screenIndex);
      autoplayTimeout.current = setTimeout(() => {
        cycle((screenIndex + 1) % NAV_SCREENS.length);
      }, AUTOPLAY_DURATIONS[screenIndex]);
    };

    autoplayTimeout.current = setTimeout(() => cycle(0), 100);

    return () => {
      cancelled = true;
      if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      className={`relative w-full h-full overflow-hidden rounded-[inherit] transition-all duration-700 ease-out ${effectiveVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}
    >
      <style>{`
        @keyframes dashScreenIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Full-size dashboard, scaled down with CSS transform */}
      <div
        style={{
          width: DASH_W,
          height: DASH_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* App shell */}
        <div className="flex h-full w-full overflow-hidden" style={{ background: "#f8f8f8" }}>

          {/* Sidebar — interactive */}
          <div className="w-[160px] shrink-0 py-4 px-2.5 flex flex-col gap-0.5 pointer-events-auto" style={{ background: "#ffffff", borderRight: "1px solid #eee" }}>
            <div className="px-2 mb-5">
              <img
                src="/lovable-uploads/logo-color.png"
                alt="Beta Ads"
                className="h-5 w-auto"
              />
            </div>

            {NAV_SCREENS.map((screen, i) => (
              <div
                key={screen.label}
                onClick={() => handleScreenChange(i)}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer select-none ${
                  activeScreen === i
                    ? 'bg-[#e94f37]/10 text-[#e94f37]'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                <screen.icon className={`w-4 h-4 shrink-0 ${activeScreen === i ? 'text-[#e94f37]' : ''}`} />
                <span className="whitespace-nowrap text-[13px]">{screen.label}</span>
              </div>
            ))}

            {/* Sidebar bottom */}
            <div className="mt-auto pt-3 border-t border-gray-100">
              <div className="text-[10px] text-gray-400 px-2.5">Beta for Business</div>
              <div className="text-[9px] text-gray-300 px-2.5 mt-0.5">v2.4.1</div>
            </div>
          </div>

          {/* Main area — non-interactive content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden pointer-events-none">
            {/* Top bar */}
            <div className="flex items-center justify-end gap-2.5 px-4 py-2.5" style={{ background: "#ffffff", borderBottom: "1px solid #eee" }}>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-500 font-medium flex items-center gap-1">
                <img src="/lovable-uploads/logo-carat.png" alt="" className="w-3.5 h-3.5" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                WPP
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-700 font-medium">Samsung</div>
              <Moon className="w-3.5 h-3.5 text-gray-400" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e94f37] to-[#d4432d] flex items-center justify-center text-white text-[9px] font-bold">JW</div>
            </div>

            {/* Content area */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col" style={{ background: "#f8f8f8" }}>
              <div key={activeScreen} className="flex-1 flex flex-col" style={{ animation: 'dashScreenIn 0.5s ease-out' }}>
                {activeScreen === 0 && <DashboardScreen />}
                {activeScreen === 1 && (
                  selectedStreamer
                    ? <StreamerProfileScreen streamer={selectedStreamer} onBack={() => setSelectedStreamer(null)} />
                    : <StreamerExplorerScreen onSelectStreamer={handleSelectStreamer} />
                )}
                {activeScreen === 2 && <StreamerListsScreen />}
                {activeScreen === 3 && <UsersScreen />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
