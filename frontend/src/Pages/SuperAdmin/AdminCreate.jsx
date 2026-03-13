import Commonform from "@/Common/form";
import { AdminCreateForm } from "@/Common/option";
import { Button } from "@/Components/ui/button";
import { CreateAdmin, DeleteAdmin, FetchAdmin } from "@/Store/SuperSlice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const AdminCreate = () => {

    const initialState = {
        email: "",
        role: "",
    }

    const [formData, setfromData] = useState(initialState);
    const dispatch = useDispatch();
    const { adminList } = useSelector((state) => state.SuperSlice)

    function onsubmit(e) {
        e.preventDefault();

        dispatch(CreateAdmin(formData))
            .unwrap()
            .then((payload) => {
                toast.success(payload.message || "Role Changed Successfully");
                dispatch(FetchAdmin()); // refresh
            })
            .catch((err) => {
                toast.error(err.message || "Can't change the role");
            });

    }

    function handleDelete(id) {

        dispatch(DeleteAdmin(id)).then((res) => {
            if (res.success) {
                toast.success(res.message || "Seller Deleted Successfully")
            }
        }).catch((e) => {
            toast.error(res.message || "Cannnot delete the seller")
        })
    }

    useEffect(() => {
        dispatch(FetchAdmin())
    }, [dispatch])

    return (
        <div className="p-4 bg-gray-100 min-h-screen">

            {/* Create Admin Form */}
            <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mb-8">

                <h2 className="text-xl font-semibold mb-4 text-center">
                    Create Admin
                </h2>

                <Commonform
                    formControls={AdminCreateForm}
                    FormData={formData}
                    setFormData={setfromData}
                    buttonText={"Make Admin"}
                    onSubmit={onsubmit}
                />

            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Seller List
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminList && adminList.length > 0 ? (
                        adminList.map((admin) => (
                            <div
                                key={admin._id}
                                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {admin.username || "Seller"}
                                </h3>

                                <p className="text-sm text-gray-600 mb-1">
                                    📧 {admin.email}
                                </p>

                                <p className="text-sm text-gray-600 mb-4">
                                    🏷 Role: {admin.role}
                                </p>

                                <Button
                                    className="w-full bg-[#6f2232]  hover:bg-[#7f2a42] text-white py-2 rounded-lg transition"
                                    onClick={() => handleDelete(admin._id)}
                                >
                                    Delete Admin
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            No Admins Found
                        </p>
                    )}
                </div>
            </div>

        </div>
    )
}