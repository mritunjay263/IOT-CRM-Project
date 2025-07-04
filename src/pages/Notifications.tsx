import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, BellRing, Check, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  timestamp: string;
  deviceId?: string;
  clientId?: string;
}

const notificationsData: Notification[] = [
  {
    id: "1",
    title: "Device Offline Alert",
    message: "Motion Detector C1 has gone offline at Warehouse B - Entrance",
    type: "error",
    isRead: false,
    timestamp: "2 minutes ago",
    deviceId: "DEV-003",
    clientId: "CLT-002",
  },
  {
    id: "2",
    title: "System Update Complete",
    message:
      "IoT Control Hub system update v2.1.3 has been successfully installed",
    type: "success",
    isRead: false,
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    title: "Low Battery Warning",
    message: "Temperature Sensor A1 battery level is below 15%",
    type: "warning",
    isRead: true,
    timestamp: "3 hours ago",
    deviceId: "DEV-001",
    clientId: "CLT-001",
  },
  {
    id: "4",
    title: "New Client Registration",
    message: "HealthCare Connect has been successfully registered",
    type: "info",
    isRead: true,
    timestamp: "1 day ago",
    clientId: "CLT-005",
  },
  {
    id: "5",
    title: "Device Maintenance Required",
    message: "Air Quality Monitor D1 scheduled maintenance is due",
    type: "warning",
    isRead: true,
    timestamp: "2 days ago",
    deviceId: "DEV-004",
    clientId: "CLT-002",
  },
];

export default function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter(
    (notification) => filter === "all" || !notification.isRead,
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-600";
      case "warning":
        return "bg-yellow-100 text-yellow-600";
      case "success":
        return "bg-green-100 text-green-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "warning":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "success":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "info":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            Stay updated with system alerts and device status
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Notifications
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <BellRing className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {unreadCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Critical Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {notifications.filter((n) => n.type === "error").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Notifications
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
                className={
                  filter === "all" ? "bg-primary hover:bg-primary/90" : ""
                }
              >
                All
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("unread")}
                className={
                  filter === "unread" ? "bg-primary hover:bg-primary/90" : ""
                }
              >
                Unread ({unreadCount})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {filter === "unread"
                  ? "No unread notifications"
                  : "No notifications found"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-6 hover:bg-gray-50 transition-colors",
                    !notification.isRead && "bg-blue-50/30",
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={cn(
                        "p-2 rounded-lg flex-shrink-0",
                        getNotificationIcon(notification.type),
                      )}
                    >
                      <Bell className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3
                              className={cn(
                                "text-sm font-medium",
                                !notification.isRead
                                  ? "text-gray-900"
                                  : "text-gray-700",
                              )}
                            >
                              {notification.title}
                            </h3>
                            <Badge
                              variant="default"
                              className={`text-xs px-2 py-0.5 ${getNotificationBadge(notification.type)}`}
                            >
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </Badge>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{notification.timestamp}</span>
                            {notification.deviceId && (
                              <span>Device: {notification.deviceId}</span>
                            )}
                            {notification.clientId && (
                              <span>Client: {notification.clientId}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 h-auto"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 h-auto"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
