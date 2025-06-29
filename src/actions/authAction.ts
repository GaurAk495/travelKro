"use server";
import {
  createAdminClient,
  createSessionClient,
} from "@/utils/appwrite/NodeAppwriteClients";
import { OAuthProvider, Query } from "node-appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { appwriteConfig } from "@/utils/appwrite/appwriteKey";

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.error("getLoggedInUser", error);
    return null;
  }
}

export async function signWithGoogle() {
  const { account } = await createAdminClient();

  const origin = (await headers()).get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/api/oauth`,
    `${origin}/sign-in`
  );

  return redirect(redirectUrl);
}

export async function getUserRole() {
  try {
    const { account, databases } = await createSessionClient();
    const user = await account.get();
    if (!user) return;
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("account_id", user.$id)]
    );
    return documents[0];
  } catch (error) {
    console.log("getUserRole", error);
  }
}

export async function logOutUser() {
  try {
    const cookieStore = await cookies();
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    cookieStore.delete("travel_kro");
    return redirect("/sign-in");
  } catch (error) {
    console.error(error);
  }
}
