import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Layout & Common Components
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/common/CustomCursor';
import ScrollBall from './components/common/ScrollBall';
import Global3DLayer from './components/common/Global3DLayer';
import Intro from './components/layout/Intro';

// Sections
import Hero from './components/sections/Hero';
import AIAFramework from './components/sections/AIAFramework';
import Divisions from './components/sections/Divisions';
import ServicesGrid from './components/sections/ServicesGrid';
import Storytelling from './components/sections/Storytelling';
import WhoWeAre from './components/sections/WhoWeAre';


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

const Footer = () => (
  <footer className="glass" style={{ padding: '80px 5%', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>INTELEDGE<span style={{ color: 'var(--accent-primary)' }}>.</span></div>
        <p style={{ opacity: 0.4, maxWidth: '300px', fontSize: '0.9rem' }}>
          Applied Intelligence Architecture for the modern enterprise.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '4rem' }}>
        <div>
          <h5 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase' }}>Division</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>Advisory</li>
            <li>Labs</li>
          </ul>
        </div>
        <div>
          <h5 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', opacity: 0.3, letterSpacing: '2px', textTransform: 'uppercase' }}>Company</h5>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li>About</li>
            <li>About Us</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', opacity: 0.3, fontSize: '0.8rem' }}>
      <span>© 2026 Inteledge Advisory & Labs. All rights reserved.</span>
      <span>Privacy Policy / Terms of Service</span>
    </div>
  </footer>
);

const App = () => {
  const [theme, setTheme] = useState('cyan');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize scroll position
    if (showIntro) {
      lenis.stop();
      window.scrollTo(0, 0);
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [showIntro]);

  return (
    <div className={`app-container theme-${theme}`} style={{ background: '#000', color: '#fff', minHeight: '100vh', overflow: showIntro ? 'hidden' : 'auto' }}>
      <CustomCursor theme={theme} />
      <Global3DLayer theme={theme} />
      
      <AnimatePresence>
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
            initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            style={{
              background: '#000',
              width: '100%',
              minHeight: '100vh',
              position: 'relative',
              zIndex: 1
            }}
          >
            <Navbar theme={theme} />

            <main style={{ position: 'relative', zIndex: 2 }}>
              <Hero theme={theme} />
              <WhoWeAre theme={theme} />
              <AIAFramework theme={theme} />
              <Divisions setGlobalTheme={setTheme} />
              <ServicesGrid theme={theme} />
              <Storytelling theme={theme} />
              <Vision />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
