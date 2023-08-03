import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
  type?: "primary" | "outline";
  icon: IconType;
  iconSize?: number;
  buttonSize?: number;
  onClick: () => void;
}

const IconButton: FunctionComponent<IconButtonProps> = ({
  type = "primary",
  icon: Icon,
  iconSize = 15,
  buttonSize = 35,
  onClick,
}) => {
  const styles = {
    primary:
      "bg-[rgba(255,255,255,0.9)] border border-[rgba(0,0,0,0.08)] text-neutral-500 shadow hover:bg-white hover:text-black",
    outline: "border border-neutral-400 hover:border-black",
  };
  return (
    <button
      className={`flex items-center justify-center rounded-full ${styles[type]}`}
      style={{
        width: buttonSize,
        height: buttonSize,
      }}
      onClick={onClick}
    >
      <Icon size={iconSize} />
    </button>
  );
};

export default IconButton;
