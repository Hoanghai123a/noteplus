import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  return user?.token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
