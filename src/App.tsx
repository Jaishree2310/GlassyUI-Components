import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import ScrollProgressBar from './components/ScrollProgress'; // Import your ScrollProgressBar component
import PricingDetailPage from './components/PricingDetailPage';

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
import ContributorsPage from './components/ContributorsPage';
import DonationPage from './components/DonationPage';
import AboutUsPage from './components/AboutUsPage';
import Header from './components/Header';
import BackToTopDetailsPage from './components/BackToTopDetailsPage';
import DropdowndetailsPage from './components/DropdowndetailsPage';
import AuthenticationCard from './components/AuthenticationCards';
import ToastPage from './components/ToastPage';
import AccordionDetails from './components/AccordionDetails';
import ContactUsDetailsPage from './components/ContactUsDetailsPage';
import PaginationDetails from './components/PaginationDetails';
import TestimonialDetails from './components/TestimonialDetails';
import Footer from './components/Footer';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';
import StatisticDetails from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <ScrollProgressBar /> {/* Add the ScrollProgressBar component here */}
      <Routes>
        <Route path='/' element={<GlassyUILandingPage />} />
        <Route path='/components' element={<GlassyUIComponentsPage />} />
        <Route path='/toast-page' element={<ToastPage />} />
        <Route path='/button-details' element={<ButtonDetailsPage />} />
        <Route path='/card-details' element={<CardDetailsPage />} />
        <Route
          path='/progress-bar-details'
          element={<ProgressBarDetailPage />}
        />
        <Route path='/pricing-details' element={<PricingDetailPage />} />
        <Route path='/popup-details' element={<PopupDetailPage />} />
        <Route path='/input-details' element={<InputDetailPage />} />
        <Route path='/textarea-details' element={<TextareaDetailPage />} />
        <Route path='/tooltip-details' element={<TooltipDetailsPage />} />
        <Route path='/speed-dial-details' element={<SpeedDialDetailsPage />} />
        <Route path='/modal-details' element={<ModalDetailsPage />} />
        <Route path='/navigation-details' element={<NavigationDetailsPage />} />
        <Route path='/generator' element={<GlassMorphismGenrator />} />
        <Route path='/slider-details' element={<SliderDetailsPage />} />
        <Route path='/back-to-top-details' element={<BackToTopDetailsPage />} />
        <Route path='/dropdown-details' element={<DropdowndetailsPage />} />
        <Route path='/authentication-card' element={<AuthenticationCard />} />
        <Route path='/accordion-details' element={<AccordionDetails />} />
        <Route path='/contributors' element={<ContributorsPage />} />

        <Route path='/donate' element={<DonationPage />} />
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact-details' element={<ContactUsDetailsPage />} />
        <Route path='/pagination-details' element={<PaginationDetails />} />
        <Route path='/testimonial-details' element={<TestimonialDetails />} />
        <Route path='/statistic-details' element={<StatisticDetails />} />
        <Route path='/gallery-details' element={<GalleryDetailsPage />} />

        <Route path='/spinner' element={<SpinnerDetailsPage />} />

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ConditionalFooter />
    </Router>
  );
};
const ConditionalFooter: React.FC = () => {
  const location = useLocation();

  return location.pathname === '/' ? <Footer /> : null;
};
export default App;
