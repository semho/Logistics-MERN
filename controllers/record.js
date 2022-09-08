import Record from "../models/Record.js";
/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createRecord = async (req, res) => {
  try {
    try {
      const { fromTo, distance, product, units, forwarder, price } = req.body;
      if (!fromTo || !distance || !product || !units || !forwarder || !price) {
        throw new Error("Некорректные данные в полях ввода формы");
      }
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
      const answerRecord = await newRecord.save();
      res.status(201).json({ message: "Запись добавлена", answerRecord });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * получение всех записей
 * @param {*} req
 * @param {*} res
 */
export const getRecords = async (req, res) => {
  try {
    try {
      //userId следует получить из middleware
      const records = await Record.find({ owner: req.user.userId });
      res.json(records);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "У пользователя записи не найдены" });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * получение одной записи
 * @param {*} req
 * @param {*} res
 */
export const getRecordOne = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.json(record);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * удаление записи
 * @param {*} req
 * @param {*} res
 */
export const deleteRecord = async (req, res) => {
  try {
    try {
      const { id } = req.body;
      const recordDelete = await Record.deleteOne({
        _id: id,
      });
      if (recordDelete.deletedCount === 0)
        throw new Error("Не удалось удалить запись из базы данных");
      res.json({ message: "Запись удалена", recordDelete });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * обновление записи
 * @param {*} req
 * @param {*} req
 */
export const updateRecord = async (req, res) => {
  try {
    try {
      const { _id, fromTo, distance, product, units, forwarder, price } =
        req.body;
      const sum = units * price;
      const editRecord = await Record.updateOne(
        { _id: _id },
        {
          $set: {
            fromTo: fromTo,
            distance: distance,
            product: product,
            units: units,
            forwarder: forwarder,
            price: price,
            sum: sum,
          },
        }
      );

      if (editRecord.matchedCount === 0) {
        throw new Error("Запись не найдена");
      }
      res.json({ message: "Запись изменена", editRecord });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
