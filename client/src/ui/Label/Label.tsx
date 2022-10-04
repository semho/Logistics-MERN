import React from "react";

interface IInputProps {
  textColor?: string;
  title: string;
  forId: string;
  className?: string;
}
export function Label({
  textColor = "#374151",
  title,
  forId,
  className,
}: IInputProps) {
  const listClass = `form-label inline-block mb-2 ${className}`;

  return (
    <label
      htmlFor={forId}
      className={listClass}
      style={{ color: textColor, cursor: "pointer" }}
    >
      {title}
    </label>
  );
}
