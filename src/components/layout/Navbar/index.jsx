import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../../assets/IntelEdge.PNG';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img
          src={logo}
          alt="Inteledge Logo"
          style={{
            height: scrolled ? '32px' : '45px',
            width: 'auto',
            transition: 'height 0.4s ease'
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: scrolled ? '1.2rem' : '1.5rem',
            fontWeight: 800,
            letterSpacing: '2px',
            lineHeight: 1,
            color: 'var(--text-primary)',
            transition: 'font-size 0.4s ease'
          }}>
            INTELEDGE
          </div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: scrolled ? '0.4rem' : '0.5rem',
            fontWeight: 400,
            letterSpacing: '2.5px',
            marginTop: '0.3rem',
            opacity: 0.6,
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            transition: 'font-size 0.4s ease'
          }}>
            — ADVISORY AND LABS LLP —
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        {['Home', 'About', 'Services', 'Labs', 'Use Cases', 'Insights', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="interactive"
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              opacity: 0.6,
              color: '#fff',
              transition: 'opacity 0.3s ease'
            }}
          >
            {item}
          </a>
        ))}
        <button
          className="interactive glass"
          style={{
            padding: '12px 28px',
            borderRadius: '100px',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--accent-primary)',
            border: '1px solid var(--accent-primary)',
            marginLeft: '1rem'
          }}
        >
          Partner Login
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
