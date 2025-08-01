"use client";
import { Button } from "@/components/ui/button";
import { sidebarItems } from "@/constants";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

function ContentHeader({ page }: { page: string }) {
  const user = useUser();
  const pageDetails = sidebarItems.find((item) => item.href.endsWith(page));
  return (
    <div className="px-4 sm:px-8 my-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold">
          {(page === "dashboard" && user?.name && `Welcome ${user.name} 👋`) ||
            pageDetails?.Title}
        </h2>
        <p className="text-secondary-500 line-clamp-2">
          {pageDetails?.description}{" "}
        </p>
      </div>
      {user?.prefs.role === "admin" && (
        <Button
          className=" bg-brand-500 px-10 py-2 font-semibold cursor-pointer hover:bg-brand-600 duration-200"
          asChild
        >
          <Link href="/trips/create">+ Create</Link>
        </Button>
      )}
    </div>
  );
}

export default ContentHeader;
