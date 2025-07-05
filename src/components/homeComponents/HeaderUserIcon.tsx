"use client";
import { useUser } from "@/context/UserContext";
import BrandLogo from "../BrandLogo";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { logOutUser } from "@/utils/appwrite/auth";
import { useRouter } from "next/navigation";

function HeaderUserIcon() {
  const user = useUser();
  const router = useRouter();
  return (
    <nav className="relative z-10 flex items-center justify-between py-6">
      <div className="flex items-center space-x-2">
        <BrandLogo />
      </div>

      {user && (
        <div className="hidden sm:flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full relative overflow-hidden">
            <Image
              src={user?.prefs.image_url}
              alt={user.name}
              fill
              className="object-cover absolute"
            />
          </div>
          <LogOut
            className="rotate-180 text-red-500 bg-white rounded-full w-8 h-8 p-1"
            onClick={async () => {
              await logOutUser();
              router.push("/auth/sign-in");
            }}
          />
        </div>
      )}
    </nav>
  );
}

export default HeaderUserIcon;
