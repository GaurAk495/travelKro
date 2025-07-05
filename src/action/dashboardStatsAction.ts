import { appwriteConfig } from "@/utils/appwrite/appwriteKey";
import { createAdminClient } from "@/utils/appwrite/NodeAppwriteAdmin";
import { Models, Query } from "node-appwrite";

function statsofData(documents: { $createdAt: string }[]) {
  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1); // 1st of current month
  const startPrev = new Date(d.getFullYear(), d.getMonth() - 1, 1); // 1st of previous month
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0, 23, 59, 59, 999);

  const data = {
    current: 0,
    last: 0,
  };

  for (const doc of documents) {
    const createdAt = new Date(doc.$createdAt);
    if (createdAt >= startCurrent) {
      data.current++;
    } else if (createdAt >= startPrev && createdAt <= endPrev) {
      data.last++;
    }
  }

  return data;
}

export async function userAndTripsStats() {
  const { users, database } = await createAdminClient();
  const [userData, tripsData] = await Promise.all([
    users.list([Query.orderDesc("$createdAt")]),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.travelCollection
    ),
  ]);

  const userRoleData = userData.users.filter(
    (user) => user.prefs.role === "user"
  );

  const userStats = statsofData(userData.users);
  const tripStats = statsofData(tripsData.documents);
  const useRoleStat = statsofData(userRoleData);
  const userGrowthStat = GrowthStats(userData.users);
  const tripGrowthStat = GrowthStats(tripsData.documents);
  const userRoleGrowth = GrowthStats(userRoleData);
  const itinearyByInterest = itinearyStat(
    tripsData.documents as (Models.Document & { detail: string })[]
  );

  return [
    {
      ...userStats,
      title: "Total Users",
      grStats: userGrowthStat,
      users: userData.users.slice(0, 3),
    },
    {
      ...tripStats,
      title: "Total Trips",
      grStats: tripGrowthStat,
      itinearyByInterest,
    },
    { ...useRoleStat, title: "Active User", grStats: userRoleGrowth },
  ];
}

function GrowthStats(Data: { $createdAt: string }[]) {
  const dataObj: Record<string, number> = {};

  // Step 1: Count the entries per day
  Data.forEach((item) => {
    const date = new Date(item.$createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
    dataObj[key] = (dataObj[key] || 0) + 1;
  });

  // Step 2: Find the date range
  const allDates = Data.map((item) => new Date(item.$createdAt));
  if (allDates.length === 0) return {};

  const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

  // Step 3: Fill missing dates with 0
  const filledData: Record<string, number> = {};
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    filledData[key] = dataObj[key] || 0;
  }

  return filledData;
}

function itinearyStat(data: (Models.Document & { detail: string })[]) {
  const itinearyTransformed = data.map((item) => {
    const detail = JSON.parse(
      JSON.parse(item.detail)
        .candidates[0].content.parts[0].text.replace(/```[a-z]*\n?/gi, "")
        .replace(/```/g, "")
        .trim()
    );
    return { ...item, detail };
  });

  const dataObj: Record<string, number> = {};

  itinearyTransformed.forEach((itineary) => {
    const key = itineary.detail.interests;
    dataObj[key] = (dataObj[key] | 0) + 1;
  });
  return dataObj;
}
