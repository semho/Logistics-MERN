import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { check, validationResult } from "express-validator";
import config from "../config/default.json" assert { type: "json" };

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
      expiresIn: "1h",
    });
    res.json({ token, userId: user.id });
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
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "Пользователь создан", token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
