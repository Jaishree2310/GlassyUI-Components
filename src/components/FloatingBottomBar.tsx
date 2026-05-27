import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Layout,
  Info,
  Users,
  BookOpen,
  Star,
  Github,
} from 'lucide-react';
import { useGitHubStars } from '../hooks/useGitHubStars';

const FloatingBottomBar: React.FC = () => {
  const githubRepoUrl = 'https://github.com/Jaishree2310/GlassyUI-Components';
  const stars = useGitHubStars();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/components', label: 'Components', icon: Layout },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contributors', label: 'Contributors', icon: Users },
    { to: '/stories', label: 'Stories', icon: BookOpen },
  ];

  return (
    <div className='fixed bottom-4 left-1/2 z-[100] flex w-[95%] max-w-[500px] -translate-x-1/2 items-center justify-center gap-3 lg:hidden'>
      {/* Main Navigation Pill */}
      <div className='flex flex-1 items-center justify-around rounded-full bg-[#0a0710]/95 p-2 px-3 shadow-2xl backdrop-blur-xl border border-white/5'>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1.5 p-2 transition-colors duration-200 ${
                isActive
                  ? 'text-[#a78bfa]'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2} />
            <span className='text-[10px] font-semibold tracking-wide'>
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* GitHub Button */}
      <div className='relative shrink-0'>
        <a
          href={githubRepoUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-[#ff4d79] to-[#ff2a5f] text-white shadow-[0_8px_20px_rgba(255,42,95,0.4)] transition-transform hover:scale-105 active:scale-95 border-2 border-[#161122]'
          aria-label='Star on GitHub'
        >
          <Github size={28} strokeWidth={2} />
        </a>
        <div className='absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-[#ff9900] px-2 py-0.5 text-[11px] font-bold text-white shadow-md border-2 border-[#161122]'>
          <Star size={10} className='mr-0.5 fill-current' />
          {stars}
        </div>
      </div>
    </div>
  );
};

export default FloatingBottomBar;
