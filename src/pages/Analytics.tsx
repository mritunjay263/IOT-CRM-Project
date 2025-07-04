import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Smartphone,
  Download,
  Calendar,
  Filter,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const deviceUsageData = [
  { month: "Jan", devices: 245, active: 198 },
  { month: "Feb", devices: 267, active: 223 },
  { month: "Mar", devices: 289, active: 251 },
  { month: "Apr", devices: 312, active: 278 },
  { month: "May", devices: 334, active: 298 },
  { month: "Jun", devices: 356, active: 312 },
  { month: "Jul", devices: 378, active: 334 },
  { month: "Aug", devices: 401, active: 356 },
  { month: "Sep", devices: 423, active: 378 },
  { month: "Oct", devices: 445, active: 401 },
  { month: "Nov", devices: 467, active: 423 },
  { month: "Dec", devices: 489, active: 445 },
];

const clientGrowthData = [
  { month: "Jan", clients: 12 },
  { month: "Feb", clients: 15 },
  { month: "Mar", clients: 18 },
  { month: "Apr", clients: 22 },
  { month: "May", clients: 26 },
  { month: "Jun", clients: 29 },
  { month: "Jul", clients: 33 },
  { month: "Aug", clients: 37 },
  { month: "Sep", clients: 41 },
  { month: "Oct", clients: 45 },
  { month: "Nov", clients: 48 },
  { month: "Dec", clients: 52 },
];

const deviceStatusData = [
  { name: "Active", value: 423, color: "#10B981" },
  { name: "Inactive", value: 66, color: "#EF4444" },
  { name: "Maintenance", value: 23, color: "#F59E0B" },
];

const licenseStatusData = [
  { month: "Jan", active: 234, expired: 12, expiring: 8 },
  { month: "Feb", active: 256, expired: 15, expiring: 11 },
  { month: "Mar", active: 278, expired: 18, expiring: 13 },
  { month: "Apr", active: 301, expired: 22, expiring: 16 },
  { month: "May", active: 323, expired: 25, expiring: 18 },
  { month: "Jun", active: 345, expired: 28, expiring: 21 },
];

export default function Analytics() {
  const [dateRange, setDateRange] = useState("last12months");

  const stats = {
    totalDevices: 489,
    activeDevices: 423,
    totalClients: 52,
    totalLicenses: 367,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics & Reports
          </h1>
          <p className="text-gray-500 mt-1">
            Comprehensive insights into your IoT infrastructure and performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Devices
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalDevices}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Devices
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeDevices}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalClients}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Active Licenses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalLicenses}
                </p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +6% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Usage Trend */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Device Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deviceUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="devices"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Client Growth */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Client Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={clientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Status Distribution */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Device Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center space-x-6 mt-4">
                {deviceStatusData.map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Status */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              License Status Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={licenseStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="active" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="expired" fill="#EF4444" radius={[2, 2, 0, 0]} />
                  <Bar
                    dataKey="expiring"
                    fill="#F59E0B"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
                <span className="text-sm text-gray-600">Expired</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2 bg-yellow-500"></div>
                <span className="text-sm text-gray-600">Expiring</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">86.5%</div>
              <div className="text-sm text-gray-600 mt-1">Device Uptime</div>
              <div className="text-xs text-gray-500 mt-1">
                Above industry average
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.1s</div>
              <div className="text-sm text-gray-600 mt-1">
                Avg Response Time
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Excellent performance
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">99.2%</div>
              <div className="text-sm text-gray-600 mt-1">Data Accuracy</div>
              <div className="text-xs text-gray-500 mt-1">
                High quality data
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
