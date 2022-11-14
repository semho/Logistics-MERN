import React from "react";
import { Tabs } from "../../ui/Tabs";
import { Forwarder } from "./Tabs/Forwarder";
import Products from "./Tabs/Products/Products";
import { Organization } from "./Tabs/Organization";

export function SettingsPage() {
  const items = [
    {
      title: "Организации",
      contentElementJSX: <Organization />,
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
