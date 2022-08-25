import React from "react";
import { Outlet } from "react-router-dom";

export function Content() {
  return (
    <>
      <header className="text-3xl font-bold underline px-5">
        <h1>Header</h1>
      </header>
      <main className="md:container md:mx-auto">
        <Outlet />
      </main>
    </>
  );
}
