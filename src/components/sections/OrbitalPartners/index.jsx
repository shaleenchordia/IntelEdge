import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Assets ───────────────────────────────────────── */
import WiproLogo from '../../../assets/wipro.png';
import HCLLogo from '../../../assets/hcl.png';
import TataAigLogo from '../../../assets/tataaig.png';
import AccentureLogo from '../../../assets/accenture.png';
import PwcLogo from '../../../assets/pwc.jpeg';
import UiPathLogo from '../../../assets/uipath.png';
import SiemensLogo from '../../../assets/siemens.png';
import BajajLogo from '../../../assets/bajaj.png';
import AxisLogo from '../../../assets/axisbank.jpeg';
import IciciLogo from '../../../assets/icici.png';
import DlfLogo from '../../../assets/dlf.png';
import IimLogo from '../../../assets/iim-lucknow.jpeg';
import PnbLogo from '../../../assets/pnb.png';

/* ─────────────────────────────────────────────────────────
   RING CONFIG
   radius: px from center point
───────────────────────────────────────────────────────── */
const RINGS = [
  {
    radius: 120,
    duration: 35,
    direction: 1,
    logos: [
      { src: UiPathLogo, name: 'UiPath' },
      { src: AccentureLogo, name: 'Accenture' },
    ],
  },
  {
    radius: 195,
    duration: 45,
    direction: -1,
    logos: [
      { src: PwcLogo, name: 'PwC' },
      { src: HCLLogo, name: 'HCL' },
      { src: SiemensLogo, name: 'Siemens' },
    ],
  },
  {
    radius: 270,
    duration: 55,
    direction: 1,
    logos: [
      { src: TataAigLogo, name: 'Tata AIG' },
      { src: AxisLogo, name: 'Axis Bank' },
      { src: IciciLogo, name: 'ICICI' },
      { src: DlfLogo, name: 'DLF' },
    ],
  },
  {
    radius: 350,
    duration: 65,
    direction: -1,
    logos: [
      { src: IimLogo, name: 'IIM Lucknow' },
      { src: PnbLogo, name: 'PNB' },
      { src: WiproLogo, name: 'Wipro' },
      { src: BajajLogo, name: 'Bajaj' },
      { src: HCLLogo, name: 'HCL' },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   A full revolving circle that gets masked by its parent.
   Logos are spread around 360 degrees.
───────────────────────────────────────────────────────── */
const Ring = ({ radius, duration, direction, logos }) => {
  const logoCount = logos.length;
  const angleStep = 360 / logoCount;

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: 0,
      height: 0,
      zIndex: 1,
    }}>
      <motion.div
        animate={{ rotate: direction * 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          bottom: -radius,   // center of circle at Y=0 (the flat bottom)
          left: -radius,     // center of circle at X=0
          width: radius * 2,
          height: radius * 2,
          borderRadius: '50%',
          border: '1.5px solid rgba(0,242,255,0.15)', // full arc
          boxSizing: 'border-box', // Crucial to ensure mathematical radius perfectly matches visual border line
        }}
      >
        {logos.map((logo, i) => {
          const angleDeg = i * angleStep;
          const angleRad = (angleDeg * Math.PI) / 180;
          
          // Logo dimensions
          const logoWidth = 55;
          const logoHeight = 35;
          
          // Calculate x, y relative to center of the full circle
          const x = radius * Math.cos(angleRad);
          const y = radius * Math.sin(angleRad);
          
          // Pre-calculate exact center offset without relying on CSS transform translate (which gets overridden by Framer Motion)
          const posX = radius + x - (logoWidth / 2);
          const posY = radius - y - (logoHeight / 2);

          return (
            <motion.div
              key={i}
              // Counter-rotate so logos always remain upright
              animate={{ rotate: -direction * 360 }}
              transition={{ duration, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                // perfectly centered on the line
                left: posX,
                top: posY,
                width: logoWidth,
                height: logoHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    // The invert(1) turns hardcoded white backgrounds in JPEGs into black
                    // mixBlendMode 'screen' then makes all black act as transparent glass
                    filter: 'grayscale(1) invert(1) brightness(1.8)',
                    mixBlendMode: 'screen', 
                  }}
                />
              </motion.div>
            );
          })}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────── */
const OrbitalPartners = ({ id }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  /* Base height to allow outer ring to fit its top half */
  const outerR = RINGS[RINGS.length - 1].radius;

  return (
    <section
      ref={ref}
      id={id || 'partners'}
      style={{
        position: 'relative',
        background: '#000',
        color: '#fff',
        height: '100vh',    // Rigidly lock to 100vh
        overflow: 'hidden', // Anything jumping outside viewport is strictly trimmed
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '10vh 0 0 0',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* ── Header exactly matching the reference style ── */}
      <motion.div
        style={{ textAlign: 'center', position: 'relative', zIndex: 10, opacity, y, maxWidth: '900px', padding: '0 4%' }}
      >
        <div style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#aa66ff',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '1.2rem',
        }}>
          Inteledge partner
        </div>

        <h2 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
          fontWeight: 700,
          letterSpacing: '-1.5px',
          lineHeight: 1.15,
          color: '#ffffff',
          margin: '0 0 1.2rem 0',
        }}>
          Technologies & Partners with Inteledge
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7,
          margin: '0 auto',
          fontWeight: 400,
          maxWidth: '80%',
        }}>
          Our goals are ambitious and can only be achieved in partnership with others.
          We collaborate with a number of technology partners who help us bring about
          intelligent transformation on a global scale.
        </p>
      </motion.div>

      {/* ── Orbital Rings Container ── 
          Pinned absolutely to the real physical bottom of the frame
      */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,          // Guaranteed touching bottom edge of the 100vh section window
          left: 0,
          width: '100%',
          height: outerR + 40,
          overflow: 'hidden', // Precisely cut bottom
          zIndex: 1,
          opacity,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Core background fill for the inner rings */}
        <div style={{
          position: 'absolute',
          bottom: -RINGS[1].radius,
          left: '50%',
          transform: 'translateX(-50%)',
          width: RINGS[1].radius * 2,
          height: RINGS[1].radius * 2,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(170,102,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Center Logo */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: 75,
          height: 75,
          borderRadius: '50%',
          background: '#050505',
          border: '1.5px solid rgba(0,242,255,0.4)',
          boxShadow: '0 0 35px rgba(0,242,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
        }}>
          <span style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00f2ff, #aa66ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            IE
          </span>
        </div>

        {/* Render Rings */}
        {RINGS.map((ring, i) => (
          <Ring key={i} {...ring} />
        ))}
      </motion.div>
    </section>
  );
};

export default OrbitalPartners;
