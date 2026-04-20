import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitectureCore from './ArchitectureCore';

import WiproLogo     from '../../../assets/wipro.png';
import HCLLogo       from '../../../assets/hcl.png';
import TataAigLogo   from '../../../assets/tataaig.png';
import AccentureLogo from '../../../assets/accenture.png';
import PwcLogo       from '../../../assets/pwc.jpeg';
import UiPathLogo    from '../../../assets/uipath.png';
import IciciLogo     from '../../../assets/icici.png';
import BajajLogo     from '../../../assets/bajaj.png';
import DlfLogo       from '../../../assets/dlf.png';
import SiemensLogo   from '../../../assets/siemens.png';

gsap.registerPlugin(ScrollTrigger);

/* ─── Logo data ─────────────────────────────────────────── */
const logoMeta = [
  { src: WiproLogo,     name: 'Wipro' },
  { src: HCLLogo,       name: 'HCL' },
  { src: TataAigLogo,   name: 'Tata AIG' },
  { src: AccentureLogo, name: 'Accenture' },
  { src: PwcLogo,       name: 'PwC' },
  { src: UiPathLogo,    name: 'UiPath' },
  { src: IciciLogo,     name: 'ICICI' },
  { src: BajajLogo,     name: 'Bajaj' },
  { src: DlfLogo,       name: 'DLF' },
  { src: SiemensLogo,   name: 'Siemens' },
];

/* ─── Scrolling logo strip ───────────────────────────────── */
const LogoStrip = () => {
  const displayLogos = [...logoMeta, ...logoMeta, ...logoMeta];
  const [paused, setPaused]         = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <>
      <style>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        .logo-track { animation: logoScroll 40s linear infinite; }
        .logo-track.paused { animation-play-state: paused; }
      `}</style>

      <div style={{
        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '5px',
        color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase',
        marginBottom: '1.5rem', paddingLeft: '2px',
      }}>
        Trusted by industry leaders
      </div>

      <div
        style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '1.5rem 0', cursor: 'default' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredIdx(null); }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #050505 0%, transparent 12%, transparent 88%, #050505 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div
          className={`logo-track${paused ? ' paused' : ''}`}
          style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
        >
          {displayLogos.map((logo, index) => {
            const isHovered = hoveredIdx === index;
            return (
              <div
                key={index}
                style={{ paddingRight: '100px', position: 'relative', flexShrink: 0 }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div style={{
                  position: 'absolute', inset: '-10px',
                  borderRadius: '10px',
                  background: isHovered
                    ? 'radial-gradient(ellipse at center, rgba(0,242,255,0.12), transparent 70%)'
                    : 'transparent',
                  transition: 'background 0.35s ease',
                  pointerEvents: 'none',
                }} />
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: '44px',
                    width: 'auto',
                    display: 'block',
                    filter: isHovered
                      ? 'brightness(1.15) saturate(1.3) drop-shadow(0 0 8px rgba(0,242,255,0.4))'
                      : 'grayscale(1) invert(1) brightness(1.1)',
                    mixBlendMode: isHovered ? 'normal' : 'screen',
                    opacity: isHovered ? 1 : 0.45,
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'filter 0.35s ease, opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative', zIndex: 1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

/* ─── Architectural background grid ─────────────────────── */
const ArchitecturalBackground = ({ color }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: 'none' }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 5px rgba(0,242,255,0.2))' }}>
      <defs>
        <pattern id="archGrid" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#archGrid)" />
      <motion.line x1="20%" y1="0" x2="20%" y2="100%" stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: 'easeInOut' }} />
      <motion.line x1="80%" y1="0" x2="80%" y2="100%" stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }} />
      <motion.line x1="0" y1="30%" x2="100%" y2="30%" stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 1 }} />
    </svg>
  </div>
);

/* ─── Main Section ───────────────────────────────────────── */
const WhoWeAre = ({ theme, id }) => {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const titleRef   = useRef(null);
  const engineRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=80%',
        pin: true,
        scrub: 1,
      });

      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -100, filter: 'blur(10px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', end: 'top 20%', scrub: true },
        }
      );

      const lines = textRef.current.querySelectorAll('p');
      gsap.fromTo(lines,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', end: 'top 10%', scrub: true },
        }
      );

      gsap.to(titleRef.current, {
        y: -50, x: 20,
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });

      gsap.to(engineRef.current, {
        rotateY: 35, rotateX: -10, z: 100,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 50%', end: 'bottom top', scrub: true },
      });

      gsap.from('.stat-item', {
        opacity: 0, y: 40, stagger: 0.2, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 40%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id || 'who-we-are'}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        background: '#050505',
        zIndex: 2,
      }}
    >
      <ArchitecturalBackground color={theme.mode === 'labs' ? '#ff00f2' : '#00f2ff'} />

      <div style={{
        position: 'absolute', top: '50%', right: '-10%',
        width: '50%', height: '80%',
        background: 'var(--accent-glow)', filter: 'blur(150px)',
        borderRadius: '50%', zIndex: 1, opacity: 0.3,
      }} />

      {/* Two-column header + 3D canvas */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5%',
        width: '100%', padding: '0 5%', zIndex: 2, position: 'relative',
      }}>
        <div ref={textRef}>
          <motion.h2
            ref={titleRef}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'max(3.5rem, 6vw)', fontWeight: 800,
              lineHeight: 0.9, letterSpacing: '-3px',
              marginBottom: '2.5rem', color: 'var(--text-primary)',
            }}
          >
            THE ARCHITECTURE OF <span className="gradient-text">AUTONOMY.</span>
          </motion.h2>

          <div ref={textRef} style={{ maxWidth: '550px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.4, opacity: 0.8, color: 'var(--text-primary)', fontWeight: 500 }}>
              We don't just implement AI. We architect the systems that allow intelligence to thrive
              as the core engine of the modern enterprise.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.5, color: 'var(--text-primary)' }}>
              Inteledge was born from the realization that most enterprises are trapped in legacy
              human-led architectures. We provide the blueprint for the transition to non-linear,
              autonomous scale.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
            <div className="stat-item">
              <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>14+</h4>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 900 }}>Years Experience</span>
            </div>
            <div className="stat-item">
              <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>50+</h4>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 900 }}>Enterprise Systems</span>
            </div>
          </div>
        </div>

        <div style={{ height: '65vh', position: 'relative', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <div ref={engineRef} style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ArchitectureCore theme={theme} />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Scrolling Logo Strip */}
      <div style={{ width: '100%', padding: '0 5%', zIndex: 2, position: 'relative', marginTop: '0.5rem' }}>
        <LogoStrip />
      </div>
    </section>
  );
};

export default WhoWeAre;
