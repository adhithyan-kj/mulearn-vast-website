// src/components/Sidebar.js
"use client"; // CRITICAL: Must be a client component to use hooks

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  User,
  Trophy,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  // Helper function to check if the current path matches the nav item's href
  const isActive = (href) => {
    // The dashboard root should only be active on the exact path
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    // For other paths, check if the current pathname starts with the item's href (for nested routes)
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed top-0 left-0 h-full w-[280px] bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-glass z-50 flex flex-col">
      {/* Logo Area */}
      <div className="p-8 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
          M
        </div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
          Mulearn VAST
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-6 space-y-2">
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          active={isActive("/dashboard")}
        />
        <NavItem
          href="/dashboard/tasks"
          icon={<ListChecks size={20} />}
          label="Task Library"
          active={isActive("/dashboard/tasks")}
        />
        <NavItem
          href="/dashboard/profile"
          icon={<User size={20} />}
          label="Profile"
          active={isActive("/dashboard/profile")}
        />
        <NavItem
          href="/dashboard/leaderboard"
          icon={<Trophy size={20} />}
          label="Leaderboard"
          active={isActive("/dashboard/leaderboard")}
        />
      </nav>

      {/* Logout Button */}
      <div className="p-6 mt-auto">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group">
          <LogOut
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 
      ${
        active
          ? "bg-purple-50 text-purple-700 shadow-sm border border-purple-100"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <span className={active ? "text-purple-600" : "text-gray-400"}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
