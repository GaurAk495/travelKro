"use server";
import { Query } from "node-appwrite";
import { createAdminClient } from "@/utils/appwrite/NodeAppwriteAdmin";

export async function getAllUsers({
  searchParams,
}: {
  searchParams: { limit?: number; offset?: number; search?: string };
}) {
  try {
    // Initialize the Appwrite client
    const { users } = await createAdminClient();

    // Parse URL parameters for pagination and search
    const limit = searchParams.limit! || 25;
    const offset = searchParams.offset! || 0;
    const search = searchParams.search;

    // Build queries array
    const queries = [];
    if (limit) queries.push(Query.limit(limit));
    if (offset) queries.push(Query.offset(offset));

    // Get users
    const userList = search
      ? await users.list(queries, decodeURIComponent(search))
      : await users.list(queries);

    const transformedUsers = userList.users.map((user) => ({
      $id: user.$id,
      name: user.name || "N/A",
      email: user.email || "N/A",
      date_joined: new Date(user.$createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      image_url: user.prefs.image_url,
      role: user.prefs?.role,
    }));

    return {
      success: true,
      total: userList.total,
      users: transformedUsers,
      pagination: {
        limit,
        offset,
        hasMore: userList.total > offset + limit,
      },
    };
  } catch (error) {
    console.error(
      "Error retrieving users:",
      error instanceof Error && error.message
    );

    return { success: false, error: error instanceof Error && error.message };
  }
}
