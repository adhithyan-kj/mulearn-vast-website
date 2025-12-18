"use client";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pass state to Sidebar */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Pass state setter to Topbar */}
      <Topbar setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <main className="pt-24 px-4 md:px-8 pb-8 transition-all duration-300 md:ml-[280px]">
        {children}
      </main>
    </div>
  );
}
