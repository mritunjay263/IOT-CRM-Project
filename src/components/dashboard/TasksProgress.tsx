import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Active", value: 25, color: "bg-yellow-400" },
  { label: "Completed", value: 60, color: "bg-green-400" },
  { label: "Other", value: 15, color: "bg-gray-300" },
];

export function TasksProgress() {
  return (
    <Card className="bg-white border-0 shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Tasks
        </CardTitle>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Show This month
        </button>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Progress Circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100, 100"
              />
              <path
                className="text-green-400"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="60, 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">60%</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {stat.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
