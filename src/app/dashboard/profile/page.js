"use client";

import Link from "next/link";

// Mock Data for the Profile Status
const mockUserProfile = {
  name: "Adithyan K.J.",
  department: "Computer Science, Batch 2024",
  currentImpactScore: 525, // Current Impact Score [cite: 50]
  tasksCompleted: 8, // Tasks Completed [cite: 51]
  studentsMentored: 3, // How Many Students They Have Mentored [cite: 52]
  leaderboardPosition: 1, // Leaderboard Position [cite: 53]
  badgesEarned: [
    // Special Badges Earned [cite: 54]
    { name: "First Commit", icon: "⭐" },
    { name: "Code Contributor", icon: "💻" },
    { name: "Team Leader", icon: "🤝" },
    { name: "500 Score", icon: "💯" },
  ],
};

// Reusable card component for metrics
const MetricCard = ({
  icon,
  title,
  value,
  colorClass = "bg-purple-100 text-purple-800",
}) => (
  <div
    className={`p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center ${colorClass}`}
  >
    <span className="text-4xl mb-2">{icon}</span>
    <p className="text-xs font-medium uppercase text-gray-600">{title}</p>
    <h3 className="text-3xl font-bold">{value}</h3>
  </div>
);

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <Link
        href="/dashboard"
        className="text-purple-600 hover:underline mb-6 inline-block font-medium"
      >
        &larr; Back to Dashboard
      </Link>

      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
        {/* Header Section */}
        <div className="flex items-center space-x-6 border-b pb-6 mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
            {mockUserProfile.name.charAt(0)}
          </div>
          <div>
            {/* Displays: [cite: 49] */}
            <h1 className="text-3xl font-bold text-gray-900">
              {mockUserProfile.name}
            </h1>
            <p className="text-md text-purple-600">
              {mockUserProfile.department}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <MetricCard
            icon="💯"
            title="Impact Score"
            value={mockUserProfile.currentImpactScore} // Current Impact Score [cite: 50]
            colorClass="bg-green-100 text-green-800"
          />
          <MetricCard
            icon="✅"
            title="Tasks Completed"
            value={mockUserProfile.tasksCompleted} // Tasks Completed [cite: 51]
            colorClass="bg-blue-100 text-blue-800"
          />
          <MetricCard
            icon="🧑‍🤝‍🧑"
            title="Students Mentored"
            value={mockUserProfile.studentsMentored} // How Many Students They Have Mentored [cite: 52]
            colorClass="bg-yellow-100 text-yellow-800"
          />
          <MetricCard
            icon="👑"
            title="Leaderboard Rank"
            value={`#${mockUserProfile.leaderboardPosition}`} // Leaderboard Position [cite: 53]
            colorClass="bg-red-100 text-red-800"
          />
        </div>

        {/* Badges Section */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-t pt-6">
          Special Badges Earned
        </h2>
        <div className="flex flex-wrap gap-4">
          {mockUserProfile.badgesEarned.map((badge, index) => (
            <div
              key={index}
              className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-full shadow-sm"
            >
              <span className="text-xl mr-2">{badge.icon}</span>
              <span className="font-medium text-sm text-gray-700">
                {badge.name}
              </span>{" "}
              {/* Special Badges Earned [cite: 54] */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
