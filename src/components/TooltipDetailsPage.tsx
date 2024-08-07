import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import Tooltip from './Tooltip'; // Assuming Tooltip is in the same directory

const TooltipDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const getGlassyClasses = () => {
    return 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    });
  };

  const CopyButton: React.FC<{ text: string, codeKey: string }> = ({ text, codeKey }) => (
    <button 
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title="Copy to clipboard"
    >
      {copiedStates[codeKey] ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-800" />}
    </button>
  );

  const basicUsageCode = `const getGlassyClasses = () => 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

function Example() {
  return (
    <Tooltip text="This is a tooltip!" position="top">
      <button className={getGlassyClasses()}>
        Hover me
      </button>
    </Tooltip>
  );
}`;

  const topTooltipCode = `<Tooltip text="Tooltip on top!" position="top">
  <button className={getGlassyClasses()}>
    Top
  </button>
</Tooltip>`;

  const bottomTooltipCode = `<Tooltip text="Tooltip on bottom!" position="bottom">
  <button className={getGlassyClasses()}>
    Bottom
  </button>
</Tooltip>`;

  const leftTooltipCode = `<Tooltip text="Tooltip on left!" position="left">
  <button className={getGlassyClasses()}>
    Left
  </button>
</Tooltip>`;

  const rightTooltipCode = `<Tooltip text="Tooltip on right!" position="right">
  <button className={getGlassyClasses()}>
    Right
  </button>
</Tooltip>`;

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

        <h1 className="text-6xl font-bold mb-8 text-gray-900">Tooltip</h1>
        <p className="text-xl mb-8 text-gray-800">A customizable, glassmorphism styled tooltip component.</p>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Basic Usage</h2>
          <div className="relative">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey="basicUsage" />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Props</h2>
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
                <td className="p-2 text-gray-700">text</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">-</td>
                <td className="p-2 text-gray-700">The text to display inside the tooltip</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-2 text-gray-700">position</td>
                <td className="p-2 text-gray-700">string</td>
                <td className="p-2 text-gray-700">top</td>
                <td className="p-2 text-gray-700">The position of the tooltip (top, bottom, left, right)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8`}>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Tooltip Positions</h2>
          <p className="mb-6 text-lg text-gray-700">
            Display tooltips in different positions around the element.
          </p>
          <div className="flex justify-around">
            <Tooltip text="Tooltip on top!" position="left">
              <button className={`${getGlassyClasses()} px-4 py-2`}>Top</button>
            </Tooltip>
            <Tooltip text="Tooltip on bottom!" position="bottom">
              <button className={`${getGlassyClasses()} px-4 py-2`}>Bottom</button>
            </Tooltip>
            <Tooltip text="Tooltip on left!" position="top">
              <button className={`${getGlassyClasses()} px-4 py-2`}>Left</button>
            </Tooltip>
            <Tooltip text="Tooltip on right!" position="right">
              <button className={`${getGlassyClasses()} px-4 py-2`}>Right</button>
            </Tooltip>
          </div>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {topTooltipCode}
            </pre>
            <CopyButton text={topTooltipCode} codeKey="topTooltip" />
          </div>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {bottomTooltipCode}
            </pre>
            <CopyButton text={bottomTooltipCode} codeKey="bottomTooltip" />
          </div>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {leftTooltipCode}
            </pre>
            <CopyButton text={leftTooltipCode} codeKey="leftTooltip" />
          </div>
          <div className="relative mt-8">
            <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {rightTooltipCode}
            </pre>
            <CopyButton text={rightTooltipCode} codeKey="rightTooltip" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TooltipDetailsPage;
