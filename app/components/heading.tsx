"use client";

import { FunctionComponent } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  titleStyle?: any;
}

const Heading: FunctionComponent<HeadingProps> = ({
  title,
  subtitle,
  center,
  titleStyle,
}: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold" style={titleStyle}>
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
