import React, { useRef } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const ACCENT = '#00f2ff';
const ease = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════
   CORNER CIRCUIT DECORATIONS (tech line art)
═══════════════════════════════════════════ */

const CornerCircuitTL = () => (
  <svg width="280" height="180" viewBox="0 0 280 180" style={{ position: 'absolute', top: 40, left: 0, pointerEvents: 'none', opacity: 0.5 }}>
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, ease }}
      d="M 0 10 L 80 10 L 100 30 L 180 30"
      fill="none"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, delay: 0.3, ease }}
      d="M 0 60 L 40 60 L 60 80 L 140 80"
      fill="none"
      stroke="rgba(255,255,255,0.15)"
      strokeWidth="1"
    />
    <motion.circle
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.6 }}
      cx="180" cy="30" r="4"
      fill="none" stroke={ACCENT} strokeWidth="1"
    />
    <motion.circle
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.9 }}
      cx="140" cy="80" r="3"
      fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"
    />
  </svg>
);

const CornerCircuitTR = () => (
  <svg width="320" height="200" viewBox="0 0 320 200" style={{ position: 'absolute', top: 30, right: 0, pointerEvents: 'none', opacity: 0.5 }}>
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, ease }}
      d="M 320 20 L 240 20 L 220 40 L 120 40"
      fill="none"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1"
    />
    <motion.path
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, delay: 0.4, ease }}
      d="M 320 70 L 260 70 L 240 90 L 170 90 L 150 110 L 50 110"
      fill="none"
      stroke="rgba(255,255,255,0.18)"
      strokeWidth="1"
    />
    <motion.circle
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.7 }}
      cx="120" cy="40" r="4"
      fill="none" stroke={ACCENT} strokeWidth="1"
    />
    <motion.circle
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 2.1 }}
      cx="50" cy="110" r="3"
      fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1"
    />
  </svg>
);

/* ═══════════════════════════════════════════
   METHOD PILL
═══════════════════════════════════════════ */

const MethodPill = ({ icon, title, value, href, delay = 0 }) => (
  <motion.a
    href={href || '#'}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease }}
    whileHover={{ y: -2 }}
    style={{
      display: 'flex', alignItems: 'center', gap: 18,
      padding: '22px 24px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 18,
      textDecoration: 'none',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      transition: 'all 0.35s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.borderColor = 'rgba(0,242,255,0.18)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,242,255,0.06)';
      const arrow = e.currentTarget.querySelector('.pill-arrow');
      if (arrow) {
        arrow.style.background = '#fff';
        arrow.style.color = '#000';
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.boxShadow = 'none';
      const arrow = e.currentTarget.querySelector('.pill-arrow');
      if (arrow) {
        arrow.style.background = 'rgba(255,255,255,0.05)';
        arrow.style.color = '#fff';
      }
    }}
  >
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      width: 48, height: 48, borderRadius: 12,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', flexShrink: 0,
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <h4 style={{
        margin: '0 0 4px', fontSize: 14.5, fontWeight: 600, color: '#fff',
        letterSpacing: '-0.1px',
      }}>
        {title}
      </h4>
      <p style={{
        margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.1px',
      }}>
        {value}
      </p>
    </div>
    <div className="pill-arrow" style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', flexShrink: 0,
      transition: 'background 0.3s, color 0.3s',
    }}>
      <ArrowUpRight size={15} strokeWidth={2} />
    </div>
  </motion.a>
);

/* ═══════════════════════════════════════════
   FORM FIELD (floating label)
═══════════════════════════════════════════ */

const fieldBase = {
  background: 'rgba(18,20,24,0.6)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 14,
  padding: '20px 22px',
  color: '#fff',
  fontSize: 14,
  fontFamily: "'Inter', system-ui, sans-serif",
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'all 0.3s ease',
};

const focusHandlers = {
  onFocus: (e) => {
    e.target.style.background = 'rgba(22,26,32,0.8)';
    e.target.style.borderColor = 'rgba(0,242,255,0.35)';
    e.target.style.boxShadow = '0 0 0 3px rgba(0,242,255,0.06)';
  },
  onBlur: (e) => {
    e.target.style.background = 'rgba(18,20,24,0.6)';
    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
    e.target.style.boxShadow = 'none';
  },
};

