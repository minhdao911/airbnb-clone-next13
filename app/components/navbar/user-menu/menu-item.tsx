"use client";

interface MenuItemProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
}

const MenuItem = ({ text, isSelected, onClick }: MenuItemProps) => {
  return (
    <div
      className={`px-4 py-3 hover:bg-neutral-100 transition ${
        isSelected ? "font-semibold" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default MenuItem;
