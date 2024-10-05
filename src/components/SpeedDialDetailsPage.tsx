import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Check, Copy } from "lucide-react";
import SpeedDial from "./SpeedDial";
const SpeedDialDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const getGlassyClasses = () => {
    return "backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300";
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates((prev) => ({ ...prev, [key]: false })),
        2000
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <Copy size={16} className="text-gray-800" />
      )}
    </button>
  );

  const basicUsage = `
  //import and use the SpeedDial component in your file
  import SpeedDial from "./SpeedDial";
  <SpeedDial direction="right"  /> //other options: down, left, up
  `;

  const speedDialCode = `
  //Create a file SpeedDial.tsx and add the following code
  import React, { useState } from "react";
  import { Copy, Share2, Edit, Trash, Plus } from "lucide-react";
  
  const SpeedDial: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
  
    const getGlassyClasses = () => {
      return "backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300";
    };
  
    // You can add as many action buttons as you want; just make sure to update the actionButtons array
    const actionButtons = [
      {
        icon: <Copy size={20} />,
        label: "Copy",
        key: "copy",
        action: () => console.log("Copy"),
      },
      {
        icon: <Share2 size={20} />,
        label: "Share",
        key: "share",
        action: () => console.log("Share"),
      },
      {
        icon: <Edit size={20} />,
        label: "Edit",
        key: "edit",
        action: () => console.log("Edit"),
      },
      {
        icon: <Trash size={20} />,
        label: "Delete",
        key: "delete",
        action: () => console.log("Delete"),
      },
    ];
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center mb-4 gap-4"
      >
        <button
          className={\`\${getGlassyClasses()} flex items-center p-3 hover:bg-white transition-all duration-300 text-gray-800\`}
        >
          <Plus size={20} />
        </button>
  
        {/* Speed Dial Actions */}
        <div
          className={\`\${isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"} flex items-center gap-4 transition-all duration-500 ease-in-out origin-left\`}
        >
          {actionButtons.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={\`\${getGlassyClasses()} flex items-center p-3 hover:bg-white transition-all duration-300 text-gray-800\`}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default SpeedDial;
  `;

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-[#ffc6c6] via-[#ffc6e5] to-[#e7c6ff] relative">
      <div className="relative z-10">
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>

        <h1 className="text-6xl font-bold mb-8 text-gray-900">Speed Dial</h1>
        <p className="text-xl mb-8 text-gray-800">
          A customizable, glassmorphism styled Speed Dial component.
        </p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Speed Dial: Right
          </h2>
          <SpeedDial direction="right" />
          <div className="relative mb-4">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {basicUsage}
            </pre>
            <CopyButton text={basicUsage} codeKey="basicUsage" />
          </div>
          <div className="relative">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {speedDialCode}
            </pre>
            <CopyButton text={speedDialCode} codeKey="speedDialCode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedDialDetailsPage;
