import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Mritunjay Pandey",
    email: "mritunjay.mailme@gmail.com",
    phone: "",
    address: "",
    profilePicture:
      "https://lh3.googleusercontent.com/a/ACg8ocLkj7ej_c9Fy4zmOS02ex7JYWSAhcAfQs420cT-Z47VUHOE8S4L=s576-c-no",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");
    handleInputChange("phone", numericValue);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Basic validation
    if (!profileData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required.",
        variant: "destructive",
      });
      return;
    }

    if (!profileData.email.trim()) {
      toast({
        title: "Error",
        description: "Email is required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Save profile data (in a real app, this would be an API call)
    localStorage.setItem("userProfile", JSON.stringify(profileData));

    setIsEditing(false);
    toast({
      title: "Success",
      description: "Profile updated successfully.",
    });
  };

  const handleCancel = () => {
    // Reset form to saved data
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  // Load saved profile data on component mount
  React.useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-1">
            Manage your personal information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsEditing(true)}
          >
            <User className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={
                    profileData.profilePicture ||
                    "https://lh3.googleusercontent.com/a/ACg8ocLkj7ej_c9Fy4zmOS02ex7JYWSAhcAfQs420cT-Z47VUHOE8S4L=s576-c-no"
                  }
                  alt={profileData.name}
                />
                <AvatarFallback className="bg-primary text-white text-xl">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-white rounded-full p-1.5 cursor-pointer transition-colors">
                  <Camera className="w-3 h-3" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {profileData.name || "User Name"}
              </h3>
              <p className="text-sm text-gray-500">
                {profileData.email || "user@example.com"}
              </p>
              {isEditing && (
                <p className="text-xs text-gray-400 mt-1">
                  Click the camera icon to upload a profile picture
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name *
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              ) : (
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900">
                  {profileData.name || "Not provided"}
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address *
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full"
                />
              ) : (
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900">
                  {profileData.email || "Not provided"}
                </div>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full"
                />
              ) : (
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900">
                  {profileData.phone || "Not provided"}
                </div>
              )}
              {isEditing && (
                <p className="text-xs text-gray-500">Numbers only</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                  className="w-full min-h-[78px]"
                  rows={3}
                />
              ) : (
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900 min-h-[78px]">
                  {profileData.address || "Not provided"}
                </div>
              )}
            </div>
          </div>

          {/* System Information */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">
              System Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Account Type
                </Label>
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900">
                  Administrator
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Last Login
                </Label>
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-900">
                  {new Date().toLocaleDateString()} at{" "}
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
