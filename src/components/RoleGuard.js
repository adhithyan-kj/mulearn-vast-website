"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { db } from "@/lib/firebase"; // Ensure this path is correct
import { doc, getDoc } from "firebase/firestore";

export default function RoleGuard({ children, allowedRoles }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser?.email) {
          router.push("/onboarding");
          return;
        }

        // --- THE SECURITY UPGRADE ---
        // We ignore the role in localStorage and fetch the 'Truth' from Firestore
        const userRef = doc(db, "users", storedUser.email);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const actualRole = userSnap.data().role;

          if (allowedRoles.includes(actualRole)) {
            setAuthorized(true);
          } else {
            // User is trying to access a page above their clearance
            router.push("/dashboard/profile");
          }
        } else {
          // No user found in database
          router.push("/onboarding");
        }
      } catch (error) {
        console.error("Auth Guard Error:", error);
        router.push("/dashboard/profile");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, allowedRoles]);

  if (loading)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return authorized ? children : null;
}
