import mongoose from "mongoose";

const { Schema } = mongoose;

const PolicySchema = new Schema(
  {
    name: {
      type: String,
      required: true, // optional, add if name is mandatory
    },
    description: {
      type: String,
      required: true, // optional
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", PolicySchema);

export default Policy; // Correct way to export