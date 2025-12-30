"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ListChecks, Loader2, Plus, Trash2 } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function TaskLibraryPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // 1. Check if user is Admin
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const isAdmin = user?.role === "admin";

  // 2. Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 3. Admin Function: Add Task
  const handleAddTask = async (taskData) => {
    try {
      // Proves you are the real Admin to the Firestore Rules
      await addDoc(collection(db, "tasks"), {
        ...taskData,
        adminKey: process.env.NEXT_PUBLIC_ADMIN_KEY,
        createdAt: serverTimestamp(),
      });

      alert("Task added successfully!");
    } catch (error) {
      // This catches the 'permission-denied' error sent by the server
      if (
        error.code === "permission-denied" ||
        error.message.includes("permissions")
      ) {
        const msg =
          "Nice try! Server-side verification is now active. Your client-side tricks won't work here. 😉. poyitt pinne vaa";

        console.warn(msg);
        alert(msg);
      } else {
        console.error("Error adding task:", error);
        alert("Failed to add task: " + error.message);
      }
    }
  };

  // 4. Admin Function: Delete Task
  const handleDeleteTask = async (taskId, e) => {
    e.preventDefault(); // Stop link click
    if (confirm("Are you sure you want to delete this task?")) {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Task Library
          </h2>
          <p className="text-gray-500 text-sm">
            Find projects to boost your Impact Score.
          </p>
        </div>

        {/* ADMIN ONLY BUTTON */}
        {isAdmin && (
          <button
            onClick={handleAddTask}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-purple-700 transition-all"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        )}
      </header>

      {/* Filter and Search Bar */}
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

      {loading ? (
        <div className="flex h-64 items-center justify-center text-purple-600">
          <Loader2 className="animate-spin" size={40} />
          <span className="ml-2 font-medium text-gray-500">
            Loading your tasks...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isAdmin={isAdmin}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Updated TaskCard with Admin Controls
function TaskCard({ task, isAdmin, onDelete }) {
  return (
    <Link
      href={`/dashboard/tasks/${task.id}`}
      className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
    >
      {/* Admin Delete Button */}
      {isAdmin && (
        <button
          onClick={(e) => onDelete(task.id, e)}
          className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-200"
        >
          <Trash2 size={16} />
        </button>
      )}

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

      <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
        {task.desc}
      </p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-gray-800">{task.score}</span>
          <span className="text-xs text-gray-400 font-medium">XP</span>
        </div>
        <div className="text-sm font-semibold text-white bg-purple-600 px-5 py-2 rounded-xl shadow-lg transition-all duration-200">
          View
        </div>
      </div>
    </Link>
  );
}
