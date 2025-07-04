import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    title: "Device #IOT-001 connected successfully",
    timestamp: "2 minutes ago • December 23, 2024",
    user: {
      name: "System Admin",
      avatar: "/placeholder.svg",
      initials: "SA",
    },
    status: "Connected",
    type: "Device",
  },
  {
    id: 2,
    title: "License key generated for Client ABC Corp",
    timestamp: "15 minutes ago • December 23, 2024",
    user: {
      name: "Mritunjay Pandey",
      avatar: "/placeholder.svg",
      initials: "MP",
    },
    status: "Generated",
    type: "License",
  },
  {
    id: 3,
    title: "Memory threshold alert for Device #IOT-003",
    timestamp: "1 hour ago • December 23, 2024",
    user: {
      name: "System Monitor",
      avatar: "/placeholder.svg",
      initials: "SM",
    },
    status: "Alert",
    type: "Warning",
  },
  {
    id: 4,
    title: "New client registration completed",
    timestamp: "3 hours ago • December 23, 2024",
    user: {
      name: "Registration Bot",
      avatar: "/placeholder.svg",
      initials: "RB",
    },
    status: "Completed",
    type: "Client",
  },
];

export function TaskList() {
  const navigate = useNavigate();

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardContent className="p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activities
        </h3>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={activity.user.avatar}
                    alt={activity.user.name}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {activity.type && (
                  <span className="text-xs text-gray-500">{activity.type}</span>
                )}
                <Badge
                  variant="default"
                  className={`
                    text-xs px-2 py-1
                    ${
                      activity.status === "Connected" ||
                      activity.status === "Completed" ||
                      activity.status === "Generated"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : activity.status === "Alert"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    }
                  `}
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate("/notifications")}
            className="text-sm text-primary hover:underline"
          >
            Show more
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
