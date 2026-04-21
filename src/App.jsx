import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Layout & Common Components
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/common/CustomCursor';
import ScrollBall from './components/common/ScrollBall';
import Global3DLayer from './components/common/Global3DLayer';
import Intro from './components/layout/Intro';
import FloatingContact from './components/common/FloatingContact';

// Sections
import Hero from './components/sections/Hero';
import ProductsSlider from './components/sections/FeaturesGrid';
import AIAFramework from './components/sections/AIAFramework';
import Storytelling from './components/sections/Storytelling';
import Testimonials from './components/sections/Testimonials';
import TeamAccordion from './components/sections/Team';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import LabsAdvisoryHero from './components/sections/LabsAdvisoryHero';
import GapsSection from './components/sections/GapsSection';


const Vision = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0.8, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <section id="vision" style={{ textAlign: 'center', padding: '200px 5%' }}>
      <motion.div style={{ scale, opacity }}>
        <h2 style={{ fontSize: 'max(5rem, 8vw)', fontWeight: 800, letterSpacing: '-5px', lineHeight: 0.9 }}>
          AI IS NOT AN INITIATIVE. <br />
          <span className="gradient-text">IT IS INFRASTRUCTURE.</span>
        </h2>
        <p style={{ marginTop: '4rem', fontSize: '1.5rem', opacity: 0.5, maxWidth: '800px', margin: '4rem auto 0 auto' }}>
          We design the systems that make intelligence pervasive, autonomous, and architecturally sound.
        </p>
      </motion.div>
    </section>
  );
};






const App = () => {
  const [theme, setTheme] = useState('cyan');
  const [showIntro, setShowIntro] = useState(true);
  const servicesRef = useRef(null);
  const lenisRef = useRef(null);
  const servicesScrollLockedRef = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleServicesScrollLock = (e) => {
      servicesScrollLockedRef.current = Boolean(e?.detail?.locked);
      if (servicesScrollLockedRef.current) {
        lenis.stop();
      } else if (!showIntro) {
        lenis.start();
      }
    };
    window.addEventListener('services-scroll-lock', handleServicesScrollLock);

    if (showIntro) {
      lenis.stop();
      window.scrollTo(0, 0);
    } else {
      lenis.start();
    }

    return () => {
      window.removeEventListener('services-scroll-lock', handleServicesScrollLock);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [showIntro]);

  return (
    <div className={`app-container theme-${theme}`} style={{ background: '#000', color: '#fff', minHeight: '100vh', overflow: showIntro ? 'hidden' : 'auto' }}>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <Intro
            key="intro-screen"
            onFinish={() => {
              setShowIntro(false);
              window.scrollTo(0, 0);
            }}
          />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'transparent',
              width: '100%',
              minHeight: '100vh',
              position: 'relative',
              zIndex: 2
            }}
          >

            <Global3DLayer theme={theme} scale={0.8} servicesRef={servicesRef} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <CustomCursor theme={theme} />
              <FloatingContact />
              <Navbar theme={theme} />

              <main style={{ position: 'relative', background: 'transparent' }}>
                <Hero /> {/* HOME — Web3 Hero */}
                <About /> {/* NEW ABOUT SECTION */}
                <GapsSection /> {/* NEW GAPS SECTION */}
                <AIAFramework /> {/* AIA FRAMEWORK SECTION */}
                <LabsAdvisoryHero /> {/* LABS & ADVISORY + TRAINING & PROGRAMS */}
                <ProductsSlider theme={theme} /> {/* PRODUCTS SLIDER */}
                <Testimonials />
                <Contact />
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
