import React, { useEffect, useState } from 'react';
import PricingDetailPage from './components/PricingDetailPage';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AboutUsPage from './components/AboutUsPage';
import AccordionDetails from './components/AccordionDetails';
import AiChatbot from './components/AIChatbot';
import AuthenticationCard from './components/AuthenticationCards';
import BackToTopDetailsPage from './components/BackToTopDetailsPage';
import ButtonDetailsPage from './components/ButtonDetailsPage';
import CalendarDetails from './components/CalendarDetails';
import CardDetailsPage from './components/CardDetailsPage';
import Checkbox from './components/Checkbox';
import ContactUs from './components/ContactUs';
import ContactUsDetailsPage from './components/ContactUsDetailsPage';
import ContributorsPage from './components/ContributorsPage';
import DonationPage from './components/DonationPage';
import DropdowndetailsPage from './components/DropdowndetailsPage';
import Footer from './components/Footer';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import GlassMemoryTrail from './components/GlassMemoryTrial';
import GlassMorphismGenrator from './components/GlassMorphismGenrator';
import GlassShockwaveReveal from './components/GlassShockwaveReveal';
import GlassyUIComponentsPage from './components/GlassyUIComponentsPage';
import GlassyUILandingPage from './components/GlassyUILandingPage';
import Header from './components/Header';
import InputDetailPage from './components/InputDetailPage';
import ModalDetailsPage from './components/ModalDetailsPage';
import NavigationDetailsPage from './components/NavigationDetailsPage';
import NotFoundPage from './components/NotFoundPage';
import PaginationDetails from './components/PaginationDetails';
import PopupDetailPage from './components/PopupDetailPage';
import ProductCardDetailsPage from './components/ProductCardDetailsPage';
import ProgressBarDetailPage from './components/ProgressBarDetailPage';
import ScrollProgressBar from './components/ScrollProgress'; // Import your ScrollProgressBar component
import ScrollToTop from './components/ScrollToTop';
import SliderDetailsPage from './components/SliderDetailsPage';
import SpeedDialDetailsPage from './components/SpeedDialDetailsPage';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';
import Statistic from './components/StatisticDetails';
import Stories from './components/Stories';
import { TermsOfUse } from './components/TermsOfUse';
import TestimonialDetails from './components/TestimonialDetails';
import TextareaDetailPage from './components/TextareaDetailPage';
import ToastPage from './components/ToastPage';
import TooltipDetailsPage from './components/TooltipDetailsPage';
// import Register from './login/SignUp';
// import SignIn from './login/SignIn';

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
      <ScrollToTop />
      <Header />
      <AiChatbot />
      {/* <ThemeToggle /> */}
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
        <Route path='/calendar-details' element={<CalendarDetails />} />
        <Route path='/statistic-details' element={<Statistic />} />
        <Route path='/checkbox' element={<Checkbox />} />
        <Route path='/spinner' element={<SpinnerDetailsPage />} />
        <Route path='/product-details' element={<ProductCardDetailsPage />} />
        <Route path='/gallery-details' element={<GalleryDetailsPage />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/termsOfUse' element={<TermsOfUse />} />
        <Route path='/glass-shockwave' element={<GlassShockwaveReveal />} />

        <Route path='/glass-memory-trail' element={<GlassMemoryTrail />} />
        <Route path='/stories' element={<Stories />} />

        {/* <Route path='/signup' element={<Register />} /> */}
        {/* <Route path='/signin' element={<SignIn />} /> */}

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
