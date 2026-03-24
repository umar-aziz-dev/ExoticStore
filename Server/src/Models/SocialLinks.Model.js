import mongoose, { Schema } from "mongoose";

const SocialSchema = new Schema({
    facebook: {
        type: String,
        default: "",
    },
    instagram: {
        type: String,
        default: "",
    },
    tiktok: {
        type: String,
        default: "",
    },
}, { timestamps: true })

const Social = mongoose.model("Social", SocialSchema);
export default Social;