import React from "react";

interface ICeilHead {
  children?: React.ReactNode;
}

export function CeilHead({ children }: ICeilHead) {
  return (
    <th
      scope="col"
      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
    >
      {children}
    </th>
  );
}
