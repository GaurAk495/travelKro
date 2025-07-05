import { getAllTrips } from "@/action/tripActions";
import Notrip from "@/components/No-trip";
import Pagination from "@/components/Pagination";
import TripCard from "@/components/TripCard";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; itemPerPage?: string }>;
}) {
  const { page, itemPerPage } = await searchParams;

  // Default values
  const currentPage = page ? Number(page) : 1;
  const limit = itemPerPage ? Number(itemPerPage) : 8;

  const res = await getAllTrips({
    p: currentPage,
    l: limit,
  });

  const trips = res.trips;
  const totalTrips = res.total || 0;
  const totalPages = Math.ceil(totalTrips / limit);

  if (trips.length === 0) {
    return <Notrip />;
  }

  return (
    <>
      <div className="px-4 sm:px-8 my-8 grid grid-cols-1 xs:grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trips.map((trip) => {
          return <TripCard trip={trip} key={trip.$id} />;
        })}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}

export default page;
