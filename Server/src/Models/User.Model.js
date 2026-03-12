import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,      // ✅ fixed
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,      // ✅ fixed
        unique: true,
        lowercase: true,
    },
    phone:{
        type:String,
        required:true
    },
    password: {
        type: String,     // ✅ fixed
        minlength: 8        // ✅ fixed
    },
    role: {
        type: String,
        default: "user",
    },
    googleid: {
        type: String,
    },
    userresetpassToken: String,
    userresetpassExpiry: Date,
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;