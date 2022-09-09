import Destination from "../models/Destination.js";

/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createDestination = async (req, res) => {
  try {
    try {
      const { from, to, sender, recipient, distance } = req.body;
      if (!from || !to || !sender || !recipient || !distance) {
        throw new Error("Некорректные данные в полях ввода формы");
      }
      const newRecord = new Destination({
        from,
        to,
        sender,
        recipient,
        distance,
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
export const getDestination = async (req, res) => {
  try {
    try {
      //userId следует получить из middleware
      const records = await Destination.find({ owner: req.user.userId });
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
export const deleteDestination = async (req, res) => {
  try {
    try {
      const { id } = req.body;
      const recordDelete = await Destination.deleteOne({
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
export const updateDestination = async (req, res) => {
  try {
    try {
      const { _id, from, to, sender, recipient, distance } = req.body;
      const editRecord = await Destination.updateOne(
        { _id: _id },
        {
          $set: {
            from: from,
            to: to,
            sender: sender,
            recipient: recipient,
            distance: distance,
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
