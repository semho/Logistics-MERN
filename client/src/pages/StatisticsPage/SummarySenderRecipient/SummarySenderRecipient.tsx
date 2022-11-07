import React, { useEffect, useState } from "react";
import { shipArrivalProductsOrg } from "../../../redux/api";
import { useAppSelector } from "../../../redux/store";
import { ButtonStyled } from "../../../ui/ButtonStyled";
import { IList, Select } from "../../../ui/Select";

interface ISelectFromOrganization {
  organizationFrom_id?: string;
}

interface ISelectToOrganization {
  organizationTo_id?: string;
}

interface ISelectProduct {
  product_id?: string;
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
  const [selectFromOrgId, setSelectFromOrgId] = useState({ id: "" });
  const [selectToOrgId, setSelectToOrgId] = useState({ id: "" });
  const [selectProductId, setSelectProductId] = useState({ id: "" });

  const [resultAnswerRequest, setResultAnswerRequest] =
    useState<ISumAggregation>();
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
    const { organizationFrom_id }: ISelectFromOrganization = selectFromOrg;
    if (organizationFrom_id) {
      setSelectFromOrgId({ id: organizationFrom_id });
    }
    const { organizationTo_id }: ISelectToOrganization = selectToOrg;
    if (organizationTo_id) {
      setSelectToOrgId({ id: organizationTo_id });
    }
    const { product_id }: ISelectProduct = selectProduct;
    if (product_id) {
      setSelectProductId({ id: product_id });
    }
  }, [organization, product, selectFromOrg, selectProduct, selectToOrg]);
  //второй эффект добавляет категорию "Все товары" в селект, а затем сортирует массив товаров в обратном порядке
  useEffect(() => {
    listProduct?.push({ id: "1", name: "Все товары" });
    setListProduct(listProduct?.reverse());
  }, [listProduct]);

  //обработчик кнопки
  const selectHandler = async () => {
    const res = await shipArrivalProductsOrg(
      { ...selectFromOrg, ...selectToOrg, ...selectProduct },
      token
    );
    setResultAnswerRequest(res.data.objAnswer);
  };

  return (
    <>
      <div className="w-full form-group mb-2">
        <div className="self-center text-lg font-semibold">
          Cводка о получателе и отправителе товара
        </div>
        <div className="flex mb-2">
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
          {selectFromOrgId.id && (
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
          {selectToOrgId.id && (
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
          {selectProductId.id && (
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
        {resultAnswerRequest?.isFill && (
          <div className="w-full mb-2">
            Отгруженно всего: {resultAnswerRequest?.totalUnits} единиц товара,
            на общую сумму: {resultAnswerRequest?.totalSum} рублей
          </div>
        )}
        {resultAnswerRequest?.isFill === false && (
          <div className="w-full mb-2">Отгрузка еще не состоялась</div>
        )}
      </div>
    </>
  );
}
