import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = ({ theme }) => {
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Robust color detection with multiple layers of safety
  const safeTheme = theme || {};
  const accentColor = typeof theme === 'string' 
    ? (theme === 'labs' ? '#ff00f2' : (theme === 'advisory' ? '#00f2ff' : '#00f2ff'))
    : (safeTheme.accent || '#00f2ff');

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother updates and less React churn
      requestAnimationFrame(() => {
        cursorX.set(e.clientX - 10);
        cursorY.set(e.clientY - 10);
      });
    };

    const handleMouseOver = (e) => {
      try {
        if (e.target && typeof e.target.closest === 'function') {
          if (e.target.closest('button, a, .interactive')) {
            setIsHovering(true);
          } else {
            setIsHovering(false);
          }
        }
      } catch (err) {
        // Silently fail to avoid crashing the whole app
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
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
        zIndex: 9999,
        mixBlendMode: 'difference',
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 3 : 1,
        boxShadow: `0 0 20px ${accentColor}`,
        transition: 'scale 0.3s ease, background 0.5s ease'
      }}
    />
  );
};

export default CustomCursor;
