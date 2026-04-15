import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '15px 5%' : '30px 5%',
        background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 242, 255, 0.1)' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
        INTELEDGE<span style={{ color: 'var(--accent-primary)' }}>.</span>
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {['Advisory', 'Labs', 'About Us', 'Vision'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="interactive"
            style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}
          >
            {item}
          </a>
        ))}
        <button
          className="interactive glass"
          style={{
            padding: '12px 28px',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--accent-primary)',
            border: '1px solid var(--accent-primary)'
          }}
        >
          Contact Partner
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
