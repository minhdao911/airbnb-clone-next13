"use client";

interface MenuItemProps {
  text: string;
  highlighted?: boolean;
  onClick: () => void;
}

const MenuItem = ({ text, highlighted, onClick }: MenuItemProps) => {
  return (
    <div
      className={`px-4 py-3 hover:bg-neutral-100 transition ${
        highlighted ? "font-semibold" : ""
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default MenuItem;
