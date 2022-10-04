import React, { useEffect, useState } from "react";
import { FormEditRecordDestination } from "../FormEditRecordDestination";
import { FormEditRecordForwarder } from "../FormEditRecordForwarder";
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
  const [isOpenDestination, setIsOpenDestination] = useState(false);
  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenForwarder, setIsOpenForwarder] = useState(false);

  useEffect(() => {
    switch (type) {
      case "destination":
        setIsOpenDestination(true);
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
      {isOpenDestination && (
        <FormEditRecordDestination
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
