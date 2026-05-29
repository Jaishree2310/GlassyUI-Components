import React, { ReactNode, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';
import ReactDOMServer from 'react-dom/server';
import ColorPicker from './ColorPicker';

const PricingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  type BillingCycle = 'monthly' | 'yearly';
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

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
        <Check size={16} className='text-green-600' />
      ) : (
        <Copy size={16} className='text-white' />
      )}
    </button>
  );

  const [customComponentData, setcustomComponentData] = useState({
    titleColor: '#ffffff',
    fullBodyTextColor: '#e9d5ff',
    tagColor: '#f3e8ff',
    tagTextColor: '#6b21a8',
    buttonBackgroundColor: '#9333ea',
    buttonBackgroundSecondColor: '#4f46e5',
  });

  const pricingPlans = useMemo(
    () => [
      {
        name: 'Starter',
        description: 'Launch fast with core product essentials.',
        monthly: 12,
        yearly: 120,
        badge: 'Starter',
        accent: 'from-cyan-400 via-blue-500 to-indigo-500',
        glow: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.55)]',
        featured: false,
        features: ['Unlimited drafts', 'Email support', '5 team members'],
      },
      {
        name: 'Pro',
        description: 'For growing teams that need more control.',
        monthly: 29,
        yearly: 290,
        badge: 'Most popular',
        accent: 'from-fuchsia-400 via-purple-500 to-indigo-500',
        glow: 'hover:shadow-[0_0_28px_rgba(217,70,239,0.6)]',
        featured: true,
        features: ['Advanced analytics', 'Priority support', '25 team members'],
      },
      {
        name: 'Scale',
        description: 'Enterprise-ready coverage with premium add-ons.',
        monthly: 59,
        yearly: 590,
        badge: 'Best value',
        accent: 'from-amber-400 via-orange-500 to-rose-500',
        glow: 'hover:shadow-[0_0_28px_rgba(251,146,60,0.6)]',
        featured: false,
        features: ['Custom workflows', 'Dedicated success', 'Unlimited seats'],
      },
    ],
    [],
  );

  const pricingToggleCode = `const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

const plans = [
  { name: 'Starter', monthly: 12, yearly: 120, features: ['Unlimited drafts', 'Email support'] },
  { name: 'Pro', monthly: 29, yearly: 290, features: ['Advanced analytics', 'Priority support'] },
  { name: 'Scale', monthly: 59, yearly: 590, features: ['Custom workflows', 'Dedicated success'] },
];

<div className="flex items-center gap-3">
  <span className={billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}>Monthly</span>
  <button
    role="switch"
    aria-checked={billingCycle === 'yearly'}
    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
    className="relative h-7 w-14 rounded-full bg-white/10 border border-white/20"
  >
    <span
      className={\`absolute top-1 left-1 h-5 w-5 rounded-full bg-white/80 transition-transform \${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}\`}
    />
  </button>
  <span className={billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}>Yearly</span>
</div>

{plans.map(plan => (
  <div key={plan.name}>
    <span>{plan.name}</span>
    <span>\${billingCycle === 'yearly' ? plan.yearly : plan.monthly}</span>
  </div>
))}`;

  interface PricingDetailsProps {
    title?: string;
    tag?: string;
    tagColor?: string;
    tagTextColor?: string;
    desciption?: string;
    price?: string;
    features?: Array<string>;
    buttonText?: string;
    buttonLink?: string;
    buttonBackgroundColor?: string;
    buttonBackgroundSecondColor?: string;
    titleColor?: string;
    fullBodyTextColor?: string;
  }
  const PricingPage: React.FC<PricingDetailsProps> = ({
    title = 'Basic Plan',
    tag = 'Basic',
    tagColor = '#f3e8ff',
    tagTextColor = '#6b21a8',
    desciption = 'Perfect for individuals and small teams.',
    price = '$10',
    features = ['10 user accounts', 'Basic support', '5 GB storage'],
    buttonText = 'Get Started',
    buttonLink = '#',
    buttonBackgroundColor = '#9333ea',
    buttonBackgroundSecondColor = '#4f46e5',
    titleColor = '#fff',
    fullBodyTextColor = '#e9d5ff',
  }) => {
    return (
      <div className='bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden max-w-[500px]'>
        <div className='absolute top-0 right-0 m-4'>
          <span
            style={{
              backgroundColor: tagColor,
              color: tagTextColor,
            }}
            className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium'
          >
            {tag}
          </span>
        </div>
        <div className='mb-8'>
          <h3
            style={{ color: titleColor }}
            className='text-2xl font-semibold text-white'
          >
            {title}
          </h3>
          <p style={{ color: fullBodyTextColor }} className='mt-4 '>
            {desciption}
          </p>
        </div>
        <div className='mb-8'>
          <span className='text-5xl font-extrabold text-white'>{price}</span>
          <span
            style={{ color: fullBodyTextColor }}
            className='text-xl font-medium '
          >
            /mo
          </span>
        </div>
        <ul style={{ color: fullBodyTextColor }} className='mb-8 space-y-4 '>
          {features.map(el => (
            <li
              key={Math.floor(Math.random() * 999) + el}
              className='flex items-center'
            >
              <svg
                className='h-6 w-6 text-green-400 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <span>{el}</span>
            </li>
          ))}
        </ul>
        <a
          href={buttonLink}
          style={{
            backgroundImage: `linear-gradient(90deg,${buttonBackgroundColor},${buttonBackgroundSecondColor || buttonBackgroundColor})`,
          }}
          className='block w-full py-3 px-6 text-center rounded-md text-white font-medium hover:text-white'
        >
          {buttonText}
        </a>
      </div>
    );
  };

  const basicUsageCode = `<!-- Basic Plan -->
  <PricingPage
    title='Starter Pack'
    titleColor='#fff'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='#9333ea'
    buttonBackgroundSecondColor='#4f46e5'
    fullBodyTextColor='#e9d5ff'
    tagTextColor='#6b21a8'
    tag='Basic'
    tagColor='#f3e8ff'
    buttonText='Get Started'
  />`;
  const StandardUsageCode = `<!-- Standard Plan -->
  <PricingPage
    title='Standard Plan'
    titleColor='#fff'
    desciption='Ideal for growing teams and small businesses.'
    features={[
      '50 user accounts',
      '500 transactions per month',
      'Advanced reporting & analytics',
    ]}
    price='$99'
    buttonBackgroundColor='#2563eb'
    buttonBackgroundSecondColor='#0d9488'
    fullBodyTextColor='#e9d5ff'
    tagTextColor='#6b21a8'
    tag='Standard'
    tagColor='#f3e8ff'
    buttonText='Choose Standard'
  />
  `;
  const PremiumUsageCode = `<!-- Premium Plan -->
  <PricingPage
    title='Premium Plan'
    titleColor='#fff'
    desciption='Best for large teams and businesses with advanced needs.'
    features={[
      'Unlimited user accounts',
      'Unlimited transactions per month',
      'Premium support & advanced analytics',
    ]}
    price='$199'
    buttonBackgroundColor='#ca8a04'
    buttonBackgroundSecondColor='#ea580c'
    fullBodyTextColor='#fef08a'
    tagTextColor='#6b21a8'
    tag='Premium'
    tagColor='#fef9c3'
    buttonText='Choose Premium'
  />
  `;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-300`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>Pricing Plan</h1>
        <p className='text-xl mb-8 text-white'>
          A customizable, glassmorphism styled Pricing Plan component.
        </p>

        <div
          className={`${getGlassyClasses()} p-8 mb-8 relative overflow-hidden`}
        >
          <h2 className='text-3xl font-bold mb-4 text-white'>
            Pricing Section with Toggle
          </h2>
          <p className='text-gray-200 mb-8 max-w-2xl'>
            A production-ready pricing section with a glassmorphic toggle
            switch, responsive cards, and glowing CTA hover states.
          </p>
          <div className='relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden'>
            <div className='absolute -top-20 -left-12 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl' />
            <div className='absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl' />
            <div className='relative z-10'>
              <div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <h3 className='text-2xl font-semibold text-white'>
                    Scale with confidence
                  </h3>
                  <p className='text-sm text-gray-300'>
                    Toggle annual billing to unlock two months free.
                  </p>
                </div>
                <div className='flex flex-wrap items-center gap-3'>
                  <span
                    className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}
                  >
                    Monthly
                  </span>
                  <button
                    type='button'
                    role='switch'
                    aria-checked={billingCycle === 'yearly'}
                    aria-label='Toggle yearly billing'
                    onClick={() =>
                      setBillingCycle(prev =>
                        prev === 'monthly' ? 'yearly' : 'monthly',
                      )
                    }
                    className='relative h-8 w-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20'
                  >
                    <span
                      className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white/80 shadow-lg transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`}
                    />
                  </button>
                  <span
                    className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}
                  >
                    Yearly
                  </span>
                  <span className='rounded-full bg-white/10 px-2 py-1 text-xs text-cyan-200'>
                    2 months free
                  </span>
                </div>
              </div>
              <div className='mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {pricingPlans.map(plan => (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 ${plan.featured ? 'ring-1 ring-white/40' : ''}`}
                  >
                    <span className='inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-wide text-white'>
                      {plan.badge}
                    </span>
                    <h4 className='mt-4 text-2xl font-semibold text-white'>
                      {plan.name}
                    </h4>
                    <p className='mt-2 text-sm text-gray-200'>
                      {plan.description}
                    </p>
                    <div className='mt-6 flex items-baseline gap-2'>
                      <span className='text-4xl font-bold text-white'>
                        $
                        {billingCycle === 'yearly'
                          ? plan.yearly.toLocaleString('en-US')
                          : plan.monthly.toLocaleString('en-US')}
                      </span>
                      <span className='text-sm text-gray-300'>
                        {billingCycle === 'yearly' ? '/yr' : '/mo'}
                      </span>
                    </div>
                    <p className='mt-1 text-xs text-gray-400'>
                      {billingCycle === 'yearly'
                        ? 'Billed annually'
                        : 'Billed monthly'}
                    </p>
                    <ul className='mt-6 space-y-3 text-sm text-gray-200'>
                      {plan.features.map(feature => (
                        <li
                          key={`${plan.name}-${feature}`}
                          className='flex items-center gap-2'
                        >
                          <span className='h-2 w-2 rounded-full bg-white/60' />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type='button'
                      className={`mt-8 w-full rounded-full bg-gradient-to-r ${plan.accent} px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${plan.glow}`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='relative mt-8'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {pricingToggleCode}
            </pre>
            <CopyButton text={pricingToggleCode} codeKey='pricingToggle' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicUsageCode}
            </pre>
            <CopyButton text={basicUsageCode} codeKey='basicUsage' />
          </div>
          <h2 className='text-3xl font-bold my-6 text-white'>Standard Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {StandardUsageCode}
            </pre>
            <CopyButton text={StandardUsageCode} codeKey='StandardUsage' />
          </div>
          <h2 className='text-3xl font-bold my-6 text-white'>Premium Plan</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {PremiumUsageCode}
            </pre>
            <CopyButton text={PremiumUsageCode} codeKey='PremiumUsage' />
          </div>
        </div>

        {/* Add more sections similar to your ButtonDetailsPage here */}
        <div className={`${getGlassyClasses()} p-8 mb-8 `}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-gray-200'>Prop</th>
                  <th className='text-left p-2 text-gray-200'>Type</th>
                  <th className='text-left p-2 text-gray-200'>Default</th>
                  <th className='text-left p-2 text-gray-200'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-gray-300'>title</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Basic Plan"</td>
                  <td className='p-2 text-gray-300'>
                    The title of the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>titleColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#fff"</td>
                  <td className='p-2 text-gray-300'>
                    The colour of title of the pricing plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>tag</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Basic"</td>
                  <td className='p-2 text-gray-300'>
                    The text of tag of the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>tagColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#f3e8ff"</td>
                  <td className='p-2 text-gray-300'>
                    The background color of tag on the pricing plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>tagTextColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#6b21a8"</td>
                  <td className='p-2 text-gray-300'>
                    The text color of tag on the pricing plan
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>desciption</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>
                    "Perfect for individuals and small teams."
                  </td>
                  <td className='p-2 text-gray-300'>
                    The desciption of the plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>price</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"$10"</td>
                  <td className='p-2 text-gray-300'>The price of the plan</td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>features</td>
                  <td className='p-2 text-gray-300'>array of strings</td>
                  <td className='p-2 text-gray-300'>
                    ["10 user accounts", "Basic support", "5 GB storage"]
                  </td>
                  <td className='p-2 text-gray-300'>
                    A list of features for the plan
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>buttonText</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"Get Started"</td>
                  <td className='p-2 text-gray-300'>
                    The text for the action button
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>buttonLink</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#"</td>
                  <td className='p-2 text-gray-300'>
                    The redirect link after submission of the pricing card
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>buttonBackgroundColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#9333ea"</td>
                  <td className='p-2 text-gray-300'>
                    The background color of button of the pricing card
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-300'>
                    buttonBackgroundSecondColor
                  </td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#0d9488"</td>
                  <td className='p-2 text-gray-300'>
                    {`The second background color(gradient) of button of the pricing card`}
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-300'>fullBodyTextColor</td>
                  <td className='p-2 text-gray-300'>string</td>
                  <td className='p-2 text-gray-300'>"#e9d5ff"</td>
                  <td className='p-2 text-gray-300'>
                    The text color for the title and main elements
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Custom theme</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Title Color
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={customComponentData?.titleColor || '#ffffff'}
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      titleColor: hex,
                    }))
                  }
                />

                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(
                      customComponentData?.titleColor || '#ffffff'
                    ).replace('#', '')}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        titleColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    titleColor: '#ffffff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Tag Text Color
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={customComponentData?.tagTextColor || '#ffffff'}
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagTextColor: hex,
                    }))
                  }
                />
                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(
                      customComponentData?.tagTextColor || '#ffffff'
                    ).replace('#', '')}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        tagTextColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    tagTextColor: '#6b21a8',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Tag Background Color
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={customComponentData?.tagColor || '#ffffff'}
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      tagColor: hex,
                    }))
                  }
                />
                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(customComponentData?.tagColor || '#ffffff').replace(
                      '#',
                      '',
                    )}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        tagColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    tagColor: '#f3e8ff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Text color of title and main elements
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={customComponentData?.fullBodyTextColor || '#ffffff'}
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      fullBodyTextColor: hex,
                    }))
                  }
                />
                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(
                      customComponentData?.fullBodyTextColor || '#ffffff'
                    ).replace('#', '')}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        fullBodyTextColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    fullBodyTextColor: '#e9d5ff',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                Background color of button
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={
                    customComponentData?.buttonBackgroundColor || '#ffffff'
                  }
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundColor: hex,
                    }))
                  }
                />
                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(
                      customComponentData?.buttonBackgroundColor || '#ffffff'
                    ).replace('#', '')}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        buttonBackgroundColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    buttonBackgroundColor: '#9333ea',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
            <div className={`${getGlassyClasses(10)} p-6 relative`}>
              <label className='block mb-2 font-semibold text-lg text-white'>
                2nd background color(gradient) of button
              </label>
              <div className='flex items-center'>
                <ColorPicker
                  value={
                    customComponentData?.buttonBackgroundSecondColor ||
                    '#ffffff'
                  }
                  onChange={hex =>
                    setcustomComponentData(el => ({
                      ...el,
                      buttonBackgroundSecondColor: hex,
                    }))
                  }
                />
                <div className='flex items-center border-b border-white/30 focus-within:border-white transition-colors'>
                  <span className='text-white/50 font-mono text-sm pl-1'>
                    #
                  </span>
                  <input
                    type='text'
                    value={(
                      customComponentData?.buttonBackgroundSecondColor ||
                      '#ffffff'
                    ).replace('#', '')}
                    onChange={e => {
                      const val = e.target.value
                        .replace(/[^0-9a-fA-F]/g, '')
                        .slice(0, 6);

                      setcustomComponentData(prev => ({
                        ...prev,
                        buttonBackgroundSecondColor: `#${val}`,
                      }));
                    }}
                    className='bg-transparent w-20 py-1 px-1 text-white font-mono uppercase outline-none text-sm tracking-widest'
                    placeholder='FFFFFF'
                    maxLength={6}
                    spellCheck={false}
                  />
                </div>
              </div>
              <div
                onClick={() => {
                  setcustomComponentData(el => ({
                    ...el,
                    buttonBackgroundSecondColor: '#4f46e5',
                  }));
                }}
                className='absolute top-[1rem] right-[1rem] w-[1.5rem] hight-[1.5rem] z-[111] p-1 cursor-pointer'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Layer_1'
                  data-name='Layer 1'
                  viewBox='0 0 24 24'
                  className='invert'
                >
                  <path d='m23,17.187v4.52c0,.705-.852,1.058-1.35.559l-1.491-1.491c-2.2,2.042-5.103,3.225-8.158,3.225C6.066,24,.868,19.577.029,13.712c-.117-.82.453-1.58,1.273-1.697.816-.122,1.579.453,1.697,1.272.628,4.397,4.55,7.712,9,7.712,2.254,0,4.4-.856,6.041-2.342l-1.308-1.308c-.498-.498-.145-1.35.559-1.35h4.52c.656,0,1.187.531,1.187,1.187ZM1,6.813V2.293c0-.705.852-1.058,1.35-.559l1.491,1.491C6.042,1.183,8.945,0,12,0c5.934,0,11.132,4.423,11.971,10.288.117.82-.453,1.58-1.273,1.697-.816.122-1.579-.453-1.697-1.272-.628-4.397-4.55-7.712-9-7.712-2.254,0-4.4.856-6.041,2.342l1.308,1.308c.498.498.145,1.35-.559,1.35H2.187c-.656,0-1.187-.531-1.187-1.187Z' />
                </svg>
              </div>
            </div>
          </div>

          <div className='relative flex justify-between'>
            <div>
              <h2 className='text-3xl font-bold my-6 text-white'>Output</h2>
              <PricingPage
                title='Starter Pack'
                desciption='Perfect for individuals and small teams.'
                features={[
                  '10 user accounts',
                  '100 transactions per month',
                  'Basic reporting',
                ]}
                price='$49'
                tag='Basic'
                buttonText='Get Started'
                {...customComponentData}
              />
            </div>
            <div className='w-[73%]'>
              <h2 className='text-3xl font-bold my-6 text-white'>Code</h2>
              <div className='relative'>
                <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
                  {`  <PricingPage
    title='Starter Pack'
    titleColor='${customComponentData.titleColor}'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='${customComponentData.buttonBackgroundColor}'
    buttonBackgroundSecondColor='${customComponentData.buttonBackgroundSecondColor}'
    fullBodyTextColor='${customComponentData.fullBodyTextColor}'
    tagTextColor='${customComponentData.tagTextColor}'
    tag='Basic'
    tagColor='${customComponentData.tagColor}'
    buttonText='Get Started'
  />`}
                </pre>
                <CopyButton
                  text={`  <PricingPage
    title='Starter Pack'
    titleColor='${customComponentData.titleColor}'
    desciption='Perfect for individuals and small teams.'
    features={[
      '10 user accounts',
      '100 transactions per month',
      'Basic reporting',
    ]}
    price='$49'
    buttonBackgroundColor='${customComponentData.buttonBackgroundColor}'
    buttonBackgroundSecondColor='${customComponentData.buttonBackgroundSecondColor}'
    fullBodyTextColor='${customComponentData.fullBodyTextColor}'
    tagTextColor='${customComponentData.tagTextColor}'
    tag='Basic'
    tagColor='${customComponentData.tagColor}'
    buttonText='Get Started'
  />`}
                  codeKey='basicUsage'
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Example Plans</h2>
          <div className='relative flex justify-between'>
            <PricingPage
              title='Starter Pack'
              titleColor='#fff'
              desciption='Perfect for individuals and small teams.'
              features={[
                '10 user accounts',
                '100 transactions per month',
                'Basic reporting',
              ]}
              price='$49'
              buttonBackgroundColor='#9333ea'
              buttonBackgroundSecondColor='#4f46e5'
              fullBodyTextColor='#e9d5ff'
              tagTextColor='#6b21a8'
              tag='Basic'
              tagColor='#f3e8ff'
              buttonText='Get Started'
            />
            <PricingPage
              title='Standard Plan'
              titleColor='#fff'
              desciption='Ideal for growing teams and small businesses.'
              features={[
                '50 user accounts',
                '500 transactions per month',
                'Advanced reporting & analytics',
              ]}
              price='$99'
              buttonBackgroundColor='#2563eb'
              buttonBackgroundSecondColor='#0d9488'
              fullBodyTextColor='#e9d5ff'
              tagTextColor='#6b21a8'
              tag='Standard'
              tagColor='#f3e8ff'
              buttonText='Choose Standard'
            />
            <PricingPage
              title='Premium Plan'
              titleColor='#fff'
              desciption='Best for large teams and businesses with advanced needs.'
              features={[
                'Unlimited user accounts',
                'Unlimited transactions per month',
                'Premium support & advanced analytics',
              ]}
              price='$199'
              buttonBackgroundColor='#ca8a04'
              buttonBackgroundSecondColor='#ea580c'
              fullBodyTextColor='#fef08a'
              tagTextColor='#6b21a8'
              tag='Premium'
              tagColor='#fef9c3'
              buttonText='Choose Premium'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetailPage;
