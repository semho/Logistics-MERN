import Record from "../models/Record.js";
import { getProductById } from "./settings.product.js";
import { getOrganizationById } from "./settings.organization.js";
import { getForwarderById } from "./settings.forwarder.js";
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
      const from = await getOrganizationById(record.fromOrganization_id);
      const to = await getOrganizationById(record.toOrganization_id);
      const product = await getProductById(record.product_id);
      const forwarder = await getForwarderById(record.forwarder_id);

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
        const product = await getProductById(record.product_id);
        //запись ответственного
        const forwarder = await getForwarderById(record.forwarder_id);
        //запись организации откуда везем
        const from = await getOrganizationById(record.fromOrganization_id);
        //запись организации куда везем
        const to = await getOrganizationById(record.toOrganization_id);
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

/**
 * Получаем сумму отгруженных товаров конкретной организации по ее id с полной стоимостью этих товаров
 * @param {*} req
 * @param {*} res
 * @return json объект агрегационных данных
 */
export const getSumShipProductOrganization = async (req, res) => {
  try {
    try {
      const id = req.params.id;

      const result = await Record.aggregate([
        {
          $match: {
            fromOrganization_id: id,
          },
        },
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$sum" },
            totalUnits: { $sum: "$units" },
          },
        },
      ]).exec();

      let status = false;
      if (result.length > 0) status = true;

      const objAnswer = {
        isFill: status,
        ...result[0],
      };

      res.json({ objAnswer });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};

/**
 * Получаем сумму полученных товаров конкретной организации по ее id с полной стоимостью этих товаров
 * @param {*} req
 * @param {*} res
 * @return json объект агрегационных данных
 */
export const getSumArrivalProductOrganization = async (req, res) => {
  try {
    try {
      const id = req.params.id;

      const result = await Record.aggregate([
        {
          $match: {
            toOrganization_id: id,
          },
        },
        {
          $group: {
            _id: null,
            totalSum: { $sum: "$sum" },
            totalUnits: { $sum: "$units" },
          },
        },
      ]).exec();

      let status = false;
      if (result.length > 0) status = true;

      const objAnswer = {
        isFill: status,
        ...result[0],
      };

      res.json({ objAnswer });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
