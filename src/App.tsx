import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlassyUILandingPage from './components/GlassyUILandingPage';
import GlassyUIComponentsPage from './components/GlassyUIComponentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlassyUILandingPage />} />
        <Route path="/components" element={<GlassyUIComponentsPage />} />
      </Routes>
    </Router>
  );
};

export default App;