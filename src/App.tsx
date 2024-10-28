import React from 'react';
import { useState, useEffect } from 'react';
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
import ProductCardDetailsPage from './components/ProductCardDetailsPage';
import Statistic from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import Checkbox from './components/Checkbox';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true); // Initial state for dark mode

  useEffect(() => {
    // Check localStorage for the saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle between dark and light modes
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <ScrollProgressBar darkMode={darkMode} />
      <Routes>
        <Route path='/' element={<GlassyUILandingPage darkMode={darkMode} />} />
        <Route
          path='/components'
          element={<GlassyUIComponentsPage darkMode={darkMode} />}
        />
        <Route path='/toast-page' element={<ToastPage darkMode={darkMode} />} />
        <Route
          path='/button-details'
          element={<ButtonDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/card-details'
          element={<CardDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/progress-bar-details'
          element={<ProgressBarDetailPage darkMode={darkMode} />}
        />
        <Route
          path='/pricing-details'
          element={<PricingDetailPage darkMode={darkMode} />}
        />
        <Route
          path='/popup-details'
          element={<PopupDetailPage darkMode={darkMode} />}
        />
        <Route
          path='/input-details'
          element={<InputDetailPage darkMode={darkMode} />}
        />
        <Route
          path='/textarea-details'
          element={<TextareaDetailPage darkMode={darkMode} />}
        />
        <Route
          path='/tooltip-details'
          element={<TooltipDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/speed-dial-details'
          element={<SpeedDialDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/modal-details'
          element={<ModalDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/navigation-details'
          element={<NavigationDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/generator'
          element={<GlassMorphismGenrator darkMode={darkMode} />}
        />
        <Route
          path='/slider-details'
          element={<SliderDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/back-to-top-details'
          element={<BackToTopDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/dropdown-details'
          element={<DropdowndetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/authentication-card'
          element={<AuthenticationCard darkMode={darkMode} />}
        />
        <Route
          path='/accordion-details'
          element={<AccordionDetails darkMode={darkMode} />}
        />
        <Route
          path='/contributors'
          element={<ContributorsPage darkMode={darkMode} />}
        />
        <Route path='/donate' element={<DonationPage darkMode={darkMode} />} />
        <Route path='/about' element={<AboutUsPage darkMode={darkMode} />} />
        <Route
          path='/contact-details'
          element={<ContactUsDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/pagination-details'
          element={<PaginationDetails darkMode={darkMode} />}
        />
        <Route
          path='/testimonial-details'
          element={<TestimonialDetails darkMode={darkMode} />}
        />
        <Route
          path='/product-details'
          element={<ProductCardDetailsPage darkMode={darkMode} />}
        />
        <Route
          path='/gallery-details'
          element={<GalleryDetailsPage darkMode={darkMode} />}
        />

        <Route
          path='/statistic-details'
          element={<Statistic darkMode={darkMode} />}
        />
        <Route
          path='/gallery-details'
          element={<GalleryDetailsPage darkMode={darkMode} />}
        />

        <Route path='/checkbox' element={<Checkbox />} />

        <Route
          path='/spinner'
          element={<SpinnerDetailsPage darkMode={darkMode} />}
        />

        <Route path='*' element={<NotFoundPage darkMode={darkMode} />} />
      </Routes>
      <ConditionalFooter darkMode={darkMode} />
    </Router>
  );
};
const ConditionalFooter: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const location = useLocation();

  return location.pathname === '/' ? <Footer darkMode={darkMode} /> : null;
};
export default App;
