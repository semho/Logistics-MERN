import mongoose from "mongoose";
import config from "../config/default.json" assert { type: "json" };
import crypto from "crypto";

function generateToken({ stringBase = "base64", byteLength = 48 } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}

const RefreshTokenSchema = new mongoose.Schema({
  token: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = await generateToken();

  let _object = new this({
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await _object.save();

  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

export default mongoose.model("RefreshToken", RefreshTokenSchema);
