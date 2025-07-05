"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  XAxis,
  ComposedChart,
  Bar,
  Line,
  LabelList,
  Tooltip,
} from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = {
  title: string;
  grStats: { [key: string]: number };
  current: number;
  last: number;
  itinearyByInterest?: any;
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    dataKey: string;
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const unique = payload.find((p) => p.dataKey === "user_bar");

    return (
      <div className="bg-white border p-2 rounded shadow">
        <p className="font-semibold">{label}</p>
        <p className="text-sm">{`${unique?.name}: ${unique?.value}`}</p>
      </div>
    );
  }

  return null;
};

const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
});

function Charts({ data }: { data: Data[] }) {
  const chartData = Object.entries(data[0].grStats).map(([date, user]) => ({
    date: formatter.format(new Date(date)),
    user_bar: user,
    user_line: user,
  }));
  const chartDataforTrips = Object.entries(data[1].itinearyByInterest).map(
    ([label, total]) => ({
      label,
      total,
    })
  );

  return (
    <div className="px-4 sm:px-8 space-y-4 my-4">
      <h3 className="text-2xl font-semibold">📈 Stats Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              {/* <ResponsiveContainer width="100%" height="100%"> */}
              <ComposedChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  key="user_bar"
                  dataKey="user_bar"
                  yAxisId="left"
                  name="User"
                  fill="var(--color-desktop)"
                  radius={[18, 18, 18, 18]}
                  fillOpacity={0.8}
                >
                  <LabelList
                    dataKey="user_bar"
                    position="top"
                    style={{ fill: "#333", fontWeight: 500, fontSize: 12 }}
                  />
                </Bar>

                <Line
                  key="user_line"
                  type="monotone"
                  name="User"
                  dataKey="user_line"
                  yAxisId="left"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                  dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
                />
              </ComposedChart>
              {/* </ResponsiveContainer> */}
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Trip Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              {/* <ResponsiveContainer width="100%" height="100%"> */}
              <ComposedChart data={chartDataforTrips}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={{ fill: "#f0f0f0" }}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Bar
                  dataKey="total"
                  yAxisId="left"
                  fill="var(--color-desktop)"
                  radius={[18, 18, 18, 18]}
                  // barSize={60}
                >
                  <LabelList
                    position="insideTop"
                    style={{
                      fill: "white",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  />
                </Bar>
              </ComposedChart>
              {/* </ResponsiveContainer> */}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Charts;
