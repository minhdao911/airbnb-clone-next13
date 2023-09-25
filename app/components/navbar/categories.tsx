"use client";

import { FunctionComponent } from "react";
import Container from "../container";
import CategoryBox from "../category-box";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { categories } from "@/constants";
import useLocale from "@/app/hooks/use-locale";

interface CategoriesProps {}

const Categories: FunctionComponent<CategoriesProps> = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const { locale } = useLocale();
  const { t } = useTranslation(locale, "common");

  const isMainPage = pathname === "/" || pathname === `/${locale}`;

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row
          gap-3
          items-center 
          justify-between
          overflow-x-auto
          no-scrollbar
        "
      >
        {categories(t).map((item) => (
          <CategoryBox
            key={item.id}
            {...item}
            selected={category === item.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
