import React from "react";
import BrandLogo from "../../../components/BrandLogo";
import { sidebarItems } from "@/constants";
import SideBarMenuItem from "@/app/(admin)/component/SideBarMenuItem";
import { Separator } from "@/components/ui/separator";
import SideBarFooter from "./SideBarFooter";

function SideBar({ user }: User) {
  return (
    <aside className="max-w-[220px] w-full p-4 pt-5 shadow-lg h-full hidden sm:flex flex-col">
      <BrandLogo />
      <Separator className="my-7 bg-zinc-100" />
      <div className="space-y-1 h-full">
        {sidebarItems.map(({ id, href, label, icon }) => (
          <SideBarMenuItem key={id} href={href} label={label} icon={icon} />
        ))}
      </div>
      <SideBarFooter user={user} />
    </aside>
  );
}

export default SideBar;
