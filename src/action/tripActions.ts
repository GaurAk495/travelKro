"use server";
import { appwriteConfig } from "@/utils/appwrite/appwriteKey";
import { createAdminClient } from "@/utils/appwrite/NodeAppwriteAdmin";
import { GoogleGenAI } from "@google/genai";
import { ID, Query } from "node-appwrite";

type ReqObject = {
  country: string | undefined;
  duration: string;
  groupType: string;
  travelStyle: string;
  interests: string;
  budget: string;
  location?: string | undefined;
  userId: string | undefined;
};

interface Photo {
  urls: {
    small: string;
    regular: string;
    full: string;
  };
}

export async function CreateItineary({ reqBody }: { reqBody: ReqObject }) {
  const { userId } = reqBody;
  try {
    const [itineraryData, imageUrls] = await Promise.all([
      generateContent({ reqBody }),
      getImageURL({ reqBody }),
    ]);

    const { database } = await createAdminClient();
    const response = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.travelCollection,
      ID.unique(),
      {
        detail: JSON.stringify(itineraryData),
        image_urls: imageUrls,
        userId: userId,
      }
    );
    return response.$id;
  } catch (error) {
    console.log(error);
  }
}

async function generateContent({ reqBody }: { reqBody: ReqObject }) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_GOOGLE_GEMINI_API_KEY,
  });

  const { budget, country, duration, groupType, interests, travelStyle } =
    reqBody;

  const prompt = `Generate a ${duration}-day travel itinerary for the country: "${country}" based on the user's preferences below.

    User Preferences:
    - Budget: "${budget}"
    - Interests: ${interests}
    - Travel Style: "${travelStyle}"
    - Group Type: "${groupType}"

Return the response in **strict JSON format** (no markdown or extra text), following this exact structure:

{
  "name": "A descriptive title for the trip",
  "description": "A short summary of the trip (max 100 words)",
  "estimatedPrice": "Lowest average price in USD, e.g. $1200",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country}",
  "interests": ${interests},
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 Spring (March–May): Cherry blossoms and mild weather",
    "☀️ Summer (June–August): Festivals and outdoor adventures",
    "🍁 Autumn (September–November): Colorful foliage and harvest season",
    "❄️ Winter (December–February): Snow activities and festive markets"
  ],
  "weatherInfo": [
    "☀️ Summer: 25–35°C (77–95°F)",
    "🌦️ Monsoon: 22–30°C (72–86°F)",
    "🌧️ Rainy: 18–28°C (64–82°F)",
    "❄️ Winter: -5–10°C (23–50°F)"
  ],
  "location": {
    "city": "Main city or region name",
    "coordinates": [latitude, longitude],
    "openStreetMap": "https://www.openstreetmap.org/?mlat=xx.xxxx&mlon=yy.yyyy"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        { "time": "Morning", "description": "🏰 Visit the historic castle and scenic gardens" },
        { "time": "Afternoon", "description": "🖼️ Explore the national art museum" },
        { "time": "Evening", "description": "🍷 Enjoy dinner at a riverside restaurant" }
      ]
    },
    ...
  ]
}`;
  return await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
}

async function getImageURL({ reqBody }: { reqBody: ReqObject }) {
  const { country } = reqBody;

  const locationWithQuery = `beautiful ${country}`;

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      locationWithQuery
    )}&per_page=4&client_id=${process.env.NEXT_UNSPLASH_ACCESS_KEY}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  // Extract URLs from the first 3 results
  const imageUrls: string[] = data.results
    .slice(0, 3)
    .map((photo: Photo) => photo.urls.regular);
  return imageUrls;
}

export async function getTripById(id: string) {
  const { database } = await createAdminClient();
  const res = await database.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.travelCollection,
    id
  );
  return res;
}

export async function getAllTrips({
  p = 0,
  l = 20,
}: {
  p?: number;
  l?: number;
}) {
  try {
    const { database } = await createAdminClient();
    const res = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.travelCollection,
      [
        Query.limit(l),
        Query.offset(p && (p - 1) * l),
        Query.orderDesc("$createdAt"),
        Query.select([
          "detail",
          "userId",
          "payment_link",
          "$createdAt",
          "image_urls",
          "$id",
        ]),
      ]
    );
    if (res.total === 0) {
      return { trips: [], total: 0 };
    }

    // transformation
    const trips = res.documents.map((document) => {
      const detail = JSON.parse(
        JSON.parse(document.detail)
          .candidates[0].content.parts[0].text.replace(/```json|```/g, "")
          .trim()
      );
      return {
        ...document,
        detail,
        image_urls: document.image_urls ?? [], // Ensure image_urls always exists
      };
    });
    return { trips, total: res.total };
  } catch (error) {
    console.error("getAllTrips", error);
    return { trips: [], total: 0 };
  }
}

export async function fetchItninearyCount(
  userData: {
    name: string;
    image: string;
    id: string;
  }[]
) {
  const { database } = await createAdminClient();
  const res = await database.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.travelCollection,
    [Query.limit(300)]
  );
  const itineraryCollection = res.documents;

  // Count itineraries for each user
  const result = userData.map((user) => {
    const itineraryCount = itineraryCollection.filter(
      (itinerary) => itinerary.userId === user.id
    ).length;

    return {
      ...user,
      itineraryCount,
    };
  });

  return result;
}
