import { Outlet } from "react-router-dom";
import { SuperHeader } from "./SuperHeader";
import { SuperFooter } from "./SuperFooter";
import { SuperAdminSidebar } from "./SuperAdminSidebar";
import { useState } from "react";

export const SuperLayout = () => {
    const [open,setopen]=useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <SuperHeader setopen={setopen}/>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <SuperAdminSidebar open={open} setopen={setopen}/>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto ">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <SuperFooter />
    </div>
  );
};