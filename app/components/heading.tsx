"use client";

import { FunctionComponent } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  titleStyle?: any;
  subtitleStyle?: any;
}

const Heading: FunctionComponent<HeadingProps> = ({
  title,
  subtitle,
  center,
  titleStyle,
  subtitleStyle,
}: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold" style={titleStyle}>
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2" style={subtitleStyle}>
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
