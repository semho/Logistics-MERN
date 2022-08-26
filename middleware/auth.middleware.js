const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //строку Bearer token помещаем в массив и забираем token
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Нет авторизации" });
    }
    //декодируем токен
    const decoded = jwt.verify(token, config.get("secretJwt"));
    //token отправляем в request в объект user
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
