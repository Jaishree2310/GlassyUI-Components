import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from './checkbox.utils';
import type { CheckboxProps } from './types';
import './Checkbox.scss';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      wrapperClassName,
      labelClassName,
      label,
      helperText,
      indeterminate = false,
      size = 'md',
      color = 'primary',
      error = false,
      disabled = false,
      checked,
      onChange,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    // Use the provided ref if it exists, otherwise use the internal one
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    // Handle indeterminate state at the DOM level
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [inputRef, indeterminate]);

    return (
      <label
        className={cn(
          'glassy-checkbox-container',
          `glassy-checkbox-container--${size}`,
          `glassy-checkbox-container--${color}`,
          {
            'glassy-checkbox-container--disabled': disabled,
            'glassy-checkbox-container--error': error,
          },
          wrapperClassName,
        )}
      >
        <input
          type='checkbox'
          className={cn('glassy-checkbox-input', className)}
          ref={inputRef}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...(error ? { 'aria-invalid': true } : {})}
          {...(indeterminate
            ? { 'aria-checked': 'mixed' }
            : checked
              ? { 'aria-checked': true }
              : {})}
          {...props}
        />

        <div className='glassy-checkbox-control' aria-hidden='true'>
          {indeterminate ? (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='indeterminate-icon'
            >
              <line x1='5' y1='12' x2='19' y2='12'></line>
            </svg>
          ) : (
            <svg
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='check-icon'
            >
              <polyline points='20 6 9 17 4 12'></polyline>
            </svg>
          )}
        </div>

        {(label || helperText) && (
          <div className='glassy-checkbox-content'>
            {label && (
              <span className={cn('glassy-checkbox-label', labelClassName)}>
                {label}
              </span>
            )}
            {helperText && (
              <span className='glassy-checkbox-helper-text'>{helperText}</span>
            )}
          </div>
        )}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
