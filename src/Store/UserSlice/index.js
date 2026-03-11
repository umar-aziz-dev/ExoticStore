
import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const initialState = {
    isAuthenticated: false,
    User: null,
    isLoading: false,
}

export const SignUpUser = createAsyncThunk("/auth/signup",
    async (formData) => {
        const result = await axios.post("http://localhost:5000/auth/signup", formData,
            { withCredentials: true }
        );
        return result.data;
    }
)

export const SignInUser = createAsyncThunk("/auth/signin",
    async (formData) => {
        const result = await axios.post("http://localhost:5000/auth/signin", formData,
            { withCredentials: true }
        )
        return result.data;
    }
)

export const SignOutUser = createAsyncThunk("/auth/signout",
    async () => {
        const result = await axios.delete("http://localhost:5000/auth/signout",
            { withCredentials: true }
        )
        return result.data;
    }
)

export const ForgotPass = createAsyncThunk("/auth/forgotpassword",
    async (email) => {
        const result = await axios.post("http://localhost:5000/auth/forgotpassword", email);
        return result.data;
    }
)

export const ResetPass = createAsyncThunk("/auth/resetpassword",
    async({token,password})=>{
        const result = await axios.post(`http://localhost:5000/auth/resetpassword/${token}`,
            password
        )
        return result.data;
    }
)

export const SigninGoogle= createAsyncThunk("/auth/google-login",
    async(token)=>{
        const result = await axios.post("http://localhost:5000/auth/google-login",
            {token}
        )
        return result.data;
    }
)

export const CheckAuth = createAsyncThunk("/auth/checkAuth",
    async () => {
        const result = await axios.get("http://localhost:5000/auth/checkauth",
            {
                withCredentials: true,
                headers: {
                    'Cache-Control': 'no-store , no-cache, must-revalidate, proxy-revalidate',
                }
            }

        )
        return result.data;
    }
)

const UserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(SignUpUser.pending, (state) => {
            state.isAuthenticated = false;
            state.isLoading = true;
        }).addCase(SignUpUser.fulfilled, (state, action) => {

            state.isLoading = false;
            console.log(action.payload);
            state.User = action.payload;
        }).addCase(SignUpUser.rejected, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.User = null;
        }).addCase(SignInUser.pending, (state) => {
            state.isAuthenticated = false;
            state.isLoading = true;
        }).addCase(SignInUser.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.User = action.payload.data;
        }).addCase(SignInUser.rejected, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.User = null;
        }).addCase(SignOutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.User = null;
            state.token = null;
        }).addCase(SigninGoogle.pending, (state) => {
            state.isAuthenticated = false;
            state.isLoading = true;
        }).addCase(SigninGoogle.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.User = action.payload.data;
        }).addCase(SigninGoogle.rejected, (state, action) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.User = null;}

        )
    }
})
export default UserSlice.reducer;