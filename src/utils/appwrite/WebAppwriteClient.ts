import { Client, Databases, Account } from "appwrite";
import { appwriteConfig } from "./appwriteKey";

const client = new Client();
client
  .setEndpoint(appwriteConfig.apiEndpoint)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
