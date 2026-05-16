import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

// ─── Reusable GlassCheckbox ───────────────────────────────────────────────────
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export const GlassCheckbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate = false,
  color = '#ffffff',
  size = 'medium',
}) => {
  const sizeMap = { small: 'w-4 h-4', medium: 'w-5 h-5', large: 'w-6 h-6' };
  const labelSizeMap = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
    >
      <span
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative flex items-center justify-center ${sizeMap[size]} flex-shrink-0
          backdrop-filter backdrop-blur-md
          border-2 border-white border-opacity-40
          rounded-md shadow-md
          transition-all duration-200
          ${
            checked || indeterminate
              ? 'bg-white bg-opacity-30'
              : 'bg-white bg-opacity-10 group-hover:bg-opacity-20'
          }
        `}
        style={
          checked || indeterminate
            ? {
                boxShadow: `0 0 10px 2px ${color}55, inset 0 0 6px ${color}33`,
                borderColor: color,
              }
            : {}
        }
      >
        {checked && !indeterminate && (
          <svg
            viewBox='0 0 12 10'
            className='w-3/4 h-3/4'
            fill='none'
            stroke={color}
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='1.5,5 4.5,8 10.5,1.5' />
          </svg>
        )}
        {indeterminate && (
          <span
            className='block rounded-full'
            style={{ width: '55%', height: '2.5px', background: color }}
          />
        )}
      </span>
      {label && (
        <span className={`${labelSizeMap[size]} text-white font-medium`}>
          {label}
        </span>
      )}
    </label>
  );
};

// ─── Details Page ─────────────────────────────────────────────────────────────
const CheckboxDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Preview states
  const [basicChecked, setBasicChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [groupState, setGroupState] = useState({
    React: true,
    Vue: false,
    Angular: false,
    Svelte: true,
  });
  const [customChecked, setCustomChecked] = useState(false);
  const [customColor, setCustomColor] = useState('#6366f1');
  const [customSize, setCustomSize] = useState<'small' | 'medium' | 'large'>(
    'medium',
  );

  const getGlassyClasses = (opacity = 20) =>
    `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;

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

  const basicUsageCode = `import { GlassCheckbox } from './CheckboxDetails';

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <GlassCheckbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms and conditions"
    />
  );
}`;

  const customCode = `<GlassCheckbox
  checked={checked}
  onChange={setChecked}
  label="Custom checkbox"
  color="${customColor}"
  size="${customSize}"
/>`;

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

        <h1 className='text-6xl font-bold mb-8 text-white'>
          Glassmorphic Checkbox Component
        </h1>
        <p className='text-xl mb-8 text-white'>
          A glassmorphism-styled Checkbox with support for checked,
          indeterminate, disabled states, custom colors and sizes.
        </p>

        {/* Basic Usage */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div
            className={`${getGlassyClasses(10)} p-6 mb-6 flex flex-wrap gap-8`}
          >
            <GlassCheckbox
              checked={basicChecked}
              onChange={setBasicChecked}
              label='Accept terms and conditions'
            />
            <GlassCheckbox
              checked={true}
              onChange={() => {}}
              label='Already agreed'
            />
            <GlassCheckbox
              checked={false}
              onChange={() => {}}
              label='Opt-in to newsletter'
            />
          </div>
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
          <div className='overflow-x-auto'>
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
                {[
                  [
                    'checked',
                    'boolean',
                    'false',
                    'Whether the checkbox is checked',
                  ],
                  [
                    'onChange',
                    '(checked: boolean) => void',
                    '—',
                    'Callback fired when toggled',
                  ],
                  [
                    'label',
                    'string',
                    '—',
                    'Label text shown beside the checkbox',
                  ],
                  [
                    'disabled',
                    'boolean',
                    'false',
                    'Disables interaction and dims the component',
                  ],
                  [
                    'indeterminate',
                    'boolean',
                    'false',
                    'Shows a dash instead of a checkmark',
                  ],
                  [
                    'color',
                    'string',
                    '#ffffff',
                    'Accent color for the checkmark and glow',
                  ],
                  [
                    'size',
                    "'small' | 'medium' | 'large'",
                    "'medium'",
                    'Size of the checkbox',
                  ],
                ].map(([prop, type, def, desc], i) => (
                  <tr
                    key={prop}
                    className={i % 2 === 1 ? 'bg-white bg-opacity-10' : ''}
                  >
                    <td className='p-2 text-white font-mono text-sm'>{prop}</td>
                    <td className='p-2 text-purple-300 font-mono text-sm'>
                      {type}
                    </td>
                    <td className='p-2 text-gray-400 font-mono text-sm'>
                      {def}
                    </td>
                    <td className='p-2 text-white text-sm'>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* States */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>States</h2>
          <div
            className={`${getGlassyClasses(10)} p-6 mb-6 flex flex-wrap gap-10`}
          >
            {[
              {
                label: 'Unchecked',
                node: (
                  <GlassCheckbox
                    checked={false}
                    onChange={() => {}}
                    label='Unchecked'
                  />
                ),
              },
              {
                label: 'Checked',
                node: (
                  <GlassCheckbox
                    checked={true}
                    onChange={() => {}}
                    label='Checked'
                  />
                ),
              },
              {
                label: 'Indeterminate',
                node: (
                  <GlassCheckbox
                    checked={false}
                    indeterminate={indeterminate}
                    onChange={() => setIndeterminate(v => !v)}
                    label='Indeterminate'
                  />
                ),
              },
              {
                label: 'Disabled',
                node: (
                  <GlassCheckbox
                    checked={true}
                    disabled
                    onChange={() => {}}
                    label='Disabled'
                  />
                ),
              },
            ].map(({ label, node }) => (
              <div key={label} className='flex flex-col gap-2 items-start'>
                <span className='text-xs text-white text-opacity-50 uppercase tracking-widest'>
                  {label}
                </span>
                {node}
              </div>
            ))}
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {`<GlassCheckbox checked={false} onChange={setChecked} label="Unchecked" />
<GlassCheckbox checked={true}  onChange={setChecked} label="Checked" />
<GlassCheckbox checked={false} indeterminate onChange={setChecked} label="Indeterminate" />
<GlassCheckbox checked={true}  disabled onChange={setChecked} label="Disabled" />`}
            </pre>
            <CopyButton
              text={`<GlassCheckbox checked={false} onChange={setChecked} label="Unchecked" />\n<GlassCheckbox checked={true} onChange={setChecked} label="Checked" />\n<GlassCheckbox checked={false} indeterminate onChange={setChecked} label="Indeterminate" />\n<GlassCheckbox checked={true} disabled onChange={setChecked} label="Disabled" />`}
              codeKey='states'
            />
          </div>
        </div>

        {/* Sizes */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Sizes</h2>
          <div
            className={`${getGlassyClasses(10)} p-6 mb-6 flex flex-wrap items-center gap-10`}
          >
            <GlassCheckbox
              checked={true}
              onChange={() => {}}
              label='Small'
              size='small'
            />
            <GlassCheckbox
              checked={true}
              onChange={() => {}}
              label='Medium'
              size='medium'
            />
            <GlassCheckbox
              checked={true}
              onChange={() => {}}
              label='Large'
              size='large'
            />
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {`<GlassCheckbox checked={true} onChange={setChecked} label="Small"  size="small" />
<GlassCheckbox checked={true} onChange={setChecked} label="Medium" size="medium" />
<GlassCheckbox checked={true} onChange={setChecked} label="Large"  size="large" />`}
            </pre>
            <CopyButton
              text={`<GlassCheckbox checked={true} onChange={setChecked} label="Small" size="small" />\n<GlassCheckbox checked={true} onChange={setChecked} label="Medium" size="medium" />\n<GlassCheckbox checked={true} onChange={setChecked} label="Large" size="large" />`}
              codeKey='sizes'
            />
          </div>
        </div>

        {/* Group */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Checkbox Group</h2>
          <p className='mb-4 text-lg text-white'>Select your frameworks:</p>
          <div className={`${getGlassyClasses(10)} p-6 mb-6`}>
            <div className='flex flex-wrap gap-6 mb-4'>
              {(Object.keys(groupState) as Array<keyof typeof groupState>).map(
                key => (
                  <GlassCheckbox
                    key={key}
                    checked={groupState[key]}
                    onChange={() =>
                      setGroupState(prev => ({ ...prev, [key]: !prev[key] }))
                    }
                    label={key}
                    color='#818cf8'
                  />
                ),
              )}
            </div>
            <p className='text-sm text-white text-opacity-50'>
              Selected:{' '}
              {Object.entries(groupState)
                .filter(([, v]) => v)
                .map(([k]) => k)
                .join(', ') || 'none'}
            </p>
          </div>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {`const [selected, setSelected] = useState({
  React: true, Vue: false, Angular: false, Svelte: true
});

{Object.keys(selected).map(key => (
  <GlassCheckbox
    key={key}
    checked={selected[key]}
    onChange={() => setSelected(prev => ({ ...prev, [key]: !prev[key] }))}
    label={key}
    color="#818cf8"
  />
))}`}
            </pre>
            <CopyButton
              text={`const [selected, setSelected] = useState({ React: true, Vue: false });\n\n{Object.keys(selected).map(key => (\n  <GlassCheckbox key={key} checked={selected[key]} onChange={() => setSelected(prev => ({ ...prev, [key]: !prev[key] }))} label={key} color="#818cf8" />\n))}`}
              codeKey='group'
            />
          </div>
        </div>

        {/* Custom Styling */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Custom Styling</h2>
          <p className='mb-6 text-lg text-white'>
            Customize the accent color and size of the checkbox live.
          </p>
          <div className={`${getGlassyClasses(10)} p-8 rounded-xl`}>
            <div className='mb-8'>
              <GlassCheckbox
                checked={customChecked}
                onChange={setCustomChecked}
                label='Custom styled checkbox'
                color={customColor}
                size={customSize}
              />
            </div>
            <div className='flex flex-wrap gap-8'>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-white'>
                  Accent Color
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    type='color'
                    value={customColor}
                    onChange={e => setCustomColor(e.target.value)}
                    className='w-8 h-8 cursor-pointer border-none bg-transparent rounded'
                  />
                  <span className='text-sm font-mono font-semibold'>
                    {customColor}
                  </span>
                </div>
              </div>
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-white'>
                  Size
                </label>
                <div className='flex gap-2'>
                  {(['small', 'medium', 'large'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setCustomSize(s)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        customSize === s
                          ? 'bg-white bg-opacity-30 text-white'
                          : 'bg-white bg-opacity-10 text-white text-opacity-60 hover:bg-opacity-20'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className='mt-8'>
              <h4 className='text-xl font-semibold mb-4'>Generated Code</h4>
              <div className='relative'>
                <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                  {customCode}
                </pre>
                <CopyButton text={customCode} codeKey='customStyling' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxDetailsPage;
