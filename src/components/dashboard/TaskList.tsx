import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const tasks = [
  {
    id: 1,
    title: "Send benefit review by Sunday",
    dueDate: "Due 24th • December 23, 2018",
    assignee: {
      name: "George Fields",
      avatar: "/placeholder.svg",
      initials: "GF",
    },
    status: "Completed",
    reminder: "Reminder",
  },
  {
    id: 2,
    title: "Invite to office meet-up",
    dueDate: "Due 24th • December 23, 2018",
    assignee: {
      name: "Rebecca Moore",
      avatar: "/placeholder.svg",
      initials: "RM",
    },
    status: "Failed",
    type: "Call",
  },
  {
    id: 3,
    title: "Office meet-up",
    dueDate: "Due 24th • December 23, 2018",
    assignee: {
      name: "Lindsay Stroud",
      avatar: "/placeholder.svg",
      initials: "LS",
    },
    status: "Completed",
    type: "Event",
  },
];

export function TaskList() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-80 w-full">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                  />
                  <AvatarFallback className="bg-gray-200 text-gray-700 text-sm">
                    {task.assignee.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500">{task.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {task.reminder && (
                  <span className="text-xs text-primary">{task.reminder}</span>
                )}
                {task.type && (
                  <span className="text-xs text-gray-500">{task.type}</span>
                )}
                <Badge
                  variant={
                    task.status === "Completed" ? "default" : "destructive"
                  }
                  className={`
                    text-xs px-2 py-1
                    ${
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  `}
                >
                  {task.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <button className="text-sm text-primary hover:underline">
            Show more
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
