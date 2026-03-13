import Commonform from "@/Common/form";
import { ForgotPassForm } from "@/Common/option";
import { ForgotPass } from "@/Store/UserSlice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const ForgotPassword = () => {

    const initialState = {
        email: ""
    }
    const [email, setemail] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(ForgotPass(email)).then((res) => {
            if (res.success) {
                toast.success(res.message || "Reset Email Sent")
            }
        }).catch((err) => {
            toast.error(err.message || "Cant sent Reset EmailF")
        })
    }

    function handlesignin() {
        navigate("/auth/signin")
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-white ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Forgot Password
                </h2>

                <Commonform
                    formControls={ForgotPassForm}
                    FormData={email}
                    setFormData={setemail}
                    buttonText={"Send Reset Link"}
                    onSubmit={onSubmit}
                />
                <p className="mt-4 text-center text-gray-600">
                    Already have Account?{" "}
                    <button
                        onClick={handlesignin}
                        className="text-red-500 font-semibold hover:underline"
                    >
                        Sign in
                    </button>
                </p>

            </div>
        </div>

    )
}