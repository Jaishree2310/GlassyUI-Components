import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Copy } from "lucide-react";
import SpeedDial from "./SpeedDial";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import BackToTopButton from "./BackToTop";

// Utility function for reusable glassy class styles
const getGlassyClasses = (): string =>
  "backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300";

// Function to copy text to clipboard and handle feedback
const copyToClipboard = (
  text: string,
  key: string,
  setCopiedStates: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >
) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopiedStates((prev) => ({ ...prev, [key]: true }));
    setTimeout(
      () => setCopiedStates((prev) => ({ ...prev, [key]: false })),
      2000
    );
  });
};

// CopyButton component for code blocks, handles copy action
const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
  text,
  codeKey,
}) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  return (
    <button
      onClick={() => copyToClipboard(text, codeKey, setCopiedStates)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      aria-label="Copy to clipboard"
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <Copy size={16} className="text-gray-800" />
      )}
    </button>
  );
};

// Main component displaying SpeedDial usage details
const SpeedDialDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const basicUsage = `
  const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

  function Example () {
  return 
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
                  other icons objects of your wish...
                  }
                ]}
              />
  
  }
  `;

  const speedDialRight = `
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

  `;

  const speedDialTop = `
  <SpeedDial
                direction="top"
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
              />`;

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-[#ffc6c6] via-[#ffc6e5] to-[#e7c6ff] relative">
      <BackToTopButton />
      <div className="relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>

        {/* Page Title and Description */}
        <h1 className="text-6xl font-bold mb-8 text-gray-900">Speed Dial</h1>
        <p className="text-xl mb-8 text-gray-800">
          A customizable, glassmorphism-styled Speed Dial component.
        </p>

        {/* Speed Dial Demo and Code Section */}
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Basic Usage</h2>
          {/* Basic Usage Code Block */}
          <div className="relative mb-4">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {basicUsage}
            </pre>
            <CopyButton text={basicUsage} codeKey="basicUsage" />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Props</h2>
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="text-left p-2 text-gray-800">Prop</th>
                <th className="text-left p-2 text-gray-800">Type</th>
                <th className="text-left p-2 text-gray-800">Default</th>
                <th className="text-left p-2 text-gray-800">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">direction</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">
                  The direction of the speed dial. Can be "up", "down", "left",
                  or "right"
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">actionButtons</td>
                <td className="p-2 text-gray-700">array</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">
                  An array of objects containing the icon, label, key, and
                  action.
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Speed Dial: Right
          </h2>
          {/* Basic Usage Code Block */}
          <div className="relative mb-4">
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
            ></SpeedDial>
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {speedDialRight}
            </pre>
            <CopyButton text={speedDialRight} codeKey="speedDialRight" />
          </div>
        </div>
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Speed Dial: Down
          </h2>
          {/* Basic Usage Code Block */}
          <div className="relative mb-4">
            <SpeedDial
              direction="down"
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
            ></SpeedDial>
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {speedDialTop}
            </pre>
            <CopyButton text={speedDialTop} codeKey="speedDialRight" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedDialDetailsPage;
