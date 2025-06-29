"use server";

import { createSessionClient } from "@/utils/appwrite/NodeAppwriteClients";
import { appwriteConfig } from "@/utils/appwrite/WebAppwriteClient";
import { Query } from "node-appwrite";

export const getUser = async () => {
  try {
    const { account, database } = await createSessionClient({});
    const user = await account.get();
    const res = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("account_id", user.$id)]
    );

    return res?.documents?.[0] || false;
  } catch (error) {
    console.log(error instanceof Error && error.message);
  }
};
