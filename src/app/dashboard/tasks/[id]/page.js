"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import {
  ArrowLeft,
  Zap,
  Trophy,
  Clock,
  Loader2,
  Pencil,
  Check,
  X,
  Send,
  Link as LinkIcon,
  Image as ImageIcon,
  ExternalLink,
  CheckCircle2,
  Users,
} from "lucide-react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // --- SUBMISSION STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [links, setLinks] = useState({ drive: "", screenshot: "", other: "" });

  // --- COMPANION & MENTOR STATES ---
  const [findingCompanion, setFindingCompanion] = useState(false);
  const [companion, setCompanion] = useState(null);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchTask = async () => {
      try {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTask(docSnap.data());
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const isAdmin = user?.role === "admin";

  // --- COMPANION DISCOVERY LOGIC ---
  const findCompanion = async () => {
    setFindingCompanion(true);
    try {
      // 1. Mark current user as doing this task
      const myRef = doc(db, "users", user.email);
      await updateDoc(myRef, { currentTaskId: id });

      // 2. Search for others doing the same task
      const q = query(
        collection(db, "users"),
        where("currentTaskId", "==", id),
        where("email", "!=", user.email),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const companionData = querySnapshot.docs[0].data();

        // 3. Link users via companionId
        await updateDoc(myRef, { companionId: companionData.email });
        await updateDoc(doc(db, "users", companionData.email), {
          companionId: user.email,
        });

        setCompanion(companionData);
        alert(
          `Matched with ${companionData.displayName}! You can now collaborate.`
        );
      } else {
        // 4. Fallback: Request Mentor if no peer found
        const proceed = confirm(
          "No other students are doing this task right now. Would you like to request a mentor instead?"
        );
        if (proceed) {
          handleMentorRequest();
        }
      }
    } catch (error) {
      console.error("Companion search error:", error);
      alert("Search failed. Please try again.");
    } finally {
      setFindingCompanion(false);
    }
  };

  // --- MENTOR REQUEST LOGIC ---
  const handleMentorRequest = async () => {
    alert("Mentor request sent! Mentors will be notified via Gmail shortly.");
    // Logic for EmailJS will be added in the next phase
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "tasks", id);

      // --- THE FIX ---
      // We send the secret Admin Key from your .env.local file
      // If this key is missing, the Firestore Rules will block the update
      await updateDoc(docRef, {
        ...formData,
        adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        lastEditedAt: serverTimestamp(), // Tracks when the admin last modified it
      });

      setTask(formData);
      setIsEditing(false);
      alert("Task updated successfully!");
    } catch (error) {
      // This catches the 'permission-denied' error if a hacker tries to edit
      if (
        error.code === "permission-denied" ||
        error.message.includes("permissions")
      ) {
        const msg =
          "Nice try! Server-side verification is now active. Your client-side tricks won't work here. 😉. poyitt pinne vaa";

        console.warn(msg);
        alert(msg);
      } else {
        console.error("Error updating task:", error);
        alert("Failed to update task: " + error.message);
      }
    }
  };

  const handleUpdateTask = async () => {
    try {
      const docRef = doc(db, "tasks", id);

      await updateDoc(docRef, {
        ...formData,
        adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        updatedAt: serverTimestamp(),
      });

      alert("Task updated successfully!");
    } catch (error) {
      if (error.code === "permission-denied") {
        const msg =
          "Nice try! Server-side verification is now active. Your client-side tricks won't work here. 😉. poyitt pinne vaa";
        console.warn(msg);
        alert(msg);
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );
  if (!task) return <div className="p-8">Task not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Admin Controls */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Library
        </button>

        {isAdmin && (
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold"
                >
                  <X size={16} className="mr-2" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold shadow-lg"
                >
                  <Check size={16} className="mr-2" /> Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200"
              >
                <Pencil size={16} className="mr-2" /> Edit Task
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Card */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 rounded-3xl shadow-glass">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="w-full">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Category"
                />
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-2xl font-bold"
                  placeholder="Task Title"
                />
              </div>
            ) : (
              <>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
                  {task.category || "General"}
                </span>
                <h1 className="text-4xl font-extrabold text-gray-900 mt-3">
                  {task.title}
                </h1>
              </>
            )}
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded-2xl text-white text-center shadow-lg min-w-[120px]">
            <p className="text-xs opacity-80 uppercase font-bold">Reward</p>
            {isEditing ? (
              <input
                name="score"
                type="number"
                value={formData.score}
                onChange={handleChange}
                className="text-black w-full mt-1 p-1 rounded text-center font-bold"
              />
            ) : (
              <p className="text-2xl font-black">{task.score} XP</p>
            )}
          </div>
        </div>

        {isEditing ? (
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 border rounded-lg text-gray-600"
            placeholder="Task Description..."
          />
        ) : (
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {task.desc}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/50 p-4 rounded-2xl border border-white/40 flex items-center space-x-4">
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Zap className="text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">
                Difficulty
              </p>
              {isEditing ? (
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="bg-transparent font-bold border-b border-gray-300"
                >
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HARD">HARD</option>
                </select>
              ) : (
                <p className="text-sm font-bold text-gray-800">
                  {task.difficulty}
                </p>
              )}
            </div>
          </div>
          <InfoCard
            icon={<Trophy className="text-purple-500" />}
            label="Category"
            value={task.category}
          />
          <InfoCard
            icon={<Clock className="text-blue-500" />}
            label="Estimated Time"
            value="2-4 Hours"
          />
        </div>
      </div>

      {/* Action Section with Companion Support */}
      {!isEditing && (
        <div className="bg-purple-50 border border-purple-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-purple-900">
              {companion
                ? `Collaborating with ${companion.displayName}`
                : "Ready to start this challenge?"}
            </h3>
            <p className="text-purple-700 opacity-80 text-sm">
              {companion
                ? "Work together, but remember to submit your own proof!"
                : "Find a partner or start solo to claim your XP."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {!companion && (
              <button
                onClick={findCompanion}
                disabled={findingCompanion}
                className="px-6 py-4 bg-white border border-purple-200 text-purple-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-100 transition-all shadow-sm"
              >
                {findingCompanion ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Users size={18} />
                )}
                Find Companion
              </button>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              {companion ? "Submit My Work" : "Start Task"}
            </button>
          </div>
        </div>
      )}

      {/* Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2
                  size={60}
                  className="text-green-500 mx-auto animate-bounce"
                />
                <h3 className="text-2xl font-bold text-gray-900">
                  Work Submitted!
                </h3>
                <p className="text-gray-500">
                  Your mentor will review this soon.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center md:text-left">
                  <h3 className="text-2xl font-black text-gray-900">
                    Proof of Work
                  </h3>
                  <p className="text-gray-500 text-sm italic">
                    Provide links for verification.
                  </p>
                </div>
                <form onSubmit={handleTaskSubmit} className="space-y-5">
                  <ProofInput
                    label="Drive Link (Project)"
                    icon={<LinkIcon size={18} />}
                    placeholder="Link to project files"
                    value={links.drive}
                    onChange={(v) => setLinks({ ...links, drive: v })}
                  />
                  <ProofInput
                    label="Screenshot URL"
                    icon={<ImageIcon size={18} />}
                    placeholder="Link to screenshots"
                    value={links.screenshot}
                    onChange={(v) => setLinks({ ...links, screenshot: v })}
                  />
                  <ProofInput
                    label="Other References"
                    icon={<ExternalLink size={18} />}
                    placeholder="GitHub or Additional links"
                    value={links.other}
                    onChange={(v) => setLinks({ ...links, other: v })}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-purple-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <Send size={18} /> Submit Task
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProofInput({ label, icon, placeholder, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600">
          {icon}
        </div>
        <input
          required
          type="url"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-sm"
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-white/50 p-4 rounded-2xl border border-white/40 flex items-center space-x-4">
      <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase">{label}</p>
        <p className="text-sm font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
