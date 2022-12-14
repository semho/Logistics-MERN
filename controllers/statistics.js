import Record from "../models/Record.js";
import { getProductById } from "./settings.product.js";

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

/**
 * Самый дорогой товар за единицу с его названием
 * @param {*} req
 * @param {*} res
 * @return объект с ценой и названием
 */
export const maxPriceProduct = async (req, res) => {
  try {
    try {
      const result = await Record.find({ owner: req.user.userId })
        .sort({ price: -1 })
        .limit(1);
      const price = result[0].price;
      const product = await getProductById(result[0].product_id);
      const productName = product.product;
      res.json({ price, productName });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};

/**
 * Самый дешевый товар за единицу с его названием
 * @param {*} req
 * @param {*} res
 * @return объект с ценой и названием
 */
export const minPriceProduct = async (req, res) => {
  try {
    try {
      const result = await Record.find({ owner: req.user.userId })
        .sort({ price: +1 })
        .limit(1);
      const price = result[0].price;
      const product = await getProductById(result[0].product_id);
      const productName = product.product;
      res.json({ price, productName });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
/**
 * получение записей отправленного товара от одной организации к другой
 * @param {*} req
 * @param {*} res
 */
export const shipArrivalProducts = async (req, res) => {
  try {
    try {
      const { organizationFrom_id, organizationTo_id, product_id } = req.body;

      const objQuery = {
        product_id: { $eq: product_id },
        toOrganization_id: { $eq: organizationTo_id },
        fromOrganization_id: { $eq: organizationFrom_id },
      };

      if (product_id === "AllProducts") {
        delete objQuery.product_id;
      }

      const result = await Record.aggregate([
        {
          $match: objQuery,
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
      res.status(400).json({ message: "У пользователя записи не найдены" });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};

/**
 * получение записей отправленного товара от одной организации к другой за диапазон дат
 * @param {*} req
 * @param {*} res
 */
export const shipArrivalProductsDateInterval = async (req, res) => {
  try {
    try {
      const {
        organizationFrom_id,
        organizationTo_id,
        product_id,
        dateStart,
        dateEnd,
      } = req.body;

      const parseDateEnd = dateEnd.split("-");

      const dateEndAtEndOfDay = new Date(
        Date.UTC(
          parseDateEnd[0],
          parseDateEnd[1] - 1,
          parseDateEnd[2],
          23,
          59,
          59
        )
      );

      const objQuery = {
        date: {
          $gte: dateStart,
          $lte: dateEndAtEndOfDay,
        },

        fromOrganization_id: organizationFrom_id,
        toOrganization_id: organizationTo_id,
        product_id: product_id,
      };

      if (product_id === "AllProducts") {
        delete objQuery.product_id;
      }

      const resultFind = await Record.find(objQuery, {
        units: 1,
        sum: 1,
        _id: 0,
      }).exec();

      const totalUnits = resultFind.reduce((acc, cur) => acc + cur.units, 0);
      const totalSum = resultFind.reduce((acc, cur) => acc + cur.sum, 0);

      let status = false;
      if (totalUnits > 0 && totalSum > 0) status = true;

      const objAnswer = {
        isFill: status,
        totalUnits: totalUnits,
        totalSum: totalSum,
      };

      res.json({ objAnswer });
    } catch (e) {
      res.status(400).json({ message: "У пользователя записи не найдены" });
    }
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так." });
  }
};
