import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const RecordSchema = new Schema(
  {
    date: { type: Date, default: Date.now, require: true },
    dateUpdate: { type: Date, default: Date.now, require: true },
    fromOrganization_id: { type: String, require: true },
    toOrganization_id: { type: String, require: true },
    distance: { type: Number, require: true },
    product_id: { type: String, require: true },
    units: { type: Number, require: true },
    forwarder_id: { type: String, require: true },
    price: { type: Number, require: true },
    sum: { type: Number, require: true },
    owner: { type: Types.ObjectId, ref: "User" },
  },
  { autoIndex: false }
);

export default mongoose.model("Record", RecordSchema);
