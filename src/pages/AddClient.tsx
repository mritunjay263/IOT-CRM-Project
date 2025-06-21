import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, X } from "lucide-react";

interface FormData {
  clientName: string;
  organizationName: string;
  mobileNumber: string;
  emailAddress: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  activeStatus: boolean;
}

interface FormErrors {
  clientName?: string;
  organizationName?: string;
  mobileNumber?: string;
  emailAddress?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
}

export default function AddClient() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    organizationName: "",
    mobileNumber: "",
    emailAddress: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    activeStatus: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    // Mobile number validation (only numbers)
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number should contain only numbers";
    } else if (formData.mobileNumber.length < 10) {
      newErrors.mobileNumber = "Mobile number should be at least 10 digits";
    }

    // Email validation
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    // Address line validations (max 255 characters)
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address Line 1 is required";
    } else if (formData.addressLine1.length > 255) {
      newErrors.addressLine1 =
        "Address Line 1 must be less than 255 characters";
    }

    if (formData.addressLine2.length > 255) {
      newErrors.addressLine2 =
        "Address Line 2 must be less than 255 characters";
    }

    if (formData.addressLine3.length > 255) {
      newErrors.addressLine3 =
        "Address Line 3 must be less than 255 characters";
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
      alert("Client added successfully!");
      navigate("/clients");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding client. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      clientName: "",
      organizationName: "",
      mobileNumber: "",
      emailAddress: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      activeStatus: true,
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
            onClick={() => navigate("/clients")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
            <p className="text-gray-500 mt-1">
              Create a new client profile for your IoT system
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="bg-white border border-gray-200 shadow-sm max-w-4xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Client Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="clientName"
                  className="text-sm font-medium text-gray-700"
                >
                  Client Name *
                </Label>
                <Input
                  id="clientName"
                  type="text"
                  value={formData.clientName}
                  onChange={(e) =>
                    handleInputChange("clientName", e.target.value)
                  }
                  placeholder="Enter client name"
                  className={errors.clientName ? "border-red-500" : ""}
                />
                {errors.clientName && (
                  <p className="text-sm text-red-600">{errors.clientName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="organizationName"
                  className="text-sm font-medium text-gray-700"
                >
                  Organization Name *
                </Label>
                <Input
                  id="organizationName"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  placeholder="Enter organization name"
                  className={errors.organizationName ? "border-red-500" : ""}
                />
                {errors.organizationName && (
                  <p className="text-sm text-red-600">
                    {errors.organizationName}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="mobileNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Mobile Number *
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => {
                    // Only allow numbers
                    const value = e.target.value.replace(/\D/g, "");
                    handleInputChange("mobileNumber", value);
                  }}
                  placeholder="Enter mobile number"
                  maxLength={15}
                  className={errors.mobileNumber ? "border-red-500" : ""}
                />
                {errors.mobileNumber && (
                  <p className="text-sm text-red-600">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="emailAddress"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address *
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) =>
                    handleInputChange("emailAddress", e.target.value)
                  }
                  placeholder="Enter email address"
                  className={errors.emailAddress ? "border-red-500" : ""}
                />
                {errors.emailAddress && (
                  <p className="text-sm text-red-600">{errors.emailAddress}</p>
                )}
              </div>
            </div>

            {/* Official Address */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-900">
                Official Address
              </h3>

              <div className="space-y-2">
                <Label
                  htmlFor="addressLine1"
                  className="text-sm font-medium text-gray-700"
                >
                  Address Line 1 *
                </Label>
                <Input
                  id="addressLine1"
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  placeholder="Enter address line 1"
                  maxLength={255}
                  className={errors.addressLine1 ? "border-red-500" : ""}
                />
                <div className="flex justify-between">
                  {errors.addressLine1 && (
                    <p className="text-sm text-red-600">
                      {errors.addressLine1}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.addressLine1.length}/255 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="addressLine2"
                  className="text-sm font-medium text-gray-700"
                >
                  Address Line 2
                </Label>
                <Input
                  id="addressLine2"
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    handleInputChange("addressLine2", e.target.value)
                  }
                  placeholder="Enter address line 2 (optional)"
                  maxLength={255}
                  className={errors.addressLine2 ? "border-red-500" : ""}
                />
                <div className="flex justify-between">
                  {errors.addressLine2 && (
                    <p className="text-sm text-red-600">
                      {errors.addressLine2}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.addressLine2.length}/255 characters
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="addressLine3"
                  className="text-sm font-medium text-gray-700"
                >
                  Address Line 3
                </Label>
                <Input
                  id="addressLine3"
                  type="text"
                  value={formData.addressLine3}
                  onChange={(e) =>
                    handleInputChange("addressLine3", e.target.value)
                  }
                  placeholder="Enter address line 3 (optional)"
                  maxLength={255}
                  className={errors.addressLine3 ? "border-red-500" : ""}
                />
                <div className="flex justify-between">
                  {errors.addressLine3 && (
                    <p className="text-sm text-red-600">
                      {errors.addressLine3}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 ml-auto">
                    {formData.addressLine3.length}/255 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Status Toggle */}
            <div className="space-y-4">
              <h3 className="text-md font-medium text-gray-900">
                Client Status
              </h3>
              <div className="flex items-center space-x-3">
                <Switch
                  id="activeStatus"
                  checked={formData.activeStatus}
                  onCheckedChange={(checked) =>
                    handleInputChange("activeStatus", checked)
                  }
                />
                <Label
                  htmlFor="activeStatus"
                  className="text-sm font-medium text-gray-700"
                >
                  Active Status
                </Label>
                <span className="text-sm text-gray-500">
                  ({formData.activeStatus ? "Active" : "Inactive"})
                </span>
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
                  onClick={() => navigate("/clients")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? "Adding..." : "Add Client"}</span>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
