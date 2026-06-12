import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import PageShell from './PageShell';
import FileUploader from './FileUploader';

export const FileUploaderDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [multiple, setMultiple] = useState(true);
  const [maxFiles, setMaxFiles] = useState(5);
  const [maxSizeMB, setMaxSizeMB] = useState(10);
  const [accept, setAccept] = useState('*/*');
  const [glassOpacity, setGlassOpacity] = useState(0.15);
  const [accentColor, setAccentColor] = useState('#8B5CF6');

  const getGlassyClasses = (op = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${op} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses(10)} p-2 hover:bg-opacity-40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-emerald-400' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  const basicUsageCode = `import FileUploader from './FileUploader';

function App() {
  const handleUpload = (files) => {
    console.log("Files ready to upload:", files);
  };

  return (
    <FileUploader 
      onFilesSelected={handleUpload}
      multiple={true}
      maxFiles={5}
    />
  );
}`;

  const dynamicCode = `<FileUploader
  onFilesSelected={(files) => console.log(files)}
  multiple={${multiple}}
  maxFiles={${maxFiles}}
  maxSizeMB={${maxSizeMB}}
  accept="${accept}"
  glassOpacity={${glassOpacity}}
  accentColor="${accentColor}"
/>`;

  return (
    <PageShell>
      <button
        onClick={() => navigate('/components')}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-opacity-40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <div className='mb-12'>
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200'>
          File Uploader Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A premium drag-and-drop glassy file dropzone with uploader queues.
        </p>
      </div>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-4 text-gray-100'>Basic Usage</h2>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto'>
          <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          {basicUsageCode}
        </pre>
      </div>

      {/* Props */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-white bg-opacity-20 text-left'>
                <th className='p-2'>Prop</th>
                <th className='p-2'>Type</th>
                <th className='p-2'>Default</th>
                <th className='p-2'>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-white/10'>
                <td className='p-2'>onFilesSelected</td>
                <td className='p-2 font-mono text-violet-200'>
                  {'(files: File[]) => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>
                  Trigger callback when valid files are attached.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>multiple</td>
                <td className='p-2 font-mono text-violet-200'>boolean</td>
                <td className='p-2 font-mono'>true</td>
                <td className='p-2'>
                  Allows selecting multiple files at once.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>maxFiles</td>
                <td className='p-2 font-mono text-violet-200'>number</td>
                <td className='p-2 font-mono'>5</td>
                <td className='p-2'>
                  Maximum number of concurrent attachments allowed.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>maxSizeMB</td>
                <td className='p-2 font-mono text-violet-200'>number</td>
                <td className='p-2 font-mono'>10</td>
                <td className='p-2'>
                  Maximum file size threshold for individual files.
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>accept</td>
                <td className='p-2 font-mono text-violet-200'>string</td>
                <td className='p-2 font-mono'>'*/*'</td>
                <td className='p-2'>
                  Allowed mime-types filters (e.g. 'image/*').
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-violet-200'>number</td>
                <td className='p-2 font-mono'>0.15</td>
                <td className='p-2'>Background white opacity multiplier.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>accentColor</td>
                <td className='p-2 font-mono text-violet-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>
                  Colored outline highlighters for drag events.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Sandbox Playground */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Interactive Sandbox
        </h2>
        <p className='text-xl mb-6 text-gray-300'>
          Customize properties and view alterations live.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Controls */}
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <label className='font-semibold'>Allow Multiple Files</label>
              <input
                type='checkbox'
                checked={multiple}
                onChange={e => setMultiple(e.target.checked)}
                className='w-4 h-4 cursor-pointer accent-violet-600'
              />
            </div>

            <div>
              <label className='block mb-2 font-semibold'>
                Max Files: {maxFiles}
              </label>
              <input
                type='range'
                min='1'
                max='10'
                step='1'
                value={maxFiles}
                onChange={e => setMaxFiles(parseInt(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>

            <div>
              <label className='block mb-2 font-semibold'>
                Max Size: {maxSizeMB}MB
              </label>
              <input
                type='range'
                min='1'
                max='50'
                step='1'
                value={maxSizeMB}
                onChange={e => setMaxSizeMB(parseInt(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>

            <div>
              <label className='block mb-2 font-semibold'>
                Accept Mime Types
              </label>
              <input
                type='text'
                value={accept}
                onChange={e => setAccept(e.target.value)}
                className='w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/35 text-sm'
              />
            </div>

            <div>
              <label className='block mb-1 font-semibold'>
                Glass Opacity: {glassOpacity.toFixed(2)}
              </label>
              <input
                type='range'
                min='0.05'
                max='0.40'
                step='0.05'
                value={glassOpacity}
                onChange={e => setGlassOpacity(parseFloat(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>

            <div>
              <label className='block text-xs font-semibold mb-1'>
                Highlight Color
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='color'
                  value={accentColor}
                  onChange={e => setAccentColor(e.target.value)}
                  className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                />
                <span className='text-xs font-mono'>{accentColor}</span>
              </div>
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center min-h-[220px]`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400'>
                Live Preview
              </h3>
              <div className='p-2'>
                <FileUploader
                  multiple={multiple}
                  maxFiles={maxFiles}
                  maxSizeMB={maxSizeMB}
                  accept={accept}
                  glassOpacity={glassOpacity}
                  accentColor={accentColor}
                  onFilesSelected={files => console.log(files)}
                />
              </div>
            </div>

            <div className='relative'>
              <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-xs'>
                <CopyButton text={dynamicCode} codeKey='sandbox' />
                {dynamicCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default FileUploaderDetailsPage;
