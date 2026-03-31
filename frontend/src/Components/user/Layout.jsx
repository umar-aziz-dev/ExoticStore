import { Outlet } from "react-router-dom";
import { UserHeader } from "./Header";
import { UserFooter } from "./Footer";

export const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Header */}
      <UserHeader />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto  px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <UserFooter />
    </div>
  );
};