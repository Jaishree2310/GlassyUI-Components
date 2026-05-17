import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { cn, toggleArrayValue } from './checkbox.utils';
import type { CheckboxGroupProps, CheckboxContextValue } from './types';
import { Checkbox } from './Checkbox';

const CheckboxGroupContext = createContext<CheckboxContextValue | undefined>(
  undefined,
);

export const useCheckboxGroup = () => {
  return useContext(CheckboxGroupContext);
};

export const CheckboxGroup = ({
  value = [],
  defaultValue,
  onChange,
  children,
  size = 'md',
  color = 'primary',
  disabled = false,
  className,
}: CheckboxGroupProps) => {
  // We use controlled state if value is provided, otherwise we could manage internal state
  // For simplicity in this implementation, we assume controlled usage if value is provided.

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: checkboxValue } = event.target;
      if (onChange) {
        const newValue = toggleArrayValue(value, checkboxValue);
        onChange(newValue);
      }
    },
    [onChange, value],
  );

  const contextValue = useMemo(
    () => ({
      value,
      onChange: handleChange,
      size,
      color,
      disabled,
    }),
    [value, handleChange, size, color, disabled],
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn('flex flex-col gap-3', className)} role='group'>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

type GroupedCheckboxProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  'value'
> & {
  /** The value of the checkbox, required for grouped usage */
  value: string;
};

// Extends the base Checkbox to work seamlessly with CheckboxGroup
export const GroupedCheckbox = React.forwardRef<
  HTMLInputElement,
  GroupedCheckboxProps
>((props, ref) => {
  const groupContext = useCheckboxGroup();

  if (!groupContext) {
    // Fallback to normal checkbox if used outside of a group
    return <Checkbox ref={ref} {...props} />;
  }

  const { value: groupValue, onChange, size, color, disabled } = groupContext;
  const isChecked = groupValue.includes(props.value as string);

  return (
    <Checkbox
      ref={ref}
      {...props}
      size={props.size || size}
      color={props.color || color}
      disabled={props.disabled || disabled}
      checked={isChecked}
      onChange={onChange}
    />
  );
});

GroupedCheckbox.displayName = 'GroupedCheckbox';
