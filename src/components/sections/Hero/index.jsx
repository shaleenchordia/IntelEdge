import React, { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import IntelligenceCore from './IntelligenceCore';

const Hero = ({ theme }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 60;
    const moveY = (clientY - window.innerHeight / 2) / 60;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', overflow: 'hidden', height: '100vh', padding: 0, backgroundColor: 'var(--bg-color)' }}
    >
      {/* Cinematic 3D Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <IntelligenceCore theme={theme} isLight={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Grid Overlay - Optimized for Light Mode */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
        backgroundSize: '120px 120px',
        maskImage: 'radial-gradient(circle at 35% 50%, black 20%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10%',
      }}>
        <motion.div
          style={{
            maxWidth: '1000px',
            x: mousePos.x,
            y: mousePos.y,
            transition: { type: 'spring', stiffness: 100, damping: 30 }
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2.5rem',
              color: 'var(--accent-primary)'
            }}
          >
            <div style={{ width: '50px', height: '2px', background: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '10px', textTransform: 'uppercase' }}>
              Inteledge Labs
            </span>
          </motion.div>

          <h1 style={{ 
            fontSize: 'max(4rem, 7vw)', 
            lineHeight: 0.85, 
            fontWeight: 900, 
            letterSpacing: '-8px',
            marginBottom: '3rem',
            marginLeft: '-6px',
            color: 'var(--text-primary)'
          }}>
            <motion.span
              style={{ display: 'block', rotateX: -mousePos.y * 1.5, rotateY: mousePos.x * 1.5 }}
            >
              AI That Works
            </motion.span>
            <motion.span
              className="gradient-text"
              style={{ display: 'block', rotateX: -mousePos.y * 1.5, rotateY: mousePos.x * 1.5 }}
            >
              For the Business.
            </motion.span>
          </h1>

          <div style={{ position: 'relative', marginBottom: '4rem' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              style={{ 
                fontSize: '1.25rem', 
                maxWidth: '600px', 
                lineHeight: 1.4,
                fontWeight: 500,
                color: 'var(--text-primary)',
                letterSpacing: '-0.3px',
                x: mousePos.x * 0.4,
                y: mousePos.y * 0.4,
                position: 'relative',
                zIndex: 1
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>Inteledge Advisory & Labs</span> helps enterprises translate 
              AI investment into <span style={{ fontWeight: 800 }}>business performance</span> — through 
              independent strategy, structured execution, and purpose-built AI products.
            </motion.p>
            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '80px' }}
              transition={{ delay: 2, duration: 1 }}
              style={{ height: '2px', background: 'var(--accent-primary)', marginTop: '0.8rem' }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ display: 'flex', gap: '2.5rem' }}
          >
            <motion.button
              className="interactive"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0, 114, 255, 0.4)' }}
              style={{
                background: 'var(--accent-cyan)',
                color: '#fff',
                padding: '24px 50px',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 900,
                border: 'none',
                cursor: 'none',
                x: -mousePos.x * 0.2,
                y: -mousePos.y * 0.2
              }}
            >
              Explore Advisory
            </motion.button>

            <motion.button
              className="interactive"
              whileHover={{ scale: 1.05, background: 'rgba(0, 0, 0, 0.05)' }}
              style={{
                padding: '24px 50px',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                background: 'rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.1)',
                backdropFilter: 'blur(25px)',
                cursor: 'none',
                x: -mousePos.x * 0.1,
                y: -mousePos.y * 0.1
              }}
            >
              Start Building
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '8%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.8rem',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '8px', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>System Online</div>
        <div style={{ width: '150px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-primary))' }} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.2,
          fontSize: '0.8rem',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          zIndex: 10,
          color: 'var(--text-primary)'
        }}
      >
        Initiate Sequence
      </motion.div>
    </section>
  );
};

export default Hero;
