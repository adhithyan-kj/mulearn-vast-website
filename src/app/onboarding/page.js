"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth, googleProvider } from "@/lib/firebase"; 
import { 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function OnboardingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // --- ADD THE REDIRECT GUARD HERE ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If Firebase says we are already logged in, skip this page
        router.push("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [router]);

  // --- Google Auth Logic: Secure & Passwordless ---
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.email);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const newUser = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          dept: "cse",
          impactScore: 0,
          tasksCompleted: 0,
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.setItem("user", JSON.stringify(userSnap.data()));
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Google Auth Error:", error);
      alert("Google Sign-In failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Email/Password Auth Logic: Managed by Firebase Auth ---
  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      if (isLogin) {
        // --- SECURE LOGIN VIA FIREBASE ---
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userSnap = await getDoc(doc(db, "users", user.email));
        localStorage.setItem("user", JSON.stringify(userSnap.data()));
        router.push("/dashboard");
      } else {
        // --- SECURE SIGN UP VIA FIREBASE ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const newUser = {
          displayName: name,
          email: email,
          dept: "cse",
          impactScore: 0,
          tasksCompleted: 0,
          createdAt: serverTimestamp(),
        };

        // Profile data goes to Firestore; Password stays encrypted in Auth
        await setDoc(doc(db, "users", user.email), newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Auth Error:", error.code);
      if (error.code === 'auth/wrong-password') alert("Incorrect password.");
      else if (error.code === 'auth/user-not-found') alert("No account found with this email.");
      else if (error.code === 'auth/email-already-in-use') alert("This email is already registered.");
      else alert("Authentication failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  const FormInput = ({ id, label, type = "text", required = true }) => (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <input 
        type={type} 
        id={id} 
        name={id} 
        required={required} 
        placeholder={`Enter your ${label.toLowerCase()}`} 
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-sm" 
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 text-white font-bold text-xl mb-4 shadow-lg shadow-purple-200">M</div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{isLogin ? "Welcome Back" : "Join Community"}</h1>
          <p className="text-gray-500 mt-2 text-sm">{isLogin ? "Enter your details to access your dashboard." : "Start your journey with MuLearn VAST."}</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
          <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}>Sign Up</button>
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

          <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all mt-4">
            {isLoading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="bg-white/80 px-4 text-xs text-gray-400 absolute">OR</span>
          </div>
          
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" className="w-5 h-5" />
            <span className="font-bold text-gray-700 text-sm">Continue with Google</span>
          </button>
        </div>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-purple-600 font-medium transition-colors">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}