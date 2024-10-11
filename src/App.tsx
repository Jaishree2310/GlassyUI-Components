import React from 'react';

import GlassyUILandingPage from './components/GlassyUILandingPage';
import GlassyUIComponentsPage from './components/GlassyUIComponentsPage';
import ButtonDetailsPage from './components/ButtonDetailsPage';
import CardDetailsPage from './components/CardDetailsPage';
import ProgressBarDetailPage from './components/ProgressBarDetailPage';
import PopupDetailPage from './components/PopupDetailPage';
import InputDetailPage from './components/InputDetailPage';
import TextareaDetailPage from './components/TextareaDetailPage';
import NotFoundPage from './components/NotFoundPage';
import TooltipDetailsPage from './components/TooltipDetailsPage';
import SpeedDialDetailsPage from './components/SpeedDialDetailsPage';
import ModalDetailsPage from './components/ModalDetailsPage';
import NavigationDetailsPage from './components/NavigationDetailsPage';
import GlassMorphismGenrator from './components/GlassMorphismGenrator';
import SliderDetailsPage from './components/SliderDetailsPage';


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<GlassyUILandingPage />} />

      </Routes>
    </Router>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default App;
