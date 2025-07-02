// components/RouteGuard.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const users = useUser();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setLoading(true);
    const protectedRoutes = ["/admin"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (isProtectedRoute) {
      if (!users) {
        // Not logged in, redirect to sign-in
        router.push("/auth/sign-in");
        return;
      }

      // Check role-based access
      if (users.prefs.role === "user") {
        // User trying to access admin routes
        router.push("/");
        return;
      }
    }
    setLoading(false);
    // User is authorized for this route
    setAuthorized(true);
  }, [users, loading, pathname, router]);

  // Show loading spinner while checking auth
  if (loading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return children;
}
