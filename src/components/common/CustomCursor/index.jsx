import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = ({ theme }) => {
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 15, stiffness: 1000, mass: 0.1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Robust color detection with multiple layers of safety
  const safeTheme = theme || {};
  const accentColor = typeof theme === 'string' 
    ? (theme === 'labs' ? '#ff00f2' : (theme === 'advisory' ? '#00f2ff' : '#00f2ff'))
    : (safeTheme.accent || '#00f2ff');

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;
      
      const isInteractive = target.closest('button, a, .interactive, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        background: accentColor,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 100000, // Ensure it's above everything
        mixBlendMode: 'difference',
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 2.5 : 1,
        boxShadow: `0 0 20px ${accentColor}`,
        transition: 'scale 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.5s ease'
      }}
    />
  );
};

export default CustomCursor;
