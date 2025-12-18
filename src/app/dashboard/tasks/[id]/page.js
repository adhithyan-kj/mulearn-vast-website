"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  ArrowLeft,
  Zap,
  Trophy,
  Clock,
  Loader2,
  Pencil,
  Check,
  X,
} from "lucide-react";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State for Editing
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Check Admin Role
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Fetch Task
    const fetchTask = async () => {
      try {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTask(docSnap.data());
          setFormData(docSnap.data()); // Initialize form data
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

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save to Firebase
  const handleSave = async () => {
    try {
      const docRef = doc(db, "tasks", id);
      await updateDoc(docRef, formData);
      setTask(formData); // Update UI
      setIsEditing(false); // Exit edit mode
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
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
        {/* Title & Category Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
          <div className="w-full">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg text-sm"
                  placeholder="Category (e.g. Frontend)"
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

          {/* XP Score Badge */}
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

        {/* Description */}
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

        {/* Info Grid */}
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

      {/* Start Button Section (Hidden while editing) */}
      {!isEditing && (
        <div className="bg-purple-50 border border-purple-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-purple-900">
              Ready to start this challenge?
            </h3>
            <p className="text-purple-700 opacity-80 text-sm">
              Submit your proof of work once completed to claim your XP.
            </p>
          </div>
          <button className="w-full md:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95">
            Start Task
          </button>
        </div>
      )}
    </div>
  );
}

// Simple Helper Component
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
