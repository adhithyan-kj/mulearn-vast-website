"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ListChecks, Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase"; // Added auth import
import { onAuthStateChanged } from "firebase/auth"; // Added for security
import { collection, getDocs } from "firebase/firestore";

export default function TaskLibraryPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Always start as true for security
  const router = useRouter();

  useEffect(() => {
    // --- THE SECURITY GUARD: Verified Session Listener ---
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // No valid token? Redirect instantly
        router.replace("/onboarding");
      } else {
        // User is authenticated, now fetch the real data
        try {
          const querySnapshot = await getDocs(collection(db, "tasks"));
          const tasksData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData);
          setLoading(false); // Reveal the UI only after data is ready
        } catch (error) {
          console.error("Error fetching tasks: ", error);
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  // --- THE LOADING SCREEN: Prevents URL Bypass ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Task Library
          </h2>
          <p className="text-gray-500 text-sm">
            Find projects to boost your Impact Score.
          </p>
        </div>
      </header>

      {/* Search Bar remains for student UX */}
      <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-sm">
        <Search size={20} className="text-gray-400" />
        <input
          type="search"
          placeholder="Search by title..."
          className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
          <ListChecks size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <Link
      href={`/dashboard/tasks/${task.id}`}
      className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors pr-6">
          {task.title}
        </h4>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full border ${
            task.tagColor || "bg-gray-100"
          }`}
        >
          {task.difficulty}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed line-clamp-2">
        {task.desc}
      </p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-gray-800">{task.score}</span>
          <span className="text-xs text-gray-400 font-medium">XP</span>
        </div>
        <div className="text-sm font-semibold text-white bg-purple-600 px-5 py-2 rounded-xl shadow-lg transition-all duration-200 group-hover:bg-purple-700">
          View
        </div>
      </div>
    </Link>
  );
}