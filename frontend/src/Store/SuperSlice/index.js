import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  adminList: [],
  isLoading: false,
};

// -------------------
// Async Thunks
// -------------------

// Admin Creation
export const CreateAdmin = createAsyncThunk(
  "/superadmin/admincreate/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "/api/superadmin/admincreate/add",
        formData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Add Admin" });
    }
  }
);

export const FetchAdmin = createAsyncThunk(
  "/superadmin/admincreate/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/superadmin/admincreate/get");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Fetch Admins" });
    }
  }
);

export const DeleteAdmin = createAsyncThunk(
  "/superadmin/admincreate/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/superadmin/admincreate/delete/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Cannot Delete Admin" });
    }
  }
);





// -------------------
// Slice
// -------------------

const SuperAdminSlice = createSlice({
  name: "SuperSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Admin
      .addCase(CreateAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CreateAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) state.adminList = action.payload.data;
      })
      .addCase(CreateAdmin.rejected, (state) => {
        state.isLoading = false;
        state.adminList = [];
      })
      .addCase(FetchAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminList = action.payload.data;
      })
      .addCase(FetchAdmin.rejected, (state) => {
        state.isLoading = false;
        state.adminList = [];
      })
      .addCase(DeleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.data?._id) {
          state.adminList = state.adminList.filter(
            (admin) => admin._id !== action.payload.data._id
          );
        }
      })
      .addCase(DeleteAdmin.rejected, (state) => {
        state.isLoading = false;
      })

     
  },
});

export default SuperAdminSlice.reducer;