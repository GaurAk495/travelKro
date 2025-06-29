export const appwriteConfig = {
  apiKey: String(process.env.NEXT_APPWRITE_KEY),
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
  apiEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  userCollection: String(process.env.NEXT_APPWRITE_USER_COLLECTION),
  travelCollection: String(process.env.NEXT_APPWRITE_TRAVEL_COLLECTION),
};
