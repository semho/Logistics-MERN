import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonStyled } from "../../components/Controls/ButtonStyled";
import { InputStyled } from "../../components/Controls/InputStyled";
import { LabelStyled } from "../../components/Controls/LabelStyled";
import { Loader } from "../../components/Loader";

import { useShowError } from "../../hooks/useShowError";
import { useValidate } from "../../hooks/useValidate";
import { initialUser } from "../../models/User";
import {
  dataUser,
  IStatusUser,
  register,
} from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function RegPage() {
  const {
    statusUser: { loading, error },
  }: IStatusUser = useAppSelector(dataUser);
  const dispatch = useAppDispatch();
  const { checkingLength, emptyField, matchEmail } = useValidate();
  const [form, setForm] = useState(initialUser);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      registerHandler();
    }
  };
  const registerHandler = async () => {
    const formValue = { ...form };
    if (emptyField(formValue.email, "Email")) return;
    if (emptyField(formValue.password, "Пароль")) return;
    if (matchEmail(formValue.email)) return;
    if (checkingLength(formValue.password, "Пароль", 6)) return;

    dispatch(register({ formValue, toast }));
  };

  useShowError(error);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-screen relative">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 shadow-xl rounded divide-y-2 w-5/6 md:w-1/2 lg:w-1/4">
        <div className="px-5 pb-3">
          <h1 className="text-[42px] text-center mb-5 ">Регистрация</h1>

          <div className="form-group mb-6">
            <LabelStyled title="Email" forId="inputEmail" textColor="gray" />
            <InputStyled
              colorFocus="sky"
              type="email"
              id="inputEmail"
              placeholder="Введите Email"
              name="email"
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
            />
          </div>
          <div className="form-group mb-6">
            <LabelStyled
              title="Пароль"
              forId="inputPassword"
              textColor="gray"
            />
            <InputStyled
              colorFocus="sky"
              type="password"
              id="inputPassword"
              placeholder="Введите пароль"
              name="password"
              onChange={changeHandler}
              onKeyDown={keyDownHandler}
            />
          </div>
          <div className="w-full">
            <ButtonStyled
              title="Зарегистироваться"
              variant="sky"
              type="button"
              onClick={registerHandler}
              disabled={loading}
              className="w-full"
            />
          </div>
        </div>
        <p className="p-3 text-center">
          Уже зарегистированы?{" "}
          <Link to="/auth" className="purple-color">
            Авторизоваться
          </Link>
        </p>
      </div>
    </div>
  );
}
