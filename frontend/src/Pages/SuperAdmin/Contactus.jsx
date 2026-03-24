import Commonform from "@/Common/form";
import { ContactusOptions } from "@/Common/option";
import { AddContact,fetchContact,deleteContact } from "@/Store/SuperSlice/ContactSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const Contactus = () => {
    const initialState = {
        email: "",
        phone: "",
    };

    const [formData, setformData] = useState(initialState);
    const { contactInfo, isloading } = useSelector((state) => state.Contact);
    const dispatch = useDispatch();
   

    useEffect(() => {
        dispatch(fetchContact());
    }, [dispatch]);


 const onSubmit = (e) => {
    e.preventDefault();

    dispatch(AddContact(formData))
        .then((res) => {
            if (res.payload.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message); // handles 401
            }
        })
        .catch(() => {
            toast.error("Cannot Add Contact");
        });
};

    const handleDelete=()=>{
        dispatch(deleteContact());
        dispatch(fetchContact());
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-lg space-y-6">

                {/* FORM CARD */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 hover:shadow-2xl transition">

                    {/* Header */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Contact Information
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Add your business contact details
                        </p>
                    </div>

                    <div className="w-full h-[1px] bg-gray-200 mb-6"></div>

                    {/* Form */}
                    <Commonform
                        formControls={ContactusOptions}
                        FormData={formData}
                        setFormData={setformData}
                        buttonText={"Add Contact Info"}
                        onSubmit={onSubmit}
                        isDisabled={!!contactInfo}
                    />
                </div>

                {/* CONTACT DISPLAY CARD */}
                {contactInfo && (
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition">

                        <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                            Saved Contact Info
                        </h3>

                        <div className="space-y-2 text-gray-600 text-center">
                            <p>
                                <span className="font-medium text-gray-800">Email:</span>{" "}
                                {contactInfo?.email}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Phone:</span>{" "}
                                {contactInfo?.phone}
                            </p>
                        </div>

                        {/* Delete Button */}
                        <button onClick={handleDelete}
                            className="mt-5 w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Delete Contact
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};