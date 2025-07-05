import { getAllTrips } from "@/action/tripActions";
import React from "react";
import TripCard from "./TripCard";

async function PopularTrips() {
  const l = 2;
  const res = await getAllTrips({ l });
  const trips = res.trips;
  return (
    <>
      <div className="mt-4">
        <h2 className="text-3xl font-bold">Popular Itinary</h2>
      </div>
      <div className="my-4 grid grid-cols-1 xs:grid-cols-2 gap-4">
        {trips.map((trip) => (
          <TripCard trip={trip} key={trip.$id} />
        ))}
      </div>
    </>
  );
}

export default PopularTrips;
