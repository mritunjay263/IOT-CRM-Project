import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const systemMetrics = [
  {
    name: "API Server",
    status: "Healthy",
    uptime: "99.9%",
    responseTime: "45ms",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Database",
    status: "Healthy",
    uptime: "99.8%",
    responseTime: "12ms",
    color: "bg-green-100 text-green-800",
  },
  {
    name: "Message Queue",
    status: "Warning",
    uptime: "98.5%",
    responseTime: "89ms",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    name: "Device Gateway",
    status: "Healthy",
    uptime: "99.7%",
    responseTime: "23ms",
    color: "bg-green-100 text-green-800",
  },
];

const overallHealth = {
  score: 94,
  status: "Excellent",
  totalUptime: "99.2%",
};

export function SystemHealthWidget() {
  const [timeRange, setTimeRange] = useState("today");

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          System Health
        </CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32 text-sm">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="p-6 pt-0 h-52 flex flex-col">
        {/* Overall Health Score */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Overall Health
            </span>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {overallHealth.status}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Progress value={overallHealth.score} className="h-2" />
            </div>
            <span className="text-lg font-bold text-green-600">
              {overallHealth.score}%
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            System Uptime: {overallHealth.totalUptime}
          </div>
        </div>

        {/* Service Status */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {systemMetrics.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {service.name}
                    </p>
                    <Badge
                      variant="default"
                      className={`text-xs px-2 py-1 ${service.color} hover:${service.color}`}
                    >
                      {service.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-gray-500">
                      Uptime: {service.uptime}
                    </p>
                    <p className="text-xs text-gray-500">
                      Response: {service.responseTime}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
