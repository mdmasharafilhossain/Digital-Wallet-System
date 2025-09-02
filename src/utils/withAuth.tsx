import type { ComponentType } from "react";
import { Navigate } from "react-router";

import { useGetProfileQuery } from "../redux/features/auth/auth.api";
import type { User } from "../types";


export const withAuth = (Component: ComponentType, requiredRole?: User["role"]) => {
  return function AuthWrapper() {
    const { data: user, isLoading } = useGetProfileQuery();

    if (isLoading) {
      return <div className="flex justify-center items-center h-screen text-[#E6D5B8]">Loading...</div>;
    }

    if (!user?.phone) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && requiredRole !== user.role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Component />;
  };
};
