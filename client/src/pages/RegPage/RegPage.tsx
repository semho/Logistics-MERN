import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ButtonStyled } from "../../components/ButtonStyled";
import { InputStyled } from "../../components/InputStyled";
import { LabelStyled } from "../../components/LabelStyled";
import { Loader } from "../../components/Loader";
import { useMessage } from "../../hooks/useMessage";
import {
  dataUser,
  IStatusUser,
  register,
} from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export function RegPage() {
  const [errorAuth, setAuthError] = useState("");
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
    setAuthError((error as Error).message);
    error && message(errorAuth, "error");
  }, [error, errorAuth, message]);
  useEffect(() => {
    setAuthError("");
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    const formValue = { ...form };
    dispatch(register({ formValue, toast }));
  };

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
              colorFocus="purple"
              type="email"
              id="inputEmail"
              placeholder="Введите Email"
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group mb-6">
            <LabelStyled
              title="Пароль"
              forId="inputPassword"
              textColor="gray"
            />
            <InputStyled
              colorFocus="purple"
              type="password"
              id="inputPassword"
              placeholder="Введите пароль"
              name="password"
              onChange={changeHandler}
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
