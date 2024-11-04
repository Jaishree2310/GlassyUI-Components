
import React, { Suspense, lazy, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';


// Import components that don't need to be lazy-loaded

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgress';
import SurveyForm from './components/SurveyForm';

// Lazy-loaded components
const GlassyUILandingPage = lazy(() => import('./components/GlassyUILandingPage'));
const PricingDetailPage = lazy(() => import('./components/PricingDetailPage'));
const GlassyUIComponentsPage = lazy(() => import('./components/GlassyUIComponentsPage'));
const ButtonDetailsPage = lazy(() => import('./components/ButtonDetailsPage'));
const CardDetailsPage = lazy(() => import('./components/CardDetailsPage'));
const ProgressBarDetailPage = lazy(() => import('./components/ProgressBarDetailPage'));
const PopupDetailPage = lazy(() => import('./components/PopupDetailPage'));
const InputDetailPage = lazy(() => import('./components/InputDetailPage'));
const TextareaDetailPage = lazy(() => import('./components/TextareaDetailPage'));
const TooltipDetailsPage = lazy(() => import('./components/TooltipDetailsPage'));
const SpeedDialDetailsPage = lazy(() => import('./components/SpeedDialDetailsPage'));
const ModalDetailsPage = lazy(() => import('./components/ModalDetailsPage'));
const NavigationDetailsPage = lazy(() => import('./components/NavigationDetailsPage'));
const GlassMorphismGenrator = lazy(() => import('./components/GlassMorphismGenrator'));
const SliderDetailsPage = lazy(() => import('./components/SliderDetailsPage'));
const BackToTopDetailsPage = lazy(() => import('./components/BackToTopDetailsPage'));
const DropdowndetailsPage = lazy(() => import('./components/DropdowndetailsPage'));
const AuthenticationCard = lazy(() => import('./components/AuthenticationCards'));
const ToastPage = lazy(() => import('./components/ToastPage'));
const AccordionDetails = lazy(() => import('./components/AccordionDetails'));
const ContributorsPage = lazy(() => import('./components/ContributorsPage'));
const DonationPage = lazy(() => import('./components/DonationPage'));
const AboutUsPage = lazy(() => import('./components/AboutUsPage'));
const ContactUsDetailsPage = lazy(() => import('./components/ContactUsDetailsPage'));
const PaginationDetails = lazy(() => import('./components/PaginationDetails'));
const TestimonialDetails = lazy(() => import('./components/TestimonialDetails'));
const CalendarDetails = lazy(() => import('./components/CalendarDetails'));
const Checkbox = lazy(() => import('./components/Checkbox'));
const Statistic = lazy(() => import('./components/StatisticDetails'));
const GalleryDetailsPage = lazy(() => import('./components/GalleryDetailsPage'));
const SpinnerDetailsPage = lazy(() => import('./components/SpinnerDetailsPage'));
const ProductCardDetailsPage = lazy(() => import('./components/ProductCardDetailsPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

// Theme toggle component
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
      className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
};

const ConditionalFooter: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const location = useLocation();
  return location.pathname === '/' ? <Footer darkMode={darkMode} /> : null;
};
const App: React.FC = () => {
   const [darkMode, setDarkMode] = useState(true); // Initial state for dark mode

//const ThemeToggle: React.FC = () => {
 // const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


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
      <Header />
      <div className="theme-toggle-container p-4">
        <ThemeToggle />
      </div>
      <ScrollProgressBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path='/' element={<GlassyUILandingPage darkMode={darkMode}/>} />
          <Route path='/components' element={<GlassyUIComponentsPage darkMode={darkMode}/>} />
          <Route path='/toast-page' element={<ToastPage darkMode={darkMode}/>} />
          <Route path='/button-details' element={<ButtonDetailsPage darkMode={darkMode}/>} />
          <Route path='/card-details' element={<CardDetailsPage darkMode={darkMode}/>} />
          <Route
            path='/progress-bar-details'
            element={<ProgressBarDetailPage darkMode={darkMode}/>}
          />
          <Route path='/pricing-details' element={<PricingDetailPage darkMode={darkMode}/>} />
          <Route path='/popup-details' element={<PopupDetailPage darkMode={darkMode}/>} />
          <Route path='/input-details' element={<InputDetailPage darkMode={darkMode}/>} />
          <Route path='/textarea-details' element={<TextareaDetailPage darkMode={darkMode}/>} />
          <Route path='/tooltip-details' element={<TooltipDetailsPage darkMode={darkMode}/>} />
          <Route
            path='/speed-dial-details'
            element={<SpeedDialDetailsPage darkMode={darkMode}/>}
          />
          <Route path='/modal-details' element={<ModalDetailsPage darkMode={darkMode}/>} />
          <Route
            path='/navigation-details'
            element={<NavigationDetailsPage darkMode={darkMode}/>}
          />
          <Route path='/generator' element={<GlassMorphismGenrator darkMode={darkMode}/>} />
          <Route path='/slider-details' element={<SliderDetailsPage darkMode={darkMode}/>} />
          <Route
            path='/back-to-top-details'
            element={<BackToTopDetailsPage />}
          />
          <Route path='/dropdown-details' element={<DropdowndetailsPage darkMode={darkMode}/>} />
          <Route path='/authentication-card' element={<AuthenticationCard /darkMode={darkMode}>} />
          <Route path='/accordion-details' element={<AccordionDetails darkMode={darkMode}/>} />
          <Route path='/contributors' element={<ContributorsPage darkMode={darkMode}/>} />
          <Route path='/donate' element={<DonationPage darkMode={darkMode}/>} />
          <Route path='/about' element={<AboutUsPage darkMode={darkMode}/>} />
          <Route path='/contact-details' element={<ContactUsDetailsPage darkMode={darkMode}/>} />
          <Route path='/pagination-details' element={<PaginationDetails darkMode={darkMode} />} />
          <Route path='/testimonial-details' element={<TestimonialDetails darkMode={darkMode}/>} />
          <Route path='/calendar-details' element={<CalendarDetails />} />
          <Route
            path='/checkbox'
            element={
              <Checkbox
                checked={false}
                onChange={() => {}}
                label='Sample Checkbox'
              />
            }
          />
          <Route path='/statistic-details' element={<Statistic darkMode={darkMode}/>} />
          <Route path='/gallery-details' element={<GalleryDetailsPage darkMode={darkMode}/>} />
          <Route path='/spinner' element={<SpinnerDetailsPage darkMode={darkMode}/>} />
          <Route path='/product-details' element={<ProductCardDetailsPage darkMode={darkMode}/>} />
          <Route path='*' element={<NotFoundPage darkMode={darkMode}/>} />
          <Route path="/survey" element={<SurveyForm />} />
        </Routes>
      </Suspense>
      <ConditionalFooter darkMode={darkMode}/>
    </Router>
  );
};

export default App;
