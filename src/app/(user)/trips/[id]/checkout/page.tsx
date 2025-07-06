import { getTripById } from "@/action/tripActions";
import React from "react";
import CheckoutPage from "./checkoutButton";
import Image from "next/image";

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

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Your Purchase</h1>

      <div className="mb-6">
        <Image
          src={itineraryData.image_url[2]}
          alt={itineraryData.name}
          width={250}
          height={250}
          className="aspect-square w-full"
        />

        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="text-gray-600">Tour Package: {itineraryData.name}</p>
        <p className="text-xl font-bold">
          Total: {itineraryData.estimatedPrice}
        </p>
      </div>
      <CheckoutPage
        price={Number(itineraryData.estimatedPrice.replace("$", ""))}
      />
    </div>
  );
}

export default page;
