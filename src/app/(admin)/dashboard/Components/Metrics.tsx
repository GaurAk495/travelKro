import { metricsData } from "@/constants";
import Metric from "./Metric";

function Metrics() {
  return (
    <div className=" px-4 sm:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {metricsData.map((item, i) => (
        <Metric
          key={item.title}
          index={i}
          item={item}
          total={metricsData.length}
        />
      ))}
    </div>
  );
}

export default Metrics;
