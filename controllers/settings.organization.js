import Organization from "../models/Organization.js";

/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createOrganization = async (req, res) => {
  try {
    try {
      const {
        INN,
        name,
        phone,
        address,
        email,
        KPP,
        OGRN,
        paymentAccount,
        corsets,
        BIC,
        coordinates,
      } = req.body;
      if (!INN || !name || !phone || !address) {
        throw new Error("Обязательные поля не заполнены");
      }
      const newRecord = new Organization({
        INN,
        name,
        phone,
        address,
        email,
        KPP,
        OGRN,
        paymentAccount,
        corsets,
        BIC,
        coordinates,
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
export const getOrganization = async (req, res) => {
  try {
    try {
      //userId следует получить из middleware
      const records = await Organization.find({ owner: req.user.userId });
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
export const deleteOrganization = async (req, res) => {
  try {
    try {
      const { id } = req.body;
      const recordDelete = await Organization.deleteOne({
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
export const updateOrganization = async (req, res) => {
  try {
    try {
      const {
        _id,
        INN,
        name,
        phone,
        address,
        email,
        KPP,
        OGRN,
        paymentAccount,
        corsets,
        BIC,
        coordinates,
      } = req.body;
      const editRecord = await Organization.updateOne(
        { _id: _id },
        {
          $set: {
            INN: INN,
            name: name,
            phone: phone,
            address: adress,
            email: email,
            KPP: KPP,
            OGRN: OGRN,
            paymentAccount: paymentAccount,
            corsets: corsets,
            BIC: BIC,
            coordinates: coordinates,
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
