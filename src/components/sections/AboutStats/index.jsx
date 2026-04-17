import React, { useRef, useCallback, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from 'framer-motion';
import { Clock, Users, Star, Rocket, Handshake, Trophy } from 'lucide-react';

const ACCENT = '#00f2ff';

// ═══════════════════════════════════════════════════════════════════════════
// CARDS  —  each card has a distinct subtle decorative motif
// ═══════════════════════════════════════════════════════════════════════════

const cardData = [
  {
    id: 1, Icon: Clock, label: 'Experience',
    title: 'Years of Advisory', subtitle: 'Since 2010',
    location: 'Global Operations', date: '2010 — 2024',
    motif: 'concentric',
    metric: { value: 14, suffix: '+', unit: 'YEARS' },
    scatter: { x: 380, y: 90, rot: -18 }
  },
  {
    id: 2, Icon: Users, label: 'Adoption',
    title: 'Enterprise Participants', subtitle: 'Trained & Deployed',
    location: 'Cross-Industry', date: '2022 — 2024',
    motif: 'grid',
    metric: { value: 7000, suffix: '+', unit: 'PEOPLE' },
    scatter: { x: 30, y: 110, rot: 12 }
  },
  {
    id: 3, Icon: Star, label: 'Rating',
    title: 'Average Client Score', subtitle: 'Independently Verified',
    location: 'Global Feedback', date: '2023 — 2024',
    motif: 'arc',
    metric: { value: 4.75, suffix: '', unit: 'SCORE' },
    scatter: { x: -340, y: 60, rot: 22 }
  },
  {
    id: 4, Icon: Rocket, label: 'Impact',
    title: 'AI Solutions Shipped', subtitle: 'Production-grade systems',
    location: 'Multi-Sector Delivery', date: '2018 — 2024',
    motif: 'lines',
    metric: { value: 250, suffix: '+', unit: 'SHIPPED' },
    scatter: { x: 360, y: -80, rot: -9 }
  },
  {
    id: 5, Icon: Handshake, label: 'Network',
    title: 'Global Alliance Recognition', subtitle: 'Strategic Partnership Award',
    location: 'International Advisory', date: 'Awarded 2023',
    motif: 'nodes',
    metric: { value: 1, suffix: '', unit: 'HONOR' },
    scatter: { x: 20, y: -70, rot: 17 }
  },
  {
    id: 6, Icon: Trophy, label: 'Leadership',
    title: 'Top-tier Advisory Firm', subtitle: '2024 Industry Standing',
    location: 'Advisory Excellence', date: '2024',
    motif: 'diamonds',
    metric: { value: 5, suffix: '%', unit: 'PERCENTILE' },
    scatter: { x: -320, y: -90, rot: -14 }
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// COUNT UP
// ═══════════════════════════════════════════════════════════════════════════

function CountUp({ value, suffix = '', trigger, delay = 0, decimals = 0 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now() + delay * 1000;
    const dur = 1800;
    let id;
    const tick = (now) => {
      if (now < start) { id = requestAnimationFrame(tick); return; }
      const p = Math.min((now - start) / dur, 1);
      const e = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(value * e);
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [trigger, value, delay]);
  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();
  return <span>{formatted}{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════
// CARD MOTIFS — low-opacity decorative SVGs, one per card
// ═══════════════════════════════════════════════════════════════════════════

const Motif = ({ type, active }) => {
  const stroke = active ? 'rgba(0, 242, 255, 0.22)' : 'rgba(0, 242, 255, 0.1)';
  const common = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', transition: 'all 0.5s ease',
  };

  if (type === 'concentric') return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
      {[40, 80, 120, 160, 200, 240].map((r, i) => (
        <circle key={i} cx="340" cy="40" r={r}
          fill="none" stroke={stroke} strokeWidth="0.5" opacity={1 - i * 0.12} />
      ))}
    </svg>
  );
  if (type === 'grid') return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
      <defs>
        <pattern id="m-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={stroke} strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#m-grid)" />
    </svg>
  );
  if (type === 'arc') return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i}
          d={`M 0 ${340 - i * 22} Q 200 ${260 - i * 22}, 400 ${340 - i * 22}`}
          fill="none" stroke={stroke} strokeWidth="0.5" opacity={1 - i * 0.15} />
      ))}
    </svg>
  );
  if (type === 'lines') return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
      {[...Array(14)].map((_, i) => (
        <line key={i}
          x1={-40 + i * 40} y1="-10"
          x2={40 + i * 40} y2="340"
          stroke={stroke} strokeWidth="0.5" opacity={1 - Math.abs(i - 7) * 0.12} />
      ))}
    </svg>
  );
  if (type === 'nodes') {
    const pts = [[60, 60], [140, 40], [220, 90], [300, 50], [360, 120], [80, 180], [180, 220], [280, 180], [340, 240]];
    const lines = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [2, 6]];
    return (
      <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
        {lines.map(([a, b], i) => (
          <line key={`l${i}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]}
            stroke={stroke} strokeWidth="0.4" opacity="0.5" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={`c${i}`} cx={x} cy={y} r="2.5" fill={stroke} />
        ))}
      </svg>
    );
  }
  if (type === 'diamonds') return (
    <svg viewBox="0 0 400 320" preserveAspectRatio="none" style={common}>
      <defs>
        <pattern id="m-dia" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="24" height="24" fill="none" stroke={stroke} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#m-dia)" />
    </svg>
  );
  return null;
};

// ═══════════════════════════════════════════════════════════════════════════
// STAT CARD
// ═══════════════════════════════════════════════════════════════════════════

const StatCard = ({ data, index, spreadProgress, isHovered, anyHovered, onHover, onLeave, countTrigger }) => {
  const invSpread = 1 - spreadProgress;
  const collapseX = data.scatter.x * invSpread;
  const collapseY = data.scatter.y * invSpread;
  const collapseR = data.scatter.rot * invSpread;
  const collapseScale = 0.82 + 0.18 * spreadProgress;

  const dimmed = anyHovered && !isHovered;
  const currentZ = isHovered ? 50 : 10 + index;

  const tiltRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 20 });
  const sy = useSpring(my, { stiffness: 180, damping: 20 });
  const rX = useTransform(sy, [-0.5, 0.5], ['5deg', '-5deg']);
  const rY = useTransform(sx, [-0.5, 0.5], ['-5deg', '5deg']);
  const glowRef = useRef(null);

  const handleMove = useCallback((e) => {
    const r = tiltRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top) / r.height;
    mx.set(cx - 0.5);
    my.set(cy - 0.5);
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, rgba(0,242,255,0.08), transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0); my.set(0);
    if (glowRef.current) glowRef.current.style.opacity = '0';
    onLeave?.();
  }, [mx, my, onLeave]);

  const { Icon } = data;

  return (
    <motion.div
      animate={{
        x: collapseX, y: collapseY, rotate: collapseR,
        scale: isHovered ? 1.03 : (dimmed ? collapseScale * 0.96 : collapseScale),
        opacity: dimmed ? 0.3 : 1,
        zIndex: currentZ,
      }}
      transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1 }}
      style={{ position: 'relative', height: '260px', perspective: 1200, willChange: 'transform' }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseEnter={onHover}
        onMouseLeave={handleLeave}
        style={{ rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d', height: '100%', position: 'relative' }}
      >
        {/* ambient outer glow */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute', inset: -28, borderRadius: 20,
            background: 'radial-gradient(ellipse, rgba(0,242,255,0.12) 0%, transparent 70%)',
            filter: 'blur(20px)', pointerEvents: 'none', zIndex: 0,
          }}
        />

        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          background: 'linear-gradient(180deg, rgba(18,22,28,0.98) 0%, rgba(10,12,16,0.98) 100%)',
          borderRadius: 10,
          padding: '1.4rem 1.5rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          border: `1px solid ${isHovered ? 'rgba(0,242,255,0.22)' : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isHovered
            ? '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,242,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
        }}>

          <Motif type={data.motif} active={isHovered} />

          {/* ghost number watermark */}
          <div style={{
            position: 'absolute',
            bottom: -30, right: -20,
            fontSize: 220,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 900,
            color: 'rgba(255,255,255,0.025)',
            lineHeight: 0.8,
            letterSpacing: '-10px',
            pointerEvents: 'none', userSelect: 'none', zIndex: 0,
          }}>
            {String(data.id).padStart(2, '0')}
          </div>

          <div ref={glowRef} style={{
            position: 'absolute', inset: 0, borderRadius: 10,
            zIndex: 1, pointerEvents: 'none',
            transition: 'opacity 0.4s ease', opacity: 0,
          }} />

          {/* top edge hairline */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: isHovered
              ? 'linear-gradient(90deg, transparent, rgba(0,242,255,0.5), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'background 0.5s ease',
          }} />

          {/* TOP: label + index */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            zIndex: 2, position: 'relative', transform: 'translateZ(25px)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 9.5, fontWeight: 700, letterSpacing: '3px',
              textTransform: 'uppercase', color: ACCENT,
            }}>
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT }}
              />
              {data.label}
            </div>
            <div style={{
              fontSize: 9.5, color: 'rgba(255,255,255,0.3)',
              fontVariantNumeric: 'tabular-nums', letterSpacing: '1.5px', fontWeight: 500,
            }}>
              {String(data.id).padStart(2, '0')} / 06
            </div>
          </div>

          {/* MIDDLE: big serif number */}
          <div style={{ zIndex: 2, position: 'relative', transform: 'translateZ(35px)', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 54, fontWeight: 500, color: '#ffffff',
                letterSpacing: '-2px', lineHeight: 0.95,
                fontVariantNumeric: 'tabular-nums',
              }}>
                <CountUp
                  value={data.metric.value}
                  suffix={data.metric.suffix}
                  trigger={countTrigger}
                  delay={index * 0.1 + 0.3}
                  decimals={data.metric.value % 1 !== 0 ? 2 : 0}
                />
              </div>
              <div style={{
                fontSize: 8.5, fontWeight: 700, letterSpacing: '2.5px',
                color: 'rgba(0,242,255,0.55)', marginBottom: 16,
                textTransform: 'uppercase',
                borderLeft: '1px solid rgba(0,242,255,0.25)',
                paddingLeft: 10,
              }}>
                {data.metric.unit}
              </div>
            </div>

            <h3 style={{
              fontSize: 14, fontWeight: 500,
              color: 'rgba(255,255,255,0.92)',
              lineHeight: 1.4, margin: '10px 0 3px',
              letterSpacing: '-0.1px',
            }}>
              {data.title}
            </h3>
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.35)',
              fontStyle: 'italic',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              {data.subtitle}
            </div>
          </div>

          {/* FOOTER */}
          <div style={{
            zIndex: 2, position: 'relative', transform: 'translateZ(10px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: 13,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Icon size={11} color={ACCENT} strokeWidth={1.5} style={{ opacity: 0.75 }} />
              <span style={{
                fontSize: 10.5, color: 'rgba(255,255,255,0.45)',
                fontWeight: 500, letterSpacing: '0.3px',
              }}>
                {data.location}
              </span>
            </div>
            <span style={{
              fontSize: 10, color: 'rgba(255,255,255,0.28)',
              fontVariantNumeric: 'tabular-nums', fontWeight: 400,
              letterSpacing: '0.5px',
            }}>
              {data.date}
            </span>
          </div>

          {/* corner bracket marks */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            width: 10, height: 10, pointerEvents: 'none',
            borderTop: `1px solid ${isHovered ? ACCENT : 'rgba(255,255,255,0.2)'}`,
            borderRight: `1px solid ${isHovered ? ACCENT : 'rgba(255,255,255,0.2)'}`,
            transition: 'border-color 0.4s ease', zIndex: 3,
          }} />
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            width: 10, height: 10, pointerEvents: 'none',
            borderBottom: `1px solid ${isHovered ? ACCENT : 'rgba(255,255,255,0.2)'}`,
            borderLeft: `1px solid ${isHovered ? ACCENT : 'rgba(255,255,255,0.2)'}`,
            transition: 'border-color 0.4s ease', zIndex: 3,
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// HEADING REVEAL
// ═══════════════════════════════════════════════════════════════════════════

const RevealText = ({ text, isInView, delay = 0, wordDelay = 0.08 }) => {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline-block' }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.28em' }}>
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: isInView ? '0%' : '110%', opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.9, delay: delay + i * wordDelay, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SECTION
// ═══════════════════════════════════════════════════════════════════════════

