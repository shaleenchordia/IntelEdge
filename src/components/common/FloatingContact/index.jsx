import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import './FloatingContact.css';

const FloatingContact = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className={`floating-contact-container ${scrolled ? 'collapsed' : ''}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: scrolled ? -10 : 0 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToContact}
    >
      <div className="floating-contact-orb">
        <MessageSquare size={18} />
      </div>
      <span className="floating-contact-text">Get in touch!</span>
    </motion.div>
  );
};

export default FloatingContact;
