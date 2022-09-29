import React from "react";

interface ITableCeilTitle {
  title: string;
}

export function TableCeilTitle({ title }: ITableCeilTitle) {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {title}
    </td>
  );
}
