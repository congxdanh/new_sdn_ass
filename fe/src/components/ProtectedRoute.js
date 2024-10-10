import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Nếu người dùng chưa đăng nhập, điều hướng đến trang login
    return <Navigate to="/login" />;
  }

  // Nếu người dùng đã đăng nhập, hiển thị trang con (children)
  return children;
};

export default ProtectedRoute;
