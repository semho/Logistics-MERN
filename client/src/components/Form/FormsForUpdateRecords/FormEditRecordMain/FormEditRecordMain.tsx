import React, { useEffect, useState } from "react";
import { FormEditRecord } from "../FormEditRecord/FormEditRecord";
import { FormEditRecordForwarder } from "../FormEditRecordForwarder";
import { FormEditRecordOrganization } from "../FormEditRecordOrganization";
import { FormEditRecordProduct } from "../FormEditRecordProduct";

export interface IFormEdit {
  setModalActiveEdit: (value: React.SetStateAction<boolean>) => void;
  id: string;
  type?: string;
}

export function FormEditRecordMain({
  setModalActiveEdit,
  id,
  type = "record",
}: IFormEdit) {
  const [isOpenMain, setIsOpenMain] = useState(false);
  const [isOpenOrganization, setIsOpenOrganization] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenForwarder, setIsOpenForwarder] = useState(false);
  useEffect(() => {
    switch (type) {
      case "record":
        setIsOpenMain(true);
        break;
      case "organization":
        setIsOpenOrganization(true);
        break;
      case "product":
        setIsOpenProduct(true);
        break;
      case "forwarder":
        setIsOpenForwarder(true);
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <>
      {isOpenMain && (
        <FormEditRecord setModalActiveEdit={setModalActiveEdit} id={id} />
      )}
      {isOpenOrganization && (
        <FormEditRecordOrganization
          setModalActiveEdit={setModalActiveEdit}
          id={id}
        />
      )}
      {isOpenProduct && (
        <FormEditRecordProduct
          setModalActiveEdit={setModalActiveEdit}
          id={id}
        />
      )}
      {isOpenForwarder && (
        <FormEditRecordForwarder
          setModalActiveEdit={setModalActiveEdit}
          id={id}
        />
      )}
    </>
  );
}
