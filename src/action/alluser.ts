"use server";
import { Client, Query, Users } from "node-appwrite";
import { appwriteConfig } from "@/utils/appwrite/appwriteKey";

export async function getAllUsers({
  searchParams,
}: {
  searchParams: { limit?: number; offset?: number; search?: string };
}) {
  try {
    // Initialize the Appwrite client
    const client = new Client()
      .setEndpoint(appwriteConfig.apiEndpoint)
      .setProject(appwriteConfig.projectId)
      .setKey(appwriteConfig.apiKey);

    // Initialize the Users service
    const users = new Users(client);

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

// user later
// // Optional: POST method for creating users or bulk operations
// export async function POST(request: NextRequest) {
//   try {
//     const client = new Client()
//       .setEndpoint(appwriteConfig.apiEndpoint)
//       .setProject(appwriteConfig.projectId)
//       .setKey(appwriteConfig.apiKey);

//     const users = new Users(client);
//     const body = await request.json();

//     // Example: Create a new user
//     if (body.action === "create") {
//       const newUser = await users.create(
//         body.userId || "unique()",
//         body.email,
//         body.phone,
//         body.password,
//         body.name
//       );

//       return Response.json({
//         success: true,
//         user: newUser,
//       });
//     }

//     return Response.json(
//       {
//         success: false,
//         error: "Invalid action",
//       },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error(
//       "Error in POST /api/users:",
//       error instanceof Error && error.message
//     );

//     return Response.json(
//       {
//         success: false,
//         error: error instanceof Error && error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
