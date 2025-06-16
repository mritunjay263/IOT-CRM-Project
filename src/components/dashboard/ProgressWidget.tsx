import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ProgressWidget() {
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
            <button className="text-sm text-primary hover:underline">
              Show this week
            </button>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
