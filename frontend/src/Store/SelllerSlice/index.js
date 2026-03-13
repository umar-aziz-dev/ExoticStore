import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isloading: false,
    productList: [],
    singleProduct: null,
    soldProduct: [],
    singleSoldProduct: null,
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

export const UpdateStatus = createAsyncThunk("/seller/soldproducts",
    async ({ id, formdata }) => {
        const result = await axios.post(`http://localhost:5000/seller/soldproducts/${id}`,
            formdata
        )
        return result.data
    }
)

export const fetchSoldProducts = createAsyncThunk("/seller/soldproducts/soldproductview/get",
    async () => {
        const result = await axios.get("http://localhost:5000/seller/soldproducts/soldproductview/get")
        return result.data;
    }
)

export const fetchSingleSoldProduct = createAsyncThunk("/seller/soldproducts/soldproductdetails/get",
    async (id) => {
        const result = await axios.get(`http://localhost:5000/seller/soldproducts/soldproductdetails/get/${id}`)
        return result.data
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
        }).addCase(UpdateStatus.pending, (state) => {
            state.isloading = true;
        }).addCase(UpdateStatus.fulfilled, (state, action) => {
            state.isloading = false;
            state.soldProduct = action.payload.data;
        }).addCase(UpdateStatus.rejected, (state) => {
            state.isloading = false;
            state.soldProduct = [];
        }).addCase(fetchSoldProducts.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchSoldProducts.fulfilled, (state, action) => {
            state.isloading = false;
            state.soldProduct = action.payload.data;
        }).addCase(fetchSoldProducts.rejected, (state) => {
            state.isloading = false;
            state.soldProduct = [];
        }).addCase(fetchSingleSoldProduct.pending, (state) => {
            state.isloading = true;
        }).addCase(fetchSingleSoldProduct.fulfilled, (state, action) => {
            state.isloading = false;
            state.singleSoldProduct = action.payload.data;
        }).addCase(fetchSingleSoldProduct.rejected, (state) => {
            state.isloading = false;
            state.singleSoldProduct = null;
        })
    }
})
export default ProductSlice.reducer