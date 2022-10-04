import React, { useEffect } from "react";
import { Tabs } from "../../ui/Tabs";
import {
  getDestinations,
  getForwarders,
  getProducts,
} from "../../redux/features/settingsSlice";
import { useAppDispatch } from "../../redux/store";
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
  //загрузка данных из БД в redux для этого раздела
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDestinations());
    dispatch(getProducts());
    dispatch(getForwarders());
  }, [dispatch]);

  return (
    <>
      <Tabs items={items} />
    </>
  );
}
