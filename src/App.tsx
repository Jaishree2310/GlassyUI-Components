import React from "react";
import { Routes, Route } from "react-router-dom";
import GlassyUILandingPage from "./components/GlassyUILandingPage";
import GlassyUIComponentsPage from "./components/GlassyUIComponentsPage";
import ButtonDetailsPage from "./components/ButtonDetailsPage";
import CardDetailsPage from "./components/CardDetailsPage";
import ProgressBarDetailPage from "./components/ProgressBarDetailPage";
import PopupDetailPage from "./components/PopupDetailPage";
import InputDetailPage from "./components/InputDetailPage";
import TextareaDetailPage from "./components/TextareaDetailPage";
import NotFoundPage from "./components/NotFoundPage";
import TooltipDetailsPage from "./components/TooltipDetailsPage";
import SpeedDialDetailsPage from "./components/SpeedDialDetailsPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GlassyUILandingPage />} />
      <Route path="/components" element={<GlassyUIComponentsPage />} />
      <Route path="/button-details" element={<ButtonDetailsPage />} />
      <Route path="/card-details" element={<CardDetailsPage />} />
      <Route
        path="/progress-bar-details"
        element={<ProgressBarDetailPage />}
      />
      <Route path="/popup-details" element={<PopupDetailPage />} />
      <Route path="/input-details" element={<InputDetailPage />} />
      <Route path="/textarea-details" element={<TextareaDetailPage />} />
      <Route path="/tooltip-details" element={<TooltipDetailsPage />} />
      <Route path="/speed-dial-details" element={<SpeedDialDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
