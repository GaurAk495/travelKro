"use client";
import React from "react";
import { sidebarItems } from "@/constants";
import { Separator } from "@/components/ui/separator";
import SideBarFooter from "./SideBarFooter";
import BrandLogo from "@/components/BrandLogo";
import SideBarMenuItem from "./SideBarMenuItem";
import { useUser } from "@/context/UserContext";

function SideBar() {
  const user = useUser();
  return (
    <aside className="max-w-[220px] w-full p-4 pt-5 shadow-lg h-full hidden sm:flex flex-col">
      <BrandLogo />
      <Separator className="my-7 bg-zinc-100" />
      <div className="space-y-1 h-full">
        {sidebarItems.map(({ id, href, label, icon }) => {
          if (
            user?.prefs.role === "user" ||
            (user == undefined && href.startsWith("/admin"))
          )
            return;
          return (
            <SideBarMenuItem key={id} href={href} label={label} icon={icon} />
          );
        })}
      </div>
      {user && <SideBarFooter user={user} />}
    </aside>
  );
}

export default SideBar;
