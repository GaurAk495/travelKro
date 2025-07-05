import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoLocation } from "react-icons/io5";

type TripData = {
  detail: ItineraryData;
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  image_urls: string[];
};

function TripCard({ trip }: { trip: TripData }) {
  return (
    <Link
      href={`/trips/${trip.$id}`}
      key={trip.$id}
      className="rounded-3xl flex flex-col overflow-hidden border shadow hover:scale-105 duration-200 group"
    >
      <div className="relative h-40 object-center">
        <Image
          src={trip.image_urls[0]}
          alt={trip.detail.name}
          fill
          sizes="300"
          className="object-cover absolute group-hover:scale-110 duration-300 bg-center"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-[14px] line-clamp-2 h-10">{trip.detail.name}</h3>
        <p className="flex items-center text-sm mt-3 text-zinc-700">
          <IoLocation /> {trip.detail.location.city}
        </p>
        <div className="text-xs mt-4 space-x-2">
          <span className="text-blue-700 bg-blue-100 px-2 py-1 rounded-3xl">
            {trip.detail.budget}
          </span>
          <span className="text-red-700 bg-red-100 px-2 py-1 rounded-3xl">
            {trip.detail.interests}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
