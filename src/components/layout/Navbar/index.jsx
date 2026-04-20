import React, { useState, useEffect } from 'react';
import { Orbit } from 'lucide-react';
import './Navbar.css';

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
    <nav className={`nav-capsule-wrapper ${scrolled ? 'nav-capsule-scrolled' : ''}`}>
      
      {/* Left Icon (Planet in white circle matching user image) */}
      <div className="nav-logo-circle">
        <Orbit size={24} strokeWidth={2.5} />
      </div>

      {/* Center Links (Mapped to requested mockup text for exact replica, or site routes) */}
      <div className="nav-links-center">
        <a href="#services" className="nav-capsule-link">Work</a>
        <a href="#about" className="nav-capsule-link">About</a>
        <a href="#contact" className="nav-capsule-link">Contact</a>
      </div>

      {/* Right Button (Email string as styled button) */}
      <button 
        className="nav-contact-btn"
        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
      >
        hello@inteledge.com
      </button>

    </nav>
  );
};

export default Navbar;
