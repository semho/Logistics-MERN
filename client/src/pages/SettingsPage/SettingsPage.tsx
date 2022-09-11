import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from "../../components/Tabs/Tabs";
import Forwarder from "./Tabs/Forwarder/Forwarder";
import PointsDestination from "./Tabs/PointsDestination/PointsDestination";
import Products from "./Tabs/Products/Products";

export default function SettingsPage() {
  const items = [
    {
      title: "Пункты отправления-назначения",
      contentElementJSX: <PointsDestination />,
    },
    {
      title: "Список товаров",
      contentElementJSX: <Products />,
    },
    {
      title: "Ответственные за сопровождение",
      contentElementJSX: <Forwarder />,
    },
  ];
  return (
    <>
      <Tabs items={items} />
      <Outlet />
    </>
  );
}
