import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import IntelligenceCore from './IntelligenceCore';

const Hero = ({ theme }) => {
  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden', height: '100vh', padding: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <IntelligenceCore theme={theme} />
          </Suspense>
        </Canvas>
      </div>
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1, 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        background: 'radial-gradient(circle at 30% 50%, rgba(0, 242, 255, 0.05) 0%, transparent 50%)'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ maxWidth: '900px' }}
        >
          <span style={{ 
            fontSize: '0.9rem', 
            fontWeight: 800, 
            letterSpacing: '5px', 
            textTransform: 'uppercase', 
            color: 'var(--accent-primary)',
            marginBottom: '2rem',
            display: 'block'
          }}>
            Inteledge Advisory & Labs
          </span>
          <h1 style={{ 
            fontSize: 'max(4.5rem, 8vw)', 
            lineHeight: 0.9, 
            fontWeight: 800, 
            letterSpacing: '-6px',
            marginBottom: '3rem'
          }}>
            Future-Proof <br />
            <span className="gradient-text">Applied Intelligence.</span>
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            opacity: 0.6, 
            maxWidth: '550px', 
            marginBottom: '4rem',
            lineHeight: 1.6
          }}>
            Architecting the Unified Systems of tomorrow. From board-level AI strategy to production-grade agentic platforms.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <motion.button 
              className="interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'var(--accent-cyan)',
                color: '#000',
                padding: '24px 50px',
                borderRadius: '100px',
                fontSize: '1.1rem',
                fontWeight: 800,
                boxShadow: '0 0 40px var(--accent-glow)'
              }}
            >
              Explore Advisory
            </motion.button>
            <motion.button 
              className="interactive glass"
              whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '24px 50px', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}
            >
              Explore Labs
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.3,
          fontSize: '0.8rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}
      >
        Scroll to Begin Story
      </motion.div>
    </section>
  );
};

export default Hero;
