import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";
import { IRecord } from "../../models/Record";
import { dataUser, IStatusUser } from "../../redux/features/authSlice";
import { createRecord } from "../../redux/features/recordSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ButtonStyled } from "../ButtonStyled";
import { InputStyled } from "../InputStyled";

interface IAddRecord {
  updateList: (value: IRecord) => void;
}

export function FormAddRecord({ updateList }: IAddRecord) {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const [record, setRecord] = useState({});
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    message(error, "error");
    clearError();
  }, [clearError, error, message]);

  // const addRecordHandler = async () => {
  //   try {
  //     const data = await request(
  //       "/api/records/create",
  //       "POST",
  //       JSON.stringify({ ...record }),
  //       {
  //         Authorization: `Bearer ${auth.token}`,
  //       }
  //     );
  //     //отправляем запись в родительский стейт
  //     updateList(data.newRecord);
  //     message(data.message, "info");
  //   } catch (e) {}
  // };
  //данные пользователя из redux
  const {
    statusUser: { user },
  }: IStatusUser = useAppSelector(dataUser);
  const { token } = user || "";
  const dispatch = useAppDispatch();
  const addRecordHandler = async () => {
    const newRecord = { ...record };
    dispatch(createRecord({ newRecord, token, toast }));
  };

  return (
    <>
      <h3 className="text-2xl mb-5 ">Добавить запись:</h3>
      <div className="form-group mb-6 flex flex-wrap">
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Откуда-Куда"
            name="fromTo"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Расстояние"
            name="distance"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Продукт"
            name="product"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/12 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Количество"
            name="units"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Ответственный"
            name="forwarder"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
          <InputStyled
            colorFocus="sky"
            type="text"
            placeholder="Стоимость единицы"
            name="price"
            onChange={changeHandler}
          />
        </div>
        <div className="w-full md:w-1/12 px-3 mb-6 md:mb-0">
          <ButtonStyled
            title="Добавить"
            variant="sky"
            type="button"
            disabled={loading}
            onClick={addRecordHandler}
          />
        </div>
      </div>
    </>
  );
}
