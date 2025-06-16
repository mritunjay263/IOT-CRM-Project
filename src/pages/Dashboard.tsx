import React from "react";
import { ProgressWidget } from "@/components/dashboard/ProgressWidget";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { TaskList } from "@/components/dashboard/TaskList";
import { EnhancedDealsChart } from "@/components/dashboard/EnhancedDealsChart";
import { EnhancedTasksProgress } from "@/components/dashboard/EnhancedTasksProgress";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressWidget />
        </div>
        <div>
          <CalendarWidget />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Task List */}
        <div className="lg:col-span-2">
          <TaskList />
        </div>

        {/* Right Side - Charts */}
        <div className="space-y-6">
          <EnhancedDealsChart />
          <EnhancedTasksProgress />
        </div>
      </div>
    </div>
  );
}
