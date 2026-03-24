import Commonform from "@/Common/form";
import { SocialLinksOptions } from "@/Common/option";
import { AddSocialLinks,fetchSocialLinks } from "@/Store/SuperSlice/SoicalLinkSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const SocialLinks = () => {
    const initialState = {
        facebook: "",
        instagram: "",
        tiktok: "",
    };

    const [formData, setformData] = useState(initialState);
    const dispatch = useDispatch();

    const OnSubmit = (e) => {
        e.preventDefault();
        dispatch(AddSocialLinks(formData)).then((res) => {
            if (res.payload.success) {
                toast.success(res.message || "Links Added Successfully")
            }
        }).catch((err) => {
            toast.error(err.message || "cannot Add Links")
        })
    };

    useEffect(() => {
        dispatch(fetchSocialLinks())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">

            {/* Card Container */}
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Social Media Links
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your platform's social accounts
                    </p>
                </div>

                {/* Form */}
                <Commonform
                    formControls={SocialLinksOptions}
                    FormData={formData}
                    setFormData={setformData}
                    buttonText={"Save Links"}
                    onSubmit={OnSubmit}
                />

            </div>
        </div>
    );
};