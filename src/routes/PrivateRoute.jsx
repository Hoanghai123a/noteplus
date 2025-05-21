import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Nếu chưa có user => chuyển về trang login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
