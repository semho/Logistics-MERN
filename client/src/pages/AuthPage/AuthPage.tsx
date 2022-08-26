import React, { useEffect, useState } from "react";
import { ButtonStyled } from "../../components/ButtonStyled/ButtonStyled";
import { InputStyled } from "../../components/InputStyled";
import { LabelStyled } from "../../components/LabelStyled";
import { useHttp } from "../../hooks/useHttp";
import { useMessage } from "../../hooks/useMessage";

export function AuthPage() {
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error, "error");
    clearError();
  }, [clearError, error, message]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHander = async () => {
    try {
      const data = await request(
        "/api/auth/register",
        "POST",
        JSON.stringify({ ...form })
      );
      message(data.message, "info");
    } catch (e) {}
  };

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
            // onClick={registerHander}
            disabled={loading}
          />
          <ButtonStyled
            title="Зарегистироваться"
            variant="sky"
            type="button"
            onClick={registerHander}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
