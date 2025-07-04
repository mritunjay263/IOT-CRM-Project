import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, X } from "lucide-react";

interface FormData {
  deviceName: string;
  clientName: string;
  deviceLocation: string;
}

interface FormErrors {
  deviceName?: string;
  clientName?: string;
  deviceLocation?: string;
}

// Sample client data (in real app, this would come from API)
const clientOptions = [
  { value: "CLT-001", label: "TechCorp Industries" },
  { value: "CLT-002", label: "Smart Manufacturing Ltd" },
  { value: "CLT-003", label: "GreenEnergy Solutions" },
  { value: "CLT-004", label: "AutoTech Systems" },
  { value: "CLT-005", label: "HealthCare Connect" },
];

export default function AddDevices() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    deviceName: "",
    clientName: "",
    deviceLocation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.deviceName.trim()) {
      newErrors.deviceName = "Device name is required";
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    // Device location validation (max 200 characters)
    if (!formData.deviceLocation.trim()) {
      newErrors.deviceLocation = "Device location is required";
    } else if (formData.deviceLocation.length > 200) {
      newErrors.deviceLocation =
        "Device location must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);

      // Show success message and navigate back
      alert("Device added successfully!");
      navigate("/devices");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding device. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      deviceName: "",
      clientName: "",
      deviceLocation: "",
    });
    setErrors({});
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/devices")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Device</h1>
            <p className="text-gray-500 mt-1">
              Register a new IoT device to the system
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-white border border-gray-200 shadow-sm max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Device Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Device Name */}
            <div className="space-y-2">
              <Label
                htmlFor="deviceName"
                className="text-sm font-medium text-gray-700"
              >
                Device Name *
              </Label>
              <Input
                id="deviceName"
                type="text"
                value={formData.deviceName}
                onChange={(e) =>
                  handleInputChange("deviceName", e.target.value)
                }
                placeholder="Enter device name (e.g., Temperature Sensor A1)"
                className={errors.deviceName ? "border-red-500" : ""}
              />
              {errors.deviceName && (
                <p className="text-sm text-red-600">{errors.deviceName}</p>
              )}
            </div>

            {/* Client Name Dropdown */}
            <div className="space-y-2">
              <Label
                htmlFor="clientName"
                className="text-sm font-medium text-gray-700"
              >
                Client Name *
              </Label>
              <Select
                value={formData.clientName}
                onValueChange={(value) =>
                  handleInputChange("clientName", value)
                }
              >
                <SelectTrigger
                  className={errors.clientName ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clientOptions.map((client) => (
                    <SelectItem key={client.value} value={client.value}>
                      {client.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clientName && (
                <p className="text-sm text-red-600">{errors.clientName}</p>
              )}
            </div>

            {/* Device Location */}
            <div className="space-y-2">
              <Label
                htmlFor="deviceLocation"
                className="text-sm font-medium text-gray-700"
              >
                Device Location *
              </Label>
              <Input
                id="deviceLocation"
                type="text"
                value={formData.deviceLocation}
                onChange={(e) =>
                  handleInputChange("deviceLocation", e.target.value)
                }
                placeholder="Enter device location (e.g., Factory Floor A - Section 1)"
                maxLength={200}
                className={errors.deviceLocation ? "border-red-500" : ""}
              />
              <div className="flex justify-between">
                {errors.deviceLocation && (
                  <p className="text-sm text-red-600">
                    {errors.deviceLocation}
                  </p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.deviceLocation.length}/200 characters
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Reset Form</span>
              </Button>

              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/devices")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? "Adding..." : "Add Device"}</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
