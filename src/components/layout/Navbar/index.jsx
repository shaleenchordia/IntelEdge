import React, { useState, useEffect } from 'react';
import { Orbit, Menu, X } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About Us',     href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Products',     href: '#products' },
  { label: 'Testimonials', href: '#testimonials' },
];

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  const bypassScrollLock = () => {
    window.__servicesScrollLockBypassUntil = Date.now() + 2000;
    window.dispatchEvent(new CustomEvent('services-scroll-lock', { detail: { locked: false } }));
  };

  const handleNavClick = (href) => {
    bypassScrollLock();
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Close menu on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`nav-capsule-wrapper ${scrolled ? 'nav-capsule-scrolled' : ''}`}>

        {/* Logo */}
        <div className="nav-logo-circle">
          <Orbit size={24} strokeWidth={2.5} />
        </div>

        {/* Brand — mobile centre */}
        <span className="nav-brand-mobile">INTELEDGE</span>

        {/* Desktop links */}
        <div className="nav-links-center">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-capsule-link"
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          className="nav-contact-btn nav-contact-desktop"
          onClick={() => handleNavClick('#contact')}
        >
          Contact Us
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
        </button>

      </nav>

      {/* Mobile drawer backdrop */}
      {menuOpen && (
        <div className="nav-mobile-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer ${menuOpen ? 'nav-mobile-drawer-open' : ''}`}>
        <div className="nav-mobile-links">
          {NAV_LINKS.map(({ label, href }, i) => (
            <button
              key={href}
              className="nav-mobile-link"
              style={{ transitionDelay: menuOpen ? `${i * 55}ms` : '0ms' }}
              onClick={() => handleNavClick(href)}
            >
              <span className="nav-mobile-link-num">0{i + 1}</span>
              {label}
            </button>
          ))}
        </div>
        <div className="nav-mobile-footer">
          <button
            className="nav-mobile-cta"
            onClick={() => handleNavClick('#contact')}
          >
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
