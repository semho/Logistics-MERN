const { Router } = require("express");
const Record = require("../models/Record");
const router = Router();
const auth = require("../middleware/auth.middleware");
const config = require("config");

router.post("/create", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { fromTo, distance, product, units, forwarder, price } = req.body;
    const sum = units * price;
    const newRecord = new Record({
      fromTo,
      distance,
      product,
      units,
      forwarder,
      price,
      sum,
      owner: req.user.userId,
    });

    await newRecord.save();
    res.status(201).json({ newRecord });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    //userId получаем из middleware auth
    const records = await Record.find({ owner: req.user.userId });
    res.json(records);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.json(record);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
});

module.exports = router;
