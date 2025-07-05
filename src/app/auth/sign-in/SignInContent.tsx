"use client";
import { useState, useEffect } from "react";
import {
  getLoggedInUser,
  signWithGoogle,
  UpdatePrefs,
} from "@/utils/appwrite/auth";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { IoLogoGoogle } from "react-icons/io";
import { Models } from "node-appwrite";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export function SignInContent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getLoggedInUser();
        setData(user);
        if (user) {
          const fromOAuth = params.get("from") === "oauth";
          if (fromOAuth) {
            await UpdatePrefs();
            if (typeof window !== "undefined") {
              window.history.replaceState({}, "", "/auth/sign-in");
            }
          }
          router.push(
            user.prefs.role === "user" ? "/trips" : "/admin/dashboard"
          );
        }
      } catch (error) {
        console.log("Error:", error instanceof Error && error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router, params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return (
    <>
      {!data && (
        <div className="h-screen relative bg-[url('/bgimage2.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-white/40 z-10" />
          <div className="relative z-20 p-4 flex justify-center items-center h-screen">
            <div className="p-6 px-4 rounded-xl space-y-4 max-w-sm w-full bg-white text-center border-4 border-brand-200 shadow-inner">
              <BrandLogo className="justify-center" />
              <h3 className="font-semibold text-xl">Admin Dashboard Login</h3>
              <p className="text-zinc-600">
                Sign in with Google to manage destinations, itineraries, and
                user activity with ease.
              </p>
              <Button
                className="w-full bg-brand-600 hover:bg-brand-700 duration-300  cursor-pointer"
                onClick={signWithGoogle}
              >
                <IoLogoGoogle /> Sign in with Google
              </Button>

              <Link href="/">Return to Homepage</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
