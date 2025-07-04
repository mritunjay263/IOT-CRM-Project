import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

import { useAuth } from './AuthProvider';

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Keycloak will handle redirect to login if not authenticated
    return null;
  }

  return <>{children}</>;
}
