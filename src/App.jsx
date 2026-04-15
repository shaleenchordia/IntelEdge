import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';

// Core Components
import Navbar from './components/core/Navbar';
import CustomCursor from './components/core/CustomCursor';
import ScrollBall from './components/core/ScrollBall';
import Global3DLayer from './components/core/Global3DLayer';

// Sections
import Hero from './components/sections/Hero';
import AIAFramework from './components/sections/AIA';
import Divisions from './components/sections/Divisions';
import ServicesGrid from './components/sections/Services';
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

function App() {
  const [theme, setTheme] = useState({
    accent: '#00f2ff',
    glow: 'rgba(0, 242, 255, 0.15)',
    mode: 'advisory'
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };

    // Update CSS variables when theme changes
    document.documentElement.style.setProperty('--dynamic-accent', theme.accent);
    document.documentElement.style.setProperty('--dynamic-glow', theme.glow);
  }, [theme]);

  const toggleTheme = (mode) => {
    if (mode === 'labs') {
      setTheme({ accent: '#ff00f2', glow: 'rgba(255, 0, 242, 0.15)', mode: 'labs' });
    } else {
      setTheme({ accent: '#00f2ff', glow: 'rgba(0, 242, 255, 0.15)', mode: 'advisory' });
    }
  };

  return (
    <div className="app-container">
      <Global3DLayer theme={theme} />
      <CustomCursor theme={theme} />
      <ScrollBall />
      <Navbar />
      
      <main>
        <Hero theme={theme} />
        <WhoWeAre theme={theme} />
        <Divisions setGlobalTheme={toggleTheme} />
        <ServicesGrid />
        <AIAFramework theme={theme} />
        <Storytelling />
        <Vision />
      </main>

      <Footer />
    </div>
  );
}

export default App;
