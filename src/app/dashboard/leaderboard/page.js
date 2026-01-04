"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Medal, Search, Trophy, Loader2 } from "lucide-react";

export default function LeaderboardPage() {
  const [rankings, setRankings] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // --- 1. THE SECURITY GUARD ---
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/onboarding"); // Kick out if not logged in
      } else {
        try {
          // --- 2. FETCH REAL LEADERBOARD DATA ---
          const q = query(
            collection(db, "users"),
            orderBy("impactScore", "desc"),
            limit(20)
          );
          const querySnapshot = await getDocs(q);
          const fetchedRankings = querySnapshot.docs.map((doc, index) => ({
            rank: index + 1,
            name: doc.data().displayName,
            score: doc.data().impactScore,
            stream: doc.data().dept || "CSE",
            email: doc.data().email,
          }));

          setRankings(fetchedRankings);
          
          // Find the current logged-in user in the list for the top card
          const current = fetchedRankings.find((u) => u.email === user.email);
          setCurrentUserData(current);
          
          setLoading(false);
        } catch (error) {
          console.error("Leaderboard Error:", error);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  // --- 3. LOADING SCREEN (Prevents UI Leaks) ---
  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Global Leaderboard</h2>
        <p className="text-gray-500 text-sm">See how your impact score stacks up against the community.</p>
      </header>

      {/* User's Current Rank Card */}
      {currentUserData && (
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-60"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy size={32} className="text-purple-600" />
              <div>
                <p className="text-sm font-semibold text-gray-700">Your Current Rank</p>
                <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  #{currentUserData.rank}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700">Your Score</p>
              <span className="text-2xl font-bold text-gray-900">{currentUserData.score} XP</span>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-sm">
        <Search size={20} className="text-gray-400" />
        <input
          type="search"
          placeholder="Search by name or stream..."
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

        {rankings.map((user) => (
          <LeaderboardRow key={user.rank} user={user} currentEmail={auth.currentUser?.email} />
        ))}
      </div>
    </div>
  );
}

function LeaderboardRow({ user, currentEmail }) {
  const isCurrentUser = user.email === currentEmail;
  const highlightClass = isCurrentUser
    ? "bg-purple-50/70 border-l-4 border-purple-500 font-bold"
    : "hover:bg-gray-50/70";

  const rankIcon = user.rank <= 3 ? (
    <Medal size={20} className={user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-700"} />
  ) : (
    <span className="text-gray-500 text-sm">{`#${user.rank}`}</span>
  );

  return (
    <div className={`grid grid-cols-4 items-center p-4 border-b border-gray-100 transition-all ${highlightClass}`}>
      <div className="col-span-1 pl-4 flex items-center gap-2">
        {rankIcon}
      </div>
      <div className="col-span-2">
        <p className={isCurrentUser ? "text-gray-900" : "text-gray-800"}>{user.name}</p>
        <p className="text-xs text-gray-500">{user.stream}</p>
      </div>
      <div className="text-right pr-4">
        <span className={isCurrentUser ? "text-purple-600" : "text-gray-800"}>{user.score}</span>
      </div>
    </div>
  );
}