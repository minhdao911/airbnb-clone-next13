import { FunctionComponent } from "react";
import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}

const ListingCategory: FunctionComponent<ListingCategoryProps> = ({
  icon,
  label,
  description,
}) => {
  const Icon = icon;
  return (
    <div className="flex items-center gap-4">
      <Icon size={30} />
      <div className="flex flex-col">
        <p className="font-bold">{label}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ListingCategory;
