import Metric from "./Metric";

async function Metrics({ data }: { data: statsData[] }) {
  return (
    <div className=" px-4 sm:px-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <Metric key={item.title} index={i} item={item} total={data.length} />
      ))}
    </div>
  );
}

export default Metrics;
