import React, { useState, useEffect } from 'react';
import PricingDetailPage from './components/PricingDetailPage';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import ScrollProgressBar from './components/ScrollProgress'; // Import your ScrollProgressBar component
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
import ScrollProgressBar from './components/ScrollProgress';
// import SurveyForm from './components/SurveyForm'; 


// Lazy-loaded components
const GlassyUILandingPage = lazy(
  () => import('./components/GlassyUILandingPage'),
);
const PricingDetailPage = lazy(() => import('./components/PricingDetailPage'));
const GlassyUIComponentsPage = lazy(
  () => import('./components/GlassyUIComponentsPage'),
);
const ButtonDetailsPage = lazy(() => import('./components/ButtonDetailsPage'));
const CardDetailsPage = lazy(() => import('./components/CardDetailsPage'));
const ProgressBarDetailPage = lazy(
  () => import('./components/ProgressBarDetailPage'),
);
const PopupDetailPage = lazy(() => import('./components/PopupDetailPage'));
const InputDetailPage = lazy(() => import('./components/InputDetailPage'));
const TextareaDetailPage = lazy(
  () => import('./components/TextareaDetailPage'),
);
const TooltipDetailsPage = lazy(
  () => import('./components/TooltipDetailsPage'),
);
const SpeedDialDetailsPage = lazy(
  () => import('./components/SpeedDialDetailsPage'),
);
const ModalDetailsPage = lazy(() => import('./components/ModalDetailsPage'));
const NavigationDetailsPage = lazy(
  () => import('./components/NavigationDetailsPage'),
);
const GlassMorphismGenrator = lazy(
  () => import('./components/GlassMorphismGenrator'),
);
const SliderDetailsPage = lazy(() => import('./components/SliderDetailsPage'));
const BackToTopDetailsPage = lazy(
  () => import('./components/BackToTopDetailsPage'),
);
const DropdowndetailsPage = lazy(
  () => import('./components/DropdowndetailsPage'),
);
const AuthenticationCard = lazy(
  () => import('./components/AuthenticationCards'),
);
const ToastPage = lazy(() => import('./components/ToastPage'));
const AccordionDetails = lazy(() => import('./components/AccordionDetails'));
const ContributorsPage = lazy(() => import('./components/ContributorsPage'));
const DonationPage = lazy(() => import('./components/DonationPage'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
const ContactUsDetailsPage = lazy(
  () => import('./components/ContactUsDetailsPage'),
);
const PaginationDetails = lazy(() => import('./components/PaginationDetails'));
const TestimonialDetails = lazy(
  () => import('./components/TestimonialDetails'),
);
const CalendarDetails = lazy(() => import('./components/CalendarDetails'));
const Checkbox = lazy(() => import('./components/Checkbox'));
const Statistic = lazy(() => import('./components/StatisticDetails'));
const GalleryDetailsPage = lazy(
  () => import('./components/GalleryDetailsPage'),
);
const SpinnerDetailsPage = lazy(
  () => import('./components/SpinnerDetailsPage'),
);
const ProductCardDetailsPage = lazy(
  () => import('./components/ProductCardDetailsPage'),
);
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
import CalendarDetails from './components/CalendarDetails';
import Checkbox from './components/Checkbox';
import Statistic from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';
import ProductCardDetailsPage from './components/ProductCardDetailsPage';
 
  import ContactUs from './components/ContactUs';
  import AiChatbot from './components/AIChatbot';
  import { TermsOfUse } from './components/TermsOfUse';
  
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className='p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded'
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

const App: React.FC = () => {
  return ( 
    <Router> 
       <Header />
      <ThemeToggle />
      <ScrollProgressBar /> {/* Anpm dd the ScrollProgressBar component here */}
      <Suspense fallback={<div>Loading...</div>}> 
 
      <AiChatbot />
      {/* <ThemeToggle /> */}
 
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
        <Route path='/calendar-details' element={<CalendarDetails />} />
        <Route path='/statistic-details' element={<Statistic />} />
        <Route path='/checkbox' element={<Checkbox />} />
        <Route path='/spinner' element={<SpinnerDetailsPage />} />
        <Route path='/product-details' element={<ProductCardDetailsPage />} />
        <Route path='/gallery-details' element={<GalleryDetailsPage />} />
 
        <Route path='*' element={<NotFoundPage />} />
      </Routes> 
      </Suspense>
      <ConditionalFooter darkMode={darkMode} />
  
         <Route path='/contact' element={<ContactUs />} />
         <Route path='/termsOfUse' element={<TermsOfUse />} />
  
    </Router>
  );
};
const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  return location.pathname === '/' ? null : <Footer />;
};
export default App;
