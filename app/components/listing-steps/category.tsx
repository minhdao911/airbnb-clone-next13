"use client";

import { FunctionComponent } from "react";
import Heading from "../heading";
import { Category, categories } from "@/constants";
import useLocale from "@/app/hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface CategoryStepProps {
  selected: Category;
  setValue: (category: Category) => void;
}

const CategoryStep: FunctionComponent<CategoryStepProps> = ({
  selected,
  setValue,
}) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "become-a-host");
  const commonT = useTranslation(locale, "common");

  return (
    <>
      <Heading
        title={t("steps.category.title")}
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
        {categories(commonT.t).map((item, index) => {
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
                  selected?.id === item.id
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
