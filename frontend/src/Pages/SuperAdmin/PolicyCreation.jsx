import { useState, useEffect } from "react";
import Commonform from "@/Common/form";
import { PolicyOptions } from "@/Common/option";
import { Card } from "@/Components/ui/card";
import {
  AddPolicy,
  fetchPolicy,
  deletePolicy,
  editPolicy,
} from "@/Store/SuperSlice/PolicySlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

export const PolicyCreation = () => {
  const initialState = {
    name: "",
    description: "",
  };

  const [formData, setformData] = useState(initialState);
  const [expandedId, setExpandedId] = useState(null);
  const [editid, seteditid] = useState(null);

  const dispatch = useDispatch();
  const { policyList, isLoading } = useSelector((state) => state.Policy);

  // ✅ Submit Handler
  const onSubmit = (e) => {
    e.preventDefault();

    if (editid) {
      dispatch(editPolicy({ id: editid, formData }))
        .unwrap()
        .then((res) => {
          if (res.success) {
            toast.success(res.message || "Edited Successfully");
            seteditid(null);
            setformData(initialState);
          } else {
            toast.error(res.message || "Cannot Edit");
          }
        })
        .catch((e) => {
          toast.error(e.message || "Failed to Edit");
        });
    } else {
      dispatch(AddPolicy(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message || "Policy Added");
          setformData(initialState);
        })
        .catch((e) => {
          toast.error(e.message || "Failed to Add Policy");
        });
    }
  };

  // ✅ Delete Handler
  const handleDelete = (id) => {
    dispatch(deletePolicy(id))
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success(res.message || "Deleted Successfully");
        } else {
          toast.error(res.message || "Can't delete");
        }
      })
      .catch((e) => {
        toast.error(e.message || "Delete Failed");
      });
  };

  // ✅ Edit Handler
  const handleEdit = (policy) => {
    setformData({
      name: policy.name,
      description: policy.description,
    });
    seteditid(policy._id);
  };

  // ✅ Fetch Policies
  useEffect(() => {
    dispatch(fetchPolicy());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-8">
      
      {/* Form Section */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editid ? "Edit Policy" : "Create Policy"}
        </h2>

        <Commonform
          formControls={PolicyOptions}
          FormData={formData}
          setFormData={setformData}
          buttonText={editid ? "Update Policy" : "Add Policy"}
          onSubmit={onSubmit}
        />

        {/* Cancel Edit */}
        {editid && (
          <button
            className="mt-3 text-sm text-red-500 hover:underline"
            onClick={() => {
              seteditid(null);
              setformData(initialState);
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Policy List */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Policy List
        </h2>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gray-200 animate-pulse h-24"
              ></div>
            ))}
          </div>
        ) : policyList.length === 0 ? (
          <p className="text-gray-500">No policies found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {policyList.map((policy) => (
              <Card
                key={policy._id}
                className="p-4 rounded-xl shadow-md border hover:shadow-lg transition duration-200"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {policy.name}
                </h3>

                {/* Description */}
                <p
                  className={`text-gray-600 mt-2 whitespace-pre-wrap break-words leading-relaxed ${
                    expandedId === policy._id ? "" : "line-clamp-3"
                  }`}
                >
                  {policy.description}
                </p>

                {/* Read More / Less */}
                {policy.description.length > 100 && (
                  <button
                    className="text-blue-500 text-sm mt-1"
                    onClick={() =>
                      setExpandedId(
                        expandedId === policy._id ? null : policy._id
                      )
                    }
                  >
                    {expandedId === policy._id
                      ? "Show Less"
                      : "Read More"}
                  </button>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleEdit(policy)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(policy._id)}
                  >
                    Delete
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};