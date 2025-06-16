import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProgressWidget() {
  const [timeRange, setTimeRange] = useState("week");
  const memoryUsed = 6.4;
  const totalMemory = 8.0;
  const percentage = (memoryUsed / totalMemory) * 100;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-32 w-full">
      <CardContent className="p-6 h-full flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Device Memory Utilization: {memoryUsed}GB / {totalMemory}GB
            </h3>
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
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
