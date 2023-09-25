"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      {children}
      <ProgressBar
        color="#f43f5e"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Provider;
