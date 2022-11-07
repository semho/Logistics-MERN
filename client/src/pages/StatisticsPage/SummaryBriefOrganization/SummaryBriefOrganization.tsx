import React, { useEffect, useState } from "react";
import { getSumArrivalProduct, getSumShipProduct } from "../../../redux/api";
import { useAppSelector } from "../../../redux/store";
import { ButtonStyled } from "../../../ui/ButtonStyled";
import { IList, Select } from "../../../ui/Select";

interface ISumAggregation {
  isFill: boolean;
  totalUnits?: number;
  totalSum?: number;
}

interface ISelectOrganization {
  organization_id?: string;
}

export function SummaryBriefOrganization() {
  //стейт куда попадает выбранная пользователем организация
  const [selectOrganization, setSelectOrganization] = useState({});
  //стейт для хранения списка организаций из редакс
  const [listOrganization, setListOrganization] = useState<IList[]>();

  const [agrFromOrg, setAgrFromOrg] = useState<ISumAggregation>();
  const [agrToOrg, setAgrToOrg] = useState<ISumAggregation>();

  //получаем организации
  const organization = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsOrganization
  );
  const token = useAppSelector((state) => state.auth.statusUser.user.token);

  useEffect(() => {
    setListOrganization(
      organization.map((record) => {
        return {
          id: record._id,
          name: record.name,
        };
      })
    );
  }, [organization]);

  //обработчик кнопки
  const selectHandler = async () => {
    const { organization_id }: ISelectOrganization = selectOrganization;
    if (organization_id) {
      const resShip = await getSumShipProduct(organization_id, token);
      const resArrival = await getSumArrivalProduct(organization_id, token);

      setAgrFromOrg(resShip.data.objAnswer);
      setAgrToOrg(resArrival.data.objAnswer);
    }
  };

  return (
    <>
      <div className="w-full form-group flex flex-wrap mb-2">
        <span className="self-center text-lg font-semibold">
          Краткая сводка по организации
        </span>
        <div className="w-full md:w-[25%] lg:w-[20%] xl:w-[13%]  px-3 mb-6 md:mb-0">
          <Select
            list={listOrganization}
            updateSelect={setSelectOrganization}
            nameSelect="organization"
            id="organization"
            title="Выбрать"
          />
        </div>
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
      </div>
      {agrFromOrg?.isFill && (
        <div className="w-full mb-2">
          Отгруженно всего: {agrFromOrg?.totalUnits} единиц товара, на общую
          сумму: {agrFromOrg?.totalSum} рублей
        </div>
      )}
      {agrToOrg?.isFill && (
        <div className="w-full mb-2">
          Полученно всего: {agrToOrg?.totalUnits} единиц товара, на общую сумму:{" "}
          {agrToOrg?.totalSum} рублей
        </div>
      )}
    </>
  );
}
