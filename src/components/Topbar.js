"use client";
import { Bell, Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";

// Accept prop to toggle sidebar
export default function Topbar({ title = "Dashboard", setMobileOpen }) {
  const [user, setUser] = useState({ displayName: "Guest", role: "Visitor" });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <header className="fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 md:px-8 flex justify-between items-center shadow-md transition-all duration-300 left-0 md:left-[280px]">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        {/* Dynamic Title */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3 md:space-x-6">
        {/* Search Bar (Hidden on small mobile) */}
        <div className="hidden sm:flex items-center bg-gray-100/70 rounded-full px-4 py-2 border border-transparent focus-within:border-purple-300 focus-within:bg-white transition-all">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-24 md:w-48 text-gray-700 placeholder-gray-400"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">
              {user.displayName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 border-2 border-white shadow-md flex items-center justify-center text-purple-600 font-bold">
            {user.displayName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
