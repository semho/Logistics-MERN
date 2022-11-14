import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const UserSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  listRecords: [{ type: Types.ObjectId, ref: "Record" }],
  // listDestination: [{ type: Types.ObjectId, ref: "Destination" }],
});

export default mongoose.model("User", UserSchema);
