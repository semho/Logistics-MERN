import jwt from "jsonwebtoken";
import config from "../config/default.json" assert { type: "json" };

export const auth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //строку Bearer token помещаем в массив и забираем token
    const token = req.headers.authorization.split(" ")[1].trim();
    if (!token) {
      res.status(401).json({ message: "Нет авторизации" });
    }

    try {
      //декодируем токен
      const decoded = jwt.verify(token, config.secretJwt);
      //token отправляем в request в объект user
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({
        message: "Срок действия токена авторизации истек",
        jwtSessionClose: "true",
      });
    }
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
