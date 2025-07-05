"use client";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { cn } from "@/utils/cn";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Item = {
  current: number;
  last: number;
  title: string;
};

const dummydata = [
  { value: 100 },
  { value: 200 },
  { value: 150 },
  { value: 250 },
  { value: 300 },
  { value: 280 },
];

function Metric({
  item,
  index,
  total,
}: {
  item: Item;
  index: number;
  total: number;
}) {
  return (
    <article
      key={item.title}
      className={cn(
        "p-6 w-full space-y-2 bg-white shadow border rounded-2xl",
        total - 1 === index &&
          total % 2 != 0 &&
          "sm:col-span-full lg:col-span-1"
      )}
    >
      <h3 className="text-xl">{item.title}</h3>
      <div className="grid grid-cols-[1fr_1fr] items-center">
        {/* Stats section */}
        <div className="stat-section space-y-1">
          <p className="text-5xl">{item.current.toLocaleString("en-IN")}</p>

          <div className="text-md text-zinc-500">
            <div
              className={cn(
                "flex items-center gap-1 text-[16px] flex-wrap",
                item.current > item.last ? "text-green-400" : "text-red-400"
              )}
            >
              {item.last < item.current ? (
                <>
                  <ArrowUpRight />
                  {Math.round(((item.current - item.last) / item.last) * 100)}%
                </>
              ) : (
                <>
                  <ArrowDownRight />
                  {Math.round(
                    ((item.last - item.current) / item.current) * 100
                  )}
                  %
                </>
              )}
              <span className="text-zinc-600 text-sm">vs last month</span>
            </div>
          </div>
        </div>

        {/* Chart section */}
        <div className="h-full min-h-[100px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummydata}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={item.current > item.last ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </article>
  );
}

export default Metric;
