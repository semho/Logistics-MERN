import React from "react";

type TColor = "sky" | "gray" | "purple" | "red" | "yellow" | "green";

interface IInputProps {
  textColor: TColor;
  title: string;
  forId: string;
  className?: string;
}
export function Label({ textColor, title, forId, className }: IInputProps) {
  const listClass = `form-label inline-block mb-2 text-${textColor}-700 ${className}`;

  return (
    <label htmlFor={forId} className={listClass}>
      {title}
    </label>
  );
}
