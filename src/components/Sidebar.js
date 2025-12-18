"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  User,
  Trophy,
  LogOut,
  X,
} from "lucide-react";

// Accept props for mobile control
export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remove user data
    localStorage.removeItem("user");
    // 2. Redirect to Onboarding
    router.push("/onboarding");
  };

  const isActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay (Backdrop) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-glass z-50 flex flex-col transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo Area */}
        <div className="p-8 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              M
            </div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
              Mulearn
            </h2>
          </div>
          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-6 space-y-2">
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={isActive("/dashboard")}
            onClick={() => setMobileOpen(false)}
          />
          <NavItem
            href="/dashboard/tasks"
            icon={<ListChecks size={20} />}
            label="Task Library"
            active={isActive("/dashboard/tasks")}
            onClick={() => setMobileOpen(false)}
          />
          <NavItem
            href="/dashboard/profile"
            icon={<User size={20} />}
            label="Profile"
            active={isActive("/dashboard/profile")}
            onClick={() => setMobileOpen(false)}
          />
          <NavItem
            href="/dashboard/leaderboard"
            icon={<Trophy size={20} />}
            label="Leaderboard"
            active={isActive("/dashboard/leaderboard")}
            onClick={() => setMobileOpen(false)}
          />
        </nav>

        {/* Logout Button (Working) */}
        <div className="p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-200 group"
          >
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ href, icon, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
