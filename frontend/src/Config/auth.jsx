import { Navigate, useLocation } from "react-router-dom";

export default function CheckAuth({ isAuthenticated, User, children }) {
  const location = useLocation();
  const path = location.pathname;

  // ✅ PUBLIC ROUTES (allow without login)
  const isPublicRoute =
    path === "/" ||                     // home
    path === "/listing" ||
    path === "/policy" ||
    path === "/review" ||
    path.startsWith("/auth");           // all auth routes

  // 🚫 NOT LOGGED IN
  if (!isAuthenticated) {
    if (isPublicRoute) {
      return <>{children}</>;
    }
    return <Navigate to="/auth/signin" replace />;
  }

  // 🚫 Logged in user visiting auth pages
  if (path.startsWith("/auth")) {

    if (User?.role === "superadmin") {
      return <Navigate to="/superadmin/analytics" replace />;
    }

    if (User?.role === "seller") {
      return <Navigate to="/seller/dashboard" replace />;
    }

    return <Navigate to="/" replace />; // ✅ FIXED (no /user/home)
  }

  // 🔒 SUPER ADMIN PROTECTION
  if (User?.role === "superadmin") {
    if (path.startsWith("/seller")) {
      return <Navigate to="/superadmin/analytics" replace />;
    }
  }

  // 🔒 SELLER PROTECTION
  if (User?.role === "seller") {
    if (path.startsWith("/superadmin")) {
      return <Navigate to="/seller/dashboard" replace />;
    }
  }

  // 🔒 USER PROTECTION
  if (User?.role === "user") {
    if (path.startsWith("/seller") || path.startsWith("/superadmin")) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}