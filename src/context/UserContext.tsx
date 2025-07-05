"use client";
import { account } from "@/utils/appwrite/WebAppwriteClient";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserInfo>(undefined);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    $id: string;
    prefs: { [key: string]: string };
  }>();
  const [isLoading, setLoading] = useState(true);

  // User fetch karne ke liye
  useEffect(() => {
    setLoading(true);
    async function userLoader() {
      try {
        const user = await account.get();
        const { name, email, $id, prefs } = user;
        setUser({ name, email, $id, prefs });
      } catch (error) {
        console.log(
          "fetching user Error",
          error instanceof Error && error.message
        );
      } finally {
        setLoading(false);
      }
    }
    userLoader();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
