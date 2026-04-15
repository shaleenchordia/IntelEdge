import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onFinish }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  const triggeredRef = useRef(false);

  useEffect(() => {
    let timeoutId;
    const handleTrigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setHasScrolled(true);
      
      console.log('Intro: Triggered, starting timeout...');
      timeoutId = setTimeout(() => {
        console.log('Intro: Timeout finished, calling onFinish');
        try {
          onFinish();
        } catch (e) {
          console.error("onFinish failed, trying to handle manually:", e);
          // Fallback if prop call fails
        }
      }, 1100);
    };

    const onScroll = (e) => {
      if (Math.abs(e.deltaY) > 5 || Math.abs(e.deltaX) > 5) {
        handleTrigger();
      }
    };

    const onTouch = (e) => {
      handleTrigger();
    };

    window.addEventListener('wheel', onScroll, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mousedown', handleTrigger, { passive: true });
    
    const onKey = (e) => {
      if (['ArrowDown', 'Space', 'PageDown', 'Enter'].includes(e.code)) {
        handleTrigger();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', onScroll);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mousedown', handleTrigger);
      window.removeEventListener('keydown', onKey);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -150,
        scale: 1.1,
        filter: "blur(30px)",
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto'
      }}
    >
      <motion.div
        animate={hasScrolled ? { 
          scale: 1.2, 
          opacity: 0, 
          filter: "blur(40px)",
          y: -50
        } : { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          y: 0
        }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            fontSize: 'max(5rem, 12vw)', 
            fontWeight: 900, 
            letterSpacing: '-8px', 
            color: '#fff',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1
          }}>
          INTELEDGE<span style={{ color: '#00f2ff' }}>.</span>
        </motion.h1>
        
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          style={{
            marginTop: '5rem',
            textAlign: 'center',
            fontSize: 'max(0.7rem, 1vw)',
            letterSpacing: '12px',
            textTransform: 'uppercase',
            color: '#fff',
            fontWeight: 300,
            opacity: 0.5
          }}
        >
          {hasScrolled ? "Initiating Architecture" : "Scroll to Enter"}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: '15%',
          right: '15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transformOrigin: 'center'
        }}
      />
    </motion.div>
  );
};

export default Intro;
