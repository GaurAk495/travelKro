import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  apiKey: String(process.env.NEXT_APPWRITE_KEY),
  projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
  apiEndpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
  databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  userCollection: String(process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION),
  travelCollection: String(process.env.NEXT_PUBLIC_APPWRITE_TRAVEL_COLLECTION),
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.apiEndpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { account, database, storage };
