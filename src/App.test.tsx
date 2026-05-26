import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Auth Context so Firebase doesn't trigger asynchronous operations during tests
jest.mock('./login/contexts/authContext', () => ({
  useAuth: () => ({ userLoggedIn: false }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

test('renders explore components link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Explore Components/i);
  expect(linkElement).toBeInTheDocument();
});
