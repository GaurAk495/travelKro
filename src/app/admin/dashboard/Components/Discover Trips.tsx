import { getAllTrips } from "@/action/tripActions";
import TripCard from "@/components/TripCard";

async function DiscoverTrips() {
  const data = await getAllTrips({ l: 4 });
  const allTrips = data.trips;
  return (
    <div className="Trips-Section px-4 sm:px-8 space-y-4 my-4">
      <h3 className="text-2xl">Trips</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allTrips.map((trip) => (
          <TripCard key={trip.$id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
export default DiscoverTrips;
