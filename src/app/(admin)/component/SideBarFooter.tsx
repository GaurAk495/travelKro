import { logOutUser } from "@/actions/authAction";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";

function SideBarFooter({ user }: User) {
  return (
    <div className="flex items-center justify-between gap-1 rounded-md mt-auto">
      <Image
        src={user.image || "/assets/icons/users.svg"}
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
        <p className="font-semibold truncate text-sm">{user.name}</p>
        <p className="text-xs truncate">{user.email}</p>
      </article>
      <form action={logOutUser}>
        <button className="p-1 pl-2 rounded-full cursor-pointer" type="submit">
          <IoIosLogOut size={28} className="rotate-180 text-red-500" />
        </button>
      </form>
    </div>
  );
}

export default SideBarFooter;
