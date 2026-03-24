import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    socialLinks: null,
}


// Social Media Links
export const AddSocialLinks = createAsyncThunk(
    "/superadmin/sociallinks/add",
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/superadmin/sociallinks/add",
                formData
            );
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot Add Social Links" });
        }
    }
);

export const fetchSocialLinks = createAsyncThunk(
    "/superadmin/sociallinks/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:5000/superadmin/sociallinks/get");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Cannot Fetch Social Links" });
        }
    }
);

const SocialSlice = createSlice({
    name: "Social",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Social Links
        builder.addCase(AddSocialLinks.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(AddSocialLinks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.socialLinks = action.payload.data;
            })
            .addCase(AddSocialLinks.rejected, (state) => {
                state.isLoading = false;
                state.socialLinks = null;
            })
            .addCase(fetchSocialLinks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSocialLinks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.socialLinks = action.payload.data;
            })
            .addCase(fetchSocialLinks.rejected, (state) => {
                state.isLoading = false;
                state.socialLinks = null;
            })

    }
})
export default SocialSlice.reducer
