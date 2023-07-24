"use client";

import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  type?: "primary" | "secondary" | "outline";
  small?: boolean;
  icon?: IconType;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  label,
  disabled,
  type = "primary",
  small,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  const styles = {
    primary: "bg-rose-500 border-rose-500 text-white hover:opacity-80",
    secondary: "bg-gray-900 border-black text-white hover:opacity-80",
    outline: "text-sm bg-white border-black text-black hover:bg-neutral-100",
  };
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full ${
        styles[type]
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : "py-3 text-md font-semibold border-2"
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
