import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // Sample notifications for dropdown
  const notifications = [
    {
      id: 1,
      title: "Device Offline Alert",
      message: "Motion Detector C1 has gone offline",
      time: "2 min ago",
      type: "error",
    },
    {
      id: 2,
      title: "System Update",
      message: "IoT Control Hub updated to v2.1.3",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      title: "Low Battery Warning",
      message: "Temperature Sensor A1 battery below 15%",
      time: "3 hours ago",
      type: "warning",
    },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-6 bg-white border-b border-gray-200 h-[73px]">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Global search"
            className="pl-10 pr-4 py-2 w-full border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">
                Notifications
              </h3>
              <p className="text-xs text-gray-500">
                You have {notifications.length} unread notifications
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate("/notifications")}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        notification.type === "error"
                          ? "bg-red-500"
                          : notification.type === "warning"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-primary hover:bg-primary/10"
                onClick={() => navigate("/notifications")}
              >
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-auto">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://lh3.googleusercontent.com/a/ACg8ocLkj7ej_c9Fy4zmOS02ex7JYWSAhcAfQs420cT-Z47VUHOE8S4L=s576-c-no"
                  alt="Mritunjay Pandey"
                />
                <AvatarFallback className="bg-primary text-white text-sm">
                  MP
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
