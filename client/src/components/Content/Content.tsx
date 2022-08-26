import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";

export function Content() {
  return (
    <>
      <header className="text-xl font-bold underline">
        <Navbar />
      </header>
      <main className="md:container md:mx-auto">
        <Outlet />
      </main>
    </>
  );
}