const AboutStats = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const cardsInView = useInView(cardsRef, { once: false, amount: 0.2 });

  const [hoveredId, setHoveredId] = useState(null);
  const [pileHovered, setPileHovered] = useState(false);
  const effectiveSpread = (pileHovered || hoveredId !== null) ? 1 : 0;

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothSection = useSpring(sectionProgress, { stiffness: 120, damping: 30 });
  const headerY = useTransform(smoothSection, [0, 1], ['30px', '-60px']);
  const watermarkX = useTransform(smoothSection, [0, 1], ['-5%', '5%']);
  const watermarkOpacity = useTransform(smoothSection, [0, 0.3, 0.7, 1], [0, 0.022, 0.022, 0]);

  return (
    <section ref={sectionRef} style={{
      width: '100%',
      background: `
        radial-gradient(ellipse at 20% 0%, rgba(18, 28, 45, 0.5) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 100%, rgba(8, 14, 24, 0.7) 0%, transparent 50%),
        linear-gradient(180deg, #060708 0%, #080a0d 50%, #060708 100%)
      `,
      padding: '80px 0 100px',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* fine-grain noise */}
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

      {/* soft depth glows */}
      <div style={{
        position: 'absolute', top: '10%', left: '-10%',
        width: '50%', height: '60%',
        background: 'radial-gradient(ellipse, rgba(0,242,255,0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-10%',
        width: '55%', height: '55%',
        background: 'radial-gradient(ellipse, rgba(0,150,200,0.03) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* vertical architectural line rules */}
      <div style={{
        position: 'absolute', left: '8%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.04) 80%, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '8%', top: 0, bottom: 0, width: 1,
        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.04) 20%, rgba(255,255,255,0.04) 80%, transparent)',
        pointerEvents: 'none',
      }} />

      {/* watermark */}
      <motion.div
        style={{
          position: 'absolute', top: '42%', left: 0, right: 0,
          x: watermarkX, opacity: watermarkOpacity,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 900,
          fontSize: 'clamp(8rem, 18vw, 16rem)', lineHeight: 1,
          letterSpacing: '-8px', color: '#fff',
          textAlign: 'center', whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none', zIndex: 1,
          fontStyle: 'italic',
        }}
      >
        Record
      </motion.div>

      {/* edge fades */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '160px', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #050505, transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', zIndex: 1, pointerEvents: 'none',
        background: 'linear-gradient(to top, #050505, transparent)',
      }} />

      {/* CONTENT */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 2, width: '100%' }}>

        <motion.div
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: '6rem', y: headerY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              marginBottom: '2rem',
            }}
          >
            <div style={{ height: 1, width: 32, background: 'rgba(0,242,255,0.4)' }} />
            <span style={{
              fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase',
              color: ACCENT, fontWeight: 700,
            }}>
              Track Record
            </span>
            <div style={{ height: 1, width: 32, background: 'rgba(0,242,255,0.4)' }} />
          </motion.div>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 500,
            color: '#fff',
            letterSpacing: '-1.5px',
            lineHeight: 1.05,
            marginBottom: '1rem',
          }}>
            <div><RevealText text="Institutional maturity," isInView={headerInView} delay={0.15} /></div>
            <div style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>
              <RevealText text="measured in outcomes." isInView={headerInView} delay={0.4} />
            </div>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: 14, color: 'rgba(255,255,255,0.45)',
              fontWeight: 400, maxWidth: '520px', margin: '0 auto',
              lineHeight: 1.7, letterSpacing: '0.1px',
            }}
          >
            A decade-plus of enterprise AI advisory — across industries, geographies, and operating models.
          </motion.p>
        </motion.div>

        {/* Cards pile */}
        <div
          onMouseEnter={() => setPileHovered(true)}
          onMouseLeave={() => setPileHovered(false)}
          style={{
            position: 'relative',
            padding: '80px 40px',
            margin: '-80px -40px',
          }}
        >
          <div
            ref={cardsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
              position: 'relative',
            }}
            className="stats-grid"
          >
            {cardData.map((card, i) => (
              <StatCard
                key={card.id}
                data={card}
                index={i}
                spreadProgress={effectiveSpread}
                isHovered={hoveredId === card.id}
                anyHovered={hoveredId !== null}
                onHover={() => setHoveredId(card.id)}
                onLeave={() => setHoveredId(null)}
                countTrigger={cardsInView}
              />
            ))}

            <motion.div
              animate={{
                opacity: effectiveSpread > 0.3 ? 0 : 1,
                y: effectiveSpread > 0.3 ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute', bottom: -80, left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex', alignItems: 'center', gap: 16,
                pointerEvents: 'none',
              }}
            >
              <div style={{ height: 1, width: 48, background: 'rgba(0,242,255,0.25)' }} />
              <span style={{
                fontSize: 10, letterSpacing: '4px', textTransform: 'uppercase',
                color: 'rgba(0,242,255,0.7)', fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                Hover to expand
              </span>
              <div style={{ height: 1, width: 48, background: 'rgba(0,242,255,0.25)' }} />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutStats;