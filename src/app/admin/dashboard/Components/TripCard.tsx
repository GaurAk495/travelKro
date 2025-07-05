"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Trip = {
  detail: any;
  image_urls: any;
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
};

function TripCard({ trip }: { trip: Trip }) {
  const pathname = usePathname();
  const href =
    pathname === "/" || pathname.startsWith("/travel")
      ? `/travel/${trip.$id}/${trip.detail.name
          .toLowerCase()
          .replaceAll(" ", "-")}`
      : `/trips/${trip.$id}`;

  return (
    <Link
      href={href}
      className="group bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative">
        <Image
          src={trip.image_urls[0]}
          alt={trip.detail.name}
          className="w-full h-40 object-cover group-hover:scale-105 duration-400"
          width={300}
          height={250}
          priority
        />
        <div className="absolute top-3 right-3 bg-white/80 text-sm px-3 py-1 rounded-full font-semibold">
          {trip.detail.estimatedPrice}
        </div>
      </div>
      <article className="p-4 space-y-2">
        <h3 className="text-sm font-semibold">{trip.detail.name}</h3>

        <figure className="text-sm text-gray-500 flex items-center gap-1">
          <IoLocationOutline size={20} />{" "}
          <figcaption>{trip.detail.location.city}</figcaption>
        </figure>

        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
            {trip.detail.travelStyle}
          </span>
          <span className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-600 font-medium">
            {" "}
            {trip.detail.budget}{" "}
          </span>
        </div>
      </article>
    </Link>
  );
}

export default TripCard;
