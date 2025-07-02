import { account } from "@/utils/appwrite/WebAppwriteClient";
import { OAuthProvider } from "appwrite";

export async function getLoggedInUser() {
  try {
    return await account.get();
  } catch (error) {
    console.error("getLoggedInUser", error);
    return null;
  }
}

export async function UpdatePrefs() {
  try {
    const session = await account.getSession("current");
    const user = await account.get();
    const role = user.prefs.role || "user";
    const image_url = await fetchGoogleProfilePicLegacy(
      session.providerAccessToken
    );

    await account.updatePrefs({ image_url, role });
  } catch (error) {
    console.log("UpdatePrefs", error instanceof Error && error.message);
  }
}

export async function signWithGoogle() {
  account.createOAuth2Session(
    OAuthProvider.Google,
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in?from=oauth`
  );
}

export async function logOutUser() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGoogleProfilePicLegacy(providerAccessToken: string) {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${providerAccessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.picture || null;
  } catch (error) {
    console.error("Error fetching Google profile picture (legacy):", error);
    return null;
  }
}
