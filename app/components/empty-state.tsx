"use client";

import Button from "./button";
import Heading from "./heading";
import useLocale from "../hooks/use-locale";
import { useRouter } from "next-nprogress-bar";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onButtonClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  actionLabel,
  onButtonClick,
}) => {
  const router = useRouter();
  const { locale } = useLocale();

  const onClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      router.push(`/${locale}`);
    }
  };

  return (
    <div
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {actionLabel && (
          <Button type="outline" label={actionLabel} onClick={onClick} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
