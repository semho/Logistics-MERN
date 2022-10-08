import React from "react";

interface ISelectProps {
  viewBox?: number;
  size?: number;
}

export function SelectIcon({ viewBox = 24, size = 6 }: ISelectProps) {
  const viewBoxString = `0 0 ${viewBox} ${viewBox}`;

  return (
    <svg
      className={`h-${size} w-${size} text-gray-600`}
      viewBox={viewBoxString}
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
