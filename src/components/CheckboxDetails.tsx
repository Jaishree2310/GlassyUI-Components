import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

// Custom Checkbox component
const Checkbox = ({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) => (
  <label className='inline-flex items-center'>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className='form-checkbox h-5 w-5 text-blue-600 rounded'
    />
    <span className='ml-2 text-white'>{label}</span>
  </label>
);

const CheckboxDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
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
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-white' />
      ) : (
        <Copy size={16} className='text-white' />
      )}
    </button>
  );

  const basicUsageCode = `function ExampleCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox 
      checked={isChecked} 
      onChange={() => setIsChecked(!isChecked)} 
      label="Accept Terms" 
    />
  );
}`;

  const customizableCheckboxCode = `<Checkbox 
  checked={isChecked} 
  onChange={() => setIsChecked(!isChecked)} 
  label="Custom Styled Checkbox" 
  className={getGlassyClasses()} 
/>`;

  const propsTable = (
    <table className='w-full'>
      <thead>
        <tr className='bg-white bg-opacity-20'>
          <th className='text-left p-2 text-white'>Prop</th>
          <th className='text-left p-2 text-white'>Type</th>
          <th className='text-left p-2 text-white'>Default</th>
          <th className='text-left p-2 text-white'>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className='p-2 text-white'>checked</td>
          <td className='p-2 text-white'>boolean</td>
          <td className='p-2 text-white'>false</td>
          <td className='p-2 text-white'>
            Determines if the checkbox is checked
          </td>
        </tr>
        <tr className='bg-white bg-opacity-10'>
          <td className='p-2 text-white'>onChange</td>
          <td className='p-2 text-white'>function</td>
          <td className='p-2 text-white'>-</td>
          <td className='p-2 text-white'>
            Callback when checkbox state changes
          </td>
        </tr>
        <tr>
          <td className='p-2 text-white'>label</td>
          <td className='p-2 text-white'>string</td>
          <td className='p-2 text-white'>""</td>
          <td className='p-2 text-white'>Text label next to the checkbox</td>
        </tr>
      </tbody>
    </table>
  );

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>Checkbox</h1>
        <p className='text-xl mb-8 text-white'>
          A customizable, glassmorphism-styled checkbox component.
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>{propsTable}</div>
        </div>

        {/* Customizable Checkbox */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Customizable Checkbox
          </h2>
          <p className='mb-6 text-lg text-white'>
            A customizable checkbox that allows you to adjust its background,
            border, and text colors.
          </p>
          <div className='relative mt-8'>
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              label='Custom Styled Checkbox'
            />
            <pre className='bg-gray-800 text-white p-6 rounded-lg mt-4 overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {customizableCheckboxCode}
            </pre>
            <CopyButton
              text={customizableCheckboxCode}
              codeKey='customizableCheckbox'
            />
          </div>
        </div>

        {/* Disabled Checkbox */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Disabled Checkbox
          </h2>
          <p className='mb-6 text-lg text-white'>
            A checkbox that is disabled and cannot be clicked.
          </p>
          <Checkbox
            checked={false}
            onChange={() => {}}
            label='Disabled Checkbox'
          />
        </div>
      </div>
    </div>
  );
};

export default CheckboxDetailsPage;
