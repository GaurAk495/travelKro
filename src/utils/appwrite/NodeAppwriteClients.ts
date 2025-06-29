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

  // Fallback to cookie if jwt is not passed
  const finalJwt = jwt || cookieStore.get("travel_kro")?.value;
  if (!finalJwt) throw Error("No JWT found");

  client.setJWT(finalJwt);

  const account = new Account(client);
  const database = new Databases(client);

  return { account, database };
}
