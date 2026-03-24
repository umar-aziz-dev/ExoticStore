import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isloading: false,
    contactInfo: null,
}

// Contact Info
export const AddContact = createAsyncThunk(
    "/superadmin/contactus/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:5000/superadmin/contactus/add", formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot Add Contact" });
        }
    }
);

export const fetchContact = createAsyncThunk(
    "/superadmin/contactus/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/superadmin/contactus/get");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot Fetch Contact" });
        }
    }
);

export const deleteContact = createAsyncThunk(
    "/superadmin/contactus/delete",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.delete("http://localhost:5000/superadmin/contactus/delete");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot Delete Contact" });
        }
    }
);

const ContactSlice = createSlice({
    name: "Contact",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contactInfo = action.payload.data;
            })
            .addCase(AddContact.rejected, (state) => {
                state.isLoading = false;
                state.contactInfo = null;
            })
            .addCase(fetchContact.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contactInfo = action.payload.data;
            })
            .addCase(fetchContact.rejected, (state) => {
                state.isLoading = false;
                state.contactInfo = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contactInfo = null;
            })

    }
})

export default ContactSlice.reducer