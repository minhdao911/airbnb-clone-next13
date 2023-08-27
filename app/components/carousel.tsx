"use client";

import { FunctionComponent, useState } from "react";
import { IconType } from "react-icons";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: FunctionComponent<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > children.length - 1) {
        index = 0;
      }
      return index;
    });
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = children.length - 1;
      }
      return index;
    });
  };

  return (
    <div className="relative w-full h-full">
      {children.map((child, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-500 linear transform ${
            index === currentIndex
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          {child}
        </div>
      ))}
      {currentIndex < children.length - 1 && (
        <RoundButton
          icon={MdKeyboardArrowRight}
          position="right"
          onClick={nextSlide}
        />
      )}
      {currentIndex > 0 && (
        <RoundButton
          icon={MdKeyboardArrowLeft}
          position="left"
          onClick={prevSlide}
        />
      )}
    </div>
  );
};

export default Carousel;

interface RoundButtonProps {
  position: "left" | "right";
  icon: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RoundButton = ({ icon: Icon, position, onClick }: RoundButtonProps) => (
  <button
    className={`absolute hidden ${
      position === "left" ? "left-2" : "right-2"
    } top-1/2 transform -translate-y-1/2 p-1.5 rounded-full bg-white border-none opacity-80 group-hover:block focus:outline-none hover:opacity-100`}
    onClick={onClick}
  >
    <Icon size={15} />
  </button>
);
