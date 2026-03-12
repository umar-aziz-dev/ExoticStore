import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isloading: false,
    productList: [],
    singleProduct: null,
}

export const AddProducts = createAsyncThunk("/seller/product/add",
    async (formdata) => {
        const result = await axios.post("http://localhost:5000/seller/product/add",
            formdata
        )
        return result.data;
    }
)

export const editProduct = createAsyncThunk("/seller/product/edit",
    async ({ id, formdata }) => {
        const result = await axios.put(`http://localhost:5000/seller/product/edit/${id}`,
            formdata
        )
        return result.data;
    }
)

export const fetchProduct = createAsyncThunk("/seller/product/get",
    async () => {
        const result = await axios.get("http://localhost:5000/seller/product/get")
        return result.data;
    }
)

export const fetchSingleProduct = createAsyncThunk("/seller/product/fetch",
    async (id) => {
        const result = await axios.get(`http://localhost:5000/seller/product/fetch/${id}`)
        return result.data
    }
)


export const deleteProduct = createAsyncThunk("/seller/product/delete",
    async (id) => {
        const result = await axios.delete(`http://localhost:5000/seller/product/delete/${id}`)
        return result.data;
    }
)

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddProducts.pending, (state) => {
            state.isloading = true;
        }).addCase(AddProducts.fulfilled, (state, action) => {
            state.isloading = false;
            state.productList = action.payload.data;
        }).addCase(AddProducts.rejected, (state) => {
            state.isloading = false;
            state.productList = [];
        }).addCase(fetchProduct.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchProduct.fulfilled, (state, action) => {
            state.isloading = false;
            state.productList = action.payload.data;
        }).addCase(fetchProduct.rejected, (state) => {
            state.isloading = false;
            state.productList = [];
        }).addCase(fetchSingleProduct.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
            state.isloading = false;
            state.singleProduct = action.payload.data;
        }).addCase(fetchSingleProduct.rejected, (state) => {
            state.isloading = false;
            state.singleProduct = null;
        })
    }
})
export default ProductSlice.reducer