"use client";
import React, { createContext, useContext } from "react";

type UserInfo = {
  email: string;
  name: string;
  image: string;
};

const UserContext = createContext<UserInfo | null>(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({
  user,
  children,
}: {
  user: UserInfo;
  children: React.ReactNode;
}) => <UserContext.Provider value={user}>{children}</UserContext.Provider>;
