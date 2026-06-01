import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  glassOpacity?: number; // base white opacity (0.1 to 0.4)
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl';
  completedColor?: string; // Custom color for completed state (e.g. #10B981)
  activeColor?: string; // Custom color for active border (e.g. #a855f7)
  connectorStyle?: 'solid' | 'dashed' | 'gradient';
  onStepClick?: (index: number) => void;
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
};

export const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  glassOpacity = 0.15,
  blurIntensity = 'xl', // Matching backdrop-blur-xl from screenshot
  completedColor = '#10B981',
  activeColor = '#a855f7',
  connectorStyle = 'solid',
  onStepClick,
}) => {
  const isVertical = orientation === 'vertical';
  const blurClass = blurMap[blurIntensity];

  // Helper to determine step status
  const getStepStatus = (index: number) => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'active';
    return 'upcoming';
  };

  return (
    <div
      className={`w-full flex ${
        isVertical
          ? 'flex-col space-y-3'
          : 'flex-row items-center justify-between max-md:flex-col max-md:space-y-4 max-md:items-start'
      }`}
    >
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isClickable = typeof onStepClick === 'function';
        const isLast = index === steps.length - 1;

        // Custom circle styling based on classic white glassmorphism
        const getCircleStyle = () => {
          if (status === 'completed') {
            return {
              backgroundColor: completedColor,
              borderColor: completedColor,
              color: '#ffffff',
              boxShadow: `0 0 12px ${completedColor}80`,
            };
          }
          if (status === 'active') {
            return {
              backgroundColor: `rgba(255, 255, 255, ${glassOpacity + 0.1})`,
              borderColor: activeColor,
              color: '#ffffff',
              boxShadow: `0 0 10px ${activeColor}50`,
            };
          }
          // Upcoming: standard translucent white glass
          return {
            backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'rgba(255, 255, 255, 0.4)',
          };
        };

        // Connector line style helper
        const getConnectorStyle = () => {
          const isNextCompletedOrActive = index < activeStep;
          const strokeColor = isNextCompletedOrActive
            ? completedColor
            : 'rgba(255, 255, 255, 0.15)';

          let lineStyle = {};
          if (connectorStyle === 'dashed') {
            lineStyle = {
              borderStyle: 'dashed',
              borderColor: strokeColor,
              borderWidth: '2px',
            };
          } else if (connectorStyle === 'gradient') {
            lineStyle = {
              background: isNextCompletedOrActive
                ? `linear-gradient(90deg, ${completedColor}, ${activeColor})`
                : 'rgba(255, 255, 255, 0.15)',
            };
          } else {
            lineStyle = {
              backgroundColor: strokeColor,
            };
          }
          return lineStyle;
        };

        return (
          <React.Fragment key={index}>
            {/* Step Element */}
            <div
              className={`flex items-center group ${
                isVertical ? 'w-full' : 'flex-1'
              } ${isClickable ? 'cursor-pointer' : ''}`}
              onClick={() => isClickable && onStepClick!(index)}
            >
              {/* Circle indicator */}
              <div className='relative flex-shrink-0'>
                {/* Active pulsing glow */}
                {status === 'active' && (
                  <span
                    className='absolute -inset-1 rounded-full animate-ping opacity-30 pointer-events-none'
                    style={{ backgroundColor: activeColor }}
                  />
                )}

                <div
                  style={getCircleStyle()}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 font-semibold text-sm backdrop-filter ${blurClass} ${
                    isClickable
                      ? 'group-hover:bg-white/30 group-hover:scale-105'
                      : ''
                  }`}
                >
                  {status === 'completed'
                    ? step.icon || <Check size={18} className='stroke-[3]' />
                    : step.icon || <span>{index + 1}</span>}
                </div>
              </div>

              {/* Label & Description */}
              <div className='ml-4 text-left'>
                <h4
                  className={`font-semibold tracking-wide text-sm transition-colors duration-300 ${
                    status === 'active'
                      ? 'text-white'
                      : status === 'completed'
                        ? 'text-slate-200'
                        : 'text-white/40'
                  }`}
                >
                  {step.title}
                </h4>
                {step.description && (
                  <p
                    className={`text-xs mt-0.5 transition-colors duration-300 ${
                      status === 'active'
                        ? 'text-slate-300'
                        : status === 'completed'
                          ? 'text-slate-400'
                          : 'text-white/20'
                    }`}
                  >
                    {step.description}
                  </p>
                )}
              </div>

              {/* Connector line for horizontal orientation */}
              {!isLast && !isVertical && (
                <div className='flex-grow mx-4 max-md:hidden'>
                  <div
                    style={getConnectorStyle()}
                    className={`h-[3px] w-full rounded transition-all duration-500`}
                  />
                </div>
              )}
            </div>

            {/* Vertical connector line inside vertical layout */}
            {!isLast && isVertical && (
              <div className='pl-5 my-1'>
                <div
                  style={{
                    borderColor:
                      index < activeStep
                        ? completedColor
                        : 'rgba(255,255,255,0.15)',
                    borderLeftWidth: '2px',
                    borderLeftStyle:
                      connectorStyle === 'dashed' ? 'dashed' : 'solid',
                    height: '24px',
                  }}
                  className='transition-all duration-500'
                />
              </div>
            )}

            {/* Mobile-only vertical connector line for horizontal orientation */}
            {!isLast && !isVertical && (
              <div className='hidden max-md:block pl-5 my-1'>
                <div
                  style={{
                    borderColor:
                      index < activeStep
                        ? completedColor
                        : 'rgba(255,255,255,0.15)',
                    borderLeftWidth: '2px',
                    borderLeftStyle:
                      connectorStyle === 'dashed' ? 'dashed' : 'solid',
                    height: '16px',
                  }}
                  className='transition-all duration-500'
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
