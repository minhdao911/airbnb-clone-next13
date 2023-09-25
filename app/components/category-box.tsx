"use client";

import { useSearchParams } from "next/navigation";
import { FunctionComponent, useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { useRouter } from "next-nprogress-bar";

interface CategoryBoxProps {
  id: string;
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: FunctionComponent<CategoryBoxProps> = ({
  id,
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: id,
    };

    if (params?.get("category") === id) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [id, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col
        min-w-[78px]
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={22} />
      <div className="font-medium text-sm whitespace-nowrap">{label}</div>
    </div>
  );
};

export default CategoryBox;
