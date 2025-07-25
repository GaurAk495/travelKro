"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TbMenuDeep } from "react-icons/tb";
import { sidebarItems } from "@/constants";
import SideBarMenuItem from "./SideBarMenuItem";
import { Separator } from "@/components/ui/separator";
import SideBarFooter from "./SideBarFooter";
import BrandLogo from "@/components/BrandLogo";
import { useUser } from "@/context/UserContext";

function MobileSideBar() {
  const user = useUser();
  return (
    <Sheet>
      <div className="flex items-center justify-between sm:hidden px-4 py-2 border">
        <BrandLogo />
        <SheetTrigger>
          <TbMenuDeep />
        </SheetTrigger>
      </div>
      <SheetContent className="w-3xs p-2 pt-10 gap-1">
        <SheetHeader className="p-0">
          <SheetTitle>
            <BrandLogo className="justify-center" />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <Separator className="my-4" />
        <div className="space-y-2">
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
      </SheetContent>
    </Sheet>
  );
}

export default MobileSideBar;
