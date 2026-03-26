import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isloading: false,
    productList: [],
    singleProduct: null,
    soldProduct: [],
    singleSoldProduct: null,
};

// ---------------------- Thunks with rejectWithValue ----------------------

// Add Product
export const AddProducts = createAsyncThunk(
    "/seller/product/add",
    async (formdata, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                "http://localhost:4000/seller/product/add",
                formdata
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot add product" });
        }
    }
);

// Edit Product
export const editProduct = createAsyncThunk(
    "/seller/product/edit",
    async ({ id, formdata }, { rejectWithValue }) => {
        try {
            const result = await axios.put(
                `http://localhost:4000/seller/product/edit/${id}`,
                formdata
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot edit product" });
        }
    }
);

// Fetch Products
export const fetchProduct = createAsyncThunk(
    "/seller/product/get",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get("http://localhost:4000/seller/product/get");
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot fetch products" });
        }
    }
);

// Fetch Single Product
export const fetchSingleProduct = createAsyncThunk(
    "/seller/product/fetch",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `http://localhost:4000/seller/product/fetch/${id}`
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot fetch product" });
        }
    }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
    "/seller/product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.delete(
                `http://localhost:4000/seller/product/delete/${id}`
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot delete product" });
        }
    }
);

// Update Sold Product Status
export const UpdateStatus = createAsyncThunk(
    "/seller/soldproducts",
    async ({ id, formdata }, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                `http://localhost:4000/seller/soldproducts/${id}`,
                formdata
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot update status" });
        }
    }
);

// Fetch Sold Products
export const fetchSoldProducts = createAsyncThunk(
    "/seller/soldproducts/soldproductview/get",
    async (_, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                "http://localhost:4000/seller/soldproducts/soldproductview/get"
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot fetch sold products" });
        }
    }
);

// Fetch Single Sold Product
export const fetchSingleSoldProduct = createAsyncThunk(
    "/seller/soldproducts/soldproductdetails/get",
    async (id, { rejectWithValue }) => {
        try {
            const result = await axios.get(
                `http://localhost:4000/seller/soldproducts/soldproductdetails/get/${id}`
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot fetch sold product details" });
        }
    }
);

// ---------------------- Slice ----------------------
const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Product
            .addCase(AddProducts.pending, (state) => {
                state.isloading = true;
            })
            .addCase(AddProducts.fulfilled, (state, action) => {
                state.isloading = false;
                state.productList = action.payload.data;
            })
            .addCase(AddProducts.rejected, (state, action) => {
                state.isloading = false;
                state.productList = [];
                console.error("AddProducts Error:", action.payload?.message);
            })

            // Edit Product
            .addCase(editProduct.pending, (state) => {
                state.isloading = true;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isloading = false;
                state.singleProduct = action.payload.data;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isloading = false;
                console.error("EditProduct Error:", action.payload?.message);
            })

            // Fetch Products
            .addCase(fetchProduct.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.isloading = false;
                state.productList = action.payload.data;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.isloading = false;
                state.productList = [];
                console.error("FetchProduct Error:", action.payload?.message);
            })

            // Fetch Single Product
            .addCase(fetchSingleProduct.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.isloading = false;
                state.singleProduct = action.payload.data;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.isloading = false;
                state.singleProduct = null;
                console.error("FetchSingleProduct Error:", action.payload?.message);
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isloading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isloading = false;
                state.productList = state.productList.filter(
                    (product) => product._id !== action.payload.data?._id
                );
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isloading = false;
                console.error("DeleteProduct Error:", action.payload?.message);
            })

            // Update Status
            .addCase(UpdateStatus.pending, (state) => {
                state.isloading = true;
            })
            .addCase(UpdateStatus.fulfilled, (state, action) => {
                state.isloading = false;
                state.soldProduct = action.payload.data;
            })
            .addCase(UpdateStatus.rejected, (state, action) => {
                state.isloading = false;
                console.error("UpdateStatus Error:", action.payload?.message);
            })

            // Fetch Sold Products
            .addCase(fetchSoldProducts.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchSoldProducts.fulfilled, (state, action) => {
                state.isloading = false;
                state.soldProduct = action.payload.data;
            })
            .addCase(fetchSoldProducts.rejected, (state, action) => {
                state.isloading = false;
                state.soldProduct = [];
                console.error("FetchSoldProducts Error:", action.payload?.message);
            })

            // Fetch Single Sold Product
            .addCase(fetchSingleSoldProduct.pending, (state) => {
                state.isloading = true;
            })
            .addCase(fetchSingleSoldProduct.fulfilled, (state, action) => {
                state.isloading = false;
                state.singleSoldProduct = action.payload.data;
            })
            .addCase(fetchSingleSoldProduct.rejected, (state, action) => {
                state.isloading = false;
                state.singleSoldProduct = null;
                console.error("FetchSingleSoldProduct Error:", action.payload?.message);
            });
    },
});

export default ProductSlice.reducer;