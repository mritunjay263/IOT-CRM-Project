import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Device {
  clientId: string;
  clientName: string;
  deviceId: string;
  deviceName: string;
  status: "Active" | "Inactive";
  location: string;
  lastSeen: string;
}

const devicesData: Device[] = [
  {
    clientId: "CLT-001",
    clientName: "TechCorp Industries",
    deviceId: "DEV-001",
    deviceName: "Temperature Sensor A1",
    status: "Active",
    location: "Factory Floor A - Section 1",
    lastSeen: "2 minutes ago",
  },
  {
    clientId: "CLT-001",
    clientName: "TechCorp Industries",
    deviceId: "DEV-002",
    deviceName: "Humidity Monitor B2",
    status: "Active",
    location: "Factory Floor A - Section 2",
    lastSeen: "5 minutes ago",
  },
  {
    clientId: "CLT-002",
    clientName: "Smart Manufacturing Ltd",
    deviceId: "DEV-003",
    deviceName: "Motion Detector C1",
    status: "Inactive",
    location: "Warehouse B - Entrance",
    lastSeen: "2 hours ago",
  },
  {
    clientId: "CLT-002",
    clientName: "Smart Manufacturing Ltd",
    deviceId: "DEV-004",
    deviceName: "Air Quality Monitor D1",
    status: "Inactive",
    location: "Production Line 1",
    lastSeen: "30 minutes ago",
  },
  {
    clientId: "CLT-003",
    clientName: "GreenEnergy Solutions",
    deviceId: "DEV-005",
    deviceName: "Pressure Gauge E1",
    status: "Active",
    location: "Solar Panel Array - Section A",
    lastSeen: "1 minute ago",
  },
  {
    clientId: "CLT-003",
    clientName: "GreenEnergy Solutions",
    deviceId: "DEV-006",
    deviceName: "Vibration Sensor F1",
    status: "Inactive",
    location: "Wind Turbine Tower 3",
    lastSeen: "1 day ago",
  },
  {
    clientId: "CLT-004",
    clientName: "AutoTech Systems",
    deviceId: "DEV-007",
    deviceName: "GPS Tracker G1",
    status: "Active",
    location: "Vehicle Fleet - Unit 12",
    lastSeen: "Just now",
  },
];

export default function Devices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredDevices = devicesData.filter(
    (device) =>
      device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.clientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDevices = filteredDevices.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Inactive":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleAction = (action: string, deviceId: string) => {
    console.log(`${action} action for device ${deviceId}`);
    // Implement action logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all IoT devices across clients
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate("/devices/add")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Device Directory
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDevices.map((device) => (
                  <tr
                    key={device.deviceId}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {device.clientId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {device.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {device.deviceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {device.deviceName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {device.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="default"
                        className={`text-xs px-2 py-1 ${getStatusColor(device.status)}`}
                      >
                        {device.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {device.lastSeen}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-2">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleAction("enable", device.deviceId)
                            }
                          >
                            Enable
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleAction("disable", device.deviceId)
                            }
                          >
                            Disable
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredDevices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No devices found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredDevices.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Results info */}
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredDevices.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredDevices.length}</span>{" "}
                  results
                </div>

                {/* Pagination controls */}
                <div className="flex items-center space-x-4">
                  {/* Items per page */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Show:</label>
                    <select
                      value={itemsPerPage}
                      onChange={(e) =>
                        handleItemsPerPageChange(Number(e.target.value))
                      }
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>

                  {/* Page navigation */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .slice(
                          Math.max(0, currentPage - 3),
                          Math.min(totalPages, currentPage + 2),
                        )
                        .map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 text-sm border rounded-md ${
                              page === currentPage
                                ? "bg-primary text-white border-primary"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
