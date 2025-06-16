import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 60, color: "#10B981" },
  { name: "Active", value: 25, color: "#F59E0B" },
  { name: "Ended", value: 15, color: "#EF4444" },
];

const COLORS = {
  Completed: "#10B981",
  Active: "#F59E0B",
  Ended: "#EF4444",
};

export function EnhancedTasksProgress() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tasks
        </CardTitle>
        <button className="text-sm text-primary hover:text-primary/80">
          Show: This month
        </button>
      </CardHeader>
      <CardContent className="p-6 pt-0 h-52 flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Donut Chart */}
          <div className="relative w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  startAngle={90}
                  endAngle={450}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-500">60%</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3 ml-6">
            {data.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
