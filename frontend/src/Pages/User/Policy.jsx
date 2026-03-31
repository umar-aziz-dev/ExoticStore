import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicy } from "@/Store/UserSlice/UserPolicySlice";

// shadcn components
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const UserPolicy = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});

  const { policyList, isloading } = useSelector(
    (state) => state.userPolicy
  );

  useEffect(() => {
    dispatch(fetchPolicy());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
           Terms & Policies
          </h1>
          <p className="text-red-600 mt-2">
            Policy for Buying and Selling Accounts
          </p>
        </div>

        {/* 🔄 Loading */}
        {isloading && (
          <div className="grid gap-6 grid-cols-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-md space-y-4"
              >
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* ❌ Empty */}
        {!isloading && policyList.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            No policies available
          </div>
        )}

        {/* ✅ Policies */}
        {!isloading && policyList.length > 0 && (
          <div className="grid gap-6 grid-cols-1">
            {policyList.map((policy) => {
              const isExpanded = expanded[policy._id];

              return (
                <div
                  key={policy._id}
                  className="group bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition">
                    {policy.name}
                  </h2>

                  <p
                    className={`text-gray-600 text-sm mb-3 ${
                      !isExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {policy.description}
                  </p>

                  {/* Show More / Less */}
                  {policy.description?.length > 100 && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-red-600"
                      onClick={() => toggleExpand(policy._id)}
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </Button>
                  )}

                  {policy.createdAt && (
                    <p className="text-xs text-gray-400 mt-3">
                      {new Date(policy.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserPolicy;