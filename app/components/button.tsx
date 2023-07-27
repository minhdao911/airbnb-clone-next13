"use client";

import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: "primary" | "secondary" | "outline" | "ghost";
  small?: boolean;
  width?: number | string;
  icon?: IconType;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  label,
  disabled,
  type = "primary",
  small,
  width = "full",
  icon: Icon,
  onClick,
}: ButtonProps) => {
  const styles = {
    primary: "bg-rose-500 border-rose-500 text-white hover:opacity-80",
    secondary: "bg-gray-900 border-black text-white hover:opacity-80",
    outline: "text-sm bg-white border-black text-black hover:bg-neutral-100",
    ghost: "bg-transparent text-black underline hover:bg-neutral-100",
  };
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-${width} ${
        styles[type]
      } ${
        small
          ? "py-1 px-2 text-sm font-light border-[1px]"
          : "py-3 px-4 text-md font-semibold border-2"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={20} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
