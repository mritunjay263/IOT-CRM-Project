import React from "react";
import { ProgressWidget } from "@/components/dashboard/ProgressWidget";
import { TaskList } from "@/components/dashboard/TaskList";
import { SystemHealthWidget } from "@/components/dashboard/SystemHealthWidget";
import { EnhancedDealsChart } from "@/components/dashboard/EnhancedDealsChart";
import { EnhancedTasksProgress } from "@/components/dashboard/EnhancedTasksProgress";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 min-h-full">
      {/* Top Section - Full Width */}
      <div className="w-full">
        <ProgressWidget />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        {/* Left Side - Activities & System Health (60%) */}
        <div className="lg:col-span-3 space-y-6">
          <TaskList />
          <SystemHealthWidget />
        </div>

        {/* Right Side - Charts (40%) */}
        <div className="lg:col-span-2 space-y-6">
          <EnhancedDealsChart />
          <EnhancedTasksProgress />
        </div>
      </div>
    </div>
  );
}
