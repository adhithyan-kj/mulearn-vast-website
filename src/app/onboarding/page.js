"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function OnboardingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const department = formData.get("department");

    try {
      const userRef = doc(db, "users", email);

      if (isLogin) {
        // --- LOGIN LOGIC ---
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          // Simple password check (In real apps, use Firebase Auth)
          if (userData.password === password) {
            localStorage.setItem("user", JSON.stringify(userData)); // Store user session
            router.push("/dashboard");
          } else {
            alert("Incorrect password!");
          }
        } else {
          alert("User not found. Please sign up first.");
        }
      } else {
        // --- SIGN UP LOGIC ---
        const newUser = {
          displayName: name,
          email: email,
          dept: "cse", // or from a dropdown
          role: "student",
          impactScore: 0,
          tasksCompleted: 0, // Added
          mentorId: null, // Added
          companionId: null, // Added
          createdAt: new Date(),
        };

        await setDoc(doc(db, "users", email), newUser);

        // Save to Local Storage & Redirect
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Something went wrong. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

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
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl rounded-3xl border border-white/50 relative z-10">
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

        <form onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <FormInput id="name" label="Full Name" />
              <FormInput id="department" label="Department / Batch" />
            </>
          )}

          <FormInput id="email" label="Email Address" type="email" />
          <FormInput id="password" label="Password" type="password" />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 hover:shadow-lg transform active:scale-95 transition-all duration-200 mt-4"
          >
            {isLoading
              ? "Processing..."
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
