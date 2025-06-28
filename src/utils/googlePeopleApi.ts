"use server";
export const getGooglePicutre = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  try {
    // Fetch profile from Google People API
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) return null;
    const data = await response.json();
    // Find the primary photo
    const photo =
      data.photos?.find(
        (p: { metadata?: { primary?: boolean }; url?: string }) =>
          p.metadata?.primary
      ) || data.photos?.[0];
    return photo?.url || null;
  } catch (error) {
    console.error("getGooglePicutre", error);
    return null;
  }
};
