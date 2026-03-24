import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  User: null,
  isLoading: false,
  error: null, // optional: to store error messages
};

// -------------------
// Async Thunks
// -------------------

export const SignUpUser = createAsyncThunk(
  "/auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Sign Up" });
    }
  }
);

export const SignInUser = createAsyncThunk(
  "/auth/signin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signin",
        formData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Sign In" });
    }
  }
);

export const SignOutUser = createAsyncThunk(
  "/auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/auth/signout",
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Sign Out" });
    }
  }
);

export const ForgotPass = createAsyncThunk(
  "/auth/forgotpassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/forgotpassword",
        email
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Request Password Reset" });
    }
  }
);

export const ResetPass = createAsyncThunk(
  "/auth/resetpassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/resetpassword/${token}`,
        password
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Reset Password" });
    }
  }
);

export const SigninGoogle = createAsyncThunk(
  "/auth/google-login",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/google-login",
        { token }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Sign In with Google" });
    }
  }
);

export const CheckAuth = createAsyncThunk(
  "/auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/auth/checkauth",
        {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          }
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Check Auth" });
    }
  }
);

// -------------------
// Slice
// -------------------

const UserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SignUp
      .addCase(SignUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SignUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.User = action.payload.data || action.payload;
      })
      .addCase(SignUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.User = null;
        state.error = action.payload?.message || "Sign Up Failed";
      })

      // SignIn
      .addCase(SignInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SignInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.User = action.payload.data || action.payload;
      })
      .addCase(SignInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.User = null;
        state.error = action.payload?.message || "Sign In Failed";
      })

      // SignOut
      .addCase(SignOutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.User = null;
        state.error = null;
      })
      .addCase(SignOutUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Sign Out Failed";
      })

      // Google SignIn
      .addCase(SigninGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(SigninGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.User = action.payload.data || action.payload;
      })
      .addCase(SigninGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.User = null;
        state.error = action.payload?.message || "Google Sign In Failed";
      })

      // Forgot Password
      .addCase(ForgotPass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ForgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ForgotPass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Forgot Password Failed";
      })

      // Reset Password
      .addCase(ResetPass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(ResetPass.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ResetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Reset Password Failed";
      })

      // Check Auth
      .addCase(CheckAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(CheckAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = !!action.payload.data;
        state.User = action.payload.data || null;
      })
      .addCase(CheckAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.User = null;
        state.error = action.payload?.message || "Auth Check Failed";
      });
  }
});

export default UserSlice.reducer;