import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

import { useState, ChangeEvent, FormEvent } from 'react';

const ContactUsDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

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

  interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
  }
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission backend logic here
    console.log(formData);
    alert('Message Sent Successfully! (Check Your Console)');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const contactInfoCode = `  Name: Glass ui
  Email: support@example.com
  Phone: +123-456-7890
  Message: This platform has completely transformed how I manage my projects. The user interface is intuitive, and the features save me countless hours each week. Highly recommended!"
`;

  const contactUICode = ` <div className=' min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10 justify-between'>
            {/* Left-side Information with glassmorphism effect */}
            <div className='lg:w-[45%] w-full h-[640px] flex justify-center items-center p-10 bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300'>
              <div className='text-center text-white space-y-6'>
                <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
                  Welcome to GlassyUI-Components!
                </h1>
                <p className='text-lg text-gray-200 leading-relaxed max-w-[80%] mx-auto'>
                  This open-source library features stunning React components
                  designed with a captivating glassmorphism effect, perfect for
                  giving your web applications a modern and sleek design.
                </p>
                <ul className='space-y-2 text-gray-300'>
                  <li>
                    <strong>Email:</strong> contact@glassyui.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +123-456-7890
                  </li>
                  <li>
                    <strong>Website:</strong> www.glassyui.com
                  </li>
                </ul>
                <div className='mt-6 text-left max-w-[80%] mx-auto'>
                  <h3 className='text-2xl font-bold text-purple-300'>
                    ✨ Features
                  </h3>
                  <ul className='list-disc list-inside text-gray-400 mt-3 space-y-1'>
                    <li>Glassmorphism-themed React components</li>
                    <li>Customizable styles with SCSS</li>
                    <li>Beginner-friendly and easy to contribute</li>
                    <li>Modular and reusable components</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className='lg:w-[45%] w-full p-10 bg-opacity-50 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-20 border-gray-200'>
              <h2 className='text-4xl font-extrabold mb-8 text-white tracking-wide text-center'>
                Contact Us
              </h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Full Name Input */}
                  <div className='w-full'>
                    <label
                      className='block text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='name'
                    >
                      FULL NAME <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='Enter your name'
                      className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div className='w-full'>
                    <label
                      className='block text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='phone'
                    >
                      PHONE NUMBER <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='phone'
                      name='phone'
                      type='tel'
                      placeholder='Enter your number'
                      className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className='w-full'>
                  {/* Email Input */}
                  <label
                    className='block text-gray-400 text-sm font-semibold mb-2'
                    htmlFor='email'
                  >
                    EMAIL <span className='text-red-500'>*</span>
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    className='block text-gray-400 text-sm font-semibold mb-2'
                    htmlFor='message'
                  >
                    MESSAGE <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    placeholder='Enter your message'
                    className='w-full p-4 rounded-lg bg-gray-800 text-white h-36 resize-none border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* reCAPTCHA & Submit Button */}
                <div className='flex flex-col space-y-6'>
                  <div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='recaptcha'
                        className='w-5 h-5 accent-blue-600'
                      />
                      <label htmlFor='recaptcha' className='text-sm text-gray-400'>
                        I&apos;m not a robot
                      </label>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
                  >
                    Send Your Message
                  </button>
                </div>
              </form>
            </div>
          </div>`;

  const contactLogicCode = `  interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
  }
    
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Message Sent Successfully!');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };
`;

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Home
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>Contact Us</h1>
        <p className='text-xl mb-8 text-white'>
          Get in touch with us through the following channels, or leave us a
          message using the contact form.
        </p>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Contact Information
          </h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap  max-sm:text-[0.55rem]'>
              {contactInfoCode}
            </pre>
            <CopyButton text={contactInfoCode} codeKey='contactInfo' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Contact Form Logic Part
          </h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap  max-sm:text-[0.55rem]'>
              {contactLogicCode}
            </pre>
            <CopyButton text={contactLogicCode} codeKey='contactLogic' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Contact Form UI Part
          </h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap  max-sm:text-[0.55rem]'>
              {contactUICode}
            </pre>
            <CopyButton text={contactUICode} codeKey='contactUI' />
          </div>
        </div>

        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Contact Form Example
          </h2>
          <div className=' min-h-screen flex flex-col lg:flex-row items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-10 justify-between'>
            {/* Left-side Information with glassmorphism effect */}
            <div className='lg:w-[45%] w-full h-[640px] flex justify-center items-center p-10 bg-opacity-40 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-30 border-gray-300'>
              <div className='text-center text-white space-y-6'>
                <h1 className='text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
                  Welcome to GlassyUI-Components!
                </h1>
                <p className='text-lg text-gray-200 leading-relaxed max-w-[80%] mx-auto'>
                  This open-source library features stunning React components
                  designed with a captivating glassmorphism effect, perfect for
                  giving your web applications a modern and sleek design.
                </p>
                <ul className='space-y-2 text-gray-300'>
                  <li>
                    <strong>Email:</strong> contact@glassyui.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +123-456-7890
                  </li>
                  <li>
                    <strong>Website:</strong> www.glassyui.com
                  </li>
                </ul>
                <div className='mt-6 text-left max-w-[80%] mx-auto'>
                  <h3 className='text-2xl font-bold text-purple-300'>
                    ✨ Features
                  </h3>
                  <ul className='list-disc list-inside text-gray-400 mt-3 space-y-1'>
                    <li>Glassmorphism-themed React components</li>
                    <li>Customizable styles with SCSS</li>
                    <li>Beginner-friendly and easy to contribute</li>
                    <li>Modular and reusable components</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className='lg:w-[45%] w-full p-10 bg-opacity-50 bg-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl border border-opacity-20 border-gray-200'>
              <h2 className='text-4xl font-extrabold mb-8 text-white tracking-wide text-center'>
                Contact Us
              </h2>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='flex flex-col lg:flex-row gap-6'>
                  {/* Full Name Input */}
                  <div className='w-full'>
                    <label
                      className='block text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='name'
                    >
                      FULL NAME <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      placeholder='Enter your name'
                      className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div className='w-full'>
                    <label
                      className='block text-gray-400 text-sm font-semibold mb-2'
                      htmlFor='phone'
                    >
                      PHONE NUMBER <span className='text-red-500'>*</span>
                    </label>
                    <input
                      id='phone'
                      name='phone'
                      type='tel'
                      placeholder='Enter your number'
                      className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className='w-full'>
                  {/* Email Input */}
                  <label
                    className='block text-gray-400 text-sm font-semibold mb-2'
                    htmlFor='email'
                  >
                    EMAIL <span className='text-red-500'>*</span>
                  </label>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    className='w-full p-4 rounded-lg bg-gray-800 text-white border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    className='block text-gray-400 text-sm font-semibold mb-2'
                    htmlFor='message'
                  >
                    MESSAGE <span className='text-red-500'>*</span>
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    placeholder='Enter your message'
                    className='w-full p-4 rounded-lg bg-gray-800 text-white h-36 resize-none border-none transition-all duration-300 ease-in-out transform hover:bg-gray-700 focus:bg-gray-700'
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                {/* reCAPTCHA & Submit Button */}
                <div className='flex flex-col space-y-6'>
                  <div>
                    <div className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        id='recaptcha'
                        className='w-5 h-5 accent-blue-600'
                      />
                      <label
                        htmlFor='recaptcha'
                        className='text-sm text-gray-400'
                      >
                        I&apos;m not a robot
                      </label>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none'
                  >
                    Send Your Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Props */}
        <section
          className={`${getGlassyClasses()} p-6 mb-14 text-white relative z-10`}
        >
          <h2 className='text-3xl font-bold mb-4 text-gray-100'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-gray-100'>Prop</th>
                  <th className='text-left p-2 text-gray-100'>Type</th>
                  <th className='text-left p-2 text-gray-100'>Default</th>
                  <th className='text-left p-2 text-gray-100'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-gray-200'>name</td>
                  <td className='p-2 text-gray-200'>string</td>
                  <td className='p-2 text-gray-200'>''</td>
                  <td className='p-2 text-gray-200'>
                    The full name of the user.
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-200'>phone</td>
                  <td className='p-2 text-gray-200'>string</td>
                  <td className='p-2 text-gray-200'>''</td>
                  <td className='p-2 text-gray-200'>
                    The user's contact number.
                  </td>
                </tr>
                <tr>
                  <td className='p-2 text-gray-200'>email</td>
                  <td className='p-2 text-gray-200'>string</td>
                  <td className='p-2 text-gray-200'>''</td>
                  <td className='p-2 text-gray-200'>
                    The email address of the user.
                  </td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-gray-200'>message</td>
                  <td className='p-2 text-gray-200'>string</td>
                  <td className='p-2 text-gray-200'>''</td>
                  <td className='p-2 text-gray-200'>
                    The message content that the user wishes to send.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsDetailsPage;

//   return (
//     <>

//     </>
//   );
// };

// export default ContactUs;
