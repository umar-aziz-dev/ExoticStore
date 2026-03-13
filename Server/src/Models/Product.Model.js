import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    characterid: {
        type: String,
        required: true,
    },
    img: {
        type: [String],
        required: true,
    },

    video: {
        type: String, // video URL or uploaded file path
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    saleprice: {
        type: Number
    },

    description: {
        type: String,
    },

    sellername: {
        type: String,
        required: true,
    },

    sellerwatsapp: {
        type: String,
        required: true
    },

    sold: {
        type: String,
        default: "Available"
    },

    purchasedprice: {
        type: String
    },


    boughtfrom: {
        type: String,

    },
    accountemail: {
        type: String,

    },
    accountnumber: {
        type: String,

    },
    warrentygot: {
        type: String,

    },

    buyername: {
        type: String, default: "empty"
    },
    buyeremail: {
        type: String, default: "empty"
    },
    buyernumber: {
        type: String, default: "empty"
    },
    warrentygiven: {
        type: String, default: "empty"
    },


}, {
    timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;