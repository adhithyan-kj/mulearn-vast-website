"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function RoleGuard({ children, allowedRoles }) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check role from localStorage for initial UI gate
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentRole = storedUser?.role || "student";

    if (!allowedRoles.includes(currentRole)) {
      // If unauthorized, send them back to profile
      router.push("/dashboard/profile");
    } else {
      setAuthorized(true);
    }
  }, [router, allowedRoles]);

  if (!authorized)
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );

  return children;
}
