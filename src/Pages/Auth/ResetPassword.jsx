import { ResetPassForm } from "@/Common/option";
import { ResetPass } from "@/Store/UserSlice";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ResetPassword = () => {
    const initialState = {
        password: ""
    }
    const [newpass, setnewpass] = useState(initialState);
    const { token } = useParams();
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(ResetPass({
            token,
            password:newpass
        })).then((res)=>{
            if(res.success){
                toast.success(res.message||"Password reset Successfully")
            }
        }).catch((err)=>{
            toast.error(err.message||"Failed to reset password")
        })

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-white ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Forgot Password
                </h2>

                <Commonform
                    formControls={ResetPassForm}
                    FormData={newpass}
                    setFormData={setnewpass}
                    buttonText={"Confirm Password"}
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