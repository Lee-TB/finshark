import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthContext } from "../Context/useAuth";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();

  const { isLoggedIn } = useAuthContext();

  return isLoggedIn() ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
