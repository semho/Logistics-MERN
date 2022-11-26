import Forwarder from "../models/Forwarder.js";

/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createForwarder = async (req, res) => {
  try {
    try {
      const { forwarder, birth, carNumber, carBrand } = req.body;

      if (!forwarder || !birth || !carNumber || !carBrand) {
        throw new Error("Некорректные данные в полях ввода формы");
      }
      const newRecord = new Forwarder({
        forwarder,
        birth,
        carNumber,
        carBrand,
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
export const getForwarders = async (req, res) => {
  try {
    try {
      //userId следует получить из middleware
      const records = await Forwarder.find({ owner: req.user.userId });
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
export const deleteForwarder = async (req, res) => {
  try {
    try {
      const { id } = req.body;
      const recordDelete = await Forwarder.deleteOne({
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
export const updateForwarder = async (req, res) => {
  try {
    try {
      const { _id, forwarder, birth, carNumber, carBrand } = req.body;
      const editRecord = await Forwarder.updateOne(
        { _id: _id },
        {
          $set: {
            forwarder,
            birth,
            carNumber,
            carBrand,
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

/**
 * Получаем объект ответственного по его id
 * @param {*} id - ответственного
 * @returns - объект ответственного
 */
export const getForwarderById = async (id) =>
  await Forwarder.findById(id).exec();
