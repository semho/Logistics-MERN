import React from "react";

interface ISearchProps {
  viewBox?: number;
  size?: number;
}

export function SearchIcon({ viewBox = 24, size = 6 }: ISearchProps) {
  const viewBoxString = `0 0 ${viewBox} ${viewBox}`;

  return (
    <svg
      className={`h-${size} w-${size} text-gray-600`}
      viewBox={viewBoxString}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="13" cy="12" r="6" />
      <line x1="20" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
