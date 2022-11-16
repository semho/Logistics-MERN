import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import config from "../config/default.json" assert { type: "json" };
import RefreshToken from "../models/RefreshToken.js";

export const signin = async (req, res) => {
  await check("email", "Некорректный email")
    .normalizeEmail()
    .isEmail()
    .run(req);
  await check("password", "Минимальная длина пароля 6 символов")
    .isLength({
      min: 6,
    })
    .run(req);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при входе в приложение",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }
    const token = jwt.sign({ userId: user.id }, config.secretJwt, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await RefreshToken.createToken(user);
    res.json({ token, userId: user.id, refreshToken: refreshToken });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};

export const signup = async (req, res) => {
  await check("email", "Некорректный email").isEmail().run(req);
  await check("password", "Минимальная длина пароля 6 символов")
    .isLength({
      min: 6,
    })
    .run(req);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Некорректные данные при регистрации",
      });
    }
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой пользователь уже существует" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user.id }, config.secretJwt, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken = await RefreshToken.createToken(user);
    res.status(201).json({
      message: "Пользователь создан",
      token,
      userId: user.id,
      refreshToken,
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign(
      { userId: refreshToken.user._id },
      config.secretJwt,
      {
        expiresIn: config.jwtExpiration,
      }
    );

    return res.status(200).json({
      token: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
