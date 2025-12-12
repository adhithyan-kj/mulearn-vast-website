import Link from "next/link";
import { useState } from "react";

export default function OnboardingPage() {
  const [isLogin, setIsLogin] = useState(true); // State to switch between Login and Sign Up

  // Helper component for common form inputs
  const FormInput = ({ id, label, type = "text", required = true }) => (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-xl">
        {/* Title and Switcher */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 font-semibold text-purple-600 hover:text-purple-700 transition duration-150"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        <form>
          {/* --- Option A: Sign Up Fields --- */}
          {!isLogin && (
            <>
              [cite_start]
              <FormInput id="name" label="Name" /> {/* [cite: 16] */}
              [cite_start]
              <FormInput id="email-signup" label="Email" type="email" />{" "}
              {/* [cite: 17] */}
              [cite_start]
              <FormInput id="department" label="Department / Batch" />{" "}
              {/* [cite: 18] */}
              [cite_start]
              <FormInput
                id="password-signup"
                label="Password"
                type="password"
              />{" "}
              {/* [cite: 19] */}
              <button
                type="submit"
                className="w-full mt-6 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Create Account
              </button>
            </>
          )}

          {/* --- Option B: Login Fields --- */}
          {isLogin && (
            <>
              [cite_start]
              <FormInput id="email-login" label="Email" type="email" />{" "}
              {/* [cite: 21] */}
              [cite_start]
              <FormInput
                id="password-login"
                label="Password"
                type="password"
              />{" "}
              {/* [cite: 22] */}
              <div className="text-right mb-6">
                {/* Forgot Password link */}
                <Link
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-700 transition duration-150"
                >
                  Forgot Password? [cite_start]{/* [cite: 23] */}
                </Link>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
              >
                Login
              </button>
            </>
          )}
        </form>

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition duration-150"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
