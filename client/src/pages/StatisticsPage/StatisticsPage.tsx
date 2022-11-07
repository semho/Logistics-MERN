import React, { useEffect, useState } from "react";
import { IRecord } from "../../models/Record";
import { useAppSelector } from "../../redux/store";
import { SummaryBriefOrganization } from "./SummaryBriefOrganization";
import { SummarySenderRecipient } from "./SummarySenderRecipient";

export function StatisticsPage() {
  const [maxPriceRecord, setMaxPriceRecord] = useState<IRecord>();
  const [minPriceRecord, setMinPriceRecord] = useState<IRecord>();
  const [avgPriceState, setAvgPriceState] = useState<number>();

  const listRecord = useAppSelector(
    (state) => state.records.statusRecords.listRecords
  );

  useEffect(() => {
    setAvgPriceState(
      listRecord.reduce((acc, cur) => acc + cur.price, 0) / listRecord.length
    );
    setMinPriceRecord(
      listRecord.reduce(function (res, obj) {
        return obj.price < res.price ? obj : res;
      })
    );
    setMaxPriceRecord(
      listRecord.reduce(function (res, obj) {
        return obj.price > res.price ? obj : res;
      })
    );
  }, [listRecord]);

  return (
    <>
      <h3 className="text-2xl mb-5 ">
        Выборочная статистика по данным из списка записей
      </h3>
      <hr />
      <div className="form-group mb-6 mt-2 flex flex-wrap">
        <div className="w-full mb-2">
          Самый дорогой товар за единицу: {maxPriceRecord?.product_id}, цена{" "}
          {maxPriceRecord?.price} рублей
        </div>
        <div className="w-full mb-2">
          Самый дешевый товар за единицу: {minPriceRecord?.product_id}, цена{" "}
          {minPriceRecord?.price} рублей
        </div>
        <div className="w-full mb-2">
          Средняя цена всех товаров: {avgPriceState} рублей
        </div>
        <hr className="w-full mb-2" />
        <SummaryBriefOrganization />
        <hr className="w-full mb-2" />
        <SummarySenderRecipient />

        {/* TODO:Заняться как появиться время */}

        {/* <hr className="w-full mb-2" />
        <div className="w-full form-group flex flex-wrap mb-2">
          <span className="self-center text-lg font-semibold">
            Подробная сводка
          </span>
          Селект: Отгрузка/Приход
          <br />
          Селект: Все товары/Конкретный <br />
          Селект: Все организации/Конкретная <br />
          Инпут начальной даты: Дата первой записи/Конкретная дата дд/мм/гггг
          <br />
          Инпут конечной даты: Текущая дата/Конкретная дата дд/мм/гггг
          <br />
          Формируем ответ цены товара(средняя если все/либо конкретная),
          название товара(либо просто все), всего отгружено/полученно на общую
          сумму за указанный период для выбранной организации(или всех),
        </div> */}
      </div>
    </>
  );
}
