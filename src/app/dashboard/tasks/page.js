// src/app/dashboard/tasks/page.js
import Link from "next/link";
import { Search, ListChecks } from "lucide-react";

// Mock data for the full library
const mockTasks = [
  {
    id: 1,
    title: "HTML & CSS Resume Site",
    desc: "Build a responsive personal portfolio page.",
    difficulty: "EASY",
    score: 150,
    category: "Frontend",
    tagColor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 2,
    title: "JavaScript Calculator",
    desc: "Implement core logic for basic arithmetic operations.",
    difficulty: "MEDIUM",
    score: 300,
    category: "Frontend",
    tagColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    id: 3,
    title: "REST API Endpoint",
    desc: "Set up a simple Node.js/Express API with three routes.",
    difficulty: "HARD",
    score: 500,
    category: "Backend",
    tagColor: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: 4,
    title: "Python Data Scraper",
    desc: "Use Beautiful Soup to extract data from a static page.",
    difficulty: "MEDIUM",
    score: 400,
    category: "Data Science",
    tagColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    id: 5,
    title: "Intro to Git & GitHub",
    desc: "Complete basic version control workflow (commit, push, pull).",
    difficulty: "EASY",
    score: 100,
    category: "DevOps",
    tagColor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: 6,
    title: "Deploy to Vercel/Netlify",
    desc: "Automate continuous deployment for your resume site.",
    difficulty: "EASY",
    score: 200,
    category: "DevOps",
    tagColor: "bg-green-100 text-green-700 border-green-200",
  },
];

export default function TaskLibraryPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Library</h2>
        <p className="text-gray-500 text-sm">
          Find projects to boost your Impact Score.
        </p>
      </header>

      {/* Filter and Search Bar (Light Glass Style) */}
      <div className="flex items-center space-x-4 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-sm">
        <Search size={20} className="text-gray-400" />
        <input
          type="search"
          placeholder="Search by title, skill (e.g., Python, React), or difficulty..."
          className="flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
        />
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
          <ListChecks size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

// Reused TaskCard Component, styled for Light Glassmorphism
function TaskCard({ task }) {
  return (
    <Link
      href={`/dashboard/tasks/${task.id}`}
      className="bg-white/70 backdrop-blur-md border border-white/60 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
          {task.title}
        </h4>
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full border ${task.tagColor}`}
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
        {/* Placeholder button for visual consistency */}
        <div className="text-sm font-semibold text-white bg-purple-600 px-5 py-2 rounded-xl shadow-lg transition-all duration-200">
          View Details
        </div>
      </div>
    </Link>
  );
}
