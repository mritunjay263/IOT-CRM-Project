import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "1 Dec", value: 50 },
  { name: "8 Dec", value: 80 },
  { name: "16 Dec", value: 120 },
  { name: "24 Dec", value: 90 },
  { name: "31 Dec", value: 110 },
];

export function DealsChart() {
  return (
    <Card className="bg-white border-0 shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Deals
        </CardTitle>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Show Monthly
        </button>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <YAxis hide />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#3B82F6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <span>200</span>
          <span>350</span>
        </div>
      </CardContent>
    </Card>
  );
}
