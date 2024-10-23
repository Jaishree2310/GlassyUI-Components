import React, { useState } from 'react';
import { Menu } from 'lucide-react';

interface NavigationProps {
  items: Array<{
    label: string;
    href: string;
    className?: string;
  }>;
  initialSelected?: string;
}

const getGlassyClasses = () =>
  'backdrop-filter backdrop-blur-xl bg-white/30 border border-white/20 rounded-xl shadow-lg transition-all duration-300';

const Navigation: React.FC<NavigationProps> = ({
  items,
  initialSelected = 'Home',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(initialSelected);

  const selectedClass = (item: string) => {
    return selected === item ? 'bg-pink-300 text-pink-600' : '';
  };

  return (
    <nav
      className={`${getGlassyClasses()} flex justify-around flex-col md:flex-row mt-4 py-2`}
    >
      <button
        className='md:hidden flex items-center justify-start p-3'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={20} className='mr-2' />
      </button>
      <div
        className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:block`}
      >
        <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 p-3 m-2'>
          {items.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`hover:bg-white/50 hover:text-pink-600 rounded flex justify-center ${item.className}`}
              >
                <button
                  onClick={() => setSelected(item.label)}
                  className={`hover:text-pink-600 px-2 py-1 rounded ${selectedClass(item.label)}`}
                >
                  {item.label}
                </button>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
