import React from "react";

type TColor = "sky" | "gray" | "purple" | "red" | "yellow" | "green";
type TType = "submit" | "button";

interface IButtonProps {
  variant: TColor;
  type: TType;
  title: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
}
export function Button({
  variant,
  type,
  title,
  className,
  onClick,
  disabled,
}: IButtonProps) {
  const colorBtn = `shadow bg-${variant}-500 hover:bg-${variant}-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${className}`;

  return (
    <button
      type={type}
      className={colorBtn}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
