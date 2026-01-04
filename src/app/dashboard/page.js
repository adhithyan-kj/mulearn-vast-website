"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Zap, CheckCircle, Award, ArrowRight, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // --- THE GATEKEEPER: REAL-TIME AUTH CHECK ---
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        // No valid Google-signed token? Redirect instantly
        router.replace("/onboarding");
      } else {
        try {
          // Verify identity with Firestore using the secure email token
          const userRef = doc(db, "users", authUser.email);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUser(userSnap.data());
            setLoading(false); // Only show the dashboard if user data is found
          } else {
            router.replace("/onboarding");
          }
        } catch (error) {
          console.error("Access verification error:", error);
          router.replace("/onboarding");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Loading Screen: Prevents "Ghost UI" where an unauth user sees the dash
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Verifying Session...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      {/* 💥 Welcome Banner (Real Name from Firestore) */}
      <WelcomeBanner name={user?.displayName?.split(" ")[0] || "Student"} />

      {/* Overview Section (Real Stats) */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Your Impact Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="Total Impact Score" value={user?.impactScore?.toLocaleString() || "0"} icon={<Zap size={24} />} gradient="from-purple-600 to-indigo-500" />
          <StatCard label="Tasks Completed" value={user?.tasksCompleted || "0"} icon={<CheckCircle size={24} />} gradient="from-blue-600 to-cyan-500" />
          <StatCard label="Global Rank" value="#--" icon={<Award size={24} />} gradient="from-emerald-500 to-green-600" />
        </div>
      </section>

      {/* Recommended Tasks */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recommended Tasks</h2>
          <Link href="/dashboard/tasks" className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1">
            View All Tasks <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskCard title="Build a Resume Site" difficulty="EASY" score="150" desc="Create a responsive portfolio using HTML & CSS basics." tagColor="bg-green-100 text-green-700 border-green-200" />
          <TaskCard title="JS Calculator" difficulty="MEDIUM" score="300" desc="Build a functional calculator with DOM manipulation." tagColor="bg-yellow-100 text-yellow-700 border-yellow-200" />
          <TaskCard title="Weather API App" difficulty="HARD" score="500" desc="Fetch data from a public API and display weather info." tagColor="bg-red-100 text-red-700 border-red-200" />
        </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS (Design Identical to your original) ---
function WelcomeBanner({ name }) {
  return (
    <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/70 relative overflow-hidden group">
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Hello, <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">{name}!</span> 🚀</h2>
        <p className="text-gray-600 mb-4 max-w-lg">Your progress is safely synced. Complete more tasks to climb the ranks!</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/dashboard/tasks" className="px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg">Start New Task</Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, gradient }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>{value}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-purple-600">{icon}</div>
      </div>
    </div>
  );
}

function TaskCard({ title, difficulty, score, desc, tagColor }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${tagColor}`}>{difficulty}</span>
      </div>
      <p className="text-gray-500 text-sm mb-6 flex-grow">{desc}</p>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-gray-800">{score}</span>
          <span className="text-xs text-gray-400 font-medium">XP</span>
        </div>
        <button className="text-sm font-semibold text-white bg-gray-900 px-5 py-2 rounded-xl hover:bg-purple-600 transition-all active:scale-95">Start Task</button>
      </div>
    </div>
  );
}