import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Mail, Phone,User as Usericon } from "lucide-react";

// ✅ shadcn
import { Skeleton } from "@/Components/ui/skeleton";
const UserAccount = () => {
  const { User, isLoading } = useSelector((state) => state.auth);
useEffect(()=>{
  if(User){
    console.log("user",User)
  }
},[User])
console.log(User)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6">

        {/* 🔄 Loading State */}
        {isLoading ? (
          <div className="space-y-6">

            {/* Profile Skeleton */}
            <div className="flex flex-col items-center gap-4">
              <Skeleton className="w-20 h-20 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Info Skeleton */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-xl">
                  <Skeleton className="w-5 h-5 rounded" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col items-center mb-6">

              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow">
                <Usericon size={40} className="text-red-600" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-4">
                My Account
              </h2>

              <p className="text-gray-500 text-sm">
                Your profile information
              </p>
            </div>

            {/* Info Section */}
            <div className="space-y-4">

              {/* Username */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border">
                <Usericon className="text-red-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Username</p>
                  <p className="text-gray-800 font-medium">
                    {User?.username || "N/A"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border">
                <Mail className="text-red-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium">
                    {User?.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border">
                <Phone className="text-red-600" size={20} />
                <div>
                  <p className="text-xs text-gray-500">Phone Number</p>
                  <p className="text-gray-800 font-medium">
                    {User?.phone || "N/A"}
                  </p>
                </div>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};
export default UserAccount;
