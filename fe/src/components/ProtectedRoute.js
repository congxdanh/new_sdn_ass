// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   if (!isAuthenticated) {
//     // Nếu người dùng chưa đăng nhập, điều hướng đến trang login
//     return <Navigate to="/login" />;
//   }

//   // Nếu người dùng đã đăng nhập, hiển thị trang con (children)
//   return children;
// };

// export default ProtectedRoute;
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!currentUser) {
    // Nếu chưa đăng nhập, chuyển hướng sang trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị nội dung bên trong ProtectedRoute
  return children;
};

export default ProtectedRoute;
