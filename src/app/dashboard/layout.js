// src/app/dashboard/layout.js
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

// Helper function to map paths to human-readable titles
const getTitleFromPath = (pathname) => {
  // Check for exact paths first
  if (pathname === "/dashboard") return "Dashboard Overview";

  // Check for paths that might have dynamic segments (e.g., /tasks/1)
  if (pathname.startsWith("/dashboard/tasks")) {
    return pathname.split("/").length > 3 ? "Task Details" : "Task Library";
  }
  if (pathname.startsWith("/dashboard/profile")) return "User Profile";
  if (pathname.startsWith("/dashboard/leaderboard"))
    return "Global Leaderboard";

  // Default fallback
  return "Dashboard";
};

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const currentTitle = getTitleFromPath(pathname);

  return (
    <div className="min-h-screen bg-background text-text-dark flex font-sans">
      {/* 1. Fixed Sidebar */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 ml-[280px]">
        {/* Fixed Topbar - Dynamically receiving the title */}
        <Topbar title={currentTitle} />

        {/* Scrollable Page Content - Increased padding to pt-28 for safety */}
        <main className="pt-28 p-8 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
