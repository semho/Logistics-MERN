import React from "react";

interface ICeilItem {
  children?: React.ReactNode;
  className?: string;
}

export function CeilItem({ children, className }: ICeilItem) {
  return (
    <td
      className={`text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
}
