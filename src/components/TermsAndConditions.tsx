import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

// Utility function for glassy background
const getGlassyClasses = (opacity = 20) => {
  return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
};

const TermsAndConditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-8 mt-10 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-gray-100`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back
      </button>

      {/* Title */}
      <h1 className='text-6xl font-bold mb-8 text-white'>
        Terms and Conditions
      </h1>

      {/* Content Section */}
      <div className={`${getGlassyClasses(20)} p-6 mb-14 relative`}>
        <h2 className='text-3xl font-bold mb-6 text-gray-100'>Introduction</h2>
        <p className='text-gray-100 mb-6'>
          Welcome to our platform. By accessing our services, you agree to these
          terms and conditions. Please read them carefully before using our
          services. These terms apply to all visitors, users, and others who
          access or use the service.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>
          User Responsibilities
        </h2>
        <p className='text-gray-100 mb-6'>
          As a user, you are responsible for ensuring that your use of the
          platform complies with all applicable laws and regulations. You agree
          not to use the service for any illegal or unauthorized purpose. You
          must not interfere with or disrupt the security, integrity, or
          performance of the service.
        </p>
        <p className='text-gray-100 mb-6'>
          You are also responsible for maintaining the confidentiality of your
          account and password and for restricting access to your computer and
          account. You agree to accept responsibility for all activities that
          occur under your account.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>
          Intellectual Property
        </h2>
        <p className='text-gray-100 mb-6'>
          The content, features, and functionality of the service, including but
          not limited to text, graphics, logos, and software, are owned by us or
          our licensors and are protected by copyright, trademark, and other
          intellectual property laws. You may not use, reproduce, or distribute
          any of this content without our express written permission.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>
          Limitation of Liability
        </h2>
        <p className='text-gray-100 mb-6'>
          Our platform is not liable for any damages that may occur as a result
          of using our services. You agree to use our platform at your own risk.
          In no event shall we, our affiliates, or our licensors be liable for
          any indirect, incidental, special, consequential, or punitive damages,
          including without limitation, loss of profits, data, or other
          intangible losses, arising out of your access to or use of, or
          inability to access or use, the service.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>
          Privacy Policy
        </h2>
        <p className='text-gray-100 mb-6'>
          Your privacy is important to us. We encourage you to read our Privacy
          Policy, which outlines how we collect, use, and disclose your personal
          information. By using our services, you consent to the collection and
          use of your personal information as described in the Privacy Policy.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>Termination</h2>
        <p className='text-gray-100 mb-6'>
          We reserve the right to terminate or suspend your account and access
          to the service immediately, without prior notice or liability, if you
          breach the terms. Upon termination, your right to use the service will
          cease immediately. All provisions of the terms that by their nature
          should survive termination shall survive, including without
          limitation, ownership provisions, warranty disclaimers, indemnity, and
          limitations of liability.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>
          Changes to Terms
        </h2>
        <p className='text-gray-100 mb-6'>
          We reserve the right to modify these terms at any time. We will notify
          you of any changes by posting the new terms on this page. You are
          advised to review these terms periodically for any changes. Changes to
          these terms are effective when they are posted on this page.
        </p>

        <h2 className='text-3xl font-bold mb-6 text-gray-100'>Contact Us</h2>
        <p className='text-gray-100'>
          If you have any questions about these terms, please contact us at
          support@example.com.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
