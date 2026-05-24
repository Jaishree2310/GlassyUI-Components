import React, { useEffect, useMemo, useRef, useState } from 'react';

interface Command {
  id: string;
  title: string;
  description?: string;
  shortcut?: string;
  category?: string;
  badge?: string;
  icon?: React.ReactNode;
  recent?: boolean;
}

interface CommandPaletteProps {
  commands: Command[];
  placeholder?: string;
  width?: string;
  theme?: 'default' | 'purple' | 'blue' | 'emerald';
  onSelect?: (command: Command) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  commands,
  placeholder = 'Search commands...',
  width = '700px',
  theme = 'default',
  onSelect,
}) => {
  const [search, setSearch] = useState('');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCommands = useMemo(() => {
    return commands.filter(command =>
      `${command.title} ${command.description || ''}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [commands, search]);

  const groupedCommands = useMemo(() => {
    return filteredCommands.reduce(
      (acc, command) => {
        const category = command.category || 'General';

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push(command);

        return acc;
      },
      {} as Record<string, Command[]>,
    );
  }, [filteredCommands]);

  const flatCommands = Object.values(groupedCommands).flat();

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();

        setSelectedIndex(prev =>
          prev === flatCommands.length - 1 ? 0 : prev + 1,
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();

        setSelectedIndex(prev =>
          prev === 0 ? flatCommands.length - 1 : prev - 1,
        );
      }

      if (e.key === 'Enter') {
        const selected = flatCommands[selectedIndex];

        if (selected) {
          onSelect?.(selected);
        }
      }
    };

    document.addEventListener('keydown', handleKeys);

    return () => document.removeEventListener('keydown', handleKeys);
  }, [flatCommands, onSelect, selectedIndex]);

  const themes = {
    default: 'bg-gray-900/70 border-white/10',

    purple: 'bg-purple-900/30 border-purple-300/10',

    blue: 'bg-blue-900/30 border-blue-300/10',

    emerald: 'bg-emerald-900/30 border-emerald-300/10',
  };

  const highlightMatch = (text: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, 'gi');

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className='text-blue-300 font-semibold'>
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  let currentIndex = -1;

  return (
    <div
      ref={containerRef}
      className={`w-full backdrop-filter backdrop-blur-lg border rounded-lg shadow-lg transition-all duration-300 overflow-hidden ${themes[theme]}`}
      style={{ maxWidth: width }}
    >
      {/* Header */}
      <div className='flex items-center justify-between px-6 py-5 border-b border-white/10'>
        <div>
          <h2 className='text-lg font-semibold text-white'>Command Palette</h2>

          <p className='text-sm text-gray-400 mt-1'>
            Search actions and commands
          </p>
        </div>

        <div className='px-3 py-1 rounded-lg bg-white/10 text-sm text-gray-300'>
          {commands.length} Commands
        </div>
      </div>

      {/* Search */}
      <div className='p-5 border-b border-white/10'>
        <input
          type='text'
          value={search}
          onChange={e => {
            setSearch(e.target.value);

            setSelectedIndex(0);
          }}
          placeholder={placeholder}
          className='w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 outline-none text-white placeholder-gray-500 focus:border-white/20 transition-all duration-300'
        />
      </div>

      {/* Recent */}
      {!search && (
        <div className='px-5 pt-5'>
          <h3 className='text-xs uppercase tracking-wider text-gray-400 mb-3'>
            Recent
          </h3>

          <div className='flex flex-wrap gap-3 mb-5'>
            {commands
              .filter(command => command.recent)
              .slice(0, 3)
              .map(command => (
                <button
                  key={command.id}
                  onClick={() => onSelect?.(command)}
                  className='px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-all text-sm text-gray-300'
                >
                  {command.title}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Commands */}
      <div className='max-h-[340px] overflow-y-auto pr-1 custom-scrollbar px-5 pb-5'>
        {flatCommands.length > 0 ? (
          Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category} className='mb-6'>
              <h3 className='text-xs uppercase tracking-wider text-gray-400 mb-3 px-2'>
                {category}
              </h3>

              <div className='space-y-2'>
                {commands.map(command => {
                  currentIndex++;

                  const isSelected = selectedIndex === currentIndex;

                  return (
                    <button
                      key={command.id}
                      onClick={() => onSelect?.(command)}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-200 border ${
                        isSelected
                          ? 'bg-white/[0.10] border-white/[0.15]'
                          : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-start gap-4'>
                          {command.icon && (
                            <div className='p-2 rounded-lg bg-white/10'>
                              {command.icon}
                            </div>
                          )}

                          <div>
                            <div className='flex items-center gap-2'>
                              <p className='font-medium text-white'>
                                {highlightMatch(command.title)}
                              </p>

                              {command.badge && (
                                <span className='px-2 py-1 rounded-lg bg-white/10 text-xs text-gray-300'>
                                  {command.badge}
                                </span>
                              )}
                            </div>

                            {command.description && (
                              <p className='text-sm text-gray-400 mt-1'>
                                {command.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {command.shortcut && (
                          <kbd className='px-2 py-1 rounded-lg bg-white/10 text-xs text-gray-300 whitespace-nowrap'>
                            {command.shortcut}
                          </kbd>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-12'>
            <p className='text-gray-400 text-lg mb-2'>
              No matching commands found
            </p>

            <p className='text-gray-500 text-sm'>
              Try searching for analytics, AI, reports...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='flex items-center justify-between px-6 py-4 border-t border-white/10 text-xs text-gray-400'>
        <span>↑↓ Navigate</span>

        <span>Enter Select</span>

        <span>Esc Close</span>
      </div>
    </div>
  );
};

export default CommandPalette;
