import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NavbarItem } from "./NavbarItem";

export function Navbar() {
  const auth = useContext(AuthContext);
  const history = useNavigate();
  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    auth.logout();
    history("/");
  };

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-6 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <Link to="/" className="text-2xl">
          Logistics
        </Link>

        <ul className="flex space-x-4">
          <NavbarItem title="Список" link="/" />
          <NavbarItem title="Статистика" link="/statistics" />
          <NavbarItem title="Настройки" link="/settings" />
          <NavbarItem title="Выйти" link="/logout" onClick={logoutHandler} />
          {/* <li className="text-gray-500 hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
            <NavLink to="/" >
              Выйти
            </NavLink>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}