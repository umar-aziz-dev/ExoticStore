import { Outlet } from "react-router-dom";
import { SellerHeader } from "./Header";
import { SellerFooter } from "./Footer";
import { useState } from "react";
import { SellerSidebar } from "./SellerSidebar";

export const SellerLayout = () => {
  const [open,setopen]=useState(false);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <SellerHeader setopen={setopen} />

      <div className="flex flex-1 w-full">
             {/* Sidebar */}
             <SellerSidebar open={open} setopen={setopen}/>
     
             {/* Main Content */}
             <main className="flex-1 max-w-7xl mx-auto ">
               <Outlet />
             </main>
           </div>

      {/* Footer */}
      <SellerFooter />
    </div>
  );
};