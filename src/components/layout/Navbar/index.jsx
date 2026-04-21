import React, { useState, useEffect } from 'react';
import { Orbit } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const setServicesBypassWindow = () => {
    window.__servicesScrollLockBypassUntil = Date.now() + 2000;
    // Dispatch unlock event to ensure Lenis restarts immediately
    window.dispatchEvent(new CustomEvent('services-scroll-lock', { detail: { locked: false } }));
  };

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
        <a href="#about" className="nav-capsule-link" onClick={setServicesBypassWindow}>About Us</a>
        <a href="#services" className="nav-capsule-link" onClick={setServicesBypassWindow}>Services</a>
        <a href="#products" className="nav-capsule-link" onClick={setServicesBypassWindow}>Products</a>
        <a href="#testimonials" className="nav-capsule-link" onClick={setServicesBypassWindow}>Testimonials</a>
        <a href="#contact" className="nav-capsule-link" onClick={setServicesBypassWindow}>Contact Us</a>
      </div>

      {/* Contact button — visible on mobile when links are hidden */}
      <button
        className="nav-contact-btn"
        onClick={() => { setServicesBypassWindow(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
      >
        Contact Us
      </button>



    </nav>
  );
};

export default Navbar;
