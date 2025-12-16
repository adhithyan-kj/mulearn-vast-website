// src/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // --- START MOCK LOGIN LOGIC ---
    // Simulate a network delay (800ms)
    setTimeout(() => {
      console.log("Mock Login Success! Redirecting to dashboard...");
      // Joise: When we implement real auth later, replace this line with API call.
      router.push("/dashboard");
    }, 800);
    // --- END MOCK LOGIN LOGIC ---
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-dark p-4">
      {/* Background decoration: Dark/Cyan Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[128px]"></div>
      </div>

      <div className="bg-card-bg p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Mulearn VAST</h1>
          <p className="text-text-muted">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="student@vast.edu"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-primary text-white hover:text-black font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-soft disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-text-muted">
          Don't have an account?
          <Link
            href="/signup"
            className="text-primary cursor-pointer hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
