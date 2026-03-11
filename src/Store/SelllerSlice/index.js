import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    isloading: false,
    productList: []
}

export const AddProduct = createAsyncThunk("/seller/product/add",
    async (formdata) => {
        const result = await axios.post("http://localhost:5000/seller/product/add",
            formdata
        )
        return result.data;
    }
)

export const editProduct = createAsyncThunk("/seller/product/edit",
    async (id,formdata) => {
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


export const deleteProduct = createAsyncThunk("/seller/product/delete",
     async (id) => {
        const result = await axios.put(`http://localhost:5000/seller/product/delete/${id}`)
        return result.data;
    }
)

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AddProduct.pending,(state)=>{
            state.isloading=true;
        }).addCase(AddProduct.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productList=action.payload.data;
        }).addCase(AddProduct.rejected,(state)=>{
            state.isloading=false;
            state.productList=[];
        }).addCase(fetchProduct.pending,(state)=>{
            state.isloading=true;
        }).addCase(fetchProduct.fulfilled,(state,action)=>{
            state.isloading=false;
            state.productList=action.payload.data;
        }).addCase(fetchProduct.rejected,(state)=>{
            state.isloading=false;
            state.productList=[];
        })
    }
})
export default ProductSlice.reducer