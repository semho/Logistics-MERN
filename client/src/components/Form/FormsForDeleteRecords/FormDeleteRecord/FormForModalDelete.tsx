import React from "react";
import { deleteRecord } from "../../../../redux/features/recordSlice";
import { useAppDispatch } from "../../../../redux/store";
import { ButtonStyled } from "../../../Controls/ButtonStyled";

interface IFormDelete {
  id: string;
  setModalActiveDelete: (value: React.SetStateAction<boolean>) => void;
}

export default function FormForModalDelete({
  setModalActiveDelete,
  id,
}: IFormDelete) {
  const dispatch = useAppDispatch();
  const removeRecord = async () => {
    if (id) {
      dispatch(deleteRecord(id));
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
