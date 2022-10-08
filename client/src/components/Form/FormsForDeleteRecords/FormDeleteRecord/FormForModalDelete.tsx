import React from "react";
import { deleteRecord } from "../../../../redux/features/recordSlice";
import {
  deleteDestination,
  deleteForwarder,
  deleteProduct,
} from "../../../../redux/features/settingsSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../../ui/ButtonStyled";

interface IFormDelete {
  id: string;
  setModalActiveDelete: (value: React.SetStateAction<boolean>) => void;
  type?: string;
}

export function FormForModalDelete({
  setModalActiveDelete,
  id,
  type = "record",
}: IFormDelete) {
  const dispatch = useAppDispatch();
  const removeRecord = async () => {
    if (id) {
      switch (type) {
        case "record":
          dispatch(deleteRecord(id));
          break;
        case "destination":
          dispatch(deleteDestination(id));
          break;
        case "product":
          dispatch(deleteProduct(id));
          break;
        case "forwarder":
          dispatch(deleteForwarder(id));
          break;
        default:
          break;
      }

      setModalActiveDelete(false);
    }
  };

  return (
    <>
      <h3 className="text-xl text-center mb-5">
        Вы действительно хотите удалить запись? №&nbsp;{id}
      </h3>
      <div className="text-center">
        <ButtonStyled
          title="Да"
          variant="rose"
          type="button"
          disabled={false}
          className="mr-5"
          onClick={removeRecord}
        />
        <ButtonStyled
          title="Отмена"
          variant="gray"
          type="button"
          disabled={false}
          onClick={() => setModalActiveDelete(false)}
        />
      </div>
    </>
  );
}
