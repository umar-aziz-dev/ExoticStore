import Commonform from "@/Common/form";
import { SignupForm } from "@/Common/option";
import { SignUpUser } from "@/Store/UserSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SignUp = () => {
    const initialState = { username: "", email: "", password: "" };
    const [FormData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function OnSubmit(e) {
        e.preventDefault();

        dispatch(SignUpUser(FormData))
            .unwrap()
            .then((res) => {
                // Handle success from API response
                if (res.success) {
                    toast.success(res.message || "Account created successfully");
                    navigate("/auth/signin");
                } else {
                    toast.error(res.message || "Failed to create account");
                }
            })
            .catch((err) => {
                // err comes from rejectWithValue in thunk
                toast.error(err.message || err.data?.message || "Failed to create account");
            });
    }

    function handlesignin() {
        navigate("/auth/signin");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-white ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Create Account
                </h2>

                <Commonform
                    formControls={SignupForm}
                    FormData={FormData}
                    setFormData={setFormData}
                    onSubmit={OnSubmit}
                    buttonText={"Sign Up"}
                    buttonClassName="!bg-black !hover:bg-gray-800 text-white py-2 rounded-xl w-full"
                />

                <p className="mt-4 text-center text-gray-600">
                    Already have Account?{" "}
                    <button
                        onClick={handlesignin}
                        className="text-red-500 font-semibold hover:underline"
                    >
                        SignIn
                    </button>
                </p>
            </div>
        </div>
    );
};