import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Smartphone,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Circle,
  BarChart3,
  UserPlus,
  Bell,
  Wifi,
  Database,
  Key,
  Mail,
  MessageCircle,
  Smartphone as Phone,
  Lock,
  RotateCcw,
  FileText,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  subItems?: {
    name: string;
    href: string;
    icon?: React.ComponentType<any>;
    color?: string;
  }[];
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Clients",
    href: "/clients",
    icon: Users,
    subItems: [
      {
        name: "All Clients",
        href: "/clients/all",
        icon: Circle,
        color: "text-blue-500",
      },
      {
        name: "Active",
        href: "/clients/active",
        icon: Circle,
        color: "text-green-500",
      },
      {
        name: "Inactive",
        href: "/clients/inactive",
        icon: Circle,
        color: "text-gray-500",
      },
      {
        name: "Add Client",
        href: "/clients/add",
        icon: UserPlus,
        color: "text-primary",
      },
    ],
  },
  {
    name: "Devices",
    href: "/devices",
    icon: Smartphone,
    subItems: [
      {
        name: "All Devices",
        href: "/devices/all",
        icon: Circle,
        color: "text-blue-500",
      },
      {
        name: "Online",
        href: "/devices/online",
        icon: Circle,
        color: "text-green-500",
      },
      {
        name: "Offline",
        href: "/devices/offline",
        icon: Circle,
        color: "text-red-500",
      },
      {
        name: "Maintenance",
        href: "/devices/maintenance",
        icon: Circle,
        color: "text-yellow-500",
      },
    ],
  },
  {
    name: "License Management",
    href: "/licenses",
    icon: Shield,
    subItems: [
      {
        name: "Generate License",
        href: "/licenses/generate",
        icon: Key,
        color: "text-green-500",
      },
      {
        name: "Active Licenses",
        href: "/licenses/active",
        icon: Circle,
        color: "text-green-500",
      },
      {
        name: "Expired",
        href: "/licenses/expired",
        icon: Circle,
        color: "text-red-500",
      },
      {
        name: "Pending",
        href: "/licenses/pending",
        icon: Circle,
        color: "text-yellow-500",
      },
    ],
  },
  {
    name: "Analytics & Reports",
    href: "/analytics",
    icon: BarChart3,
    subItems: [
      {
        name: "Device Performance",
        href: "/analytics/devices",
        icon: Activity,
        color: "text-blue-500",
      },
      {
        name: "Usage Reports",
        href: "/analytics/usage",
        icon: FileText,
        color: "text-green-500",
      },
      {
        name: "Client Analytics",
        href: "/analytics/clients",
        icon: Users,
        color: "text-purple-500",
      },
    ],
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    subItems: [
      {
        name: "Device Alerts",
        href: "/notifications/devices",
        icon: Circle,
        color: "text-red-500",
      },
      {
        name: "System Alerts",
        href: "/notifications/system",
        icon: Circle,
        color: "text-yellow-500",
      },
      {
        name: "Client Notifications",
        href: "/notifications/clients",
        icon: Circle,
        color: "text-blue-500",
      },
    ],
  },
  {
    name: "Data Monitoring",
    href: "/monitoring",
    icon: Database,
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Clients",
    "Devices",
    "Settings",
  ]);

  const toggleExpanded = (itemName: string) => {
    if (isCollapsed) return;
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName],
    );
  };

  const isItemActive = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  const isItemExpanded = (itemName: string) => {
    return expandedItems.includes(itemName);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-white transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wifi className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">IoT Control Hub</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" alt="Sierra Ferguson" />
            <AvatarFallback className="bg-primary text-white">
              SF
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Sierra Ferguson
              </p>
              <p className="text-xs text-gray-500 truncate">
                s.ferguson@gmail.com
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = isItemActive(item.href);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isExpanded = isItemExpanded(item.name);

          return (
            <div key={item.name} className="space-y-1">
              {/* Main Item */}
              <div
                className={cn(
                  "flex items-center justify-between group transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-gray-700 hover:text-gray-900",
                )}
              >
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center flex-1 px-3 py-2.5 text-sm font-medium transition-colors",
                    isCollapsed && "justify-center",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5",
                      !isCollapsed && "mr-3",
                      isActive ? "text-primary" : "text-gray-500",
                    )}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
                {hasSubItems && !isCollapsed && (
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className="p-1 rounded-md transition-colors mr-2 hover:bg-gray-100 text-gray-500"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Sub Items */}
              {hasSubItems && !isCollapsed && isExpanded && (
                <div className="ml-6 space-y-1">
                  {item.subItems?.map((subItem) => {
                    const isSubActive = location.pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.name}
                        to={subItem.href}
                        className={cn(
                          "flex items-center px-3 py-2 text-sm transition-colors",
                          isSubActive
                            ? "text-primary font-medium"
                            : "text-gray-600 hover:text-gray-900",
                        )}
                      >
                        {subItem.icon && (
                          <subItem.icon
                            className={cn(
                              "w-3 h-3 mr-3 fill-current",
                              subItem.color || "text-gray-400",
                            )}
                          />
                        )}
                        <span>{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center justify-between group transition-all duration-200",
              location.pathname.startsWith("/settings")
                ? "text-primary"
                : "text-gray-700 hover:text-gray-900",
            )}
          >
            <Link
              to="/settings"
              className={cn(
                "flex items-center flex-1 px-3 py-2.5 text-sm font-medium transition-colors",
                isCollapsed && "justify-center",
              )}
            >
              <Settings
                className={cn("w-5 h-5 text-gray-500", !isCollapsed && "mr-3")}
              />
              {!isCollapsed && <span>Settings</span>}
            </Link>
            {!isCollapsed && (
              <button
                onClick={() => toggleExpanded("Settings")}
                className="p-1 rounded-md transition-colors mr-2 hover:bg-gray-100 text-gray-500"
              >
                {isItemExpanded("Settings") ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          {/* Settings Sub Items */}
          {!isCollapsed && isItemExpanded("Settings") && (
            <div className="ml-6 space-y-1">
              {[
                {
                  name: "Email Configuration",
                  href: "/settings/email",
                  icon: Mail,
                },
                {
                  name: "WhatsApp Configuration",
                  href: "/settings/whatsapp",
                  icon: MessageCircle,
                },
                {
                  name: "SMS Configuration",
                  href: "/settings/sms",
                  icon: Phone,
                },
                {
                  name: "Security Settings",
                  href: "/settings/security",
                  icon: Lock,
                },
                { name: "API Keys", href: "/settings/api", icon: Key },
                {
                  name: "Backup & Restore",
                  href: "/settings/backup",
                  icon: RotateCcw,
                },
                {
                  name: "System Preferences",
                  href: "/settings/system",
                  icon: Settings,
                },
              ].map((subItem) => {
                const isSubActive = location.pathname === subItem.href;
                return (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm transition-colors",
                      isSubActive
                        ? "text-primary font-medium"
                        : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    <subItem.icon className="w-3 h-3 mr-3 text-gray-400" />
                    <span>{subItem.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onToggle}
            className="flex items-center w-full px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Toggle sidebar</span>
          </button>
        </div>
      )}
    </div>
  );
}
