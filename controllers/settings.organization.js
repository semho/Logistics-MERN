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
        bank,
        KPP,
        OGRN,
        paymentAccount,
        corAccount,
        BIC,
        coordinates,
      } = req.body;

      validateFieldsOrganization({
        INN,
        name,
        phone,
        address,
        KPP,
        OGRN,
        paymentAccount,
        corAccount,
        BIC,
      });

      const newRecord = new Organization({
        INN,
        name,
        phone,
        address,
        email,
        bank,
        KPP,
        OGRN,
        paymentAccount,
        corAccount,
        BIC,
        coordinates,
        owner: req.user.userId,
      });

      //проверка на существование дубля ИНН или Телефона
      const existRecord = await Organization.find({
        $or: [{ INN: INN }, { phone: phone }],
      });

      if (!!existRecord && existRecord.length > 0)
        return res.status(400).json({
          message: "Запись с таким 'ИНН' или 'Телефоном' уже существует",
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
        bank,
        KPP,
        OGRN,
        paymentAccount,
        corAccount,
        BIC,
        coordinates,
      } = req.body;

      validateFieldsOrganization({
        INN,
        name,
        phone,
        address,
        KPP,
        OGRN,
        paymentAccount,
        corAccount,
        BIC,
      });

      const editRecord = await Organization.updateOne(
        { _id: _id },
        {
          $set: {
            INN: INN,
            name: name,
            phone: phone,
            address: address,
            email: email,
            bank: bank,
            KPP: KPP,
            OGRN: OGRN,
            paymentAccount: paymentAccount,
            corAccount: corAccount,
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

/**
 * функция валидации всех полей модели
 * @param {object} obj - передаем объект с проверяемыми полями
 */
function validateFieldsOrganization(obj) {
  if (!obj.INN || !obj.name || !obj.phone || !obj.address) {
    throw new Error("Обязательные поля не заполнены");
  }

  fieldIsNumeric(obj.INN, "ИНН");

  if (obj.KPP) {
    fieldIsNumeric(obj.KPP, "КПП");
  }

  if (obj.OGRN) {
    fieldIsNumeric(obj.OGRN, "ОГРН");
  }

  if (obj.paymentAccount) {
    fieldIsNumeric(obj.paymentAccount, "Расчетный счет");
  }

  if (obj.corAccount) {
    fieldIsNumeric(obj.corAccount, "Кор.счет");
  }

  if (obj.BIC) {
    fieldIsNumeric(obj.BIC, "БИК");
  }
}

/**
 * выбрасываем ошибку если не число
 * @param {number | string} value
 * @param {string} name - нейминг проверяемого поля
 */
function fieldIsNumeric(value, name = "формы") {
  if (!isNumeric(value)) {
    throw new Error(`Поле "${name}" должно быть числом`);
  }
}

/**
 * проверка на число
 * @param {number | string} value
 * @returns boolean
 */
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}
