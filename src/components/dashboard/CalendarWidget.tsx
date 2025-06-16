import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = [24, 25, 26, 27, 28, 29];

export function CalendarWidget() {
  const today = 24; // December 24th

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-32 w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          23 December, Sunday
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-6 gap-2">
          {weekDays.slice(0, 6).map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs font-medium text-gray-500 mb-2">
                {day}
              </div>
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  dates[index] === today
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
              >
                {dates[index]}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
