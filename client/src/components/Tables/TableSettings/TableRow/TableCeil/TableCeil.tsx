import React from "react";

interface ITableCeil {
  title: string;
}

export default function TableCeil({ title }: ITableCeil) {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {title}
    </td>
  );
}
