import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavbarItem } from "../../ui/NavbarItem";
import { useAppDispatch } from "../../redux/store";
import { removeUser } from "../../redux/features/authSlice";
import "./navbar.css";
import { NavbarItemMobile } from "../../ui/NavbarItemMobile";
import { Burger } from "../../ui/Burger";
import { CloseIcon } from "../../assets/Icons/CloseIcon";

export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const logoutHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    dispatch(removeUser(""));
    history("/");
  };
  const closeNavMobile = (event: React.MouseEvent<HTMLAnchorElement>) =>
    setIsNavOpen(false);

  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-6 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-10">
        <Link to="/" className="text-2xl">
          Logistics
        </Link>

        <ul className="DESKTOP-MENU hidden md:flex space-x-8">
          <NavbarItem title="Список" link="/" />
          <NavbarItem title="Статистика" link="/statistics" />
          <NavbarItem title="Настройки" link="/settings" />
          <NavbarItem title="Выйти" link="/logout" onClick={logoutHandler} />
        </ul>

        <section className="MOBILE-MENU flex md:hidden">
          <Burger onClick={() => setIsNavOpen((prev) => !prev)} />
          <div className={isNavOpen ? "showMenuNav" : "hiddenMenuNav"}>
            {/* <CloseIcon onClick={() => setIsNavOpen(false)} /> */}
            <CloseIcon onClick={() => setIsNavOpen(false)} />
            <ul className="MENU-OPEN flex flex-col items-center justify-between min-h-[250px]">
              <NavbarItemMobile
                title="Список"
                link="/"
                onClick={closeNavMobile}
              />
              <NavbarItemMobile
                title="Статистика"
                link="/statistics"
                onClick={closeNavMobile}
              />
              <NavbarItemMobile
                title="Настройки"
                link="/settings"
                onClick={closeNavMobile}
              />
              <NavbarItemMobile
                title="Выйти"
                link="/logout"
                onClick={logoutHandler}
              />
            </ul>
          </div>
        </section>
      </div>
    </nav>
  );
}
