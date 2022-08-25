import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";

export function AuthPage() {
  return (
    <div className="h-screen relative">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
        <h1 className="text-[42px] text-center mb-5">Вход в приложение</h1>
        <div className="form-group mb-6">
          <Label textColor="gray" title="Email" forId="inputEmail" />
          <Input
            type="email"
            borderColor="purple"
            id="inputEmail"
            placeholder="Введите Email"
            ariaDescribedby="emailHelp"
          />
        </div>
        <div className="form-group mb-6">
          <Label textColor="gray" title="Пароль" forId="inputPassword" />
          <Input
            type="password"
            borderColor="purple"
            id="inputPassword"
            placeholder="Введите пароль"
          />
        </div>
        <div className="flex justify-around ">
          <Button title="Авторизоваться" variant="purple" type="button" />
          <Button title="Зарегистироваться" variant="sky" type="button" />
        </div>
      </div>
    </div>
  );
}
