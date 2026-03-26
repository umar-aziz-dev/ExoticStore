import axios from "axios"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    productList: [],
    isloading: false,
    singleProduct: null,
}

export const fetchSingleProduct = createAsyncThunk("/user/listing/product/get",
    async (id) => {
        const result = await axios.get(`http://localhost:4000/user/listing/product/get/${id}`);
        return result.data;
    }
)

export const fetchAllProduct = createAsyncThunk("/user/listing/get",
    async () => {
        const result = await axios.get("http://localhost:4000/user/listing/get")
        return result.data;
    }
)

const ProductSlice = createSlice({
    name: "UserProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProduct.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchAllProduct.fulfilled, (state, action) => {
            state.isloading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllProduct.rejected, (state) => {
            state.isloading = true;
            state.productList = [];
        }).addCase(fetchSingleProduct.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.isloading = false;
            state.singleProduct = action.payload.data;
        }).addCase(fetchSingleProduct.rejected, (state) => {
            state.isloading = true;
            state.singleProduct = null;
        })
    }
})

export default ProductSlice.reducer;