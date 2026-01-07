"use client";
import { Bell, Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Topbar({ title = "Dashboard", setMobileOpen }) {
  const [user, setUser] = useState({ displayName: "Loading...", role: "Student", photoURL: null });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userRef = doc(db, "users", authUser.email);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const firestoreData = userSnap.data();
            setUser({
              ...firestoreData,
              // ✅ Corrected: If Firestore has a photo, use it. Else use Google's.
              photoURL: firestoreData.photoURL || authUser.photoURL 
            });
          } else {
            // Fallback for users not yet in Firestore
            setUser({
              displayName: authUser.displayName,
              role: "Student",
              photoURL: authUser.photoURL
            });
          }
        } catch (error) {
          console.error("Topbar Error:", error);
        }
      } else {
        setUser({ displayName: "Guest", role: "Visitor", photoURL: null });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 md:px-8 flex justify-between items-center shadow-md transition-all duration-300 left-0 md:left-[280px]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
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

        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800">
              {user.displayName}
            </p>
            <p className="text-xs text-gray-500 capitalize">{user.role || "Member"}</p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white">
             {user.photoURL && !imgError ? (
               <img 
                 key={user.photoURL} // ⚡ Forces re-render when URL changes
                 src={user.photoURL} 
                 alt="Profile" 
                 referrerPolicy="no-referrer" 
                 className="w-full h-full object-cover"
                 onError={() => setImgError(true)} 
               />
             ) : (
               <span className="text-lg">{user.displayName?.charAt(0) || "U"}</span>
             )}
          </div>
        </div>
      </div>
    </header>
  );
}