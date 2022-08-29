const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const RecordSchema = new Schema({
  date: { type: Date, default: Date.now, require: true },
  fromTo: { type: String, require: true },
  distance: { type: Number, require: true },
  product: { type: String, require: true },
  units: { type: Number, require: true },
  forwarder: { type: String, require: true },
  price: { type: Number, require: true },
  sum: { type: Number, require: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

const Record = mongoose.model("Record", RecordSchema);

module.exports = Record;
