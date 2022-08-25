import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { useHttp } from "../../hooks/useHttp";

export function AuthPage() {
  const { loading, error, request } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    } catch (e) {}
  };

  return (
    <div className="h-screen relative">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <h1 className="text-[42px] text-center mb-5 ">Вход в приложение</h1>
        <div className="form-group mb-6">
          <Label title="Email" forId="inputEmail" />
          <Input
            type="email"
            borderColor="purple"
            id="inputEmail"
            placeholder="Введите Email"
            ariaDescribedby="emailHelp"
            name="email"
            onChange={changeHandler}
          />
        </div>
        <div className="form-group mb-6">
          <Label title="Пароль" forId="inputPassword" />
          <Input
            type="password"
            borderColor="purple"
            id="inputPassword"
            placeholder="Введите пароль"
            name="password"
            onChange={changeHandler}
          />
        </div>
        <div className="flex justify-around ">
          <Button
            title="Авторизоваться"
            variant="purple"
            type="button"
            disabled={loading}
          />
          <Button
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
