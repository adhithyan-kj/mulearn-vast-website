// src/app/dashboard/leaderboard/page.js
import { Medal, Search, Trophy } from "lucide-react";

// Mock data for the Leaderboard
const mockRankings = [
  {
    rank: 1,
    name: "Gautham K.",
    score: 8500,
    stream: "CS 2024",
    highlight: true,
  },
  {
    rank: 2,
    name: "Joise M.",
    score: 7920,
    stream: "EC 2025",
    highlight: false,
  },
  {
    rank: 3,
    name: "Adithyan V.",
    score: 6850,
    stream: "EE 2024",
    highlight: false,
  },
  {
    rank: 4,
    name: "Alan S.",
    score: 6200,
    stream: "ME 2026",
    highlight: false,
  },
  {
    rank: 5,
    name: "Priya L.",
    score: 5880,
    stream: "CS 2025",
    highlight: false,
  },
  {
    rank: 6,
    name: "Nitin R.",
    score: 4500,
    stream: "EC 2026",
    highlight: false,
  },
  {
    rank: 7,
    name: "Sneha B.",
    score: 4100,
    stream: "CE 2024",
    highlight: false,
  },
  // ... more users
];

export default function LeaderboardPage() {
  // Find the current user's rank for display (assuming Adithyan is rank 3)
  const currentUser = mockRankings.find((user) => user.rank === 3);

  return (
    <div className="space-y-8">
      {/* Header and Summary */}
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Global Leaderboard
        </h2>
        <p className="text-gray-500 text-sm">
          See how your impact score stacks up against the community.
        </p>
      </header>

      {/* User's Current Rank Card */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        {/* Decorative Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-60"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Trophy size={32} className="text-purple-600" />
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Your Current Rank
              </p>
              <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                #{currentUser.rank}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">Your Score</p>
            <span className="text-2xl font-bold text-gray-900">
              {currentUser.score} XP
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-sm">
        <Search size={20} className="text-gray-400" />
        <input
          type="search"
          placeholder="Search by name or stream (e.g., CS 2025)..."
          className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-4 p-4 font-bold text-sm text-gray-600 border-b border-gray-100">
          <div className="col-span-1 pl-4">Rank</div>
          <div className="col-span-2">Name & Stream</div>
          <div className="text-right pr-4">Score</div>
        </div>

        {mockRankings.map((user) => (
          <LeaderboardRow key={user.rank} user={user} />
        ))}
      </div>
    </div>
  );
}

// Helper component for each row in the table
function LeaderboardRow({ user }) {
  const isCurrentUser = user.rank === 3; // Highlight the current user (Adithyan)
  const highlightClass = isCurrentUser
    ? "bg-purple-50/70 border-l-4 border-purple-500 font-bold hover:bg-purple-100"
    : "hover:bg-gray-50/70";

  const rankIcon =
    user.rank <= 3 ? (
      <Medal
        size={20}
        className={
          user.rank === 1
            ? "text-yellow-500"
            : user.rank === 2
            ? "text-gray-400"
            : "text-amber-700"
        }
      />
    ) : (
      <span className="text-gray-500 text-sm">{`#${user.rank}`}</span>
    );

  return (
    <div
      className={`grid grid-cols-4 items-center p-4 border-b border-gray-100 transition-all ${highlightClass}`}
    >
      {/* Rank */}
      <div className="col-span-1 pl-4 flex items-center gap-2">
        {rankIcon}
        {user.rank > 3 && (
          <span className={isCurrentUser ? "text-gray-900" : "text-gray-700"}>
            {user.rank}
          </span>
        )}
      </div>

      {/* Name and Stream */}
      <div className="col-span-2">
        <p className={isCurrentUser ? "text-gray-900" : "text-gray-800"}>
          {user.name}
        </p>
        <p className="text-xs text-gray-500">{user.stream}</p>
      </div>

      {/* Score */}
      <div className="text-right pr-4">
        <span className={isCurrentUser ? "text-purple-600" : "text-gray-800"}>
          {user.score}
        </span>
      </div>
    </div>
  );
}
