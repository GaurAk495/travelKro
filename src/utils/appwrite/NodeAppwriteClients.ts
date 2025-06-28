"use server";
import { Client, Account, Databases } from "node-appwrite";
import { appwriteConfig } from "./userClient";
import { cookies } from "next/headers";

export async function createAdminClient() {
  const client = new Client();
  client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
}

export async function createSessionClient() {
  const cookieStore = await cookies();
  const sessionKey = cookieStore.get("a_session_685c299d0028711ee1c3")?.value;
  console.log(sessionKey);

  const client = new Client();
  client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId);

  if (!sessionKey) throw Error("No session Found");
  client.setSession(sessionKey);

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
}
