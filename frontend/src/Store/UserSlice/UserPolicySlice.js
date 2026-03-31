import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  policyList: [],
  isloading: false,
  error: null,
};

// ✅ Corrected thunk
export const fetchPolicy = createAsyncThunk(
  "/policy/get",
  async (_, { rejectWithValue }) => { // <-- notice the _
    try {
      const res = await axios.get("/api/policy/get");
      return res.data; // backend should return { data: [...] }
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Cannot fetch user policy" }
      );
    }
  }
);

const PolicySlice = createSlice({
  name: "userPolicy",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicy.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(fetchPolicy.fulfilled, (state, action) => {
        state.isloading = false;
        state.policyList = action.payload?.data || [];
      })
      .addCase(fetchPolicy.rejected, (state, action) => {
        state.isloading = false;
        state.policyList = [];
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default PolicySlice.reducer;