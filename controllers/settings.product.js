import Product from "../models/Product.js";

/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createProduct = async (req, res) => {
  try {
    try {
      const { product, unit } = req.body;
      if (!product || !unit) {
        throw new Error("Некорректные данные в полях ввода формы");
      }
      const newRecord = new Destination({
        product,
        unit,
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
export const getProducts = async (req, res) => {
  try {
    try {
      //userId следует получить из middleware
      const records = await Product.find({ owner: req.user.userId });
      res.json(records);
    } catch (e) {
      res.status(400).json({ message: "У пользователя записи не найдены" });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * удаление записи
 * @param {*} req
 * @param {*} res
 */
export const deleteProduct = async (req, res) => {
  try {
    try {
      const { id } = req.body;
      const recordDelete = await Product.deleteOne({
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
export const updateProduct = async (req, res) => {
  try {
    try {
      const { _id, product, unit } = req.body;
      const editRecord = await Product.updateOne(
        { _id: _id },
        {
          $set: {
            product,
            unit,
          },
        }
      );

      if (editRecord.matchedCount === 0) {
        throw new Error("Запись не найдена");
      }
      res.json({ message: "Запись изменена", editRecord });
    } catch (e) {
      if (!!e.reason)
        return res.status(400).json({ message: "Не верный тип в поле ввода" });
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
