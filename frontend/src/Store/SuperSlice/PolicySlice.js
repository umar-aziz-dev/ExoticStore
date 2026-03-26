import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    policyList:[],
}

//policy 

export const AddPolicy = createAsyncThunk(
  "/superadmin/policycreation/add",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/superadmin/policycreation/add",
        formData
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ➤ Fetch Policy
export const fetchPolicy = createAsyncThunk(
  "/superadmin/policycreation/get",
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        "http://localhost:4000/superadmin/policycreation/get"
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ➤ Delete Policy
export const deletePolicy = createAsyncThunk(
  "/superadmin/policycreation/delete",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `http://localhost:4000/superadmin/policycreation/delete/${id}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ➤ Edit Policy (FIXED)
export const editPolicy = createAsyncThunk(
  "superadmin/policycreation/edit",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `http://localhost:4000/superadmin/policycreation/edit/${id}`,
        formData
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const PolicySlice = createSlice({
    name:"Policy",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder .addCase(AddPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddPolicy.fulfilled, (state, action) => {
        state.isLoading = false;

        // If backend returns single policy
        if (action.payload?.data) {
          state.policyList.push(action.payload.data);
        }
      })
      .addCase(AddPolicy.rejected, (state) => {
        state.isLoading = false;
      })


      // ➤ Fetch Policy
      .addCase(fetchPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPolicy.fulfilled, (state, action) => {
        state.isLoading = false;

        // Replace full list
        state.policyList = action.payload?.data || [];
      })
      .addCase(fetchPolicy.rejected, (state) => {
        state.isLoading = false;
        state.policyList = [];
      })


      // ➤ Delete Policy
      .addCase(deletePolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePolicy.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.data?._id) {
          state.policyList = state.policyList.filter(
            (policy) => policy._id !== action.payload.data._id
          );
        }
      })
      .addCase(deletePolicy.rejected, (state) => {
        state.isLoading = false;
      })


      // ➤ Edit Policy
      .addCase(editPolicy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPolicy.fulfilled, (state, action) => {
        state.isLoading = false;

        const updatedPolicy = action.payload?.data;

        if (updatedPolicy?._id) {
          state.policyList = state.policyList.map((policy) =>
            policy._id === updatedPolicy._id ? updatedPolicy : policy
          );
        }
      })
      .addCase(editPolicy.rejected, (state) => {
        state.isLoading = false;
      })
    }
})

export default PolicySlice.reducer