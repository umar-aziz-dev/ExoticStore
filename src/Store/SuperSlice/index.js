import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    adminList: [],
    isLoading: false,
}

export const CreateAdmin = createAsyncThunk("/superadmin/admincreate/add",
    async (fromdata) => {
        const result = await axios.post("http://localhost:5000/superadmin/admincreate/add",
            fromdata
        )
        return result.data;
    }
)

export const FetchAdmin = createAsyncThunk("/superadmin/admincreate/get",
    async () => {
        const result = await axios.get("http://localhost:5000/superadmin/admincreate/get");
        return result.data;
    }

)

export const DeleteAdmin = createAsyncThunk("/superadmin/admincreate/delete",
    async (id) => {
        const result = await axios.post(`http://localhost:5000/superadmin/admincreate/delete/${id}`)
        return result.data
    }
)

const SuperAdminSlice = createSlice({
    name: "SuperSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(CreateAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(CreateAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminList = action.payload.data;
        }).addCase(CreateAdmin.rejected, (state) => {
            state.isLoading = true;
            state.adminList = [];
        }).addCase(FetchAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.adminList = action.payload.data;
        }).addCase(FetchAdmin.rejected, (state) => {
            state.isLoading = true;
            state.adminList = [];
        })  .addCase(DeleteAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(DeleteAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove admin from list by _id
        if (action.payload.success && action.payload.data?._id) {
          state.adminList = state.adminList.filter(
            (admin) => admin._id !== action.payload.data._id
          );
        }
      })
      .addCase(DeleteAdmin.rejected, (state) => {
        state.isLoading = false;
      });
    }
})


export default SuperAdminSlice.reducer;