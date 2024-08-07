import React, { useState } from "react";

interface TooltipProps {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = "top",
  children,
}) => {
  const [visible, setVisible] = useState(false);

  let positionClasses;
  switch (position) {
    case "top":
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 transform -translate-x-1/2 mt-2";
      break;
    case "left":
      positionClasses =
        "top-1/2 transform -translate-y-1/2 mr-1 xl:-translate-x-4 translate-x-16";
      break;
    case "right":
      positionClasses =
        "left-full top-1/2 transform -translate-y-1/2 -ml-20 -translate-x-8 ";
      break;
    default:
      positionClasses = "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="cursor-pointer"
      >
        {children}
      </div>
      <div
        className={`absolute z-10 px-2 py-1 text-md text-white glassmorphism rounded-md shadow-lg pointer-events-none transition-opacity duration-200 ${positionClasses} ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="tooltip"
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
