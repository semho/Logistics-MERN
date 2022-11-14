import React, { useEffect, useState } from "react";
import { IRecord } from "../../models/Record";
import { useAppSelector } from "../../redux/store";
import { SummaryBriefOrganization } from "./SummaryBriefOrganization";
import { SummarySenderRecipient } from "./SummarySenderRecipient";

export function StatisticsPage() {
  const [maxPriceRecord, setMaxPriceRecord] = useState<IRecord>();
  const [minPriceRecord, setMinPriceRecord] = useState<IRecord>();
  const [avgPriceState, setAvgPriceState] = useState<number>();
  const [isRecords, setIsRecords] = useState(false);

  const listRecord = useAppSelector(
    (state) => state.records.statusRecords.listRecords
  );

  useEffect(() => {
    if (listRecord.length > 0) {
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
      setIsRecords(true);
    }
  }, [listRecord]);

  return (
    <>
      <h3 className="text-2xl mb-5 ">
        Выборочная статистика по данным из списка записей
      </h3>
      <hr />
      {isRecords ? (
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
        </div>
      ) : (
        <div className="text-center text-xl mt-20">Данных для анализа нет</div>
      )}
    </>
  );
}
