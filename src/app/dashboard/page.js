"use client";

import { useState } from "react";
import Link from "next/link";

const mockTasks = [
  {
    id: 101,
    title: "Github Basics Setup",
    desc: "Create a repo and push code.",
    category: "Tech",
    difficulty: "Easy",
    score: 25,
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: 102,
    title: "Financial Literacy",
    desc: "Summarize finance concepts.",
    category: "Social",
    difficulty: "Medium",
    score: 75,
    color: "bg-green-50 text-green-700 border-green-200",
  },
  {
    id: 103,
    title: "Promo Video Creation",
    desc: "Make a 30s promo reel.",
    category: "Creative",
    difficulty: "Hard",
    score: 150,
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

const Lobby = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Welcome Banner */}
    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200">
      <h2 className="text-2xl font-bold mb-2">Welcome back, Adithyan! 🚀</h2>
      <p className="opacity-90">
        You have 2 pending tasks and 1 mentor request. Let's make some impact
        today.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dynamic Message Panel */}
      <div className="p-6 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-xl">📢</span> Updates
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          New "Finance Basics" task added to the library. Check it out to boost
          your social impact score!
        </p>
      </div>

      {/* Impact Score Alert */}
      <div className="p-6 bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-md transition-all">
        <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
          <span className="text-xl">🔥</span> Impact Streak
        </h3>
        <p className="text-sm text-gray-600">
          You just crossed the{" "}
          <span className="font-bold text-green-600">500 Point Milestone</span>.
          Keep the momentum going!
        </p>
      </div>
    </div>
  </div>
);

const TaskLibrary = () => (
  <div className="space-y-4 animate-fade-in">
    <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">
      Available Tasks
    </h2>
    {mockTasks.map((task) => (
      <div
        key={task.id}
        className="group p-5 bg-white/70 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold border ${task.color} bg-opacity-50`}
              >
                {task.category}
              </span>
              <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                {task.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{task.desc}</p>
          </div>
          <div className="text-right">
            <span className="block text-xl font-extrabold text-gray-800">
              {task.score}
            </span>
            <span className="text-xs text-gray-400">Points</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          <Link
            href={`/dashboard/tasks/${task.id}`}
            className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
          >
            View Details <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>
    ))}
  </div>
);

// Leaderboard component placeholder
const Leaderboard = () => (
  <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50 animate-fade-in">
    <div className="text-center py-10">
      <div className="text-4xl mb-3">🏆</div>
      <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>
      <p className="text-gray-500 text-sm">Rankings update every 6 hours.</p>
    </div>
  </div>
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("lobby");

  const tabs = [
    { id: "lobby", label: "Lobby", icon: "🏠" },
    { id: "tasks", label: "Tasks", icon: "📚" },
    { id: "leaderboard", label: "Ranks", icon: "🏆" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 pb-20">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Overview</p>
        </div>
      </header>

      {/* Modern Navigation Tabs */}
      <div className="flex p-1 bg-white/40 backdrop-blur-md rounded-xl mb-8 border border-white/40 overflow-x-auto">
        {tabs.map((tab) =>
          tab.id === "profile" ? (
            <Link
              key={tab.id}
              href="/dashboard/profile"
              className="flex-1 min-w-[80px] py-2.5 text-sm font-medium rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white/50 transition-all text-center"
            >
              <span className="mr-1">{tab.icon}</span> {tab.label}
            </Link>
          ) : (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2
                    ${
                      activeTab === tab.id
                        ? "bg-white text-purple-700 shadow-sm ring-1 ring-black/5"
                        : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                    }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          )
        )}
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === "lobby" && <Lobby />}
        {activeTab === "tasks" && <TaskLibrary />}
        {activeTab === "leaderboard" && <Leaderboard />}
      </div>
    </div>
  );
}
