import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import {
  Star,
  ArrowRight,
  Info,
  Box,
  Type,
  Sliders,
  MessageSquare,
  Menu,
  X,
  Layout,
  AlignLeft,
} from "lucide-react";
import Tooltip from "./Tooltip";
import SpeedDial from "./SpeedDial";
import BackToTopButton from "./BackToTop";

const GlassyUIComponentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const githubRepoUrl = "https://github.com/Jaishree2310/GlassyUI-Components";

  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300";
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateToLandingPage = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      <BackToTopButton />
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <header className="flex justify-between items-center mb-16">
          <div
            className="text-3xl lg:text-4xl font-bold tracking-tight cursor-pointer hover:text-pink-200 transition-colors duration-300"
            onClick={navigateToLandingPage}
          >
            GlassyUI
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300`}
            >
              <Star size={18} />
              <span className="text-sm font-medium">Star on GitHub</span>
            </a>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {isMenuOpen && (
          <div className="md:hidden mb-8">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center space-x-2 ${getGlassyClasses()} px-4 py-2 hover:bg-white/20 transition-colors duration-300 w-full`}
            >
              <Star size={18} />
              <span className="text-sm font-medium">Star on GitHub</span>
            </a>
          </div>
        )}

        <main className="fade-in">
          <h1 className="text-4xl flex item-center justify-center lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
            Glassmorphic Components
          </h1>
          <p className="flex justify-center text-lg lg:text-xl mb-12 max-w-2l leading-relaxed">
            Elevate your UI with our collection of beautifully crafted,
            glassmorphic components. Perfect for creating modern, sleek
            interfaces with depth and style.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ComponentCard
              title="Speed Dial"
              description="Speed dial with glassmorphism effect. Hover on me to see the actions."
              icon={<Info size={24} />}
              status="New"
              onClick={() => navigate("/speed-dial-details")}
            >
              <SpeedDial
                direction="right"
                actionButtons={[
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
                ]}
              />
            </ComponentCard>
            <ComponentCard
              title="Buttons"
              description="Sleek, customizable buttons with glassmorphic styling."
              icon={<Box size={24} />}
              onClick={() => navigate("/button-details")}
            >
              <div className="flex space-x-2 mt-4">
                <button
                  className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
                >
                  Click me
                </button>
                <button
                  className={`${getGlassyClasses()} px-4 py-2 bg-white/20 hover:bg-white/30`}
                >
                  Accent
                </button>
              </div>
            </ComponentCard>

            <ComponentCard
              title="Inputs"
              description="Elegant input fields with a glass-like appearance."
              icon={<Type size={24} />}
              onClick={() => navigate("/input-details")}
            >
              <input
                type="text"
                placeholder="Type here..."
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50`}
              />
            </ComponentCard>

            <ComponentCard
              title="Cards"
              description="Versatile content containers with a frosted glass effect."
              icon={<Layout size={24} />}
              onClick={() => navigate("/card-details")}
            >
              <div className={`${getGlassyClasses()} p-4 mt-4`}>
                <h4 className="font-semibold">Card Title</h4>
                <p className="text-sm opacity-80">Card content goes here.</p>
              </div>
            </ComponentCard>

            <ComponentCard
              title="Progress Bars"
              description="Stylish progress indicators with a glass-like finish."
              icon={<Sliders size={24} />}
              onClick={() => navigate("/progress-bar-details")}
            >
              <div className={`${getGlassyClasses()} w-full h-4 mt-4`}>
                <div
                  className="bg-white/30 h-full rounded-2xl"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </ComponentCard>

            <ComponentCard
              title="Modals"
              description="Eye-catching dialog boxes with glassmorphism effects."
              icon={<MessageSquare size={24} />}
              onClick={() => navigate("/modal-details")}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Modal would open here");
                }}
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Open Modal
              </button>
            </ComponentCard>

            <ComponentCard
              title="Navigation"
              description="Sleek navigation components with a frosted glass look."
              icon={<ArrowRight size={24} />}
              onClick={() => navigate("/navigation-details")}
            >
              <nav
                className={`${getGlassyClasses()} flex justify-around mt-4 py-2`}
              >
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">
                  Home
                </a>
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">
                  About
                </a>
                <a href="#" className="hover:bg-white/20 px-2 py-1 rounded">
                  Contact
                </a>
              </nav>
            </ComponentCard>

            <ComponentCard
              title="Popups"
              description="Attention-grabbing popup notifications with glassmorphic styling."
              icon={<MessageSquare size={24} />}
              onClick={() => navigate("/popup-details")}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPopupOpen(true);
                }}
                className={`${getGlassyClasses()} px-4 py-2 mt-4 hover:bg-white/20`}
              >
                Show Popup
              </button>
              {isPopupOpen && (
                <div
                  className="fixed inset-0 flex items-center justify-center z-50"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <div
                    className={`${getGlassyClasses()} p-6 max-w-sm mx-auto`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-xl font-bold mb-2">Popup Title</h3>
                    <p className="mb-4">
                      This is a sample popup with glassmorphism effect.
                    </p>
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className={`${getGlassyClasses()} px-4 py-2 hover:bg-white/20`}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </ComponentCard>

            <ComponentCard
              title="Textarea"
              description="Multi-line input fields with elegant glassmorphic design."
              icon={<AlignLeft size={24} />}
              onClick={() => navigate("/textarea-details")}
            >
              <textarea
                placeholder="Enter your message..."
                className={`${getGlassyClasses()} w-full px-4 py-2 mt-4 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none`}
                rows={3}
              />
            </ComponentCard>

            <ComponentCard
              title="Tool Tip"
              description="Tooltip component support different positions, and be responsive and accessible."
              icon={<Info size={24} />}
              onClick={() => navigate("/tooltip-details")}
            >
              <div className="mt-1 mb-4 flex justify-around">
                <Tooltip text="Tooltip" position="left">
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Left
                  </button>
                </Tooltip>
                <Tooltip text="Tooltip" position="bottom">
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Bottom
                  </button>
                </Tooltip>
                <Tooltip text="Tooltip" position="right">
                  <button className={`${getGlassyClasses()} px-4 py-2`}>
                    Right
                  </button>
                </Tooltip>
              </div>
            </ComponentCard>
          </div>
        </main>
      </div>
    </div>
  );
};

const ComponentCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  status?: string;
  children?: React.ReactNode;
}> = ({ title, description, icon, onClick, children, status }) => {
  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg transition-all duration-300";
  };

  return (
    <div
      className={`${getGlassyClasses()} p-6 flex flex-col h-full cursor-pointer group transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-white/20 rounded-lg mr-4">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        {status && (
          <span className="ml-2 px-2 py-1 bg-green-200 text-green-700 text-xs font-medium rounded">
            {status}
          </span>
        )}
      </div>
      <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
      {children}
      <div className="flex items-center text-sm font-medium text-pink-200 mt-4">
        <span>Learn more</span>
        <ArrowRight
          size={16}
          className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default GlassyUIComponentsPage;
