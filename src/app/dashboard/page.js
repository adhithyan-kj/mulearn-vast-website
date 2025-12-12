"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for task cards
const mockTasks = [
  {
    id: 101,
    title: "Github Basics Setup",
    desc: "Set up a repository and commit your first change.",
    category: "Tech",
    difficulty: "Easy",
    score: 25,
  },
  {
    id: 102,
    title: "Financial Literacy Report",
    desc: "Summarize key personal finance concepts.",
    category: "Social Impact",
    difficulty: "Medium",
    score: 75,
  },
  {
    id: 103,
    title: "MuLearn Promo Video",
    desc: "Create a 30-second promotional video for the club.",
    category: "Creative",
    difficulty: "Hard",
    score: 150,
  },
];

// --- 3.1 Tab 1 - Lobby Component ---
const Lobby = () => (
  <div className="space-y-6">
    [cite_start]{/* Dynamic Message Panel. [cite: 26] */}
    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md">
      <p className="font-semibold text-yellow-800">Dynamic Message Panel:</p>
      <p className="text-sm text-yellow-700">
        Welcome back, Adithyan! Check out the new Finance Basics task in the
        Task Library.
      </p>
    </div>
    [cite_start]{/* Impact Score Alert [cite: 27] */}
    <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded-lg shadow-md">
      <h3 className="text-lg font-bold text-green-800">Impact Score Alert!</h3>
      [cite_start]
      {/* Alerts when they cross milestones (e.g., 100, 250, 500). [cite: 28] */}
      <p className="text-green-700">
        🎉 Congratulations! You crossed the **500 Impact Score** milestone! Keep
        making impact.
      </p>
    </div>
    {/* Next upcoming task courasel (Mock) */}
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-3 text-purple-700">
        Upcoming Task Focus
      </h3>
      <div className="flex space-x-4 overflow-x-auto p-2">
        <div className="flex-shrink-0 w-48 h-24 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-center text-sm font-medium">
          Next: Finance Basics
        </div>
        <div className="flex-shrink-0 w-48 h-24 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-center text-sm font-medium">
          Next: Video Editing 101
        </div>
        <div className="flex-shrink-0 w-48 h-24 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-center text-sm font-medium">
          Next: Advanced React
        </div>
      </div>
    </div>
  </div>
);

// --- 3.2 Tab 2 - Task Library Component ---
const TaskLibrary = () => {
  return (
    <div className="space-y-4">
      [cite_start]
      <h2 className="text-2xl font-bold text-gray-800">Task Repository</h2>{" "}
      {/* A structured repository of all skill and impact tasks. [cite: 30] */}
      {mockTasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition duration-200"
        >
          [cite_start]
          <h3 className="text-xl font-semibold text-purple-700">
            {task.title}
          </h3>{" "}
          {/* Task Title + Description [cite: 32] */}
          <p className="text-gray-600 mb-2 text-sm">{task.desc}</p>
          <div className="flex flex-wrap items-center text-xs space-x-4 mt-2">
            [cite_start]
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {task.category}
            </span>{" "}
            {/* Category (tech, creative, social impact, etc.) [cite: 33] */}
            [cite_start]
            <span className="text-gray-500">
              Difficulty: {task.difficulty}
            </span>{" "}
            {/* Difficulty Level [cite: 34] */}
            [cite_start]
            <span className="text-green-600 font-bold">
              Impact Score: {task.score}
            </span>{" "}
            {/* Impact Score awarded [cite: 35] */}
          </div>
          {/* Link to Detailed Task Page */}
          <Link
            href={`/dashboard/tasks/${task.id}`}
            className="mt-3 inline-block text-purple-600 font-medium hover:underline text-sm"
          >
            View Details &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
};

// --- 3.3 Tab 3 - Leaderboard Component ---
const Leaderboard = () => (
  <div className="p-4 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h2>
    [cite_start]
    <p className="text-lg font-medium text-purple-700 mb-3">
      Top 5 Performers (Mock)
    </p>{" "}
    {/* Top 5 performers automatically get highlighted [cite: 47] */}
    [cite_start]{/* Weekly, Monthly, and All-time rankings [cite: 46] */}
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              All-time Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="bg-yellow-50 font-bold">
            <td className="px-6 py-4 whitespace-nowrap text-sm">#1</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
              Adithyan (You)
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">525</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">#2</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">Deepak S.</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">480</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">#3</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">Fathima R.</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">455</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">#4</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">Anagha S.</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">390</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm">#5</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">Vivek K.</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">370</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mt-6 text-sm italic text-gray-500">
      [cite_start]Note: Leaderboard updates every 6 hours [cite: 63]
      [cite_start]and will auto-sync with Instagram Stories (Automation feature
      to be integrated). [cite: 47, 64]
    </p>
  </div>
);

[cite_start]; // Main Dashboard Component [cite: 24]
export default function DashboardPage() {
  // Use state to manage which tab is active
  const [activeTab, setActiveTab] = useState("lobby");

  const renderContent = () => {
    switch (activeTab) {
      case "lobby":
        return <Lobby />;
      case "tasks":
        return <TaskLibrary />;
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        // Link to the separate Profile page component/route
        return (
          <div className="p-8 bg-white rounded-lg shadow text-center">
            <h3 className="text-xl font-semibold mb-4">Go to your Profile</h3>
            <Link
              href="/dashboard/profile"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            >
              View My Profile &rarr;
            </Link>
          </div>
        );
      default:
        return <Lobby />;
    }
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition duration-200 
        ${
          activeTab === id
            ? "bg-white text-purple-700 border-b-2 border-purple-700"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          MuLearn VAST Dashboard
        </h1>
        <p className="text-gray-500">Re-engineering your campus impact.</p>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 flex space-x-4 overflow-x-auto">
        [cite_start]
        <TabButton id="lobby" label="🏠 Lobby" /> {/* Tab 1-Lobby [cite: 25] */}
        [cite_start]
        <TabButton id="tasks" label="📚 Task Library" />{" "}
        {/* Tab 2 - Task Library [cite: 29] */}
        [cite_start]
        <TabButton id="leaderboard" label="🏆 Leaderboard" />{" "}
        {/* Tab 3 - Leaderboard [cite: 45] */}
        [cite_start]
        <TabButton id="profile" label="👤 Profile" />{" "}
        {/* Tab 4 Profile [cite: 48] */}
      </div>

      {/* Content Area */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg min-h-[60vh]">
        {renderContent()}
      </div>
    </div>
  );
}
