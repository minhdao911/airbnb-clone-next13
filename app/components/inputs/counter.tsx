import { FunctionComponent, useCallback } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

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
        <button
          className="flex items-center justify-center w-[35px] h-[35px] border border-neutral-400 rounded-full hover:border-black"
          onClick={onReduce}
        >
          <HiMinus size={15} />
        </button>
        <p>{value}</p>
        <button
          className="flex items-center justify-center w-[35px] h-[35px] border border-neutral-400 rounded-full hover:border-black"
          onClick={onAdd}
        >
          <HiPlus size={15} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
