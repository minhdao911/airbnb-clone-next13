"use client";

import { FunctionComponent, useEffect } from "react";
import EmptyState from "./components/empty-state";
import useLocale from "./hooks/use-locale";
import { useTranslation } from "@/i18n/client";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: FunctionComponent<ErrorStateProps> = ({ error }) => {
  const { locale } = useLocale();
  const { t } = useTranslation(locale, "common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title={t("errorState.title")}
      subtitle={t("errorState.subtitle")}
    />
  );
};

export default ErrorState;
