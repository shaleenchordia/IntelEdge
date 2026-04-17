import React, { Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import IntelligenceCore from './IntelligenceCore';

const Hero = ({ theme }) => {
  return (
    <section
      id="hero"
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
        <div style={{ maxWidth: '1000px' }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {['AI Strategy', 'Enterprise Transformation', 'Custom AI Products'].map((tag, i) => (
              <React.Fragment key={tag}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--accent-primary)',
                  fontFamily: "'Montserrat', sans-serif",
                }}>{tag}</span>
                {i < 2 && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.9rem' }}>·</span>
                )}
              </React.Fragment>
            ))}
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
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              AI That Works
            </motion.span>
            <motion.span
              className="gradient-text"
              style={{ display: 'block' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              For the Business.
            </motion.span>
          </h1>

          <div style={{ position: 'relative', marginBottom: '3.5rem' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              style={{
                fontSize: '1.15rem',
                maxWidth: '560px',
                lineHeight: 1.65,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '-0.1px',
                position: 'relative',
                zIndex: 1,
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              <span style={{ color: '#fff', fontWeight: 600 }}>Inteledge Advisory &amp; Labs</span> helps enterprises
              translate AI investment into{' '}
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>business performance</span>{' '}
              — through independent strategy, structured execution, and purpose-built AI products.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            {/* Primary CTA */}
            <motion.button
              className="interactive"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--accent-primary)',
                color: '#000',
                padding: '15px 32px',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Enquiry Call
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              className="interactive"
              whileHover={{ scale: 1.04, color: 'var(--accent-primary)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                padding: '15px 28px',
                borderRadius: '100px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'none',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backdropFilter: 'blur(10px)',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              View Services
              <span style={{ fontSize: '1rem', fontWeight: 400 }}>→</span>
            </motion.button>
          </motion.div>
        </div>
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
