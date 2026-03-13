import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, User, children }) {
  const location = useLocation();
  const path = location.pathname;

  const publicRoutes = [
    "/user/home",
    "/auth/signin",
    "/auth/signup",
    "/auth/forgotpassword",
    "/auth/resetpassword/:token",
  ];

  // 🚫 NOT LOGGED IN
  if (!isAuthenticated) {
    if (publicRoutes.includes(path)) {
      return <>{children}</>;
    }

    return <Navigate to="/auth/signin" replace />;
  }

  // 🚫 Logged in user visiting auth pages
  if (path.includes("/signin") || path.includes("/signup")) {

    if (User?.role === "superadmin") {
      return <Navigate to="/superadmin/analytics" replace />;
    }

    if (User?.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    return <Navigate to="/user/home" replace />;
  }

  // 🔒 SUPER ADMIN PROTECTION
  if (User?.role === "superadmin") {

    if (path.startsWith("/user") || path.startsWith("/seller")) {
      return <Navigate to="/superadmin/analytics" replace />;
    }

  }

  // 🔒 ADMIN PROTECTION
  if (User?.role === "seller") {

    if (path.startsWith("/user") || path.startsWith("/superadmin")) {
      return <Navigate to="/seller/dashboard" replace />;
    }

  }

  // 🔒 USER PROTECTION
  if (User?.role === "user") {

    if (path.startsWith("/seller") || path.startsWith("/superadmin")) {
      return <Navigate to="/user/home" replace />;
    }

  }

  return <>{children}</>;
}