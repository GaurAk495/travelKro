import { account } from "@/utils/appwrite/userClient";
import { OAuthProvider } from "appwrite";
import { redirect } from "next/navigation";

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`
    );
  } catch (error) {
    console.error("loginWithGoogle", error);
  }
};

export const logOutUser = async () => {
  try {
    await account.deleteSession("current");
    redirect("/sign-in");
  } catch (error) {
    console.error("logOutUser", error);
  }
};
