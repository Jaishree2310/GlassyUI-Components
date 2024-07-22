import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlassyUILandingPage from './components/GlassyUILandingPage';
import GlassyUIComponentsPage from './components/GlassyUIComponentsPage';
import ButtonDetailsPage from './components/ButtonDetailsPage';
import CardDetailsPage from './components/CardDetailsPage';
import ProgressBarDetailPage from './components/ProgressBarDetailPage';
import PopupDetailPage from './components/PopupDetailPage'
import InputDetailPage from './components/InputDetailPage'
import TextareaDetailPage from './components/TextareaDetailPage'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GlassyUILandingPage />} />
        <Route path="/components" element={<GlassyUIComponentsPage />} />
        <Route path="/button-details" element={<ButtonDetailsPage />} />
        <Route path="/card-details" element={<CardDetailsPage />} />
        <Route path="/progress-bar-details" element={<ProgressBarDetailPage />} />
        <Route path="/popup-details" element={<PopupDetailPage />} />
        <Route path="/input-details" element={<InputDetailPage />} />
        <Route path="/textarea-details" element={<TextareaDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;