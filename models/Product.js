import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const ProductSchema = new Schema(
  {
    product: { type: String, require: true },
    unit: { type: String, require: true },
    owner: { type: Types.ObjectId, ref: "User" },
  },
  { autoIndex: false }
);

export default mongoose.model("Product", ProductSchema);
