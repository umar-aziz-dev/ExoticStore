import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// =====================
// Initial State
// =====================
const initialState = {
  availableProducts: [],
  soldProducts: [],
  isLoading: false,
  error: null,
};

// =====================
// Fetch Available Products
// =====================
export const fetchAvailableProduct = createAsyncThunk(
  "/superadmin/products/availableaccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/superadmin/products/availableaccount");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch available products" }
      );
    }
  }
);

// =====================
// Fetch Sold Products
// =====================
export const fetchSoldProduct = createAsyncThunk(
  "/superadmin/products/soldaccount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/superadmin/products/soldaccount");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch sold products" }
      );
    }
  }
);

// =====================
// Slice
// =====================
const ProductSlice = createSlice({
  name: "SuperProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ===== AVAILABLE PRODUCTS =====
      .addCase(fetchAvailableProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAvailableProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableProducts =
          action.payload?.data || action.payload || [];
      })
      .addCase(fetchAvailableProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error fetching available products";
      })

      // ===== SOLD PRODUCTS =====
      .addCase(fetchSoldProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSoldProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.soldProducts =
          action.payload?.data || action.payload || [];
      })
      .addCase(fetchSoldProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error fetching sold products";
      });
  },
});

// =====================
// Export Reducer
// =====================
export default ProductSlice.reducer;