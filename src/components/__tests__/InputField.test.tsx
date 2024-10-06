import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import InputField from '../InputField';

describe('InputField Component', () => {
  it('renders correctly with default props', () => {
    render(<InputField />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('glassy-input');
  });

  it('applies custom className when provided', () => {
    render(<InputField className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('glassy-input');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('handles value changes correctly', async () => {
    const handleChange = jest.fn();
    render(<InputField onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    
    await userEvent.type(inputElement, 'test input');
    expect(handleChange).toHaveBeenCalledTimes(10); // 'test input' is 10 characters
  });

  it('applies different input types correctly', () => {
    const { rerender } = render(<InputField type="password" />);
    let inputElement = screen.getByPlaceholderText('');
    expect(inputElement).toHaveAttribute('type', 'password');

    rerender(<InputField type="number" />);
    inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveAttribute('type', 'number');

    rerender(<InputField type="date" />);
    inputElement = screen.getByPlaceholderText('');
    expect(inputElement).toHaveAttribute('type', 'date');
  });

  it('applies placeholder text correctly', () => {
    const placeholderText = 'Enter your name';
    render(<InputField placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<InputField disabled />);
    const inputElement = screen.getByPlaceholderText('');
    expect(inputElement).toBeDisabled();
  });

  it('applies glassmorphism styling', () => {
    render(<InputField />);
    const inputElement = screen.getByRole('textbox');
    
    expect(inputElement).toHaveStyle({
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      padding: '10px',
      borderRadius: '5px',
      color: 'rgb(255, 255, 255)',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease'
    });

    // Note: backdropFilter can't be tested easily in JSDOM
  });
});