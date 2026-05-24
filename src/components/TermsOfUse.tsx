import React from 'react';

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing or using GlassyUI-Components, you agree to abide by these Terms. If you disagree with any part of these terms, please refrain from using this library.',
  },
  {
    title: 'User Obligations',
    content:
      'Users must use the components responsibly, providing proper attribution as required. Redistribution without modification is prohibited.',
  },
  {
    title: 'Intellectual Property Rights',
    content:
      'GlassyUI-Components and its designs are the intellectual property of the creators and contributors.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'We are not liable for any damages arising from the use or misuse of GlassyUI-Components.',
  },
  {
    title: 'Termination',
    content:
      'We reserve the right to terminate access to GlassyUI-Components for users who violate these Terms.',
  },
  {
    title: 'Modification of Terms',
    content:
      'We reserve the right to modify these Terms at any time. Changes will be announced through official channels.',
  },
  {
    title: 'Privacy Policy',
    content:
      'We respect your privacy. Any data collected is handled according to our Privacy Policy.',
  },
  {
    title: 'Third-Party Links',
    content:
      'We are not responsible for the content or practices of third-party services linked through our platform.',
  },
  {
    title: 'User-Generated Content',
    content:
      'Any contributions made to GlassyUI-Components must align with our community guidelines and open-source policies.',
  },
  {
    title: 'Governing Law',
    content:
      'These Terms are governed in accordance with applicable intellectual property and open-source laws.',
  },
];

export const TermsOfUse: React.FC = () => {
  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050816] text-white pt-32 pb-20 px-4'>
      {/* Animated Background Blobs */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-blob'></div>

      <div className='absolute top-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000'></div>

      <div className='absolute bottom-10 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000'></div>

      <div className='relative max-w-6xl mx-auto'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1
            className='
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              mb-6
              bg-gradient-to-r
              from-purple-300
              via-violet-400
              to-cyan-300
              bg-clip-text
              text-transparent
            '
          >
            Terms of Use
          </h1>

          <p className='max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-8'>
            Please read these terms carefully before using GlassyUI Components.
            By accessing the platform, you agree to follow all community, usage,
            and contribution guidelines.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid gap-8 md:grid-cols-2'>
          {sections.map((section, index) => (
            <div
              key={index}
              className='
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-purple-500/10
                bg-[#120B2A]/40
                backdrop-blur-md
                p-6
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-cyan-400/30
                hover:bg-[#181235]/60
                hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]
              '
            >
              {/* Hover Glow Overlay */}
              <div
                className='
                  absolute
                  inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  bg-gradient-to-br
                  from-cyan-500/5
                  via-transparent
                  to-purple-500/10
                  pointer-events-none
                '
              ></div>

              {/* Content */}
              <div className='relative z-10'>
                {/* Number Badge */}
                <div
                  className='
                    w-10
                    h-10
                    rounded-xl
                    bg-purple-500/10
                    border
                    border-purple-400/20
                    flex
                    items-center
                    justify-center
                    text-purple-300
                    font-semibold
                    mb-5
                    transition-all
                    duration-500
                    group-hover:border-cyan-400/30
                    group-hover:text-cyan-300
                    group-hover:bg-cyan-400/10
                  '
                >
                  {index + 1}
                </div>

                {/* Title */}
                <h2
                  className='
                    text-xl
                    font-semibold
                    mb-4
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-cyan-200
                  '
                >
                  {section.title}
                </h2>

                {/* Content */}
                <p className='text-gray-400 leading-7 text-[15px] group-hover:text-gray-300 transition-colors duration-300'>
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
