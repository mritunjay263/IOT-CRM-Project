import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Mail,
  Users,
  MessageCircle,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Circle,
  Archive,
  Send,
  Zap,
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
    name: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
    subItems: [
      {
        name: "Active",
        href: "/tasks/active",
        icon: Circle,
        color: "text-blue-500",
      },
      {
        name: "Completed",
        href: "/tasks/completed",
        icon: Circle,
        color: "text-green-500",
      },
      {
        name: "Failed",
        href: "/tasks/failed",
        icon: Circle,
        color: "text-red-500",
      },
    ],
  },
  {
    name: "Email",
    href: "/email",
    icon: Mail,
    subItems: [
      {
        name: "Draft",
        href: "/email/draft",
        icon: Circle,
        color: "text-yellow-500",
      },
      {
        name: "Scheduled",
        href: "/email/scheduled",
        icon: Circle,
        color: "text-blue-500",
      },
      {
        name: "Sent",
        href: "/email/sent",
        icon: Circle,
        color: "text-green-500",
      },
      {
        name: "Archived",
        href: "/email/archived",
        icon: Circle,
        color: "text-gray-500",
      },
    ],
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: Users,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageCircle,
  },
  {
    name: "Deals",
    href: "/deals",
    icon: TrendingUp,
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Tasks",
    "Email",
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
        "relative flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900">SaaS Kit</span>
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
                  "flex items-center justify-between group rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-50",
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
                      isActive ? "text-white" : "text-gray-500",
                    )}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
                {hasSubItems && !isCollapsed && (
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={cn(
                      "p-1 rounded-md transition-colors mr-2",
                      isActive
                        ? "hover:bg-white/20 text-white"
                        : "hover:bg-gray-100 text-gray-500",
                    )}
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
                          "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                          isSubActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
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
        <div
          className={cn(
            "flex items-center justify-between group rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-50",
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
