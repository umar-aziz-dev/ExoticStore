import mongoose, { Schema } from "mongoose";


const ContactSchema = new Schema({
    email: {
        type: String,
       
    },
    phone: {
        type: String,
       
    }
}, { timestamps: true })

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;