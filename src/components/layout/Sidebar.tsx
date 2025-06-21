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
    href: "#", // No direct route
    icon: Users,
    subItems: [
      {
        name: "Clients",
        href: "/clients",
        icon: Users,
        color: "text-blue-500",
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
    href: "#", // No direct route
    icon: Smartphone,
    subItems: [
      {
        name: "Devices",
        href: "/devices",
        icon: Smartphone,
        color: "text-blue-500",
      },
      {
        name: "Add Devices",
        href: "/devices/add",
        icon: UserPlus,
        color: "text-primary",
      },
    ],
  },
  {
    name: "License Management",
    href: "/licenses",
    icon: Shield,
  },
  {
    name: "Analytics & Reports",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Data Monitoring",
    href: "/monitoring",
    icon: Database,
  },
];

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
        "relative flex flex-col min-h-screen bg-white border-r border-gray-200 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 h-[73px] flex-shrink-0">
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
      <div className="p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" alt="Mritunjay Pandey" />
            <AvatarFallback className="bg-primary text-white">
              MP
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Mritunjay Pandey
              </p>
              <p className="text-xs text-gray-500 truncate">
                mritunjay.mailme@gmail.com
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
                {item.href === "#" ? (
                  <div
                    className={cn(
                      "flex items-center flex-1 px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer",
                      isCollapsed && "justify-center",
                    )}
                    onClick={() => hasSubItems && toggleExpanded(item.name)}
                  >
                    <item.icon
                      className={cn(
                        "w-5 h-5",
                        !isCollapsed && "mr-3",
                        isActive ? "text-primary" : "text-gray-500",
                      )}
                    />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                ) : (
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
                )}
                {hasSubItems && !isCollapsed && (
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className="p-1 rounded-md transition-all duration-200 mr-2 hover:bg-gray-100 text-gray-500 hover:scale-110 active:scale-95"
                  >
                    <div className="transition-transform duration-300 ease-in-out">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-all duration-200" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-all duration-200" />
                      )}
                    </div>
                  </button>
                )}
              </div>

              {/* Sub Items */}
              {hasSubItems && !isCollapsed && (
                <div
                  className={cn(
                    "ml-6 overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="space-y-1 py-1">
                    {item.subItems?.map((subItem, index) => {
                      const isSubActive = location.pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200 ease-in-out transform",
                            isSubActive
                              ? "text-primary font-medium bg-primary/5 translate-x-1"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-1",
                            isExpanded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-2 opacity-0",
                          )}
                          style={{
                            transitionDelay: isExpanded
                              ? `${index * 50}ms`
                              : "0ms",
                          }}
                        >
                          {subItem.icon && (
                            <subItem.icon
                              className={cn(
                                "w-3 h-3 mr-3 transition-transform duration-200",
                                subItem.color || "text-gray-400",
                                isSubActive && "scale-110",
                              )}
                            />
                          )}
                          <span className="transition-all duration-200">
                            {subItem.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
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
