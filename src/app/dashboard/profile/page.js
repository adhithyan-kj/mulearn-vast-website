"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { db, auth } from "@/lib/firebase"; // Added auth
import { onAuthStateChanged } from "firebase/auth"; // Added for security
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Mail,
  Zap,
  Trophy,
  TrendingUp,
  GraduationCap,
  Loader2,
  Check,
  X,
  Edit2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Default to true for security
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // --- THE SECURITY GUARD: Verified Session Listener ---
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // No valid token? Redirect instantly to onboarding
        router.replace("/onboarding");
      } else {
        try {
          // Fetch real data from Firestore using the verified email
          const userRef = doc(db, "users", user.email);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData(data);
            setNewName(data.displayName);
          }
          setLoading(false); // Reveal the UI only after verification
        } catch (error) {
          console.error("Error fetching profile:", error);
          router.replace("/onboarding");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      // Use auth.currentUser to ensure we update the correct user
      const userRef = doc(db, "users", auth.currentUser.email);
      await updateDoc(userRef, { displayName: newName });

      setUserData({ ...userData, displayName: newName });

      // Update localStorage so the Sidebar name updates immediately
      const localUser = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...localUser, displayName: newName })
      );

      setIsEditing(false);
    } catch (error) {
      alert("Error updating name. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // --- THE LOADING SCREEN: Prevents URL Bypass ---
  if (loading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-purple-600 mb-4" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 pb-10 px-2 md:px-0 animate-fade-in">
      <header className="text-center md:text-left transition-all duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
          User Profile
        </h2>
        <p className="text-gray-500 text-xs md:text-sm italic">
          Your progress is your legacy
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Identity Box */}
        <div className="lg:col-span-5 xl:col-span-4 transition-all duration-300 hover:-translate-y-1">
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center md:items-start">
            <div className="relative mb-6 group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {userData?.displayName?.[0] || "U"}
              </div>
            </div>

            <div className="w-full mb-6 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border border-purple-200 rounded-xl font-bold text-gray-900 outline-none text-center md:text-left shadow-inner bg-white/50"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveName}
                      disabled={saving}
                      className="flex-1 py-2 bg-green-500 text-white rounded-lg flex justify-center hover:bg-green-600 transition-colors"
                    >
                      {saving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setNewName(userData.displayName);
                      }}
                      className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg flex justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group relative">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2 justify-center md:justify-start">
                    {userData?.displayName}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-gray-300 hover:text-purple-600 transition-all hover:scale-110"
                    >
                      <Edit2 size={16} />
                    </button>
                  </h3>
                  <p className="text-purple-600 font-bold text-[10px] uppercase tracking-wider">
                    {userData?.role || "Student Member"}
                  </p>
                </div>
              )}
            </div>

            <div className="w-full space-y-4 pt-4 border-t border-gray-100">
              <ContactRow icon={<Mail size={16} />} label="Email" value={userData?.email} />
              <ContactRow icon={<GraduationCap size={16} />} label="Dept" value={userData?.dept} />
            </div>
          </div>
        </div>

        {/* Stats and Info Section */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={<Zap size={20} />}
              label="Impact Score"
              value={userData?.impactScore ?? 0}
              desc="Total XP earned"
              color="text-purple-600 bg-purple-100"
            />
            <StatCard
              icon={<Trophy size={20} />}
              label="Global Rank"
              value={`#${userData?.globalRank || "--"}`}
              desc="Community standing"
              color="text-emerald-600 bg-emerald-100"
            />
            <StatCard
              icon={<TrendingUp size={20} />}
              label="Tasks Done"
              value={userData?.tasksCompleted ?? 0}
              desc="Completed projects"
              color="text-blue-600 bg-blue-100"
            />
          </div>

          <div className="bg-white/60 backdrop-blur-md border border-white/80 p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl group-hover:rotate-12 transition-transform duration-500">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-base font-bold text-gray-900 tracking-tight">Level up your profile</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                  Unlock hidden statistics and climb the global ranks by finishing tasks from the community.
                </p>
              </div>
            </div>

            <Link href="/dashboard/tasks" className="w-full md:w-auto">
              <button className="w-full px-6 py-3 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 hover:gap-3 transition-all shadow-md active:scale-95">
                Browse Tasks
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HELPER COMPONENTS (Maintained)
// ----------------------------------------------------

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 group/row transition-all duration-200 hover:pl-1">
      <div className="p-1.5 bg-gray-50 rounded-lg text-gray-400 group-hover/row:bg-purple-50 group-hover/row:text-purple-500 transition-colors">
        {icon}
      </div>
      <div className="text-left overflow-hidden">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xs font-semibold text-gray-700 truncate">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, color, desc }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-5 rounded-3xl shadow-sm flex flex-col items-start hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group cursor-default h-full">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-black text-gray-900 italic leading-tight">{value}</p>
        <p className="text-[9px] text-gray-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}