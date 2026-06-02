import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './login/contexts/authContext';
import { GlassyProvider } from './components/GlassyProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlassyProvider>
        <App />
      </GlassyProvider>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
