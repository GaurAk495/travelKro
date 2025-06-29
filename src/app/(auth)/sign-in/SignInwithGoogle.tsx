"use client";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/utils/appwrite/authClient";
import { account } from "@/utils/appwrite/WebAppwriteClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoLogoGoogle } from "react-icons/io";

function SignInwithGoogle() {
  const router = useRouter();
  useEffect(() => {
    async function clientLoader() {
      try {
        const session = await account.getSession("current");
        if (!session) return;
        const { jwt } = await account.createJWT();
        const res = await fetch("/api/auth/post-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ session }),
        });
        if (res.redirected) {
          router.push(res.url);
        }
      } catch (error) {
        console.log(error instanceof Error && error.message);
      }
    }
    clientLoader();
  }, [router]);
  return (
    <Button
      className="w-full bg-brand-600 hover:bg-brand-700 duration-300  cursor-pointer"
      onClick={loginWithGoogle}
    >
      <IoLogoGoogle /> Sign in with Google
    </Button>
  );
}

export default SignInwithGoogle;
