import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const licenseData = [
  { type: "Basic", used: 45, total: 50, color: "bg-blue-500" },
  { type: "Premium", used: 28, total: 35, color: "bg-purple-500" },
  { type: "Enterprise", used: 12, total: 20, color: "bg-green-500" },
];

export function LicenseUsageWidget() {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          License Usage
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
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {licenseData.map((license) => {
            const percentage = (license.used / license.total) * 100;
            return (
              <div key={license.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${license.color}`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {license.type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {license.used}/{license.total}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{Math.round(percentage)}% used</span>
                  <span>{license.total - license.used} available</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
