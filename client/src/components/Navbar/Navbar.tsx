import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarItem } from "./NavbarItem";
import { useAppDispatch } from "../../redux/store";
import { removeUser } from "../../redux/features/authSlice";

export function Navbar() {
  const dispatch = useAppDispatch();

  const history = useNavigate();
  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(removeUser(""));
    history("/");
  };

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-6 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-10">
        <Link to="/" className="text-2xl">
          Logistics
        </Link>

        <ul className="flex space-x-4">
          <NavbarItem title="Список" link="/" />
          <NavbarItem title="Статистика" link="/statistics" />
          <NavbarItem title="Настройки" link="/settings" />
          <NavbarItem title="Выйти" link="/logout" onClick={logoutHandler} />
        </ul>
      </div>
    </nav>
  );
}
