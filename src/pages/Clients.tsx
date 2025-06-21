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
import {
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Client {
  clientId: string;
  clientName: string;
  status: "Active" | "Inactive" | "Pending";
  allDevices: number;
  inactiveDevices: number;
  address: string;
  licenseId: string;
  email: string;
  phone: string;
  joinDate: string;
}

const clientsData: Client[] = [
  {
    clientId: "CLT-001",
    clientName: "TechCorp Industries",
    status: "Active",
    allDevices: 25,
    inactiveDevices: 3,
    address: "123 Tech Street, Silicon Valley, CA 94043",
    licenseId: "LIC-TECH-2024-001",
    email: "admin@techcorp.com",
    phone: "+1 (555) 123-4567",
    joinDate: "Jan 15, 2024",
  },
  {
    clientId: "CLT-002",
    clientName: "Smart Manufacturing Ltd",
    status: "Active",
    allDevices: 42,
    inactiveDevices: 5,
    address: "456 Industrial Ave, Detroit, MI 48201",
    licenseId: "LIC-SMART-2024-002",
    email: "contact@smartmfg.com",
    phone: "+1 (555) 234-5678",
    joinDate: "Feb 20, 2024",
  },
  {
    clientId: "CLT-003",
    clientName: "GreenEnergy Solutions",
    status: "Pending",
    allDevices: 18,
    inactiveDevices: 8,
    address: "789 Renewable Way, Austin, TX 73301",
    licenseId: "LIC-GREEN-2024-003",
    email: "info@greenenergy.com",
    phone: "+1 (555) 345-6789",
    joinDate: "Mar 10, 2024",
  },
  {
    clientId: "CLT-004",
    clientName: "AutoTech Systems",
    status: "Active",
    allDevices: 67,
    inactiveDevices: 12,
    address: "321 Innovation Blvd, San Jose, CA 95113",
    licenseId: "LIC-AUTO-2024-004",
    email: "support@autotech.com",
    phone: "+1 (555) 456-7890",
    joinDate: "Apr 05, 2024",
  },
  {
    clientId: "CLT-005",
    clientName: "HealthCare Connect",
    status: "Inactive",
    allDevices: 15,
    inactiveDevices: 15,
    address: "654 Medical Plaza, Boston, MA 02101",
    licenseId: "LIC-HEALTH-2024-005",
    email: "admin@healthcare.com",
    phone: "+1 (555) 567-8901",
    joinDate: "May 12, 2024",
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const toggleRowExpansion = (clientId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(clientId)) {
      newExpanded.delete(clientId);
    } else {
      newExpanded.add(clientId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Inactive":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const filteredClients = clientsData.filter(
    (client) =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.clientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

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

  const handleAction = (action: string, clientId: string) => {
    console.log(`${action} action for client ${clientId}`);
    // Implement action logic here
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all your IoT clients
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => navigate("/clients/add")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Client Directory
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search clients..."
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    All Devices
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inactive Devices
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedClients.map((client) => (
                  <React.Fragment key={client.clientId}>
                    {/* Main Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleRowExpansion(client.clientId)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                        >
                          <div className="transition-transform duration-300 ease-in-out">
                            {expandedRows.has(client.clientId) ? (
                              <ChevronDown className="w-4 h-4 text-gray-500 transition-all duration-200" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-500 transition-all duration-200" />
                            )}
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.clientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {client.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant="default"
                          className={`text-xs px-2 py-1 ${getStatusColor(client.status)}`}
                        >
                          {client.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{client.allDevices}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`font-medium ${
                            client.inactiveDevices > 0
                              ? "text-red-600"
                              : "text-gray-500"
                          }`}
                        >
                          {client.inactiveDevices}
                        </span>
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
                                handleAction("activate", client.clientId)
                              }
                            >
                              Activate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAction("add-devices", client.clientId)
                              }
                            >
                              Add Devices
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleAction("disable-devices", client.clientId)
                              }
                            >
                              Disable Devices
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedRows.has(client.clientId) && (
                      <tr className="bg-gray-50 animate-in slide-in-from-top-2 duration-300">
                        <td colSpan={7} className="px-6 py-0">
                          <div className="overflow-hidden">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 my-4 transform transition-all duration-300 ease-out animate-in slide-in-from-top-4 fade-in">
                              <h4 className="text-sm font-medium text-gray-900 mb-3 animate-in slide-in-from-left-2 duration-300 delay-100">
                                Client Details
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                  {
                                    label: "Address",
                                    value: client.address,
                                    delay: "delay-150",
                                  },
                                  {
                                    label: "License ID",
                                    value: client.licenseId,
                                    className: "font-mono",
                                    delay: "delay-200",
                                  },
                                  {
                                    label: "Email",
                                    value: client.email,
                                    className: "text-primary",
                                    delay: "delay-250",
                                  },
                                  {
                                    label: "Phone",
                                    value: client.phone,
                                    delay: "delay-300",
                                  },
                                  {
                                    label: "Join Date",
                                    value: client.joinDate,
                                    delay: "delay-350",
                                  },
                                ].map((field, index) => (
                                  <div
                                    key={field.label}
                                    className={cn(
                                      "animate-in slide-in-from-bottom-4 fade-in duration-300",
                                      field.delay,
                                    )}
                                  >
                                    <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                      {field.label}
                                    </label>
                                    <p
                                      className={cn(
                                        "text-sm text-gray-900",
                                        field.className,
                                      )}
                                    >
                                      {field.value}
                                    </p>
                                  </div>
                                ))}
                                <div className="animate-in slide-in-from-bottom-4 fade-in duration-300 delay-400">
                                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Device Ratio
                                  </label>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-green-600 font-medium transition-all duration-200 hover:scale-105">
                                      {client.allDevices -
                                        client.inactiveDevices}{" "}
                                      Active
                                    </span>
                                    <span className="text-gray-400">|</span>
                                    <span className="text-sm text-red-600 font-medium transition-all duration-200 hover:scale-105">
                                      {client.inactiveDevices} Inactive
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No clients found matching your search.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredClients.length > 0 && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Results info */}
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredClients.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredClients.length}</span>{" "}
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
