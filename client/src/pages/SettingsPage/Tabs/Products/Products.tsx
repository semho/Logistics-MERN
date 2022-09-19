import React, { useEffect, useMemo, useState } from "react";
import { FormAddProduct } from "../../../../components/Form/FormsForAddRecords/FormAddProduct";
import { Loader } from "../../../../components/Loader";
import { TableSettings } from "../../../../components/Tables/TableSettings";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";

export default function Products() {
  const cellNames = ["#", "Товар", "Единица измерения", "Действия"];

  const [list, setList] = useState([
    {
      id: "",
      type: "product",
    },
  ]);

  const loading = useAppSelector(
    (state) => state.settings.statusSettings.loading
  );
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //получаем список из redux
  const stateProduct = useAppSelector(
    (state) => state.settings.statusSettings.allSettings.settingsProduct
  );
  //прееобразуем его
  const stateForTable = useMemo(() => {
    return stateProduct.map((record) => {
      return {
        id: record._id,
        product: record.product,
        unit: record.unit,
        type: "product",
      };
    });
  }, [stateProduct]);
  //и сохраняем в стейт
  useEffect(() => {
    setList(stateForTable);
  }, [stateForTable]);

  //показываем ошибки, если есть
  useShowError(error);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <FormAddProduct />
      {!loading && list.length === 0 && (
        <div className="text-center text-xl mt-20">Записей пока нет</div>
      )}
      {list.length > 0 && <TableSettings nameThead={cellNames} data={list} />}
    </>
  );
}
