const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
