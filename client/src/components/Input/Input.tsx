import React from "react";

type TColor = "sky" | "gray" | "purple" | "red" | "yellow" | "green";
type TType = "email" | "password" | "text" | "number";

interface IInputProps {
  borderColor: TColor;
  type: TType;
  className?: string;
  id?: string;
  placeholder?: string;
  ariaDescribedby?: string;
}
export function Input({
  borderColor,
  type,
  className,
  id,
  placeholder,
  ariaDescribedby,
}: IInputProps) {
  const listClass = `form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-${borderColor}-600 focus:outline-none ${className}`;

  return (
    <input
      type={type}
      className={listClass}
      id={id}
      placeholder={placeholder}
      aria-describedby={ariaDescribedby}
    />
  );
}
