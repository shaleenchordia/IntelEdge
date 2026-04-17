import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

// Layout & Common Components
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/common/CustomCursor';
import ScrollBall from './components/common/ScrollBall';
import Global3DLayer from './components/common/Global3DLayer';
import Intro from './components/layout/Intro';
import Footer from './components/layout/Footer';

// Sections
import Hero from './components/sections/Hero';
import AIAFramework from './components/sections/AIAFramework';
//import Divisions from './components/sections/Divisions';
import ServicesGrid from './components/sections/ServicesGrid';
import Storytelling from './components/sections/Storytelling';
import WhoWeAre from './components/sections/WhoWeAre';
import AboutStats from './components/sections/AboutStats';
import OrbitalPartners from './components/sections/OrbitalPartners';
import Contact from './components/sections/Contact';
import LabsAdvisoryPage from './components/sections/LabsAdvisoryHero';
import ProductsSlider from './components/sections/Products';
import Testimonials from './components/sections/Testimonials';
import logo from './assets/inteledge.webp';

// ─────────────────────────────────────────────────────────────────────────────
// ScrollSection — wraps a section and animates it OUT as it leaves the viewport.
// Each section slides over the previous one (z-index stacking + -ve margin).
// ─────────────────────────────────────────────────────────────────────────────

const ScrollSection = ({ children, zIndex, noExit = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Smooth the raw scroll progress so the exit feels fluid, not mechanical
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const scale = useTransform(smooth, [0.6, 1], [1, 0.88]);
  const opacity = useTransform(smooth, [0.7, 1], [1, 0]);
  const y = useTransform(smooth, [0.6, 1], [0, -40]);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        zIndex,
        // negative margin pulls each section up so they *overlap* — the new section
        // slides on top of the previous one like stacked cards
        marginTop: zIndex > 1 ? '-6px' : 0,
      }}
    >
      {noExit ? (
        children
      ) : (
        <motion.div style={{ scale, opacity, y, transformOrigin: 'top center', willChange: 'transform, opacity' }}>
          {children}
        </motion.div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Inline section components
// ─────────────────────────────────────────────────────────────────────────────

const LabsAdvisoryIntro = () => (
  <section
    style={{
      minHeight: '55vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050505',
      padding: '100px 10%',
      textAlign: 'center',
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <span style={{
        display: 'block',
        fontSize: '0.65rem',
        fontWeight: 800,
        letterSpacing: '5px',
        textTransform: 'uppercase',
        color: 'var(--accent-primary)',
        fontFamily: "'Montserrat', sans-serif",
        marginBottom: '2.5rem',
      }}>
        The Inteledge Model
      </span>
      <p style={{
        fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        color: 'rgba(255,255,255,0.75)',
        lineHeight: 1.55,
        maxWidth: '820px',
        margin: '0 auto',
        fontWeight: 300,
        letterSpacing: '-0.5px',
      }}>
        We operate at the intersection of deep technical capability and strategic intelligence.{' '}
        <span style={{ color: '#fff', fontWeight: 600 }}>Two disciplines.</span>{' '}
        <span style={{ color: '#fff', fontWeight: 600 }}>One unified practice.</span>
      </p>
    </motion.div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────

const App = () => {
  const [theme, setTheme] = useState('cyan');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (showIntro) {
      lenis.stop();
      window.scrollTo(0, 0);
    } else {
      lenis.start();
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showIntro]);

  return (
    <div
      className={`app-container theme-${theme}`}
      style={{ background: '#050505', color: '#fff', minHeight: '100vh', overflow: showIntro ? 'hidden' : 'auto' }}
    >
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: '#050505', width: '100%', minHeight: '100vh', position: 'relative', zIndex: 2 }}
          >
            <Global3DLayer theme={theme} scale={0.8} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <CustomCursor theme={theme} />
              <Navbar theme={theme} />

              <main style={{ position: 'relative', background: '#050505' }}>
                {/*
                  z-index stacking: each section slides ON TOP of the previous.
                  noExit on sections that already manage their own scroll animation.
                */}
                <ScrollSection zIndex={1}>
                  <Hero theme={theme} />
                </ScrollSection>

                <ScrollSection zIndex={2} noExit>
                  {/* WhoWeAre has its own scroll-driven opacity/y — skip exit wrapper */}
                  <WhoWeAre theme={theme} id="about-us" />
                </ScrollSection>

                <ScrollSection zIndex={3}>
                  <AboutStats />
                </ScrollSection>

                <ScrollSection zIndex={4}>
                  <OrbitalPartners />
                </ScrollSection>

                <ScrollSection zIndex={5}>
                  <AIAFramework theme={theme} id="services" />
                </ScrollSection>

                <ScrollSection zIndex={6}>
                  <LabsAdvisoryIntro />
                </ScrollSection>

                <ScrollSection zIndex={7} noExit>
                  <LabsAdvisoryPage />
                </ScrollSection>


                <ScrollSection zIndex={9} noExit>
                  {/* ServicesGrid uses internal sticky scroll — skip exit to not interfere */}
                  <ServicesGrid theme={theme} />
                </ScrollSection>

                <ScrollSection zIndex={10}>
                  <ProductsSlider id="products" />
                </ScrollSection>

                <ScrollSection zIndex={11}>
                  <Testimonials id="testimonials" />
                </ScrollSection>

                <ScrollSection zIndex={13}>
                  <Contact id="contact" />
                </ScrollSection>
              </main>

              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
