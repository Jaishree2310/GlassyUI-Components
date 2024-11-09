import React from 'react';
import Footer from './Footer';

export const TermsOfUse: React.FC = () => {
  return (
    <>
      <div className='bg-gray-50 dark:bg-gray-900 py-20'>
        <div className='max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg glass-effect'>
          <h1 className='text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-6'>
            <h1 className='text-white text-4xl font-bold'>
              <span className='text-blue-400'>Glass</span>UI
            </h1>{' '}
            Terms of Use
          </h1>

          {/* Acceptance of Terms */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              1. Acceptance of Terms
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              By accessing or using GlassyUI-Components, you agree to abide by
              these Terms. If you disagree with any part of these terms, please
              refrain from using this library.
            </p>
          </section>

          {/* User Obligations */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              2. User Obligations
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Users must use the components responsibly, providing proper
              attribution as required. Redistribution without modification is
              prohibited.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              3. Intellectual Property Rights
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              GlassyUI-Components and its designs are the intellectual property
              of the creators and contributors.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              4. Limitation of Liability
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We are not liable for any damages arising from the use or misuse
              of GlassyUI-Components.
            </p>
          </section>

          {/* Termination */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              5. Termination
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We reserve the right to terminate access to GlassyUI-Components
              for users who violate these Terms.
            </p>
          </section>

          {/* Modification of Terms */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              6. Modification of Terms
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We reserve the right to modify these Terms at any time. Changes
              will be announced through our GitHub repository or other official
              channels.
            </p>
          </section>

          {/* Privacy Policy */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              7. Privacy Policy
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              We respect your privacy. Any data collected is handled according
              to our Privacy Policy, accessible through our main website.
            </p>
          </section>

          {/* Third-Party Links */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              8. Third-Party Links
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Our library may contain links to third-party websites or services.
              We are not responsible for the content, policies, or practices of
              these external sites.
            </p>
          </section>

          {/* User-Generated Content */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              9. User-Generated Content
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              Any contributions or modifications made to GlassyUI-Components are
              welcome but must align with our community guidelines and
              open-source policies.
            </p>
          </section>

          {/* Governing Law */}
          <section className='mb-8'>
            <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-blue-500 pb-2'>
              10. Governing Law
            </h2>
            <p className='text-gray-700 dark:text-gray-300'>
              These Terms are governed by and construed in accordance with the
              applicable intellectual property laws and open-source policies.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};
