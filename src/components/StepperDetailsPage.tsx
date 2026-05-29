import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Copy,
  Check,
  ShoppingCart,
  Truck,
  CreditCard,
  CheckCircle,
  User,
  Settings,
  Award,
  BookOpen,
} from 'lucide-react';
import BackToTopButton from './BackToTop';
import Stepper from './Stepper';

export const StepperDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  // Playground Sandbox State
  const [sandboxActiveStep, setSandboxActiveStep] = useState(1);
  const [sandboxOrientation, setSandboxOrientation] = useState<
    'horizontal' | 'vertical'
  >('horizontal');
  const [sandboxOpacity, setSandboxOpacity] = useState(0.2);
  const [sandboxBlur, setSandboxBlur] = useState<'sm' | 'md' | 'lg' | 'xl'>(
    'md',
  );
  const [sandboxCompletedColor, setSandboxCompletedColor] = useState('#10B981');
  const [sandboxActiveColor, setSandboxActiveColor] = useState('#EC4899'); // matching the pink/violet themes of GlassyUI
  const [sandboxConnectorStyle, setSandboxConnectorStyle] = useState<
    'solid' | 'dashed' | 'gradient'
  >('solid');

  // Checkout Wizard Demo State
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const getGlassyClasses = (opacity = 20) => {
    // Standard glassmorphism class structure utilized in the rest of the project (e.g., ProgressBarDetailPage)
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
    }).catch((err) => console.error("Failed to copy text: ", err));
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
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-gray-100' />
      )}
    </button>
  );

  const sandboxSteps = [
    { title: 'Step 1', description: 'Initiation' },
    { title: 'Step 2', description: 'Execution' },
    { title: 'Step 3', description: 'Verification' },
    { title: 'Step 4', description: 'Delivery' },
  ];

  const checkoutSteps = [
    {
      title: 'Cart',
      description: 'Review items',
      icon: <ShoppingCart size={18} />,
    },
    {
      title: 'Shipping',
      description: 'Delivery address',
      icon: <Truck size={18} />,
    },
    {
      title: 'Payment',
      description: 'Details & billing',
      icon: <CreditCard size={18} />,
    },
    {
      title: 'Confirm',
      description: 'Receipt details',
      icon: <CheckCircle size={18} />,
    },
  ];

  const verticalOnboardingSteps = [
    {
      title: 'Create Profile',
      description: 'Input details',
      icon: <User size={18} />,
    },
    {
      title: 'Preferences',
      description: 'Notifications',
      icon: <Settings size={18} />,
    },
    {
      title: 'Verify Identity',
      description: 'Submit authentication',
      icon: <BookOpen size={18} />,
    },
    {
      title: 'Earn Badge',
      description: 'Setup completed!',
      icon: <Award size={18} />,
    },
  ];

  const dynamicSandboxCode = `<Stepper
  steps={[
    { title: 'Step 1', description: 'Initiation' },
    { title: 'Step 2', description: 'Execution' },
    { title: 'Step 3', description: 'Verification' },
    { title: 'Step 4', description: 'Delivery' }
  ]}
  activeStep={${sandboxActiveStep}}
  orientation="${sandboxOrientation}"
  glassOpacity={${sandboxOpacity}}
  blurIntensity="${sandboxBlur}"
  completedColor="${sandboxCompletedColor}"
  activeColor="${sandboxActiveColor}"
  connectorStyle="${sandboxConnectorStyle}"
/>`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />

      {/* Back Navigation Button */}
      <button
        onClick={() => navigate('/components')}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-opacity-40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      {/* Header */}
      <div className='mb-12'>
        <h1 className='text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200'>
          Stepper Component
        </h1>
        <p className='text-xl mb-8 text-gray-100'>
          A customizable, responsive multi-step progress indicator styled with
          premium glassmorphism.
        </p>
      </div>

      {/* Section 1: Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
        <h2 className='text-2xl font-bold mb-4 text-gray-100'>Basic Usage</h2>
        <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative'>
          <CopyButton
            text={`import Stepper from './Stepper';\n\nconst steps = [\n  { title: 'Step 1', description: 'Start' },\n  { title: 'Step 2', description: 'Execute' },\n  { title: 'Step 3', description: 'Verify' },\n  { title: 'Step 4', description: 'Done' }\n];\n\n<Stepper steps={steps} activeStep={1} />`}
            codeKey='basicUsage'
          />
          {`import Stepper from './Stepper';

function App() {
  const steps = [
    { title: 'Step 1', description: 'Start' },
    { title: 'Step 2', description: 'Execute' },
    { title: 'Step 3', description: 'Verify' },
    { title: 'Step 4', description: 'Done' }
  ];

  return <Stepper steps={steps} activeStep={1} />;
}`}
        </pre>
        <div className='mt-4'>
          <h3 className='text-xl font-bold mb-2'>Preview:</h3>
          <Stepper
            steps={[
              { title: 'Step 1', description: 'Start' },
              { title: 'Step 2', description: 'Execute' },
              { title: 'Step 3', description: 'Verify' },
              { title: 'Step 4', description: 'Done' },
            ]}
            activeStep={1}
            completedColor={sandboxCompletedColor}
            activeColor={sandboxActiveColor}
          />
        </div>
      </div>

      {/* Section 2: Props Reference */}
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
                <td className='p-2'>steps</td>
                <td className='p-2 font-mono text-pink-200'>Step[]</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>
                  Array of steps with titles, descriptions, and icons.
                </td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>activeStep</td>
                <td className='p-2 font-mono text-pink-200'>number</td>
                <td className='p-2 font-mono text-red-300'>Required</td>
                <td className='p-2'>Currently active step index (0-based).</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>orientation</td>
                <td className='p-2 font-mono text-pink-200'>
                  'horizontal' | 'vertical'
                </td>
                <td className='p-2 font-mono'>'horizontal'</td>
                <td className='p-2'>Layout direction of the stepper.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>glassOpacity</td>
                <td className='p-2 font-mono text-pink-200'>number</td>
                <td className='p-2 font-mono'>0.15</td>
                <td className='p-2'>
                  Backdrop opacity multiplier (0.05 - 0.50).
                </td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>blurIntensity</td>
                <td className='p-2 font-mono text-pink-200'>
                  'sm' | 'md' | 'lg' | 'xl'
                </td>
                <td className='p-2 font-mono'>'md'</td>
                <td className='p-2'>Backdrop blur depth setting.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>completedColor</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>'#10B981'</td>
                <td className='p-2'>Theme color for completed stages.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>activeColor</td>
                <td className='p-2 font-mono text-pink-200'>string</td>
                <td className='p-2 font-mono'>'#a855f7'</td>
                <td className='p-2'>Theme color for active step.</td>
              </tr>
              <tr className='bg-white bg-opacity-5 border-b border-white/10'>
                <td className='p-2'>connectorStyle</td>
                <td className='p-2 font-mono text-pink-200'>
                  'solid' | 'dashed' | 'gradient'
                </td>
                <td className='p-2 font-mono'>'solid'</td>
                <td className='p-2'>Connection line style between steps.</td>
              </tr>
              <tr className='border-b border-white/10'>
                <td className='p-2'>onStepClick</td>
                <td className='p-2 font-mono text-pink-200'>
                  {'(index: number) => void'}
                </td>
                <td className='p-2 font-mono'>undefined</td>
                <td className='p-2'>Click handler callback for steps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Interactive Sandbox */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Custom Stepper
        </h2>
        <p className='text-xl mb-4'>
          Customize your stepper's properties and inspect changes live.
        </p>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Controls */}
          <div className='space-y-6 lg:col-span-1'>
            {/* Step selection */}
            <div>
              <label className='block mb-2 font-semibold'>
                Active Step: {sandboxActiveStep}
              </label>
              <div className='flex gap-2'>
                {[0, 1, 2, 3, 4].map(idx => (
                  <button
                    key={idx}
                    onClick={() => setSandboxActiveStep(idx)}
                    className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                      sandboxActiveStep === idx
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {idx === 4 ? 'Done' : idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div>
              <label className='block mb-2 font-semibold'>Orientation</label>
              <div className='flex gap-2'>
                {(['horizontal', 'vertical'] as const).map(dir => (
                  <button
                    key={dir}
                    onClick={() => setSandboxOrientation(dir)}
                    className={`flex-1 py-1 capitalize rounded text-xs font-bold transition-all ${
                      sandboxOrientation === dir
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
            </div>

            {/* Glass Opacity */}
            <div>
              <label className='block mb-1 font-semibold'>
                Glass Opacity: {sandboxOpacity.toFixed(2)}
              </label>
              <input
                type='range'
                min='0.05'
                max='0.50'
                step='0.05'
                value={sandboxOpacity}
                onChange={e => setSandboxOpacity(parseFloat(e.target.value))}
                className='w-full accent-white cursor-pointer'
              />
            </div>

            {/* Backdrop Blur */}
            <div>
              <label className='block mb-2 font-semibold'>Blur level</label>
              <div className='flex gap-1.5'>
                {(['sm', 'md', 'lg', 'xl'] as const).map(bl => (
                  <button
                    key={bl}
                    onClick={() => setSandboxBlur(bl)}
                    className={`flex-1 py-1 uppercase rounded text-xs font-bold transition-all ${
                      sandboxBlur === bl
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {bl}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors picker */}
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-xs font-semibold mb-1'>
                  Completed
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    type='color'
                    value={sandboxCompletedColor}
                    onChange={e => setSandboxCompletedColor(e.target.value)}
                    className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                  />
                  <span className='text-xs font-mono'>
                    {sandboxCompletedColor}
                  </span>
                </div>
              </div>
              <div>
                <label className='block text-xs font-semibold mb-1'>
                  Active
                </label>
                <div className='flex items-center gap-2'>
                  <input
                    type='color'
                    value={sandboxActiveColor}
                    onChange={e => setSandboxActiveColor(e.target.value)}
                    className='w-8 h-8 rounded border-none cursor-pointer bg-transparent'
                  />
                  <span className='text-xs font-mono'>
                    {sandboxActiveColor}
                  </span>
                </div>
              </div>
            </div>

            {/* Connector Style */}
            <div>
              <label className='block mb-2 font-semibold'>
                Connector Style
              </label>
              <div className='flex gap-1.5'>
                {(['solid', 'dashed', 'gradient'] as const).map(cs => (
                  <button
                    key={cs}
                    onClick={() => setSandboxConnectorStyle(cs)}
                    className={`flex-1 py-1 capitalize rounded text-xs font-bold transition-all ${
                      sandboxConnectorStyle === cs
                        ? 'bg-white bg-opacity-30 border border-white/30 text-white'
                        : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-gray-300'
                    }`}
                  >
                    {cs}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview & Code */}
          <div className='lg:col-span-2 space-y-6 flex flex-col justify-between'>
            <div
              className={`${getGlassyClasses(5)} p-6 rounded-xl flex-grow flex flex-col justify-center`}
            >
              <h3 className='text-sm font-semibold mb-4 text-gray-400'>
                Live Preview
              </h3>
              <div className='py-6 px-4 flex items-center justify-center min-h-[160px]'>
                <Stepper
                  steps={sandboxSteps}
                  activeStep={sandboxActiveStep}
                  orientation={sandboxOrientation}
                  glassOpacity={sandboxOpacity}
                  blurIntensity={sandboxBlur}
                  completedColor={sandboxCompletedColor}
                  activeColor={sandboxActiveColor}
                  connectorStyle={sandboxConnectorStyle}
                  onStepClick={idx => setSandboxActiveStep(idx)}
                />
              </div>
            </div>

            {/* Dynamic Code */}
            <pre className='bg-gray-800 text-white p-4 rounded-lg overflow-x-auto relative text-xs'>
              <CopyButton text={dynamicSandboxCode} codeKey='sandbox' />
              {dynamicSandboxCode}
            </pre>
          </div>
        </div>
      </div>

      {/* Section 4: Checkout Wizard Demo */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Checkout Wizard
        </h2>
        <p className='text-xl mb-4'>
          Interactive workflow showing the Stepper integration with standard
          checkout processes.
        </p>

        <div className='space-y-8'>
          <div className='p-6 bg-white bg-opacity-5 rounded-lg border border-white/10'>
            <Stepper
              steps={checkoutSteps}
              activeStep={checkoutStep}
              orientation='horizontal'
              completedColor='#10B981'
              activeColor='#db2777' // Pink hue active step
              connectorStyle='gradient'
            />
          </div>

          <div className='bg-gray-800 text-white p-8 rounded-lg min-h-[280px] flex flex-col justify-between border border-white/10'>
            <div>
              {checkoutStep === 0 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold'>Review Cart</h3>
                  <div className='bg-white bg-opacity-5 border border-white/10 rounded-lg p-4 space-y-2'>
                    <div className='flex justify-between text-sm text-gray-300'>
                      <span>1x Glassmorphic Buttons Pack</span>
                      <span className='font-semibold text-white'>$19.99</span>
                    </div>
                    <div className='flex justify-between text-sm text-gray-300'>
                      <span>1x Frosted Card Framework</span>
                      <span className='font-semibold text-white'>$49.99</span>
                    </div>
                    <div className='border-t border-white/10 pt-2 flex justify-between font-bold text-white'>
                      <span>Total Amount</span>
                      <span>$69.98</span>
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 1 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold'>Shipping Info</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-xs font-semibold mb-1 text-gray-300'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        placeholder='John Doe'
                        value={shippingName}
                        onChange={e => setShippingName(e.target.value)}
                        className='w-full bg-white bg-opacity-5 border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40'
                      />
                    </div>
                    <div>
                      <label className='block text-xs font-semibold mb-1 text-gray-300'>
                        Street Address
                      </label>
                      <input
                        type='text'
                        placeholder='123 Glassy Blvd'
                        value={shippingAddress}
                        onChange={e => setShippingAddress(e.target.value)}
                        className='w-full bg-white bg-opacity-5 border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40'
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className='space-y-4'>
                  <h3 className='text-xl font-bold'>Payment Details</h3>
                  <div className='space-y-3'>
                    <div>
                      <label className='block text-xs font-semibold mb-1 text-gray-300'>
                        Card Number
                      </label>
                      <input
                        type='text'
                        placeholder='0000 0000 0000 0000'
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className='w-full bg-white bg-opacity-5 border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40'
                      />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-xs font-semibold mb-1 text-gray-300'>
                          Expiration
                        </label>
                        <input
                          type='text'
                          placeholder='MM/YY'
                          className='w-full bg-white bg-opacity-5 border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none'
                        />
                      </div>
                      <div>
                        <label className='block text-xs font-semibold mb-1 text-gray-300'>
                          CVC
                        </label>
                        <input
                          type='text'
                          placeholder='123'
                          className='w-full bg-white bg-opacity-5 border border-white/15 rounded px-3 py-2 text-sm text-white focus:outline-none'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div className='text-center py-6 space-y-3'>
                  <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500 bg-opacity-20 text-green-400 border border-green-500/30 mb-2'>
                    <CheckCircle size={28} />
                  </div>
                  <h3 className='text-xl font-bold text-white'>
                    Order Confirmed!
                  </h3>
                  <p className='text-gray-300 max-w-md mx-auto text-sm'>
                    Thank you,{' '}
                    <strong className='text-white'>
                      {shippingName || 'valued customer'}
                    </strong>
                    ! Your order will be dispatched to{' '}
                    <strong className='text-white'>
                      {shippingAddress || 'your address'}
                    </strong>{' '}
                    shortly.
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className='flex justify-between items-center mt-8 border-t border-white/10 pt-4'>
              <button
                disabled={checkoutStep === 0}
                onClick={() => setCheckoutStep(prev => prev - 1)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  checkoutStep === 0
                    ? 'opacity-30 cursor-not-allowed text-gray-500'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-25 text-white'
                }`}
              >
                Back
              </button>

              {checkoutStep < 3 ? (
                <button
                  onClick={() => setCheckoutStep(prev => prev + 1)}
                  className='px-4 py-1.5 bg-white bg-opacity-10 hover:bg-opacity-25 border border-white/20 text-white font-semibold text-sm rounded-lg shadow-sm transition-all animate-pulse'
                >
                  {checkoutStep === 2 ? 'Place Order' : 'Next Step'}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCheckoutStep(0);
                    setShippingName('');
                    setShippingAddress('');
                    setCardNumber('');
                  }}
                  className='px-4 py-1.5 bg-green-600 bg-opacity-30 hover:bg-opacity-50 border border-green-500/30 text-white font-semibold text-sm rounded-lg shadow-sm transition-all'
                >
                  Restart Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Vertical Workflow with Custom Icons */}
      <div className={`${getGlassyClasses()} p-6 mb-14`}>
        <h2 className='text-3xl font-bold mb-4 text-gray-100'>
          Vertical Orientation
        </h2>
        <p className='text-xl mb-4'>
          A layout timeline detailing onboard settings.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-1 bg-white bg-opacity-5 p-6 rounded-lg border border-white/10 flex flex-col justify-center'>
            <Stepper
              steps={verticalOnboardingSteps}
              activeStep={2}
              orientation='vertical'
              completedColor='#10B981'
              activeColor='#a855f7'
              connectorStyle='dashed'
            />
          </div>

          <div className='md:col-span-2 bg-gray-800 p-6 rounded-lg border border-white/10 flex flex-col justify-center'>
            <h4 className='text-base font-bold text-white mb-2 uppercase'>
              Onboarding Checklist
            </h4>
            <p className='text-sm text-gray-300 mb-4 leading-relaxed'>
              In this vertical layout, the user has completed{' '}
              <strong>Create Profile</strong> and <strong>Preferences</strong>.
              The current active step is <strong>Verify Identity</strong>,
              prompting them to upload their ID.
            </p>
            <div className='space-y-2 text-sm text-gray-300 font-medium'>
              <div className='flex items-center gap-3 text-green-400'>
                <Check size={14} className='stroke-[3]' />
                <span>Profile Details Setup (Complete)</span>
              </div>
              <div className='flex items-center gap-3 text-green-400'>
                <Check size={14} className='stroke-[3]' />
                <span>Notifications & System Configured (Complete)</span>
              </div>
              <div className='flex items-center gap-3 text-purple-400 font-bold animate-pulse'>
                <span className='w-2 h-2 rounded-full bg-purple-400' />
                <span>Identity verification image upload pending...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperDetailsPage;
