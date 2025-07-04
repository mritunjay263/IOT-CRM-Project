import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Search, Shield, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface License {
  clientId: string;
  clientName: string;
  mappedDeviceId: string;
  mappedDeviceName: string;
  validUpToDays: number;
  status: "Active" | "Expired" | "Revoked" | "Pending";
  serialNumber: string;
}

const licensesData: License[] = [
  {
    clientId: "CLT-001",
    clientName: "TechCorp Industries",
    mappedDeviceId: "DEV-001",
    mappedDeviceName: "Temperature Sensor A1",
    validUpToDays: 45,
    status: "Active",
    serialNumber: "LIC-TC-001-2024",
  },
  {
    clientId: "CLT-001",
    clientName: "TechCorp Industries",
    mappedDeviceId: "DEV-002",
    mappedDeviceName: "Humidity Monitor B2",
    validUpToDays: 45,
    status: "Active",
    serialNumber: "LIC-TC-002-2024",
  },
  {
    clientId: "CLT-002",
    clientName: "Smart Manufacturing Ltd",
    mappedDeviceId: "DEV-003",
    mappedDeviceName: "Motion Detector C1",
    validUpToDays: -5,
    status: "Expired",
    serialNumber: "LIC-SM-003-2023",
  },
  {
    clientId: "CLT-002",
    clientName: "Smart Manufacturing Ltd",
    mappedDeviceId: "DEV-004",
    mappedDeviceName: "Air Quality Monitor D1",
    validUpToDays: 120,
    status: "Active",
    serialNumber: "LIC-SM-004-2024",
  },
  {
    clientId: "CLT-003",
    clientName: "GreenEnergy Solutions",
    mappedDeviceId: "DEV-005",
    mappedDeviceName: "Pressure Gauge E1",
    validUpToDays: 0,
    status: "Revoked",
    serialNumber: "LIC-GE-005-2024",
  },
  {
    clientId: "CLT-003",
    clientName: "GreenEnergy Solutions",
    mappedDeviceId: "DEV-006",
    mappedDeviceName: "Vibration Sensor F1",
    validUpToDays: 30,
    status: "Active",
    serialNumber: "LIC-GE-006-2024",
  },
  {
    clientId: "CLT-004",
    clientName: "AutoTech Systems",
    mappedDeviceId: "DEV-007",
    mappedDeviceName: "GPS Tracker G1",
    validUpToDays: 90,
    status: "Active",
    serialNumber: "LIC-AT-007-2024",
  },
  {
    clientId: "CLT-005",
    clientName: "HealthCare Connect",
    mappedDeviceId: "DEV-008",
    mappedDeviceName: "Heart Rate Monitor H1",
    validUpToDays: 15,
    status: "Pending",
    serialNumber: "LIC-HC-008-2024",
  },
];

export default function Licenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredLicenses = licensesData.filter(
    (license) =>
      license.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.mappedDeviceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      license.mappedDeviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredLicenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLicenses = filteredLicenses.slice(startIndex, endIndex);

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
      case "Expired":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Revoked":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getValidityColor = (days: number) => {
    if (days < 0) return "text-red-600 font-medium"; // Expired
    if (days <= 7) return "text-orange-600 font-medium"; // Expiring soon
    if (days <= 30) return "text-yellow-600 font-medium"; // Warning
    return "text-green-600 font-medium"; // Good
  };

  const getValidityText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return "Expires today";
    if (days === 1) return "Expires in 1 day";
    return `Expires in ${days} days`;
  };

  const handleAction = (action: string, license: License) => {
    console.log(`${action} action for license ${license.serialNumber}`);
    // Implement action logic here
  };

  // Calculate statistics
  const stats = {
    total: licensesData.length,
    active: licensesData.filter((l) => l.status === "Active").length,
    expired: licensesData.filter((l) => l.status === "Expired").length,
    expiringSoon: licensesData.filter(
      (l) => l.validUpToDays > 0 && l.validUpToDays <= 30,
    ).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            License Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage device licenses and track validity across all clients
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Key className="w-4 h-4 mr-2" />
          Generate New License
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Total Licenses
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Expired</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.expired}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Expiring Soon
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.expiringSoon}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Licenses Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              License Directory
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search licenses..."
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
                    Mapped Device ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mapped Device Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valid Up To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Serial Number
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLicenses.map((license) => (
                  <tr
                    key={license.serialNumber}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {license.clientId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {license.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {license.mappedDeviceId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {license.mappedDeviceName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`text-sm ${getValidityColor(license.validUpToDays)}`}
                      >
                        {getValidityText(license.validUpToDays)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant="default"
                        className={`text-xs px-2 py-1 ${getStatusColor(license.status)}`}
                      >
                        {license.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">
                        {license.serialNumber}
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
                            onClick={() => handleAction("assign", license)}
                          >
                            Assign License
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("revoke", license)}
                            className="text-red-600"
                          >
                            Revoke
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("generate", license)}
                          >
                            Generate License and Assign
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
          {filteredLicenses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No licenses found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredLicenses.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Results info */}
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredLicenses.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredLicenses.length}</span>{" "}
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
