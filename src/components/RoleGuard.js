"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2 } from "lucide-react";

export default function RoleGuard({ children, adminOnly = false }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // --- SECURE IDENTITY CHECK ---
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If not logged in at all, go to onboarding
        router.push("/onboarding");
        return;
      }

      if (adminOnly) {
        try {
          // Verify if user's email exists in the private Admin Whitelist
          const adminRef = doc(db, "whitelisted_admins", user.email);
          const adminSnap = await getDoc(adminRef);

          if (adminSnap.exists()) {
            setAuthorized(true);
          } else {
            // Not an admin? Send back to student dashboard
            console.warn("Unauthorized admin access attempt blocked.");
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Authorization Error:", error);
          router.push("/dashboard");
        }
      } else {
        // For standard student pages, just being logged in is enough
        setAuthorized(true);
      }
    });

    return () => unsubscribe();
  }, [router, adminOnly]);

  if (!authorized) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-purple-600" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Verifying Credentials...</p>
      </div>
    );
  }

  return children;
}