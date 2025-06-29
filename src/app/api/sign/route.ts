import { account } from "@/utils/appwrite/WebAppwriteClient";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { session } = await request.json();

    // Your post-login logic here
    console.log("User session:", session);

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
        redirect("/dashboard");
      }
    } catch (error) {
      console.log(error instanceof Error && error.message);
    }

    return Response.json({
      success: true,
      redirectUrl: "/dashboard", // or wherever you want to redirect
    });
  } catch (error) {
    console.error("Post-login error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
