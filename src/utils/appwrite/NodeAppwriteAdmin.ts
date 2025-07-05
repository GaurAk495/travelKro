"use server";

import { Account, Client, Databases, Users } from "node-appwrite";
import { appwriteConfig } from "./appwriteKey";

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
    },
    get database() {
      return new Databases(client);
    },
  };
}
