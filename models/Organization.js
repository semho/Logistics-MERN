import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const OrganizationSchema = new Schema({
  INN: {
    type: Number,
    unique: true,
    min: [10, "ИНН слишком короткий"],
    max: 12,
    require: [true, "Требуется ИНН организации"],
  },
  name: {
    type: String,
    min: [3, "Название организации должно состоять минимум из 3 символов"],
    require: [true, "Требуется название организации"],
  },
  phone: {
    type: Number,
    unique: true,
    min: [10, "телефон должен состоять из 10 символов"],
    max: [10, "телефон должен состоять из 10 символов"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} Номер телефона не валиден!`,
    },
    required: [true, "Требуется номер телефона организации"],
  },
  address: {
    type: String,
    require: [true, "Требуется адрес организации"],
  },
  email: {
    type: String,
    unique: true,
    default: null,
  },
  KPP: {
    type: Number,
    unique: true,
    min: [9, "КПП слишком короткий"],
    max: [9, "КПП слишком длинный"],
    default: null,
  },
  OGRN: {
    type: Number,
    min: [13, "ОГРН слишком короткий"],
    max: [15, "ОГРН слишком длинный"],
    default: null,
  },
  paymentAccount: {
    type: Number,
    unique: true,
    min: [20, "Расчетный счет слишком короткий"],
    max: [20, "Расчетный счет слишком длинный"],
    default: null,
  },
  corsets: {
    type: Number,
    min: [20, "Кор.счет слишком короткий"],
    max: [20, "Кор.счет слишком длинный"],
    default: null,
  },
  BIC: {
    type: Number,
    min: [9, "БИК банка слишком короткий"],
    max: [9, "БИК банка слишком длинный"],
    default: null,
  },
  coordinates: {
    type: String,
    default: null,
  },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default mongoose.model("Organization", OrganizationSchema);