/* ═══════════════════════════════════════════
   MAIN
═══════════════════════════════════════════ */

const Contact = ({ id }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const watermarkY = useTransform(smoothY, [0, 1], ['-5%', '5%']);
  const watermarkOpacity = useTransform(smoothY, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id={id || 'contact'}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(0,60,70,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 100%, rgba(8,14,24,0.7) 0%, transparent 55%),
          linear-gradient(180deg, #060708 0%, #080a0d 50%, #060708 100%)
        `,
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 5% 120px',
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* noise */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
      }} />

      {/* architectural wide grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '120px 120px',
      }} />

      {/* top ambient cyan glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '75vw', height: '55vh',
        background: 'radial-gradient(ellipse at top, rgba(0,200,220,0.12), transparent 60%)',
        pointerEvents: 'none',
      }} />

      {/* corner circuit decorations */}
      <CornerCircuitTL />
      <CornerCircuitTR />

      {/* giant CONTACT watermark */}
      <motion.div
        style={{
          position: 'absolute', top: '14%', left: 0, right: 0,
          y: watermarkY, opacity: watermarkOpacity,
          textAlign: 'center',
          fontSize: 'clamp(7rem, 16vw, 16rem)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.022)',
          letterSpacing: '-6px',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        CONTACT
      </motion.div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1200, width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 64,
          alignItems: 'stretch',
        }}
        className="contact-grid"
      >

        {/* ── LEFT ── */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '7px 14px',
              borderRadius: 30,
              color: '#fff',
              fontSize: 12,
              fontWeight: 500,
              alignSelf: 'flex-start',
              backdropFilter: 'blur(10px)',
              marginBottom: 22,
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Mail size={10} strokeWidth={2} />
            </div>
            Contact
          </motion.div>

          {/* heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(2.6rem, 4.5vw, 4rem)',
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-1.8px',
              color: '#fff',
            }}
          >
            Get in touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              margin: '18px 0 44px',
              maxWidth: 340,
            }}
          >
            Have questions or ready to transform your enterprise with applied AI? We&apos;re here.
          </motion.p>

          {/* pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <MethodPill
              icon={<Mail size={18} strokeWidth={1.8} />}
              title="Email us"
              value="hello@inteledge.com"
              href="mailto:hello@inteledge.com"
              delay={0.4}
            />
            <MethodPill
              icon={<Phone size={18} strokeWidth={1.8} />}
              title="Call us"
              value="+1 (800) 272-4386"
              href="tel:+18002724386"
              delay={0.5}
            />
            <MethodPill
              icon={<MapPin size={18} strokeWidth={1.8} />}
              title="Our location"
              value="Crosby Street, NY, US"
              href="#"
              delay={0.6}
            />
          </div>
        </div>

        {/* ── RIGHT — form ── */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          style={{
            background: 'linear-gradient(180deg, rgba(14,16,20,0.9) 0%, rgba(8,10,14,0.9) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 22,
            padding: 24,
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Name */}
          <motion.input
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            type="text"
            placeholder="Name"
            style={fieldBase}
            {...focusHandlers}
          />

          {/* Email */}
          <motion.input
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6, ease }}
            type="email"
            placeholder="Email"
            style={fieldBase}
            {...focusHandlers}
          />

          {/* Message */}
          <motion.textarea
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7, ease }}
            placeholder="Message"
            style={{
              ...fieldBase,
              resize: 'none',
              minHeight: 200,
              fontFamily: "'Inter', system-ui, sans-serif",
              lineHeight: 1.6,
            }}
            {...focusHandlers}
          />

          {/* submit */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8, ease }}
            whileHover={{ background: '#e8e8e8' }}
            whileTap={{ scale: 0.985 }}
            type="submit"
            style={{
              width: '100%',
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 14,
              padding: '20px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 4,
              letterSpacing: '-0.1px',
              transition: 'background 0.3s',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Submit
          </motion.button>
        </motion.form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.35);
        }
      `}</style>
    </section>
  );
};

export default Contact;