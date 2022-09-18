import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const ForwarderSchema = new Schema({
  forwarder: { type: String, require: true },
  birth: { type: String, require: true },
  carNumber: { type: String, require: true },
  carBrand: { type: String, require: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default mongoose.model("Forwarder", ForwarderSchema);
