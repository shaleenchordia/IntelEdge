import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'who-we-are', label: 'About' },
  { id: 'divisions', label: 'Divisions' },
  { id: 'services', label: 'Competencies' },
  { id: 'about-us', label: 'About Us' },
  { id: 'storytelling', label: 'Our Story' },
  { id: 'vision', label: 'Vision' }
];

const ScrollBall = () => {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yTranslate = useTransform(smoothProgress, [0, 1], ['10vh', '90vh']);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sectionElements.forEach((el, index) => {
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(sections[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      right: '40px',
      top: 0,
      height: '100vh',
      width: '4px',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none'
    }}>
      <div style={{
        position: 'absolute',
        top: '10vh',
        bottom: '10vh',
        width: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
        left: '50%',
        transform: 'translateX(-50%)'
      }} />

      <motion.div
        className="interactive"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'absolute',
          top: yTranslate,
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          boxShadow: '0 0 20px var(--accent-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          transform: 'translateX(-50%)',
          pointerEvents: 'auto'
        }}
        animate={{ scale: isHovered ? 1.5 : 1 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? -30 : -20 }}
          style={{
            position: 'absolute',
            whiteSpace: 'nowrap',
            padding: '6px 16px',
            borderRadius: '100px',
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#fff',
            pointerEvents: 'none',
            textTransform: 'uppercase'
          }}
        >
          {sections.find(s => s.id === activeSection)?.label}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScrollBall;
