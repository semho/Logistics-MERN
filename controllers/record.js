import Record from "../models/Record.js";
import Product from "../models/Product.js";
import Forwarder from "../models/Forwarder.js";
import Organization from "../models/Organization.js";
/**
 * Создание записи
 * @param {*} req
 * @param {*} res
 */
export const createRecord = async (req, res) => {
  try {
    try {
      const {
        fromOrganization_id,
        toOrganization_id,
        distance,
        product_id,
        units,
        forwarder_id,
        price,
      } = req.body;
      if (
        !fromOrganization_id ||
        !toOrganization_id ||
        !distance ||
        !product_id ||
        !units ||
        !forwarder_id ||
        !price
      ) {
        throw new Error("Некорректные данные в полях ввода формы");
      }
      const sum = units * price;
      const newRecord = new Record({
        fromOrganization_id,
        toOrganization_id,
        distance,
        product_id,
        units,
        forwarder_id,
        price,
        sum,
        owner: req.user.userId,
      });

      const record = await newRecord.save();
      const from = await Organization.findById(
        record.fromOrganization_id
      ).exec();
      const to = await Organization.findById(record.toOrganization_id).exec();
      const product = await Product.findById(record.product_id).exec();
      const forwarder = await Forwarder.findById(record.forwarder_id).exec();

      const convertedRecord = async () => {
        return {
          ...record._doc,
          fromOrganization_id: from.name,
          toOrganization_id: to.name,
          product_id: product.product,
          forwarder_id: forwarder.forwarder,
        };
      };

      const answerRecord = await convertedRecord();

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
      //получаем все записи
      const result = await Record.find({ owner: req.user.userId }).exec();
      //проходимся по ним циклом
      const records = result.map(async (record) => {
        //в цикле получаем по id запись товара
        const product = await Product.findById(record.product_id).exec();
        //запись ответственного
        const forwarder = await Forwarder.findById(record.forwarder_id).exec();
        //запись организации откуда везем
        const from = await Organization.findById(
          record.fromOrganization_id
        ).exec();
        //запись организации куда везем
        const to = await Organization.findById(record.toOrganization_id).exec();
        //возвратим преобразованный объект в массив
        return {
          ...record._doc,
          product_id: product.product,
          forwarder_id: forwarder.forwarder,
          fromOrganization_id: from.name,
          toOrganization_id: to.name,
        };
      });
      //дождемся возврата с данными всех объектов в массиве записей
      const recordsPromise = await Promise.all(records);
      //и вернем на фронт
      res.json(recordsPromise);
    } catch (e) {
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
      const { _id, distance, units, price } = req.body;
      const sum = units * price;
      const editRecord = await Record.updateOne(
        { _id: _id },
        {
          $set: {
            dateUpdate: new Date(),
            distance: distance,
            units: units,
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
