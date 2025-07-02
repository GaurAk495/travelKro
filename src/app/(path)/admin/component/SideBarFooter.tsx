"use client";

import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { logOutUser } from "@/utils/appwrite/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";

function SideBarFooter() {
  const user = useUser();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-1 rounded-md mt-auto">
      <Image
        src={user?.prefs.image_url || "/assets/icons/users.svg"}
        alt="user"
        width={100}
        height={100}
        className="bg-cover rounded-full shrink-0 size-10"
      />
      <Separator
        orientation="vertical"
        className="mx-1 border-zinc-400 border-r"
      />
      <article className="overflow-hidden pointer-events-none">
        <p className="font-semibold truncate text-sm">{user?.name}</p>
        <p className="text-xs truncate">{user?.email}</p>
      </article>

      <button
        className="p-1 pl-2 rounded-full cursor-pointer"
        onClick={async () => {
          await logOutUser();
          router.push("/auth/sign-in");
        }}
      >
        <IoIosLogOut size={28} className="rotate-180 text-red-500" />
      </button>
    </div>
  );
}

export default SideBarFooter;
