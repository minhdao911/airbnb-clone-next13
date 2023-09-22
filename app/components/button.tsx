"use client";

import React, { FunctionComponent } from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  type?: "primary" | "secondary" | "outline" | "ghost" | "transparent";
  small?: boolean;
  width?: number | string;
  className?: string;
  icon?: IconType;
  iconComp?: React.ReactNode;
  onClick?: (e: any) => void;
}

const Button: FunctionComponent<ButtonProps> = ({
  label = "",
  disabled,
  type = "primary",
  small,
  className,
  icon: Icon,
  iconComp,
  onClick,
}: ButtonProps) => {
  const styles = {
    primary: "bg-rose-500 border-rose-500 text-white hover:opacity-80",
    secondary: "bg-gray-900 border-black text-white hover:opacity-80",
    outline: "text-sm bg-white border-black text-black hover:bg-neutral-100",
    ghost:
      "bg-transparent text-black underline hover:bg-neutral-100 border-none",
    transparent:
      "text-sm bg-gray-200/80 border-none whitespace-nowrap hover:bg-gray-200",
  };
  return (
    <button
      className={twMerge(
        "relative flex items-center justify-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full",
        small
          ? "py-1 px-2 text-sm font-light border-[1px]"
          : "py-3 px-4 text-md font-semibold border-2",
        styles[type],
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {iconComp}
      {label}
    </button>
  );
};

export default Button;
