import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const DestinationSchema = new Schema({
  from: { type: String, require: true },
  to: { type: String, require: true },
  sender: { type: String, require: true },
  recipient: { type: String, require: true },
  distance: { type: Number, require: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default mongoose.model("Destination", DestinationSchema);
