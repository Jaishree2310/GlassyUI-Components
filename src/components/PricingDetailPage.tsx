import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const PricingDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

    const getGlassyClasses = () => {
        return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
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
            {copiedStates[codeKey] ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-white" />}
        </button>
    );


    const ExampleBasicPlane = () => (
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden max-w-[500px]">
            <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                    Basic
                </span>
            </div>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Starter Pack</h3>
                <p className="mt-4 text-purple-200">Perfect for individuals and small teams.</p>
            </div>
            <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$49</span>
                <span className="text-xl font-medium text-purple-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-purple-200">
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10 user accounts</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>100 transactions per month</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic reporting</span>
                </li>
            </ul>
            <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Get Started
            </a>
        </div>
    )


    const ExampleStandardPlan = () => (
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden max-w-[500px]">
            <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Standard
                </span>
            </div>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Standard Plan</h3>
                <p className="mt-4 text-blue-200">Ideal for growing teams and small businesses.</p>
            </div>
            <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$99</span>
                <span className="text-xl font-medium text-blue-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-blue-200">
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>50 user accounts</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>500 transactions per month</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced reporting & analytics</span>
                </li>
            </ul>
            <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                Choose Standard
            </a>
        </div>
    )

    const ExamplePremiumPlan = () => (
        <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden max-w-[500px]">
            <div className="absolute top-0 right-0 m-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Premium
                </span>
            </div>
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white">Premium Plan</h3>
                <p className="mt-4 text-yellow-200">Best for large teams and businesses with advanced needs.</p>
            </div>
            <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$199</span>
                <span className="text-xl font-medium text-yellow-200">/mo</span>
            </div>
            <ul className="mb-8 space-y-4 text-yellow-200">
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited user accounts</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited transactions per month</span>
                </li>
                <li className="flex items-center">
                    <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Premium support & advanced analytics</span>
                </li>
            </ul>
            <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                Choose Premium
            </a>
        </div>
    )



    const basicUsageCode = ` <!-- Basic Plan -->
     const getGlassyClasses = () => {
        return 'backdrop-filter backdrop-blur-xl bg-white/20 border border-white/20 rounded-xl shadow-lg transition-all duration-300 max-sm:px-0';
    };

       <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 m-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            Basic
                        </span>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-white">Starter Pack</h3>
                        <p className="mt-4 text-purple-200">Perfect for individuals and small teams.</p>
                    </div>
                    <div className="mb-8">
                        <span className="text-5xl font-extrabold text-white">$49</span>
                        <span className="text-xl font-medium text-purple-200">/mo</span>
                    </div>
                    <ul className="mb-8 space-y-4 text-purple-200">
                        <li className="flex items-center">
                            <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>10 user accounts</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>100 transactions per month</span>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-6 w-6 text-green-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Basic reporting</span>
                        </li>
                    </ul>
                    <a href="#" className="block w-full py-3 px-6 text-center rounded-md text-white font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                        Get Started
                    </a>
                </div>`;

    return (
        <div className="min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative">
            <BackToTopButton />
            <div className="relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className={`mb-8 flex items-center ${getGlassyClasses()} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-300`}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Components
                </button>

                <h1 className="text-6xl font-bold mb-8 text-white">Section</h1>
                <p className="text-xl mb-8 text-white">A customizable section for displaying content.</p>

                <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
                    <h2 className="text-3xl font-bold mb-6 text-white">Basic Plan</h2>
                    <div className="relative">
                        <pre className="bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]">
                            {basicUsageCode}
                        </pre>
                        <CopyButton text={basicUsageCode} codeKey="basicUsage" />
                    </div>
                </div>


                {/* Add more sections similar to your ButtonDetailsPage here */}
                <div className={`${getGlassyClasses()} p-8 mb-8`}>
                    <h2 className="text-3xl font-bold mb-6 text-white">Props</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-400">
                                    <th className="text-left p-2 text-gray-200">Prop</th>
                                    <th className="text-left p-2 text-gray-200">Type</th>
                                    <th className="text-left p-2 text-gray-200">Default</th>
                                    <th className="text-left p-2 text-gray-200">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">title</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"Basic Plan"</td>
                                    <td className="p-2 text-gray-300">The title of the pricing plan</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">price</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"$10/month"</td>
                                    <td className="p-2 text-gray-300">The price of the plan</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">features</td>
                                    <td className="p-2 text-gray-300">array of strings</td>
                                    <td className="p-2 text-gray-300">["10 user accounts", "Basic support", "5 GB storage"]</td>
                                    <td className="p-2 text-gray-300">A list of features for the plan</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">buttonText</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"Get Started"</td>
                                    <td className="p-2 text-gray-300">The text for the action button</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">backgroundColor</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"bg-gray-800"</td>
                                    <td className="p-2 text-gray-300">The background color of the pricing card</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">textColor</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"text-white"</td>
                                    <td className="p-2 text-gray-300">The text color for the title and main elements</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">buttonColor</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"bg-purple-600"</td>
                                    <td className="p-2 text-gray-300">The background color of the button</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-2 text-gray-300">buttonTextColor</td>
                                    <td className="p-2 text-gray-300">string</td>
                                    <td className="p-2 text-gray-300">"text-white"</td>
                                    <td className="p-2 text-gray-300">The text color of the button</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


                <div className={`${getGlassyClasses()} p-8 mb-8 relative`}>
                    <h2 className="text-3xl font-bold mb-6 text-white">Example Plans</h2>
                    <div className="relative flex justify-between">
                        <ExampleBasicPlane />
                        <ExampleStandardPlan />
                        <ExamplePremiumPlan />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingDetailPage;
