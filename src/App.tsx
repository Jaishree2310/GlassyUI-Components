/*Changing the App UI from dark to light pink*/

 upd-feature-branch
import React, { useState, useEffect } from 'react';
import PricingDetailPage from './components/PricingDetailPage';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Router>
      <Header />

import ContactUsDetailsPage from './components/ContactUsDetailsPage';
import PaginationDetails from './components/PaginationDetails';
import TestimonialDetails from './components/TestimonialDetails';
import Footer from './components/Footer';



import CalendarDetails from './components/CalendarDetails';
import Checkbox from './components/Checkbox';
import Statistic from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import Checkbox from './components/Checkbox';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';

import ProductCardDetailsPage from './components/ProductCardDetailsPage';
import Statistic from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import Checkbox from './components/Checkbox';
 
 import SpinnerDetailsPage from './components/SpinnerDetailsPage';

 upd-feature-branch
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


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      {/* Theme Toggle Button */}
       className="theme-toggle-container p-4"
        <ThemeToggle />
      

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

        {/*the DonationPage route */}
        <Route path='/' element={<GlassyUILandingPage />} />
        <Route path='/donate' element={<DonationPage />} />

        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact-details' element={<ContactUsDetailsPage />} />
        <Route path='/pagination-details' element={<PaginationDetails />} />
        <Route path='/testimonial-details' element={<TestimonialDetails />} />


        <Route path='/calendar-details' element={<CalendarDetails />} />
        <Route path='/checkbox' element={<Checkbox />} />

          <Route path='/statistic-details' element={<Statistic />} />
          <Route path='/gallery-details' element={<GalleryDetailsPage />} />


  
        <Route path='/checkbox' element={<Checkbox />} />
 

        <Route path='/spinner' element={<SpinnerDetailsPage />} />

           <Route path='/product-details' element={<ProductCardDetailsPage />} />
          <Route path='/gallery-details' element={<GalleryDetailsPage />} />
 
 
           <Route path='/statistic-details' element={<Statistic />} />
          <Route path='/gallery-details' element={<GalleryDetailsPage />} />


        {/* the AboutUs Page route */}
        <Route path='/about' element={<AboutUsPage />} />


        <Route path='*' element={<NotFoundPage />} />


         <Route path='*' element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
};

export default App;
