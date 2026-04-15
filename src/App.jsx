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


import logo from './assets/IntelEdge.PNG';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <img src={logo} alt="Inteledge Logo" style={{ height: '35px', width: 'auto' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>INTELEDGE<span style={{ color: 'var(--accent-primary)' }}>.</span></div>
        </div>
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

const UseCases = () => (
  <section id="use-cases" style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505', padding: '100px 10%' }}>
    <div style={{ textAlign: 'left', width: '100%', marginBottom: '5rem' }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'max(4rem, 8vw)', fontWeight: 800, letterSpacing: '-5px', lineHeight: 0.9 }}>
        USE <br /><span className="gradient-text">CASES</span>
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '8px', opacity: 0.5, marginTop: '1.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>
        Proven Intelligence Architectures
      </p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%' }}>
      {[
        { title: "Autonomous Supply Chain", client: "Fortune 500 Retailer", impact: "32% Efficiency Gain" },
        { title: "Unified Risk Engine", client: "Global FinTech", impact: "Zero False Positives" }
      ].map((item, i) => (
        <div key={i} className="glass" style={{ padding: '60px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '3px' }}>{item.client}</span>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1.5rem 0' }}>{item.title}</h3>
          <div style={{ height: '2px', width: '40px', background: 'var(--accent-primary)', marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1.5rem', fontWeight: 900, opacity: 0.9 }}>{item.impact}</p>
        </div>
      ))}
    </div>
  </section>
);

const Insights = () => (
  <section id="insights" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', padding: '100px 10%' }}>
    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'max(4rem, 8vw)', fontWeight: 800, letterSpacing: '-5px' }}>
        INS<span className="gradient-text">IGHTS</span>
      </h2>
      <p style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '8px', opacity: 0.5, marginTop: '1rem', textTransform: 'uppercase', fontSize: '0.8rem' }}>
        Advancing the field of Systemic Intelligence
      </p>
    </div>
    <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ flex: 1, height: '400px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <span style={{ opacity: 0.3, fontSize: '0.8rem', letterSpacing: '2px' }}>APRIL 2026</span>
          <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '1rem' }}>The Architecture of Autonomy: Beyond LLM Wrappers</h4>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#050505', padding: '100px 10%' }}>
    <div style={{ width: '100%', maxWidth: '1200px' }}>
      <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'max(5rem, 10vw)', fontWeight: 800, letterSpacing: '-8px', lineHeight: 0.8 }}>
        READY TO <br /><span className="gradient-text">INITIALIZE?</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginTop: '6rem' }}>
        <div>
          <p style={{ fontSize: '1.5rem', opacity: 0.6, lineHeight: 1.5, marginBottom: '3rem' }}>
            Transform your enterprise architecture from human-led to intelligence-first. Our partners are ready to discuss your systemic evolution.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>hello@inteledge.com</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>+1 (800) ARCHITECT</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <input type="text" placeholder="FULL NAME" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', color: '#fff', fontSize: '1rem', outline: 'none' }} />
          <input type="email" placeholder="ENTERPRISE EMAIL" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', color: '#fff', fontSize: '1rem', outline: 'none' }} />
          <textarea placeholder="SYSTEM REQUIREMENTS" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', color: '#fff', fontSize: '1rem', outline: 'none', minHeight: '150px' }} />
          <button className="interactive" style={{ marginTop: '2rem', padding: '30px', borderRadius: '100px', background: 'var(--accent-primary)', color: '#000', fontWeight: 900, fontSize: '1.2rem' }}>SEND INITIATION REQUEST</button>
        </div>
      </div>
    </div>
  </section>
);

const App = () => {
  const [theme, setTheme] = useState('cyan');
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', () => {
      import('gsap').then(({ default: gsap }) => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.update();
        });
      });
    });

    import('gsap').then(({ default: gsap }) => {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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
              background: '#000',
              width: '100%',
              minHeight: '100vh',
              position: 'relative',
              zIndex: 2
            }}
          >
            <Global3DLayer theme={theme} scale={0.8} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <CustomCursor theme={theme} />
              <Navbar theme={theme} />

              <main style={{ position: 'relative', background: '#000' }}>
                <Hero theme={theme} /> {/* HOME */}
                <WhoWeAre theme={theme} id="about" /> {/* ABOUT */}
                <div style={{ height: '20vh' }} />
                <AIAFramework theme={theme} id="services" /> {/* SERVICES PART 1 */}
                <ServicesGrid theme={theme} /> {/* SERVICES PART 2 */}
                <Divisions setGlobalTheme={setTheme} mode="labs" id="labs" /> {/* LABS */}
                <UseCases />
                <Insights />
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
