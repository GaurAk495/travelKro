"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SideBarType = {
  href: string;
  label: string;
  icon: string;
};

function SideBarMenuItem({ href, label, icon }: SideBarType) {
  const path = usePathname();
  const isActive = path === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-colors duration-200",
        {
          "bg-brand-600": isActive,
        }
      )}
    >
      <div
        className={cn("w-5 h-5 transition duration-150 filter", {
          "invert brightness-0": isActive,
        })}
      >
        <Image src={icon} width={20} height={20} alt={label} />
      </div>
      <span className={cn("customstyle", isActive && "text-white!")}>
        {label}
      </span>
    </Link>
  );
}

export default SideBarMenuItem;
