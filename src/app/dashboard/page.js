// src/app/dashboard/page.js
"use client";

import Link from "next/link";
import { Zap, CheckCircle, Award, ListChecks, ArrowRight } from "lucide-react"; // Added ArrowRight and ListChecks for recommended tasks

// ----------------------------------------------------
// 1. MAIN COMPONENT (Dashboard Layout)
// ----------------------------------------------------

export default function DashboardPage() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* 💥 Section 1: Welcome Banner (Refined Shadow and Glow) */}
      <WelcomeBanner name="Adithyan" />

      {/* 2. Overview Section */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Your Impact Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Total Impact Score"
            value="3,200"
            icon={<Zap size={24} />}
            gradient="from-purple-600 to-indigo-500"
          />
          <StatCard
            label="Tasks Completed"
            value="12"
            icon={<CheckCircle size={24} />}
            gradient="from-blue-600 to-cyan-500"
          />
          <StatCard
            label="Global Rank"
            value="#42"
            icon={<Award size={24} />}
            gradient="from-emerald-500 to-green-600"
          />
        </div>
      </section>

      {/* 3. Current Path Progress */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Path</h2>
        <ProgressCard
          progress={40}
          path="Frontend Developer Path"
          level="Level 4 - React Fundamentals"
        />
      </section>

      {/* 4. Recommended Tasks (Using the TaskCard style) */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recommended Tasks</h2>
          <Link
            href="/dashboard/tasks"
            className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1"
          >
            View All Tasks <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskCard
            title="Build a Resume Site"
            difficulty="EASY"
            score="150"
            desc="Create a responsive portfolio using HTML & CSS basics."
            tagColor="bg-green-100 text-green-700 border-green-200"
          />
          <TaskCard
            title="JS Calculator"
            difficulty="MEDIUM"
            score="300"
            desc="Build a functional calculator with DOM manipulation."
            tagColor="bg-yellow-100 text-yellow-700 border-yellow-200"
          />
          <TaskCard
            title="Weather API App"
            difficulty="HARD"
            score="500"
            desc="Fetch data from a public API and display weather info."
            tagColor="bg-red-100 text-red-700 border-red-200"
          />
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------
// 2. HELPER COMPONENTS
// ----------------------------------------------------

// Welcome Banner component
function WelcomeBanner({ name }) {
  return (
    <div className="p-8 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl border border-white/70 relative overflow-hidden group">
      {/* Subtle Glowing Background Effect */}
      <div className="absolute top-[-20px] left-[-20px] w-48 h-48 bg-purple-300/30 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="absolute bottom-[-20px] right-[-20px] w-48 h-48 bg-blue-300/30 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Hello,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
            {name}!
          </span>{" "}
          🚀
        </h2>
        <p className="text-gray-600 mb-4 max-w-lg">
          You are currently ranked **#42**. Keep completing tasks to climb the
          leaderboard!
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/dashboard/tasks"
            className="px-5 py-2.5 bg-purple-600 text-white text-sm font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200/50"
          >
            Start New Task
          </Link>
          <Link
            href="/dashboard/leaderboard"
            className="px-5 py-2.5 bg-white text-gray-700 text-sm font-bold rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors shadow-md"
          >
            View Ranks
          </Link>
        </div>
      </div>
    </div>
  );
}

// Stats Card
function StatCard({ label, value, icon, gradient }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p
            className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
          >
            {value}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-purple-600 shadow-inner group-hover:bg-purple-100 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  );
}

// Progress Card
function ProgressCard({ progress, path, level }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-300/30 transition-all duration-700"></div>

      <div className="flex justify-between items-end mb-4 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{path}</h3>
          <p className="text-sm text-gray-500 mt-1">{level}</p>
        </div>
        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          {progress}%
        </span>
      </div>

      {/* Glassy Progress Bar */}
      <div className="w-full bg-gray-200/50 rounded-full h-4 overflow-hidden backdrop-blur-sm">
        <div
          className="bg-gradient-to-r from-purple-600 to-blue-500 h-full rounded-full shadow-inner shadow-purple-300 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// TaskCard (Used for Recommended Tasks section)
function TaskCard({ title, difficulty, score, desc, tagColor }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
          {title}
        </h4>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full border ${tagColor}`}
        >
          {difficulty}
        </span>
      </div>

      <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
        {desc}
      </p>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-gray-800">{score}</span>
          <span className="text-xs text-gray-400 font-medium">XP</span>
        </div>
        <button className="text-sm font-semibold text-white bg-gray-900 px-5 py-2 rounded-xl shadow-lg hover:bg-purple-600 hover:shadow-purple-200 transition-all duration-200 transform active:scale-95">
          Start Task
        </button>
      </div>
    </div>
  );
}
