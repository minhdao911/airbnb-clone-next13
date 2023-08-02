"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import { categories } from "../navbar/categories";

type Category = (typeof categories)[0];

interface CategoryStepProps {
  selected: Category;
  setValue: (category: Category) => void;
}

const CategoryStep: FunctionComponent<CategoryStepProps> = ({
  selected,
  setValue,
}) => {
  return (
    <>
      <Heading
        title="Which of these best describes your place?"
        titleStyle={{
          fontSize: "2rem",
          lineHeight: "2rem",
        }}
      />
      <div
        className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-4
            text-md
        "
      >
        {categories.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`
                col-span-1
                p-4
                py-5
                border
                rounded-md
                flex
                flex-col
                gap-2
                cursor-pointer
                hover:shadow-[0_0_0_2px_black]
                ${
                  selected?.label === item.label
                    ? "bg-neutral-100 shadow-[0_0_0_2px_black]"
                    : "bg-white"
                }
              `}
              onClick={() => {
                setValue(item);
              }}
            >
              <Icon size={25} />
              {item.label}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryStep;
