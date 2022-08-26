const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const UserSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  listRecords: [{ type: Types.ObjectId, ref: "Record" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
