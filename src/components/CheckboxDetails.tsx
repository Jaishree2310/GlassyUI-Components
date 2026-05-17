import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';
import { Checkbox, CheckboxGroup, GroupedCheckbox } from './Checkbox';

const CheckboxDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // States for examples
  const [basicChecked, setBasicChecked] = useState(false);
  const [groupValues, setGroupValues] = useState<string[]>([
    'react',
    'typescript',
  ]);
  const [allChecked, setAllChecked] = useState(false);
  const [subItems, setSubItems] = useState([true, false]);

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

  const basicUsageCode = `import { Checkbox } from './Checkbox';

function BasicExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox 
      checked={checked} 
      onChange={(e) => setChecked(e.target.checked)} 
      label="Accept Terms & Conditions" 
    />
  );
}`;

  const sizesAndColorsCode = `<div className="flex gap-4">
  <Checkbox size="sm" color="success" label="Small Success" defaultChecked />
  <Checkbox size="md" color="warning" label="Medium Warning" defaultChecked />
  <Checkbox size="lg" color="danger" label="Large Danger" defaultChecked />
</div>`;

  const groupCode = `import { CheckboxGroup, GroupedCheckbox } from './Checkbox';

function GroupExample() {
  const [values, setValues] = useState(['react']);

  return (
    <CheckboxGroup value={values} onChange={setValues} color="info">
      <GroupedCheckbox value="react" label="React" />
      <GroupedCheckbox value="vue" label="Vue" />
      <GroupedCheckbox value="angular" label="Angular" />
    </CheckboxGroup>
  );
}`;

  const indeterminateCode = `function IndeterminateExample() {
  const [subItems, setSubItems] = useState([true, false]);
  const allChecked = subItems.every(Boolean);
  const isIndeterminate = subItems.some(Boolean) && !allChecked;

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        checked={allChecked}
        indeterminate={isIndeterminate}
        onChange={(e) => setSubItems([e.target.checked, e.target.checked])}
        label="Parent Item"
      />
      <div className="ml-6 flex flex-col gap-2">
        <Checkbox
          checked={subItems[0]}
          onChange={(e) => setSubItems([e.target.checked, subItems[1]])}
          label="Child Item 1"
        />
        <Checkbox
          checked={subItems[1]}
          onChange={(e) => setSubItems([subItems[0], e.target.checked])}
          label="Child Item 2"
        />
      </div>
    </div>
  );
}`;

  // Calculate indeterminate state for the example
  const isIndeterminate = subItems.some(Boolean) && !subItems.every(Boolean);

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setSubItems([checked, checked]);
  };

  const handleChildChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSubItems = [...subItems];
      newSubItems[index] = e.target.checked;
      setSubItems(newSubItems);
      setAllChecked(newSubItems.every(Boolean));
    };

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
        <p className='text-xl mb-8 text-white opacity-80'>
          An advanced, customizable, glassmorphism-styled checkbox system
          supporting groups, sizes, colors, and indeterminate states.
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='mb-8 p-6 bg-black/20 rounded-lg flex justify-center items-center'>
            <Checkbox
              checked={basicChecked}
              onChange={e => setBasicChecked(e.target.checked)}
              label='Accept Terms & Conditions'
              helperText='You must agree to continue.'
            />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800/80 backdrop-blur-md text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-white/10'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
        </div>

        {/* Sizes and Colors */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Sizes & Colors</h2>
          <p className='mb-6 text-lg text-white opacity-80'>
            Checkboxes come in three sizes (sm, md, lg) and multiple color
            variants.
          </p>
          <div className='mb-8 p-6 bg-black/20 rounded-lg flex flex-wrap gap-8 items-center justify-center'>
            <Checkbox
              size='sm'
              color='success'
              label='Small Success'
              defaultChecked
            />
            <Checkbox
              size='md'
              color='warning'
              label='Medium Warning'
              defaultChecked
            />
            <Checkbox
              size='lg'
              color='danger'
              label='Large Danger'
              defaultChecked
            />
            <Checkbox size='md' color='info' label='Info Error' error />
          </div>
          <div className='relative mt-8'>
            <pre className='bg-gray-800/80 backdrop-blur-md text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-white/10'>
              {sizesAndColorsCode}
            </pre>
            <CopyButton text={sizesAndColorsCode} codeKey='sizesAndColors' />
          </div>
        </div>

        {/* Grouped Checkboxes */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Checkbox Groups
          </h2>
          <p className='mb-6 text-lg text-white opacity-80'>
            Use{' '}
            <code className='bg-black/30 px-2 py-1 rounded'>CheckboxGroup</code>{' '}
            and{' '}
            <code className='bg-black/30 px-2 py-1 rounded'>
              GroupedCheckbox
            </code>{' '}
            to easily manage an array of selected values.
          </p>
          <div className='mb-8 p-6 bg-black/20 rounded-lg'>
            <div className='mb-4 text-sm opacity-70'>
              Selected: {groupValues.join(', ') || 'None'}
            </div>
            <CheckboxGroup
              value={groupValues}
              onChange={setGroupValues}
              color='info'
            >
              <GroupedCheckbox value='react' label='React' />
              <GroupedCheckbox value='vue' label='Vue' />
              <GroupedCheckbox
                value='angular'
                label='Angular'
                disabled
                helperText='Currently unavailable'
              />
            </CheckboxGroup>
          </div>
          <div className='relative mt-8'>
            <pre className='bg-gray-800/80 backdrop-blur-md text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-white/10'>
              {groupCode}
            </pre>
            <CopyButton text={groupCode} codeKey='groupCode' />
          </div>
        </div>

        {/* Indeterminate State */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Indeterminate State
          </h2>
          <p className='mb-6 text-lg text-white opacity-80'>
            Useful for {'"select all"'} behaviors where only some children are
            checked.
          </p>
          <div className='mb-8 p-6 bg-black/20 rounded-lg flex flex-col gap-2 max-w-sm mx-auto'>
            <Checkbox
              checked={allChecked}
              indeterminate={isIndeterminate}
              onChange={handleParentChange}
              label={<span className='font-bold'>Select All Permissions</span>}
              color='primary'
            />
            <div className='ml-8 mt-2 flex flex-col gap-3'>
              <Checkbox
                checked={subItems[0]}
                onChange={handleChildChange(0)}
                label='Read Access'
                color='primary'
                size='sm'
              />
              <Checkbox
                checked={subItems[1]}
                onChange={handleChildChange(1)}
                label='Write Access'
                color='primary'
                size='sm'
              />
            </div>
          </div>
          <div className='relative mt-8'>
            <pre className='bg-gray-800/80 backdrop-blur-md text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm border border-white/10'>
              {indeterminateCode}
            </pre>
            <CopyButton text={indeterminateCode} codeKey='indeterminateCode' />
          </div>
        </div>

        {/* Props */}
        <div className={`${getGlassyClasses()} p-6 mb-14 overflow-hidden`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props API</h2>
          <div className='overflow-x-auto pb-4'>
            <table className='w-full border-collapse min-w-[600px]'>
              <thead>
                <tr className='bg-white bg-opacity-10 border-b border-white/20'>
                  <th className='text-left p-4 text-white font-semibold'>
                    Prop
                  </th>
                  <th className='text-left p-4 text-white font-semibold'>
                    Type
                  </th>
                  <th className='text-left p-4 text-white font-semibold'>
                    Default
                  </th>
                  <th className='text-left p-4 text-white font-semibold'>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/10'>
                <tr>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    checked
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    boolean
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>false</td>
                  <td className='p-4 text-white/90'>
                    The controlled checked state of the checkbox
                  </td>
                </tr>
                <tr className='bg-white/5'>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    onChange
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    (e: ChangeEvent) =&gt; void
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>-</td>
                  <td className='p-4 text-white/90'>
                    Event handler fired when the state changes
                  </td>
                </tr>
                <tr>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    label
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    ReactNode
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>-</td>
                  <td className='p-4 text-white/90'>
                    The text label displayed next to the checkbox
                  </td>
                </tr>
                <tr className='bg-white/5'>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    helperText
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    ReactNode
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>-</td>
                  <td className='p-4 text-white/90'>
                    Additional explanatory text below the label
                  </td>
                </tr>
                <tr>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    indeterminate
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    boolean
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>false</td>
                  <td className='p-4 text-white/90'>
                    Visual mixed state (overrides checked visually)
                  </td>
                </tr>
                <tr className='bg-white/5'>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    size
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    {"'sm' | 'md' | 'lg'"}
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>
                    {"'md'"}
                  </td>
                  <td className='p-4 text-white/90'>
                    The size of the checkbox component
                  </td>
                </tr>
                <tr>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    color
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    {"'primary' | 'success' | 'warning' | 'danger' | 'info'"}
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>
                    {"'primary'"}
                  </td>
                  <td className='p-4 text-white/90'>
                    The color theme applied when active
                  </td>
                </tr>
                <tr className='bg-white/5'>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    error
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    boolean
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>false</td>
                  <td className='p-4 text-white/90'>
                    Highlights the component to indicate an error
                  </td>
                </tr>
                <tr>
                  <td className='p-4 text-white font-mono text-sm text-blue-300'>
                    disabled
                  </td>
                  <td className='p-4 text-white/80 font-mono text-sm'>
                    boolean
                  </td>
                  <td className='p-4 text-white/50 font-mono text-sm'>false</td>
                  <td className='p-4 text-white/90'>
                    Disables interaction and changes appearance
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxDetailsPage;
