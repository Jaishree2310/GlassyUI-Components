import React, { useState, ReactNode } from 'react';
import { Tabs, Tab } from './Tabs';
import BackToTopButton from './BackToTop';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const getGlassyClasses = () => {
  return 'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';
};


const CopyButton: React.FC<{ text: string; codeKey: string; copied: boolean; onClick: () => void }> = ({copied, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
    title="Copy to clipboard"
  >
    {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-white" />}
  </button>
);

const TabsDetail: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedStates((prev) => ({ ...prev, [key]: false })), 2000);
    });
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative">
      <BackToTopButton />
      <div className="relative z-10">
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-800`}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Components
        </button>

        <h1 className="text-6xl font-bold mb-8 text-white">Tabs Details</h1>
        <p className="text-lg text-white mb-8">
        Tabs provide a seamless navigation experience, featuring filled styles for strong emphasis on active selections, outlined designs for a minimalist approach, and ghost tabs for a sleek, transparent look. Disabled tabs clearly indicate non-interactive options, enhancing clarity and usability.
        </p>

        {/* Filled Tabs Section */}
        <TabsSection 
          title="Filled Tabs"
          description="Filled tabs provide a strong visual emphasis on the active tab."
          exampleCode={`<Tabs>\n  <Tab label="Tab 1" variant="filled">\n    <div>Content for Tab 1</div>\n  </Tab>\n  <Tab label="Tab 2" variant="filled">\n    <div>Content for Tab 2</div>\n  </Tab>\n</Tabs>`}
          copied={copiedStates[`exampleCode-Filled Tabs`]}
          onCopy={() => copyToClipboard(`Example Code for Filled Tabs`, `exampleCode-Filled Tabs`)}
        >
          <Tabs>
            <Tab label="Tab 1" variant="filled">
              <div className="text-white">Content for Tab 1</div>
            </Tab>
            <Tab label="Tab 2" variant="filled">
              <div className="text-white">Content for Tab 2</div>
            </Tab>
          </Tabs>
        </TabsSection>

        {/* Outlined Tabs Section */}
        <TabsSection 
          title="Outlined Tabs"
          description="Outlined tabs offer a subtle, elegant look with clear distinction between tabs."
          exampleCode={`<Tabs>\n  <Tab label="Tab 1" variant="outlined">\n    <div>Content for Tab 1</div>\n  </Tab>\n  <Tab label="Tab 2" variant="outlined">\n    <div>Content for Tab 2</div>\n  </Tab>\n</Tabs>`}
          copied={copiedStates[`exampleCode-Outlined Tabs`]}
          onCopy={() => copyToClipboard(`Example Code for Outlined Tabs`, `exampleCode-Outlined Tabs`)}
        >
          <Tabs>
            <Tab label="Tab 1" variant="outlined">
              <div className="text-white">Content for Tab 1</div>
            </Tab>
            <Tab label="Tab 2" variant="outlined">
              <div className="text-white">Content for Tab 2</div>
            </Tab>
          </Tabs>
        </TabsSection>

        {/* Ghost Tabs Section */}
        <TabsSection 
          title="Ghost Tabs"
          description="Ghost tabs provide a minimalist approach, perfect for subtle navigation."
          exampleCode={`<Tabs>\n  <Tab label="Tab 1" variant="ghost">\n    <div>Content for Tab 1</div>\n  </Tab>\n  <Tab label="Tab 2" variant="ghost">\n    <div>Content for Tab 2</div>\n  </Tab>\n</Tabs>`}
          copied={copiedStates[`exampleCode-Ghost Tabs`]}
          onCopy={() => copyToClipboard(`Example Code for Ghost Tabs`, `exampleCode-Ghost Tabs`)}
        >
          <Tabs>
            <Tab label="Tab 1" variant="ghost">
              <div className="text-white">Content for Tab 1</div>
            </Tab>
            <Tab label="Tab 2" variant="ghost">
              <div className="text-white">Content for Tab 2</div>
            </Tab>
          </Tabs>
        </TabsSection>

        {/* Disabled Tabs Section */}
        <TabsSection 
          title="Disabled Tabs"
          description="Disabled tabs indicate non-interactive states, enhancing user experience."
          exampleCode={`<Tabs>\n  <Tab label="Tab 1" disabled>\n    <div>Content for Tab 1</div>\n  </Tab>\n  <Tab label="Tab 2" disabled>\n    <div>Content for Tab 2</div>\n  </Tab>\n</Tabs>`}
          copied={copiedStates[`exampleCode-Disabled Tabs`]}
          onCopy={() => copyToClipboard(`Example Code for Disabled Tabs`, `exampleCode-Disabled Tabs`)}
        >
          <Tabs>
            <Tab label="Tab 1" disabled>
              <div className="text-white">Content for Tab 1 (Disabled)</div>
            </Tab>
            <Tab label="Tab 2" disabled>
              <div className="text-white">Content for Tab 2 (Disabled)</div>
            </Tab>
          </Tabs>
        </TabsSection>
      </div>
    </div>
  );
};


const TabsSection: React.FC<{ title: string; description: string; exampleCode: string; copied: boolean; onCopy: () => void; children: ReactNode }> = ({ title, description, exampleCode, copied, onCopy, children }) => {
  return (
    <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
      <h2 className="text-3xl font-bold mb-6 text-white">{title}</h2>
      <p className="mb-6 text-lg text-white">{description}</p>
      <div className="mb-6">{children}</div>
      <div className="relative">
        <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]">
          {exampleCode}
        </pre>
        <CopyButton text={exampleCode} codeKey={title} copied={copied} onClick={onCopy} />
      </div>
    </div>
  );
};

export default TabsDetail;
