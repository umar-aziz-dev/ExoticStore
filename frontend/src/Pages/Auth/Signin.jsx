import Commonform from "@/Common/form";
import { SigninForm } from "@/Common/option";
import { SigninGoogle, SignInUser } from "@/Store/UserSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Signin = () => {
    const initialState = { email: "", password: "" };
    const [FormData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function OnSubmit(e) {
        e.preventDefault();

        dispatch(SignInUser(FormData))
            .unwrap()
            .then((res) => {
                // res contains API response from backend
                if (res.success) {
                    toast.success(res.message || "User signed in successfully");
                } else {
                    toast.error(res.message || "Failed to sign in");
                }
            })
            .catch((err) => {
                // err comes from rejectWithValue from the thunk
                toast.error(err.message || "Failed to sign in the account");
            });
    }

    function handlesignup() {
        navigate("/auth/signup");
    }

    function handleForgotpass() {
        navigate("/auth/forgotpassword")
    }

    const handleSuccess = (credentialResponse) => {
        dispatch(SigninGoogle(credentialResponse.credential)).then((res) => {
            if (res.success) {
                toast.success(res.message || "Login With Google")
            }
        }).catch((err) => {
            toast.error(err.message || "Failed to Login with Google")
        });
    };

    const handleError = () => {
        console.log("Login Failed");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-t-4 border-white ">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Sign In
                </h2>

                <Commonform
                    formControls={SigninForm}
                    FormData={FormData}
                    setFormData={setFormData}
                    onSubmit={OnSubmit}
                    buttonText={"Sign in"}
                    buttonClassName="!bg-black !hover:bg-gray-800 text-white py-2 rounded-xl w-full"
                />

                <div className="mt-3">
                    <GoogleLogin

                        onSuccess={handleSuccess}
                        onError={handleError}
                    />
                </div>

                <p className="mt-4 text-center text-gray-600">
                    No Account?{" "}
                    <button
                        onClick={handlesignup}
                        className="text-red-500 font-semibold hover:underline"
                    >
                        Sign Up
                    </button>
                </p>

                <p className="mt-4 text-center text-gray-600">
                    Reset Password?{" "}
                    <button
                        onClick={handleForgotpass}
                        className="text-red-500 font-semibold hover:underline"
                    >
                        Forgot Password
                    </button>
                </p>
            </div>
        </div>
    );
};