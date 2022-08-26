import React from "react";

export function Navbar() {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-6 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <a href="#" className="text-2xl">
          Logo
        </a>
        <ul className="text-base">
          <li>Список</li>
        </ul>
      </div>
    </nav>
  );
}
