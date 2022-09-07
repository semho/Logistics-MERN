import React from "react";
import { ButtonStyled } from "../../ButtonStyled";

interface IFormDelete {
  id: string;
  removeRecord: () => Promise<void>;
  setModalActiveDelete: (value: React.SetStateAction<boolean>) => void;
}

export default function FormForModalDelete({
  id,
  removeRecord,
  setModalActiveDelete,
}: IFormDelete) {
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
