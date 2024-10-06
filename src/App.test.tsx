import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Custom render function
const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

test('renders without crashing', () => {
  renderWithRouter(<App />);
  const headerElement = screen.getByText(/GlassyUI/i);
  expect(headerElement).toBeInTheDocument();
});
