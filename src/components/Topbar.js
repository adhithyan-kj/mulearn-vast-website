// src/components/Topbar.js
import { Bell, Search } from "lucide-react";

export default function Topbar({ title = "Dashboard" }) {
  return (
    // Topbar uses light glass style and shadows
    <header className="fixed top-0 left-[280px] right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-8 flex justify-between items-center shadow-md">
      {/* Dynamic Title */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        {title}
      </h1>

      {/* Right Actions */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100/70 rounded-full px-4 py-2 border border-transparent focus-within:border-purple-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={22} />
          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">Jane Doe</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
          {/* Profile Picture Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-white shadow-md flex items-center justify-center text-purple-600 font-bold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
}
