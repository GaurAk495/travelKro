import { userAndTripsStats } from "@/action/dashboardStatsAction";
import ContentHeader from "../component/ContentHeader";
import Charts from "./Components/Charts";
import DiscoverTrips from "./Components/Discover Trips";
import Metrics from "./Components/Metrics";
import UserTable from "./Components/UserTable";

async function page() {
  const data: statsData[] = await userAndTripsStats();
  return (
    data && (
      <>
        <ContentHeader page="dashboard" />
        <Metrics data={data} />
        <DiscoverTrips />
        <Charts data={data} />
        <UserTable dataObj={data} />
      </>
    )
  );
}

export default page;
