"use client";
import Image from "next/image";

function UserImageContainer({ user }: User) {
  return (
    <Image
      src={user.image || "/assets/icons/users.svg"}
      alt="user"
      width={100}
      height={100}
      priority={false}
      className="bg-cover rounded-full shrink-0 size-10"
    />
  );
}

export default UserImageContainer;
