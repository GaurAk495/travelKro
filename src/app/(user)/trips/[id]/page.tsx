import { getTripById } from "@/action/tripActions";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import { Calendar1 } from "lucide-react";
import Image from "next/image";
import { IoLocationOutline } from "react-icons/io5";
import MyMap from "../create/MyMap";
import PopularTrips from "@/components/PopularTrips";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const Tripdata = await getTripById(id);
  const data: ItineraryData = JSON.parse(
    JSON.parse(Tripdata.detail)
      .candidates[0].content.parts[0].text.replace(/```[a-z]*\n?/gi, "")
      .replace(/```/g, "")
      .trim()
  );
  const itineraryData = { ...data, image_url: Tripdata.image_urls };
  const rating = Math.floor(Math.random() * 5).toFixed(2);
  return (
    <div className="max-w-xl w-full mx-auto px-4">
      <h1 className="text-4xl">{itineraryData.name}</h1>
      <div className="tags flex space-x-6 items-center mt-5 text-xs">
        <p className="flex justify-center items-center gap-2 text-zinc-700">
          <Calendar1 size={20} /> {itineraryData.duration} days plan
        </p>
        <p className="flex justify-center items-center gap-2 text-zinc-700">
          <IoLocationOutline size={20} /> {itineraryData.location.city} days
          plan
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-5 rounded-xl overflow-hidden sm:grid-cols-3 sm:grid-rows-2 sm:aspect-[3/2]">
        {itineraryData.image_url.slice(0, 3).map((url: string, i: number) => (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-xl w-full aspect-square h-auto", // aspect-square for each image
              i === 0 && "sm:col-span-2 sm:row-span-2"
            )}
          >
            <Image
              src={url}
              alt={itineraryData.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="tags mt-4 xs:flex items-center">
        <div className="flex gap-1 items-center text-[11px] justify-between flex-wrap">
          <p
            className={cn(
              "flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-blue-700 bg-blue-100",
              itineraryData.budget
            )}
          >
            {itineraryData.budget}
          </p>
          <p
            className={cn(
              "flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-yellow-700 bg-yellow-100"
            )}
          >
            {itineraryData.interests}
          </p>
          <p
            className={cn(
              "flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-pink-700 bg-yellow-100"
            )}
          >
            {itineraryData.groupType}
          </p>
          <p
            className={cn(
              "flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-green-700 bg-green-100"
            )}
          >
            {itineraryData.travelStyle}
          </p>
        </div>
        <div
          className={cn(
            "flex justify-center items-center gap-2 px-2 py-1 rounded-2xl text-red-700 bg-red-100 ml-auto mt-2"
          )}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              size={14}
              className={cn({
                "text-yellow-300 ": i < Math.floor(Number(rating)),
                "text-gray-300": i >= Math.floor(Number(rating)),
              })}
            />
          ))}
          {rating} /5
        </div>
      </div>

      <div className="title_price mt-3 text-zinc-700 flex justify-between items-start">
        <h2 className="font-extrabold text-xl">{itineraryData.name}</h2>
        <span className="text-zinc-700 bg-white px-2 py-1 text-xl rounded-4xl border font-bold">
          {itineraryData.estimatedPrice}{" "}
        </span>
      </div>
      <div className="descriptio mt-3 text-zinc-700">
        <h2>{itineraryData.description}</h2>
      </div>
      <Separator className="my-5" />
      <div className="day-plan-section mt-6 space-y-6 text-shadow-zinc-700 text-sm">
        {itineraryData.itinerary.map((item) => (
          <div key={item.day}>
            <h4 className="text-lg font-bold">
              Day {item.day}: {item.location}
            </h4>
            <ul className="space-y-4 pt-4 list-disc list-inside">
              {item.activities.map((activity, i) => (
                <li key={i}>{activity.description}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Separator className="my-5" />
      <div className="best-time-to-visit text-shadow-zinc-700 mt-6 space-y-6">
        <h4 className="text-lg font-bold">Best Time to Visit: </h4>
        <ul className="space-y-4">
          {itineraryData.bestTimeToVisit.map((item, i) => (
            <li key={i} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-5" />
      <div className="weather-info text-shadow-zinc-700 mt-6 space-y-6">
        <h4 className="text-lg font-bold">Weather Info: </h4>
        <ul className="space-y-4">
          {itineraryData.weatherInfo.map((item, i) => (
            <li key={i} className="list-disc list-inside">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-5" />
      <div className="weather-info text-shadow-zinc-700 mt-6 space-y-6 my-5">
        <h4 className="text-lg font-bold">Locaiton on Map: </h4>
        <MyMap position={itineraryData.location.coordinates} />
      </div>
      <Button
        className="w-full text-white bg-blue-700 hover:bg-blue-500"
        asChild
      >
        <Link href={`/trips/${id}/checkout`}>
          Pay and Join Trip{" "}
          <span className="text-zinc-700 bg-white px-1 rounded-4xl border font-bold">
            {itineraryData.estimatedPrice}{" "}
          </span>
        </Link>
      </Button>
      <div className="popular-section">
        <PopularTrips />
      </div>
    </div>
  );
}

export default page;
