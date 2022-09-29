import React from "react";

interface ITableCeilContent {
  children?: React.ReactNode;
  className?: string;
}

export function TableCeilContent({ children, className }: ITableCeilContent) {
  return (
    <td
      className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
}
