import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
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
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<GlassyUILandingPage />} />
        <Route
          path='/components'
          element={
            <Layout>
              <GlassyUIComponentsPage />
            </Layout>
          }
        />
        <Route
          path='/button-details'
          element={
            <Layout>
              <ButtonDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/card-details'
          element={
            <Layout>
              <CardDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/progress-bar-details'
          element={
            <Layout>
              <ProgressBarDetailPage />
            </Layout>
          }
        />
        <Route
          path='/popup-details'
          element={
            <Layout>
              <PopupDetailPage />
            </Layout>
          }
        />
        <Route
          path='/input-details'
          element={
            <Layout>
              <InputDetailPage />
            </Layout>
          }
        />
        <Route
          path='/textarea-details'
          element={
            <Layout>
              <TextareaDetailPage />
            </Layout>
          }
        />
        <Route
          path='/tooltip-details'
          element={
            <Layout>
              <TooltipDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/speed-dial-details'
          element={
            <Layout>
              <SpeedDialDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/modal-details'
          element={
            <Layout>
              <ModalDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/navigation-details'
          element={
            <Layout>
              <NavigationDetailsPage />
            </Layout>
          }
        />
        <Route
          path='/generator'
          element={
            <Layout>
              <GlassMorphismGenrator />
            </Layout>
          }
        />
        <Route
          path='/slider-details'
          element={
            <Layout>
              <SliderDetailsPage />
            </Layout>
          }
        />

        <Route
          path='*'
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
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
