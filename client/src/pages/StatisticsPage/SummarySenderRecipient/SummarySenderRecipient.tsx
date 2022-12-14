import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useShowError } from "../../../hooks/useShowError";
import {
  shipArrivalProductsDateInterval,
  shipArrivalProductsOrg,
} from "../../../redux/api";
import { useAppSelector } from "../../../redux/store";
import { ButtonStyled } from "../../../ui/ButtonStyled";
import { InputStyled } from "../../../ui/InputStyled";
import { IList, Select } from "../../../ui/Select";
import { formatDate } from "../../../utils/formatDate";

interface ISelect {
  [index: string]: string;
}

interface ISumAggregation {
  isFill: boolean;
  totalUnits?: number;
  totalSum?: number;
}

export function SummarySenderRecipient() {
  //стейт для хранения списка организаций из редакс
  const [listOrganization, setListOrganization] = useState<IList[]>();
  //стейт для хранения списка продуктов из редакс
  const [listProduct, setListProduct] = useState<IList[]>();
  //общие стейты для записи значений и инициализации
  const [selectFromOrg, setSelectFromOrg] = useState({});
  const [selectToOrg, setSelectToOrg] = useState({});
  const [selectProduct, setSelectProduct] = useState({});
  const [selectedFromOrg, setSelectedFromOrg] = useState(false);
  const [selectedToOrg, setSelectedToOrg] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  const [resultAnswerRequest, setResultAnswerRequest] =
    useState<ISumAggregation>();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<unknown>("");

  //стейт под даты
  const dateNow = new Date();
  const today = formatDate(String(new Date()), false, true, true);
  const dateYesterday = dateNow.setDate(dateNow.getDate() - 1);
  const yesterday = formatDate(
    String(new Date(dateYesterday)),
    false,
    true,
    true
  );
  const firstDayYear = formatDate(
    String(new Date(dateNow.getFullYear(), 0, 1)),
    false,
    true,
    true
  );
  const [dateStart, setDateStart] = useState(firstDayYear);
  const [dateEnd, setDateEnd] = useState(today);

  //стейт под радио
  const [currentRadioValue, setCurrentRadioValue] = useState("allDates");

  //получаем продукты из хранилища
  const product = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsProduct
  );

  //получаем организации
  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );

  const token = useAppSelector((state) => state.auth.statusUser.user.token);
  //первый эффект преобразовывает массивы объектов
  useEffect(() => {
    setListOrganization(
      organization.map((record) => {
        return {
          id: record._id,
          name: record.name,
        };
      })
    );
    setListProduct(
      product.map((record) => {
        return {
          id: record._id,
          name: record.product,
        };
      })
    );
    //а так же записываем значения возвращаемые из селекта
    const { organizationFrom_id }: ISelect = selectFromOrg;
    if (organizationFrom_id) {
      setSelectedFromOrg(true);
    }
    const { organizationTo_id }: ISelect = selectToOrg;
    if (organizationTo_id) {
      setSelectedToOrg(true);
    }
    const { product_id }: ISelect = selectProduct;
    if (product_id) {
      setSelectedProduct(true);
    }
  }, [organization, product, selectFromOrg, selectProduct, selectToOrg]);
  //второй эффект добавляет категорию "Все товары" в селект, а затем сортирует массив товаров в обратном порядке
  useEffect(() => {
    listProduct?.push({ id: "AllProducts", name: "Все товары" });
    setListProduct(listProduct?.reverse());
  }, [listProduct]);

  //обработчик кнопки
  const selectHandler = async () => {
    setLoading(true);
    try {
      setErrorMessage("");
      if (Date.parse(dateStart) / 1000 < Date.parse(firstDayYear) / 1000) {
        throw new AxiosError(
          "Начальная дата должна быть больше минимального значения даты"
        );
      }
      if (Date.parse(dateStart) / 1000 >= Date.parse(dateEnd) / 1000) {
        throw new AxiosError("Конечная дата должна быть больше начальной");
      }

      if (currentRadioValue === "allDates") {
        const res = await shipArrivalProductsOrg(
          {
            ...selectFromOrg,
            ...selectToOrg,
            ...selectProduct,
          },
          token
        );
        setResultAnswerRequest(res.data.objAnswer);
      } else {
        const res = await shipArrivalProductsDateInterval(
          {
            ...selectFromOrg,
            ...selectToOrg,
            ...selectProduct,
            dateStart,
            dateEnd,
          },
          token
        );
        setResultAnswerRequest(res.data.objAnswer);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (!!axiosError.response?.data) {
        setErrorMessage(axiosError.response?.data);
      } else {
        setErrorMessage(axiosError);
      }
    }
    setLoading(false);
  };
  //показываем ошибки, если есть
  useShowError(errorMessage);

  //запись начальной даты
  const changeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(event.target.value);
  };
  //запись конечной даты
  const changeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(event.target.value);
  };
  //обработка состояния радио
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(event.target.value);
    setDateStart(firstDayYear);
    setDateEnd(today);
  };

  return (
    <>
      <div className="w-full form-group mb-2">
        <div className="self-center text-lg font-semibold">
          Cводка о получателе и отправителе товара
        </div>
        <div className="flex justify-start mt-2 mb-2">
          <div className="form-check form-check-inline mr-2">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-sky-400 checked:border-sky-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="allDates"
              id="inlineRadio1"
              value="allDates"
              checked={currentRadioValue === "allDates"}
              onChange={handleChangeRadio}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="inlineRadio1"
            >
              За все время
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-sky-400 checked:border-sky-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="selectDate"
              id="inlineRadio2"
              value="selectDate"
              checked={currentRadioValue === "selectDate"}
              onChange={handleChangeRadio}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="inlineRadio2"
            >
              Выбрать дату
            </label>
          </div>
        </div>
        <div className="flex mb-2">
          {currentRadioValue === "selectDate" && (
            <div className="w-full md:w-[20%] lg:w-[20%] xl:w-[12%] px-3 mb-6 md:mb-0">
              <span className="self-center text-lg ">От</span>
              <InputStyled
                colorFocus="sky"
                type="date"
                name="start-date"
                onChange={changeStartDate}
                id="start-date"
                min="2021-01-01"
                max={yesterday}
                defaultValue={firstDayYear}
              />
            </div>
          )}
          {currentRadioValue === "selectDate" && (
            <div className="w-full md:w-[20%] lg:w-[20%] xl:w-[12%] px-3 mb-6 md:mb-0">
              <span className="self-center text-lg ">До</span>
              <InputStyled
                colorFocus="sky"
                type="date"
                name="end-date"
                onChange={changeEndDate}
                id="end-date"
                min="2021-01-01"
                max={today}
                defaultValue={today}
              />
            </div>
          )}
          <div className="w-full md:w-[30%] lg:w-[30%] xl:w-[20%] px-3 mb-6 md:mb-0">
            <span className="self-center text-lg ">Выбрать отправителя</span>
            <Select
              list={listOrganization}
              updateSelect={setSelectFromOrg}
              nameSelect="organizationFrom"
              id="organizationFrom"
              title="Выбрать"
            />
          </div>
          {selectedFromOrg && (
            <div className="w-full md:w-[30%] lg:w-[30%] xl:w-[20%] px-3 mb-6 md:mb-0">
              <span className="self-center text-lg ">Выбрать получателя</span>
              <Select
                list={listOrganization}
                updateSelect={setSelectToOrg}
                nameSelect="organizationTo"
                id="organizationTo"
                title="Выбрать"
              />
            </div>
          )}
          {selectedToOrg && (
            <div className="w-full md:w-[30%] lg:w-[30%] xl:w-[20%] px-3 mb-6 md:mb-0">
              <span className="self-center text-lg ">Выбрать Товар</span>
              <Select
                list={listProduct}
                updateSelect={setSelectProduct}
                nameSelect="product"
                id="product"
                title="Выбрать"
              />
            </div>
          )}
          {selectedProduct && (
            <div className="w-full sm:w-full sm:pt-2 md:pt-0 md:w-1/12 lg:w-1/12 lg:pt-0 px-3 mb-6 md:mb-0 md:relative">
              <ButtonStyled
                title="Показать"
                variant="sky"
                type="button"
                disabled={false}
                onClick={selectHandler}
                className="md:absolute md:bottom-0"
              />
            </div>
          )}
        </div>
        {!loading && resultAnswerRequest?.isFill && (
          <div className="w-full mb-2">
            Отгруженно всего: {resultAnswerRequest?.totalUnits} единиц товара,
            за период с {dateStart} по {dateEnd}, на общую сумму:{" "}
            {resultAnswerRequest?.totalSum} рублей
          </div>
        )}
        {!loading && resultAnswerRequest?.isFill === false && (
          <div className="w-full mb-2">Отгрузка еще не состоялась</div>
        )}
        {loading && <div>Загрузка...</div>}
      </div>
    </>
  );
}
