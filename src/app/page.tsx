import { getAllTrips } from "@/action/tripActions";
import FeaturedPost from "@/components/homeComponents/FeaturedPost";
import Header from "@/components/homeComponents/Header";
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
  return (
    <>
      <Header />
      <FeaturedPost />
      <div className="handpicked-trips px-4 md:px-20">
        <h2 className="text-center text-2xl sm:text-4xl font-semibold mb-5">
          Handpicked Trips
        </h2>
        <p className="text-center text-slate-500 mb-6">
          Browse well-planned trips designed for different travel styles and
          interests
        </p>
        <div className="trips-container">
          <div className="px-4 sm:px-8 my-8 grid grid-cols-1 xs:grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {trips.map((trip) => {
              return <TripCard trip={trip} key={trip.$id} />;
            })}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
}

export default page;
