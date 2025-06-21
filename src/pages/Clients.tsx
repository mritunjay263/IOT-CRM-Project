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
import {
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

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
        <Button className="bg-primary hover:bg-primary/90">
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
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-12"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <React.Fragment key={client.clientId}>
                    {/* Main Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
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
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleRowExpansion(client.clientId)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          {expandedRows.has(client.clientId) ? (
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedRows.has(client.clientId) && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">
                              Client Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Address
                                </label>
                                <p className="text-sm text-gray-900">
                                  {client.address}
                                </p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  License ID
                                </label>
                                <p className="text-sm text-gray-900 font-mono">
                                  {client.licenseId}
                                </p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Email
                                </label>
                                <p className="text-sm text-primary">
                                  {client.email}
                                </p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Phone
                                </label>
                                <p className="text-sm text-gray-900">
                                  {client.phone}
                                </p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Join Date
                                </label>
                                <p className="text-sm text-gray-900">
                                  {client.joinDate}
                                </p>
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                  Device Ratio
                                </label>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-green-600 font-medium">
                                    {client.allDevices - client.inactiveDevices}{" "}
                                    Active
                                  </span>
                                  <span className="text-gray-400">|</span>
                                  <span className="text-sm text-red-600 font-medium">
                                    {client.inactiveDevices} Inactive
                                  </span>
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
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Total Clients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {clientsData.length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Active Clients
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {clientsData.filter((c) => c.status === "Active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Total Devices
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {clientsData.reduce(
                    (sum, client) => sum + client.allDevices,
                    0,
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  Inactive Devices
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {clientsData.reduce(
                    (sum, client) => sum + client.inactiveDevices,
                    0,
                  )}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
