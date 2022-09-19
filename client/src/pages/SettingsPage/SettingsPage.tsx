import React from "react";
import { Tabs } from "../../components/Tabs";
import { Forwarder } from "./Tabs/Forwarder";
import { PointsDestination } from "./Tabs/PointsDestination";
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
    </>
  );
}
