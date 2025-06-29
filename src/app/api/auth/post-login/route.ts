import { createSessionClient } from "@/utils/appwrite/NodeAppwriteClients";
import { appwriteConfig } from "@/utils/appwrite/WebAppwriteClient";
import { getGooglePicutre } from "@/utils/googlePeopleApi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const body = await req.json();
  const session = body.session;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: No valid token" },
      { status: 401 }
    );
  }
  const jwt = authHeader.split(" ")[1];

  if (!session || !jwt) {
    return NextResponse.json(
      { success: false, error: "Session or JWT missing" },
      { status: 400 }
    );
  }

  try {
    const { account, database } = await createSessionClient({ jwt });

    const existing = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("account_id", session.userId)]
    );

    cookieStore.set("travel_kro", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    if (existing.total > 0) {
      const role = existing.documents[0]?.role;
      const url = role === "user" ? "/" : "/dashboard";

      return NextResponse.redirect(new URL(url, req.url));
    }

    const userAccount = await account.get();
    const image_url = await getGooglePicutre({
      accessToken: session.providerAccessToken,
    });

    await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      ID.unique(),
      {
        account_id: userAccount.$id,
        email: userAccount.email,
        full_name: userAccount.name,
        image_url,
      }
    );
    return NextResponse.redirect(new URL("/", req.url));
  } catch (err) {
    console.error("Error saving auth data:", err);
    const error = err instanceof Error ? err.message : "something_wrong";
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(error)}`, req.url)
    );
  }
}
