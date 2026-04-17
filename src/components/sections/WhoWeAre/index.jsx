import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ArchitectureCore from './ArchitectureCore';

import WiproLogo     from "../../../assets/wipro.png";
import HCLLogo       from "../../../assets/hcl.png";
import TataAigLogo   from "../../../assets/tataaig.png";
import AccentureLogo from "../../../assets/accenture.png";
import PwcLogo       from "../../../assets/pwc.jpeg";
import UiPathLogo    from "../../../assets/uipath.png";

const logoMeta = [
  { src: WiproLogo,     name: 'Wipro' },
  { src: HCLLogo,       name: 'HCL' },
  { src: TataAigLogo,   name: 'Tata AIG' },
  { src: AccentureLogo, name: 'Accenture' },
  { src: PwcLogo,       name: 'PwC' },
  { src: UiPathLogo,    name: 'UiPath' },
];

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

      <div
        style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '2.5rem 0', cursor: 'default' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredIdx(null); }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, #050505 0%, transparent 15%, transparent 85%, #050505 100%)',
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
                style={{ paddingRight: '140px', position: 'relative' }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div style={{
                  position: 'absolute', inset: '-12px',
                  borderRadius: '12px',
                  background: isHovered ? 'radial-gradient(ellipse at center, rgba(0,242,255,0.15), transparent 70%)' : 'transparent',
                  transition: 'background 0.35s ease',
                  pointerEvents: 'none',
                }} />
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    height: '50px', width: 'auto', display: 'block',
                    filter: isHovered
                      ? 'brightness(1.15) saturate(1.3) drop-shadow(0 0 8px rgba(0,242,255,0.4))'
                      : 'grayscale(1) invert(1) brightness(1.2)',
                    mixBlendMode: isHovered ? 'normal' : 'screen',
                    opacity: isHovered ? 1 : 0.55,
                    transform: isHovered ? 'scale(1.12)' : 'scale(1)',
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

const WhoWeAre = ({ theme, id }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.05, 0.3, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.05, 0.3], [60, 0]);
  const explodeRef = useRef(0);

  return (
    <section
      ref={sectionRef}
      id={id || 'who-we-are'}
      style={{
        minHeight: '90vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        background: '#050505',
        padding: '5rem 0',
        zIndex: 2,
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <ArchitectureCore explodeRef={explodeRef} />
        </Canvas>
      </div>

      <motion.div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 6%',
        zIndex: 2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        opacity,
        y,
      }}>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'max(3.2rem, 7vw)',
          fontWeight: 400, lineHeight: 0.95,
          letterSpacing: '-3px',
          margin: '0 0 0 auto', maxWidth: '1000px',
          background: 'linear-gradient(135deg, #ffffff 40%, #ffcc44 70%, #4488ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          Lighting the <br />
          way across <br />
          <span style={{ fontWeight: 600 }}>the Industry</span>
        </h2>

        <div style={{
          marginTop: '2.5rem', maxWidth: '520px',
          textAlign: 'right', display: 'flex',
          flexDirection: 'column', alignItems: 'flex-end',
        }}>
          <div style={{
            fontSize: '0.75rem', fontWeight: 800,
            color: 'var(--accent-primary)',
            textTransform: 'uppercase',
            letterSpacing: '5px', marginBottom: '1rem',
          }}>
            Adoption — Sustain & Scale
          </div>
          <p style={{
            fontSize: '1.2rem', lineHeight: 1.5,
            color: '#e0e0e0', marginBottom: '2rem',
            fontWeight: 300,
          }}>
            Human-first AI integration. We deliver long-term success through{' '}
            <span style={{ fontWeight: 600, color: '#fff' }}>workflow evolution</span>,
            governance, and cultural shift.
          </p>
          <div style={{
            padding: '1rem 1.8rem',
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(8px)',
            borderRadius: '4px',
            borderRight: '2px solid var(--accent-primary)',
          }}>
            <p style={{ fontSize: '0.9rem', color: '#ddd', lineHeight: 1.4, textAlign: 'right' }}>
              <span style={{
                color: 'var(--accent-primary)', fontWeight: 800,
                textTransform: 'uppercase', fontSize: '0.65rem',
                letterSpacing: '1px', marginRight: '8px',
              }}>Outcome:</span>
              A seamless 'AI-first' culture where technology and talent are perfectly unified.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '3rem', width: '100%' }}>
          <LogoStrip />
        </div>
      </motion.div>
    </section>
  );
};

export default WhoWeAre;
