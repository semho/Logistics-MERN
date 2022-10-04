import React from "react";
import { CeilHead } from "./CeilHead";

interface ITableHead {
  cellNames: string[];
}

export function TableHead({ cellNames }: ITableHead) {
  return (
    <thead className="border-b">
      <tr>
        {cellNames.map((title) => (
          <CeilHead key={title}>{title}</CeilHead>
        ))}
      </tr>
    </thead>
  );
}
