import React from "react";
import { sidebarItems } from "@/constants";
import { Separator } from "@/components/ui/separator";
import SideBarFooter from "./SideBarFooter";
import BrandLogo from "@/components/BrandLogo";
import SideBarMenuItem from "./SideBarMenuItem";

function SideBar() {
  return (
    <aside className="max-w-[220px] w-full p-4 pt-5 shadow-lg h-full hidden sm:flex flex-col">
      <BrandLogo />
      <Separator className="my-7 bg-zinc-100" />
      <div className="space-y-1 h-full">
        {sidebarItems.map(({ id, href, label, icon }) => (
          <SideBarMenuItem key={id} href={href} label={label} icon={icon} />
        ))}
      </div>
      <SideBarFooter />
    </aside>
  );
}

export default SideBar;
