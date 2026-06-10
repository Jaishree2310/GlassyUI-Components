import React, { useEffect, useRef, useMemo } from 'react';
import PricingDetailPage from './components/PricingDetailPage';
import { GlassyProvider } from './components/GlassyProvider';
import ThemeCustomizer from './components/ThemeCustomizer';
import useAdaptiveBackgroundIntelligence from './hooks/useAdaptiveBackgroundIntelligence';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import FloatingBottomBar from './components/FloatingBottomBar';
import BackToTopButton from './components/BackToTop';
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
import StepperDetailsPage from './components/StepperDetailsPage';
import AuthenticationCard from './components/AuthenticationCards';
import ToastPage from './components/ToastPage';
import AccordionDetails from './components/AccordionDetails';
import ContactUsDetailsPage from './components/ContactUsDetailsPage';
import PaginationDetails from './components/PaginationDetails';
import TestimonialDetails from './components/TestimonialDetails';
import Footer from './components/Footer';
import CalendarDetails from './components/CalendarDetails';
import Checkbox from './components/Checkbox';
import Statistic from './components/StatisticDetails';
import GalleryDetailsPage from './components/GalleryDetailsPage';
import SpinnerDetailsPage from './components/SpinnerDetailsPage';
import ProductCardDetailsPage from './components/ProductCardDetailsPage';
import ContactUs from './components/ContactUs';
import AiChatbot from './components/AIChatbot';
import AdaptiveBackgroundIntelligenceDemo from './components/AdaptiveBackgroundIntelligenceDemo';
import { TermsOfUse } from './components/TermsOfUse';
import TabsDetailsPage from './components/TabsDetails'; // ── NEW ──
import AnimatedCursorPage from './components/AnimatedCursorPage';
import AnimatedCursor from './components/AnimatedCursor';

import Stories from './components/Stories';

const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const adaptiveMetrics = useAdaptiveBackgroundIntelligence(canvasRef, {
    updateInterval: 120,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrame: number;

    const drawScene = (time: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(6, 10, 34, 0.96)');
      gradient.addColorStop(0.4, 'rgba(30, 41, 59, 0.88)');
      gradient.addColorStop(1, 'rgba(79, 70, 229, 0.72)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 5; i += 1) {
        const x = (Math.sin(time / (900 + i * 120)) * 0.35 + 0.5) * width;
        const y = (Math.cos(time / (1100 + i * 130)) * 0.35 + 0.5) * height;
        const radius = 70 + i * 18;
        const glow = ctx.createRadialGradient(x, y, 4, x, y, radius);
        glow.addColorStop(
          0,
          `rgba(${200 - i * 12}, ${120 + i * 10}, ${255 - i * 8}, 0.35)`,
        );
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(drawScene);
    };

    animationFrame = requestAnimationFrame(drawScene);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const adaptiveStyle = useMemo(
    () =>
      ({
        '--adaptive-blur': `${adaptiveMetrics.blur}px`,
        '--adaptive-opacity': adaptiveMetrics.opacity.toString(),
        '--adaptive-border-opacity': adaptiveMetrics.borderOpacity.toString(),
        '--adaptive-glow': adaptiveMetrics.glowIntensity.toString(),
        '--adaptive-shadow': `${adaptiveMetrics.shadowSoftness}px`,
        '--adaptive-text-color': adaptiveMetrics.textColor,
        '--adaptive-base-tint': adaptiveMetrics.baseTint,
        '--adaptive-accent': adaptiveMetrics.accentColor,
      }) as React.CSSProperties,
    [adaptiveMetrics],
  );

  return (
    <GlassyProvider>
      <div className='adaptive-app-shell' style={adaptiveStyle}>
        <canvas
          ref={canvasRef}
          className='adaptive-sampler'
          aria-hidden='true'
        />
        <Router>
          <ScrollToTop />
          <Header />
          <AiChatbot />
          <BackToTopButton />
          <AnimatedCursor />
          <ThemeCustomizer />
          {/* <ThemeToggle /> */}
          <div className='adaptive-glass page-shell'>
            <Routes>
              <Route path='/animated-cursor' element={<AnimatedCursorPage />} />
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
              <Route
                path='/textarea-details'
                element={<TextareaDetailPage />}
              />
              <Route path='/tooltip-details' element={<TooltipDetailsPage />} />
              <Route
                path='/speed-dial-details'
                element={<SpeedDialDetailsPage />}
              />
              <Route path='/modal-details' element={<ModalDetailsPage />} />
              <Route
                path='/navigation-details'
                element={<NavigationDetailsPage />}
              />
              <Route path='/generator' element={<GlassMorphismGenrator />} />
              <Route path='/slider-details' element={<SliderDetailsPage />} />
              <Route
                path='/back-to-top-details'
                element={<BackToTopDetailsPage />}
              />
              <Route
                path='/dropdown-details'
                element={<DropdowndetailsPage />}
              />
              <Route path='/stepper-details' element={<StepperDetailsPage />} />
              <Route
                path='/authentication-card'
                element={<AuthenticationCard />}
              />
              <Route path='/accordion-details' element={<AccordionDetails />} />
              <Route path='/contributors' element={<ContributorsPage />} />
              <Route path='/donate' element={<DonationPage />} />
              <Route path='/about' element={<AboutUsPage />} />
              <Route
                path='/contact-details'
                element={<ContactUsDetailsPage />}
              />
              <Route
                path='/pagination-details'
                element={<PaginationDetails />}
              />
              <Route
                path='/testimonial-details'
                element={<TestimonialDetails />}
              />
              <Route path='/calendar-details' element={<CalendarDetails />} />
              <Route path='/statistic-details' element={<Statistic />} />
              <Route path='/checkbox' element={<Checkbox />} />
              <Route path='/spinner' element={<SpinnerDetailsPage />} />
              <Route
                path='/product-details'
                element={<ProductCardDetailsPage />}
              />
              <Route path='/gallery-details' element={<GalleryDetailsPage />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route
                path='/adaptive-background-intelligence'
                element={<AdaptiveBackgroundIntelligenceDemo />}
              />
              <Route path='/termsOfUse' element={<TermsOfUse />} />

              <Route path='/stories' element={<Stories />} />

              {/* <Route path='/signup' element={<Register />} /> */}
              {/* <Route path='/signin' element={<SignIn />} /> */}

              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
          <FloatingBottomBar />
        </Router>
      </div>
    </GlassyProvider>
  );
};

const ConditionalFooter: React.FC = () => {
  const location = useLocation();
  return location.pathname === '/' ? null : <Footer />;
};

export default App;
