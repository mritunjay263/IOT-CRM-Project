import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "1 Dec", value: 50 },
  { name: "8 Dec", value: 100 },
  { name: "16 Dec", value: 160 },
  { name: "24 Dec", value: 80 },
  { name: "31 Dec", value: 146 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg">
        <p className="text-sm font-medium">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export function EnhancedDealsChart() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Deals
        </CardTitle>
        <button className="text-sm text-primary hover:text-primary/80">
          Show: Monthly
        </button>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="text-sm text-gray-600">Closed deals</span>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                domain={[0, 200]}
                ticks={[0, 50, 100, 150, 200]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorValue)"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#3B82F6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
