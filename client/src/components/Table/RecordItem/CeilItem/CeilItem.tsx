import React from "react";

interface ICeilItem {
  children?: React.ReactNode;
}

export function CeilItem({ children }: ICeilItem) {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {children}
    </td>
  );
}
