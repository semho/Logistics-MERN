import React, { useEffect, useMemo, useState } from "react";
import { FormAddProduct } from "../../../../components/Form/FormsForAddRecords/FormAddProduct";
import { Loader } from "../../../../ui/Loader";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";
import { Table } from "../../../../components/Tables/TableMain";
import {
  dataConversionProduct,
  initialBodyTableProduct,
  namesTableProduct,
} from "../../../../models/settings/Product";

export default function Products() {
  const cellNames = namesTableProduct;
  const [list, setList] = useState(initialBodyTableProduct);

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
    return dataConversionProduct(stateProduct);
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
      {list.length > 0 && <Table headings={cellNames} records={list} />}
    </>
  );
}
