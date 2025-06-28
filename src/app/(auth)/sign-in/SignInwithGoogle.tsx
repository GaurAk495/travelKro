"use client";
import { getExistingUser, storeUserData } from "@/app/actions/authServer";
import { account } from "@/utils/appwrite/userClient";
import { getGooglePicutre } from "@/utils/googlePeopleApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "@/utils/appwrite/authClient";
import { IoLogoGoogle } from "react-icons/io";

function SignInwithGoogle() {
  const router = useRouter();
  useEffect(() => {
    async function loadClient() {
      try {
        //account exist or not of the caller and also is he logged in.
        const [user, session] = await Promise.all([
          account.get(),
          account.getSession("current"),
        ]);
        if (user.$id) {
          //user is logged in then getting his session
          const isUserexist = await getExistingUser(user.$id);
          if (!isUserexist) {
            const imageURL = await getGooglePicutre({
              accessToken: session.providerAccessToken,
            });
            const userData = {
              full_name: user.name,
              email: user.email,
              account_id: user.$id,
              image_url: imageURL,
            };
            await storeUserData({ userData });
            return router.push("/");
          }
          return router.push(isUserexist.role === "user" ? "/" : "/dashboard");
        }
      } catch (error) {
        console.log(error instanceof Error && error.message);
      }
    }
    loadClient();
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
