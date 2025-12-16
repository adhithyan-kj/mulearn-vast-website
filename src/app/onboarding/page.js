"use client";

import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Inside export default function OnboardingPage() { ...

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // <-- Ensure this is also added

  const handleLogin = (e) => {
    // <-- THIS IS THE MISSING FUNCTION
    e.preventDefault();

    if (isLogin) {
      setIsLoading(true);
      // Mock API call delay
      setTimeout(() => {
        router.push("/dashboard"); // Redirect to dashboard
      }, 500);
    }
  };

  // ... rest of your component (like FormInput, return, etc.) follows ...

  // Better Form Input Component
  const FormInput = ({ id, label, type = "text", required = true }) => (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl rounded-3xl border border-white/50 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 text-white font-bold text-xl mb-4 shadow-lg shadow-purple-200">
            M
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? "Welcome Back" : "Join Community"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {isLogin
              ? "Enter your details to access your dashboard."
              : "Start your journey with MuLearn VAST."}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              isLogin
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              !isLogin
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleLogin}>
          {!isLogin && (
            <>
              <FormInput id="name" label="Full Name" />
              <FormInput id="department" label="Department / Batch" />
            </>
          )}

          <FormInput id="email" label="Email Address" type="email" />
          <FormInput id="password" label="Password" type="password" />

          {isLogin && (
            <div className="text-right mb-6">
              <Link
                href="#"
                className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg transform active:scale-95 transition-all duration-200"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 font-medium transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
