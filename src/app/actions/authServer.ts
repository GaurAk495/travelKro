"use server";

import {
  createAdminClient,
  createSessionClient,
} from "@/utils/appwrite/NodeAppwriteClients";
import { appwriteConfig } from "@/utils/appwrite/userClient";
import { ID, Query } from "node-appwrite";

type TypeUserData = {
  userData: {
    account_id: string;
    email: string;
    full_name: string;
    image_url: string;
  };
};

export const storeUserData = async ({ userData }: TypeUserData) => {
  try {
    const { database } = await createAdminClient();
    const existingUsers = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("account_id", userData.account_id)]
    );
    if (existingUsers.documents.length > 0) {
      return existingUsers.documents[0];
    }
    // userData should contain at least account_id and other user info
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      ID.unique(),
      {
        account_id: userData.account_id,
        email: userData.email,
        full_name: userData.full_name,
        image_url: userData.image_url || "",
      }
    );
    return newUser;
  } catch (error) {
    console.error("storeUserData", error);
    return null;
  }
};

export const getExistingUser = async (userId: string) => {
  try {
    const { database } = await createAdminClient();
    const res = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollection,
      [Query.equal("account_id", userId)]
    );

    return res?.documents?.[0] || false;
  } catch (error) {
    console.error("getExistingUser", error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const { account, database } = await createSessionClient();
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
