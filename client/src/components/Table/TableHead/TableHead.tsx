import React from "react";
import { CeilHead } from "./CeilHead";

export function TableHead() {
  return (
    <thead className="border-b">
      <tr>
        <CeilHead>#</CeilHead>
        <CeilHead>Дата</CeilHead>
        <CeilHead>Откуда-Куда</CeilHead>
        <CeilHead>Расстояние, км</CeilHead>
        <CeilHead>Товар</CeilHead>
        <CeilHead>Количество, м3</CeilHead>
        <CeilHead>Ответственный</CeilHead>
        <CeilHead>Стоимость единицы, руб</CeilHead>
        <CeilHead>Сумма товара, руб</CeilHead>
        <CeilHead>Действия</CeilHead>
      </tr>
    </thead>
  );
}
