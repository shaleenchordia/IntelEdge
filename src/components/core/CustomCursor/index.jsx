import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = ({ theme }) => {
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
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
        background: theme.accent,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        translateX: cursorX,
        translateY: cursorY,
        scale: isHovering ? 3 : 1,
        boxShadow: `0 0 20px ${theme.accent}`,
        transition: 'transform 0.1s ease-out, background 0.5s ease'
      }}
    />
  );
};

export default CustomCursor;
