"use client";

import { FunctionComponent, useCallback } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import IconButton from "../icon-button";

interface CounterProps {
  value: number;
  title: string;
  subtitle?: string;
  onChange: (value: number) => void;
}

const Counter: FunctionComponent<CounterProps> = ({
  value,
  title,
  subtitle,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-lg font-light">{title}</p>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <IconButton type="outline" icon={HiMinus} onClick={onReduce} />
        <p>{value}</p>
        <IconButton type="outline" icon={HiPlus} onClick={onAdd} />
      </div>
    </div>
  );
};

export default Counter;
