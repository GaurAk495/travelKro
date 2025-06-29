// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "./appwriteKey";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId);

  const session = (await cookies()).get("travel_kro");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
