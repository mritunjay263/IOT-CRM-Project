import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import AddClient from "./pages/AddClient";
import Devices from "./pages/Devices";
import AddDevices from "./pages/AddDevices";
import Tasks from "./pages/Tasks";
import Email from "./pages/Email";
import Contacts from "./pages/Contacts";
import Chat from "./pages/Chat";
import Deals from "./pages/Deals";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="/clients"
            element={
              <DashboardLayout>
                <Clients />
              </DashboardLayout>
            }
          />
          <Route
            path="/clients/add"
            element={
              <DashboardLayout>
                <AddClient />
              </DashboardLayout>
            }
          />
          <Route
            path="/devices"
            element={
              <DashboardLayout>
                <Devices />
              </DashboardLayout>
            }
          />
          <Route
            path="/devices/add"
            element={
              <DashboardLayout>
                <AddDevices />
              </DashboardLayout>
            }
          />
          <Route
            path="/tasks"
            element={
              <DashboardLayout>
                <Tasks />
              </DashboardLayout>
            }
          />
          <Route
            path="/email"
            element={
              <DashboardLayout>
                <Email />
              </DashboardLayout>
            }
          />
          <Route
            path="/contacts"
            element={
              <DashboardLayout>
                <Contacts />
              </DashboardLayout>
            }
          />
          <Route
            path="/chat"
            element={
              <DashboardLayout>
                <Chat />
              </DashboardLayout>
            }
          />
          <Route
            path="/deals"
            element={
              <DashboardLayout>
                <Deals />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
