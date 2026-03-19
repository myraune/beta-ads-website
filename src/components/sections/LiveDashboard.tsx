import React, { useState, useEffect, useRef, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, YAxis } from "recharts";
import {
  Home, Search, ListChecks, Users,
  Download, Plus, Calendar,
  Moon, ChevronDown, Mail, Trash2, UserPlus
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
  { name: "Danniz", avatar: "DA", color: "bg-purple-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "12.4K", engagement: "Good", safety: "8.7" },
  { name: "LaSanias", avatar: "LS", color: "bg-blue-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "8.7K", engagement: "Average", safety: "5.4" },
  { name: "VettisTV", avatar: "VT", color: "bg-green-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "5.2K", engagement: "Good", safety: "7.7" },
  { name: "Caisphere", avatar: "CA", color: "bg-pink-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "3.8K", engagement: "Excellent", safety: "8.3" },
  { name: "ForsteGir", avatar: "FG", color: "bg-amber-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "6.1K", engagement: "Average", safety: "4.6" },
  { name: "FjOlsenFN", avatar: "FO", color: "bg-red-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "4.5K", engagement: "Average", safety: "4.1" },
  { name: "karbells", avatar: "KB", color: "bg-emerald-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "7.3K", engagement: "Good", safety: "7.3" },
  { name: "Simontops", avatar: "SI", color: "bg-orange-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "3.1K", engagement: "Average", safety: "6.2" },
  { name: "GOOTHAROLD", avatar: "GH", color: "bg-indigo-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "9.8K", engagement: "Good", safety: "8.1" },
  { name: "hanne1", avatar: "HA", color: "bg-rose-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♀ Female", followers: "2.4K", engagement: "Excellent", safety: "9.2" },
  { name: "iHenski", avatar: "IH", color: "bg-teal-500", platform: "Kick", platformColor: "#53fc18", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "5.6K", engagement: "Average", safety: "5.8" },
  { name: "RubenGKS", avatar: "RG", color: "bg-lime-500", platform: "Twitch", platformColor: "#9146ff", country: "🇳🇴 Norway", lang: "🇳🇴 Norwegian", gender: "♂ Male", followers: "11.2K", engagement: "Good", safety: "7.9" },
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
            <td className="px-3 py-2 text-sm font-semibold text-gray-900 whitespace-nowrap">Gokstad Akademiet</td>
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

const StreamerExplorerScreen: React.FC = () => (
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
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${s.color} flex items-center justify-center text-white text-[8px] font-bold shrink-0`}>{s.avatar}</div>
                    <span className="text-xs font-medium text-gray-900">{s.name}</span>
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
      <div className="text-xl font-bold text-gray-900">Gokstad Akademiet Team</div>
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
            { name: "Andreas Myraune", initials: "AM", email: "andreas@beta-ads.no", role: "Owner", roleColor: "bg-amber-100 text-amber-700", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: false },
            { name: "Karoline Berggren", initials: "KB", email: "karoline@allegro.no", role: "Viewer", roleColor: "bg-gray-100 text-gray-600", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: true },
            { name: "Sofia Lindqvist", initials: "SL", email: "sofia@beta-ads.no", role: "Admin", roleColor: "bg-blue-100 text-blue-700", status: "Active", statusColor: "bg-green-100 text-green-700", canDelete: true },
            { name: "Alf Johansen", initials: "AJ", email: "alf@allegro.no", role: "Viewer", roleColor: "bg-gray-100 text-gray-600", status: "Invited", statusColor: "bg-yellow-100 text-yellow-700", canDelete: true },
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
const AUTOPLAY_RESUME_DELAY = 12000;

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ className = "", compact = false }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [scale, setScale] = useState(0.5);

  const userInteracted = useRef(false);
  const lastInteraction = useRef(0);
  const autoplayTimeout = useRef<ReturnType<typeof setTimeout>>();

  const effectiveVisible = compact ? true : isVisible;

  // Click handler for sidebar navigation
  const handleScreenChange = useCallback((index: number) => {
    setActiveScreen(index);
    userInteracted.current = true;
    lastInteraction.current = Date.now();
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

  // Smart autoplay: pauses on user interaction, resumes after idle
  useEffect(() => {
    if (!effectiveVisible) return;

    let cancelled = false;

    const cycle = (screenIndex: number) => {
      if (cancelled) return;

      // If user recently interacted, check idle time
      if (userInteracted.current) {
        const idle = Date.now() - lastInteraction.current;
        if (idle < AUTOPLAY_RESUME_DELAY) {
          // Check again in 2 seconds
          autoplayTimeout.current = setTimeout(() => cycle(screenIndex), 2000);
          return;
        }
        // Idle long enough, resume autoplay from current screen
        userInteracted.current = false;
      }

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
                Beta
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] text-gray-700 font-medium">Gokstad Akademiet</div>
              <Moon className="w-3.5 h-3.5 text-gray-400" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e94f37] to-[#d4432d] flex items-center justify-center text-white text-[9px] font-bold">AM</div>
            </div>

            {/* Content area */}
            <div className="flex-1 p-4 overflow-hidden flex flex-col" style={{ background: "#f8f8f8" }}>
              <div key={activeScreen} className="flex-1 flex flex-col" style={{ animation: 'dashScreenIn 0.5s ease-out' }}>
                {activeScreen === 0 && <DashboardScreen />}
                {activeScreen === 1 && <StreamerExplorerScreen />}
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
