"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { appwriteConfig } from "./WebAppwriteClient";
import { cookies } from "next/headers";

export async function createAdminClient() {
  const client = new Client();
  client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  const account = new Account(client);
  const database = new Databases(client);
  const user = new Users(client);

  return { account, database, user };
}

export async function createSessionClient({ jwt }: { jwt?: string }) {
  const cookieStore = await cookies();
  const client = new Client();

  client
    .setEndpoint(appwriteConfig.apiEndpoint)
    .setProject(appwriteConfig.projectId);

  if (jwt) {
    client.setJWT(jwt);
  } else {
    const session = cookieStore.get("a_session_685c299d0028711ee1c3")?.value;
    if (!session) throw Error("No session");
    client.setSession(session);
  }

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
}
