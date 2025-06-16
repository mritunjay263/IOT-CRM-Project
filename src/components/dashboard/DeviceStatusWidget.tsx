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

const deviceData = [
  {
    id: "IOT-001",
    name: "Temperature Sensor",
    status: "Online",
    location: "Factory Floor A",
    battery: 85,
  },
  {
    id: "IOT-002",
    name: "Humidity Monitor",
    status: "Online",
    location: "Warehouse B",
    battery: 92,
  },
  {
    id: "IOT-003",
    name: "Motion Detector",
    status: "Offline",
    location: "Office Building",
    battery: 15,
  },
  {
    id: "IOT-004",
    name: "Air Quality Sensor",
    status: "Warning",
    location: "Production Line",
    battery: 45,
  },
  {
    id: "IOT-005",
    name: "Pressure Gauge",
    status: "Online",
    location: "Pump Station",
    battery: 78,
  },
];

export function DeviceStatusWidget() {
  const [timeRange, setTimeRange] = useState("today");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Offline":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return "text-green-600";
    if (battery > 20) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Device Status
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
      <CardContent className="p-6 pt-0 h-52 overflow-y-auto">
        <div className="space-y-3">
          {deviceData.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {device.name}
                  </p>
                  <Badge
                    variant="default"
                    className={`text-xs px-2 py-1 ${getStatusColor(device.status)}`}
                  >
                    {device.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">{device.location}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-xs font-medium ${getBatteryColor(device.battery)}`}
                >
                  {device.battery}%
                </p>
                <p className="text-xs text-gray-400">Battery</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
