export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** The text label to display next to the checkbox */
  label?: React.ReactNode;
  /** Optional helper text displayed below the label */
  helperText?: React.ReactNode;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** The size of the checkbox */
  size?: CheckboxSize;
  /** The color theme of the checkbox */
  color?: CheckboxColor;
  /** Custom class name for the wrapper element */
  wrapperClassName?: string;
  /** Custom class name for the label element */
  labelClassName?: string;
  /** Whether the checkbox has an error state */
  error?: boolean;
}

export interface CheckboxGroupProps {
  /** Array of currently selected values */
  value?: string[];
  /** Callback fired when a checkbox in the group is changed */
  onChange?: (value: string[]) => void;
  /** The children checkboxes */
  children: React.ReactNode;
  /** The size applied to all child checkboxes */
  size?: CheckboxSize;
  /** The color applied to all child checkboxes */
  color?: CheckboxColor;
  /** Whether all child checkboxes are disabled */
  disabled?: boolean;
  /** Custom class name for the group wrapper */
  className?: string;
}

export interface CheckboxContextValue {
  value: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: CheckboxSize;
  color?: CheckboxColor;
  disabled?: boolean;
}
