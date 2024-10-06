import React, { useState } from "react";

import { Plus } from "lucide-react";
interface SpeedDialProps {
  direction: string;
  actionButtons: Array<{
    icon: React.ReactNode;
    label: string;
    key: string;
    action: () => void;
  }>;
}

export default function SpeedDial({
  direction,
  actionButtons,
}: SpeedDialProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getAnimation = () => {
    switch (direction) {
      case "up":
        return "origin-bottom flex-col order-0";
      case "down":
        return "origin-top flex-col order-2";
      case "left":
        return "origin-right order-0";
      case "right":
        return "origin-left order-2";
      default:
        return "";
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-md bg-white/30 border border-white/20 rounded-xl shadow-lg";
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className={`relative mb-3 flex w-fit items-center gap-3 ${
        direction === "up" || direction === "down" ? "flex-col" : "flex-row"
      }`}
    >
      <button
        onMouseEnter={handleMouseEnter}
        className={`${getGlassyClasses()} order-0 order-1 flex items-center p-3 text-gray-800 transition-all duration-300 hover:bg-slate-100`}
      >
        <Plus size={20} />
      </button>

      {/* Speed Dial Actions */}
      <div
        className={`${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } flex items-center gap-3 transition-all duration-500 ease-in-out ${getAnimation()}`}
      >
        {actionButtons.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`${getGlassyClasses()} flex items-center p-3 text-gray-800 transition-all duration-300 hover:bg-slate-100`}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
