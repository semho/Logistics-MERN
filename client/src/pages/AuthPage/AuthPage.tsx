import React, { useEffect, useState } from "react";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { InputStyled } from "../../components/InputStyled";
import { LabelStyled } from "../../components/LabelStyled";
import { useMessage } from "../../hooks/useMessage";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  dataUser,
  IStatusUser,
  login,
  register,
} from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "../../components/Loader";

export function AuthPage() {
  const {
    statusUser: { loading, error },
  }: IStatusUser = useAppSelector(dataUser);
  const dispatch = useAppDispatch();
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    error && message((error as Error).message, "error");
  }, [error, message]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    const formValue = { ...form };
    dispatch(register({ formValue, toast }));
  };

  const loginHandler = async () => {
    const formValue = { ...form };
    dispatch(login({ formValue, toast }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen relative">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <h1 className="text-[42px] text-center mb-5 ">Вход в приложение</h1>

        <div className="form-group mb-6">
          <LabelStyled title="Email" forId="inputEmail" textColor="gray" />
          <InputStyled
            colorFocus="purple"
            type="email"
            id="inputEmail"
            placeholder="Введите Email"
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group mb-6">
          <LabelStyled title="Пароль" forId="inputPassword" textColor="gray" />
          <InputStyled
            colorFocus="purple"
            type="password"
            id="inputPassword"
            placeholder="Введите пароль"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="flex justify-around ">
          <ButtonStyled
            title="Авторизоваться"
            variant="purple"
            type="button"
            onClick={loginHandler}
            disabled={loading}
          />
          <ButtonStyled
            title="Зарегистироваться"
            variant="sky"
            type="button"
            onClick={registerHandler}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
