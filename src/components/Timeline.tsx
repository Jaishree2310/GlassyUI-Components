import React from 'react';

export interface TimelineEvent {
  title: string;
  subtitle?: string;
  date: string;
  description: string;
  icon?: React.ReactNode;
  color?: string; // custom highlight dot color (e.g. #a855f7)
}

export interface TimelineProps {
  events: TimelineEvent[];
  orientation?: 'vertical' | 'horizontal';
  alignment?: 'left' | 'right' | 'alternate'; // Alternate works only in vertical orientation
  glassOpacity?: number;
  lineStyle?: 'solid' | 'dashed' | 'gradient';
}

export const Timeline: React.FC<TimelineProps> = ({
  events,
  orientation = 'vertical',
  alignment = 'alternate',
  glassOpacity = 0.12,
  lineStyle = 'solid',
}) => {
  const isVertical = orientation === 'vertical';
  const isAlternate = isVertical && alignment === 'alternate';

  const getLineBorder = (color = 'rgba(255, 255, 255, 0.15)') => {
    if (lineStyle === 'dashed') {
      return { borderStyle: 'dashed', borderColor: color };
    }
    if (lineStyle === 'gradient') {
      return {
        backgroundImage: `linear-gradient(to bottom, ${color}, rgba(255, 255, 255, 0.03))`,
      };
    }
    return { backgroundColor: color };
  };

  return (
    <div
      className={`w-full relative ${isVertical ? 'py-8' : 'px-4 overflow-x-auto scrollbar-thin'}`}
    >
      {/* Central Connector Line */}
      {isVertical ? (
        <div
          style={getLineBorder()}
          className={`absolute left-8 ${
            isAlternate ? 'md:left-1/2' : ''
          } top-0 bottom-0 w-[3px] transform -translate-x-1/2`}
        />
      ) : (
        <div
          style={getLineBorder('rgba(255, 255, 255, 0.12)')}
          className='absolute left-0 right-0 top-[28px] h-[3px]'
        />
      )}

      <div
        className={`flex ${
          isVertical
            ? 'flex-col space-y-12'
            : 'flex-row space-x-8 pb-4 min-w-[700px]'
        }`}
      >
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          const nodeColor = event.color || '#a855f7';

          // Layout alignment helpers
          const getVerticalAlignmentClasses = () => {
            if (!isAlternate) {
              return alignment === 'right'
                ? 'flex-row-reverse text-right pl-0 pr-16 md:ml-0 md:mr-auto'
                : 'text-left pl-16';
            }
            return isEven
              ? 'md:flex-row text-left md:text-right pl-16 md:pl-0 md:pr-16 md:-translate-x-[50%] md:w-[50%]'
              : 'text-left pl-16 md:translate-x-[50%] md:w-[50%]';
          };

          return (
            <div
              key={index}
              className={`relative flex ${
                isVertical
                  ? `items-start w-full ${getVerticalAlignmentClasses()}`
                  : 'flex-col items-center w-64 flex-shrink-0'
              }`}
            >
              {/* Timeline marker node */}
              <div
                style={{
                  backgroundColor: '#0f172a',
                  borderColor: nodeColor,
                  boxShadow: `0 0 12px ${nodeColor}80`,
                }}
                className={`absolute z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 text-white ${
                  isVertical
                    ? `left-8 ${
                        isAlternate ? 'md:left-1/2' : ''
                      } transform -translate-x-1/2`
                    : 'top-3 left-1/2 transform -translate-x-1/2'
                } transition-all duration-300 hover:scale-110`}
              >
                {event.icon || (
                  <div
                    className='w-2.5 h-2.5 rounded-full'
                    style={{ backgroundColor: nodeColor }}
                  />
                )}
              </div>

              {/* Event card content */}
              <div
                style={{
                  backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                }}
                className={`w-full p-5 rounded-2xl border backdrop-filter backdrop-blur-md shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
                  isVertical ? '' : 'mt-14'
                }`}
              >
                <span className='inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider text-purple-300 bg-white/5 border border-white/10 rounded-full mb-3 uppercase'>
                  {event.date}
                </span>
                <h3 className='text-base font-bold text-white mb-1'>
                  {event.title}
                </h3>
                {event.subtitle && (
                  <h4 className='text-xs font-semibold text-white/55 mb-2.5'>
                    {event.subtitle}
                  </h4>
                )}
                <p className='text-xs text-white/50 leading-relaxed'>
                  {event.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
// custom style for scrollbar hides
const scrollStyle = `
.scrollbar-thin::-webkit-scrollbar {
  height: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.12);
  border-radius: 4px;
}
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(scrollStyle));
  document.head.appendChild(style);
}
