import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import { Plus } from "lucide-react";
interface SpeedDialProps {
  direction: string;
}

export default function SpeedDial({ direction }: SpeedDialProps) {
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
    return "backdrop-filter backdrop-blur-xl bg-white border border-white rounded-xl shadow-lg transition-all duration-300";
  };

  // Customize action buttons here with social media icons
  const actionButtons = [
    {
      icon: <FaFacebookF size={20} />,
      label: "Facebook",
      key: "facebook",
      action: () => {
        window.open("https://www.facebook.com", "_blank");
      },
    },
    {
      icon: <FaTwitter size={20} />,
      label: "Twitter",
      key: "twitter",
      action: () => {
        window.open("https://www.twitter.com", "_blank");
      },
    },
    {
      icon: <FaLinkedinIn size={20} />,
      label: "LinkedIn",
      key: "linkedin",
      action: () => {
        window.open("https://www.linkedin.com", "_blank");
      },
    },
    {
      icon: <FaInstagram size={20} />,
      label: "Instagram",
      key: "instagram",
      action: () => {
        window.open("https://www.instagram.com", "_blank");
      },
    },
  ];

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
