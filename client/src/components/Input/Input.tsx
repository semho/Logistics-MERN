import React, { useState } from "react";

type TColor = "sky" | "gray" | "purple" | "rose";
type TType = "email" | "password" | "text" | "number";

interface IInputProps {
  borderColor: TColor;
  type: TType;
  name: string;
  className?: string;
  id?: string;
  placeholder?: string;
  ariaDescribedby?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  borderDefault?: string;
}
export function Input({
  borderColor,
  type,
  name,
  className,
  id,
  placeholder,
  onChange,
  ariaDescribedby,
  borderDefault = "#d1d5db",
}: IInputProps) {
  const listClass = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none ${className}`;

  const [color, setColor] = useState("border-gray-300");
  function handleFocus() {
    setColor(borderColor);
  }
  function handleBlur() {
    setColor(borderDefault);
  }

  return (
    <input
      type={type}
      name={name}
      className={listClass}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      aria-describedby={ariaDescribedby}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ borderColor: color }}
    />
  );
}
