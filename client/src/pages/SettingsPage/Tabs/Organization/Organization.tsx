import React from "react";
import { FormAddOrganization } from "../../../../components/Form/FormsForAddRecords/FormAddOrganization";
import { useShowError } from "../../../../hooks/useShowError";
import { useAppSelector } from "../../../../redux/store";

export function Organization() {
  const error = useAppSelector((state) => state.settings.statusSettings.error);
  //показываем ошибки, если есть
  useShowError(error);

  return (
    <>
      <FormAddOrganization />
    </>
  );
}
