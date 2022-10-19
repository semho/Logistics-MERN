import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const OrganizationSchema = new Schema({
  INN: {
    type: Number,
    unique: true,
    min: [1000000000, "ИНН слишком короткий"],
    max: [999999999999, "ИНН слишком длинный"],
    trim: true,
    require: [true, "Требуется ИНН организации"],
  },
  name: {
    type: String,
    lowercase: true,
    minlength: [
      3,
      "Название организации должно состоять минимум из 3 символов",
    ],
    trim: true,
    require: [true, "Требуется название организации"],
  },
  phone: {
    type: String,
    unique: true,
    minlength: [14, "телефон должен состоять из 10 цифр"],
    trim: true,
    required: [true, "Требуется номер телефона организации"],
  },
  address: {
    type: String,
    lowercase: true,
    trim: true,
    require: [true, "Требуется адрес организации"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    require: [true, "Требуется email организации"],
    sparse: true,
    default: null,
  },
  bank: {
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  },
  KPP: {
    type: String,
    trim: true,
    sparse: true,
    unique: true,
    validate: {
      validator: function (v) {
        if (v > 0) {
          return /\b\d{9}\b/.test(v);
        }
      },
      message: (props) => `${props.value} КПП должно состоять из 9 цифр`,
    },
    default: null,
  },
  OGRN: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (v > 0) {
          return /(\b\d{13}\b|\b\d{15}\b)/.test(v);
        }
      },
      message: (props) =>
        `${props.value} ОГРН должно состоять из 13 или 15 цифр`,
    },
    default: null,
  },
  paymentAccount: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    validate: {
      validator: function (v) {
        if (v > 0) {
          return /\b\d{20}\b/.test(v);
        }
      },
      message: (props) =>
        `${props.value} Расчетный счет должен состоять из 20 цифр`,
    },
    default: null,
  },
  corAccount: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (v > 0) {
          return /\b\d{20}\b/.test(v);
        }
      },
      message: (props) => `${props.value} Кор.счет должен состоять из 20 цифр`,
    },
    default: null,
  },
  BIC: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        if (v > 0) {
          return /\b\d{9}\b/.test(v);
        }
      },
      message: (props) => `${props.value} БИК должен состоять из 9 цифр`,
    },
    default: null,
  },
  coordinates: {
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  },
  owner: { type: Types.ObjectId, ref: "User" },
});

export default mongoose.model("Organization", OrganizationSchema);
