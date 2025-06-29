import { account } from "@/utils/appwrite/WebAppwriteClient";
import { OAuthProvider } from "appwrite";

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
