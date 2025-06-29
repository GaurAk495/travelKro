// src/app/oauth/route.js

import { appwriteConfig } from "@/utils/appwrite/appwriteKey";
import { createAdminClient } from "@/utils/appwrite/NodeAppwriteClients";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");
  const cookieStore = await cookies();
  if (!userId || !secret) {
    return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
  }

  const { account, databases, user } = await createAdminClient();
  const session = await account.createSession(userId, secret);

  //checking user record exist on database or not
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollection,
    [Query.equal("account_id", userId)]
  );

  const userExist = result.total > 0;

  //if user don't Exists record in Db.
  if (!userExist) {
    const userData = await user.get(userId);

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      ID.unique(),
      {
        full_name: userData.name,
        email: userData.email,
        role: "user",
        image_url: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        account_id: userData.$id,
      }
    );
  }

  cookieStore.set("travel_kro", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/sign-in`);
}
