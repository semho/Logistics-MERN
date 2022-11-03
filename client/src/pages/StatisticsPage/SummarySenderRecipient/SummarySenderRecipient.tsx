import React, { useEffect, useState } from "react";
import { IList, Select } from "../../../ui/Select";

interface ISummary {
  listOrganization?: IList[];
}

interface ISelectFromOrganization {
  organizationFrom_id?: string;
}

interface ISelectToOrganization {
  organizationTo_id?: string;
}

export function SummarySenderRecipient({ listOrganization }: ISummary) {
  const [selectFromOrg, setSelectFromOrg] = useState({});
  const [selectFromTo, setSelectFromTo] = useState({});
  const [selectFromOrgId, setSelectFromOrgId] = useState({ id: "" });
  const [selectToOrgId, setSelectToOrgId] = useState({ id: "" });
  useEffect(() => {
    const { organizationFrom_id }: ISelectFromOrganization = selectFromOrg;
    if (organizationFrom_id) {
      setSelectFromOrgId({ id: organizationFrom_id });
    }
    const { organizationTo_id }: ISelectToOrganization = selectFromTo;
    if (organizationTo_id) {
      setSelectToOrgId({ id: organizationTo_id });
    }
  }, [selectFromOrg, selectFromTo]);
  return (
    <>
      <hr className="w-full mb-2" />
      <div className="w-full form-group mb-2">
        <div className="self-center text-lg font-semibold">
          Краткая сводка получателя и отправителя товара
        </div>
        <div className="flex">
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
                updateSelect={setSelectFromTo}
                nameSelect="organizationTo"
                id="organizationTo"
                title="Выбрать"
              />
            </div>
          )}
          {selectToOrgId.id && (
            <div className="w-full md:w-[30%] lg:w-[30%] xl:w-[20%] px-3 mb-6 md:mb-0">
              <span className="self-center text-lg ">Выбрать Товар</span>
            </div>
          )}
        </div>
      </div>
      {/* TODO:Краткая сводка получателя и отправителя товара:
        Это сводка покажет от кого кому сколько единиц товара пришло и на какую сумму
        Первый селект: Организация отправитель
        Второй селект: Организация получатель
        Возможно стоит добавить третий селект с выбором конкретного товара */}
    </>
  );
}
