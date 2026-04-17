import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Step1Icon from "../../../assets/step-1.jpg";
import Step2Icon from "../../../assets/step-2.jpg";
import Step3Icon from "../../../assets/step-3.png";

// ── Data ──────────────────────────────────────────────────────────────────────

const pillars = [
  {
    title: "AI Strategy",
    tagline: "Value Mapping & Roadmap",
    description: "Before any recommendation is made, we build a clear picture of where the organisation stands and where it needs to go. Deep diagnostics, stakeholder alignment, and opportunity mapping form the foundation of everything that follows.",
    outcome: "A practical AI roadmap — with business cases, resource requirements, and success metrics built in.",
    icon: Step1Icon,
    color: "#00f2ff",
    num: "01",
  },
  {
    title: "Implementation",
    tagline: "Execution & Engineering",
    description: "Strategy without execution is a slide deck. We handle solution design, vendor-neutral technology selection, systems integration, and performance tracking — all engineered for production environments, not demos.",
    outcome: "AI solutions deployed into operations and performing against defined business metrics.",
    icon: Step2Icon,
    color: "#a855f7",
    num: "02",
  },
  {
    title: "Adoption",
    tagline: "Sustain & Scale",
    description: "AI only works if people use it. We focus on training, workflow integration, governance, and the cultural shift required for long-term success — turning sceptics into champions and early wins into lasting transformation.",
    outcome: "A high-performance 'AI-first' culture where technology is naturally integrated into daily work.",
    icon: Step3Icon,
    color: "#00ff88",
    num: "03",
  },
];

// ── Left tab ──────────────────────────────────────────────────────────────────

const StepTab = ({ pillar, index, isActive, onActivate }) => (
  <div
    onMouseEnter={() => onActivate(index)}
    onClick={() => onActivate(index)}
    style={{
      display: 'flex', alignItems: 'flex-start', gap: '1.4rem',
      padding: '1.6rem 1.4rem 1.6rem 0',
      cursor: 'pointer', userSelect: 'none',
      borderBottom: index < pillars.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
    }}
  >
    {/* Large step number */}
    <motion.div
      animate={{ color: isActive ? pillar.color : 'rgba(255,255,255,0.1)' }}
      transition={{ duration: 0.35 }}
      style={{
        fontSize: '2.8rem', fontWeight: 900, lineHeight: 1,
        fontFamily: "'Cinzel', serif",
        flexShrink: 0, minWidth: '60px',
        letterSpacing: '-2px',
      }}
    >
      {pillar.num}
    </motion.div>

    <div style={{ paddingTop: '0.25rem', flex: 1 }}>
      {/* Tagline */}
      <motion.div
        animate={{ color: isActive ? pillar.color : 'rgba(255,255,255,0.28)' }}
        transition={{ duration: 0.35 }}
        style={{
          fontSize: '0.6rem', fontWeight: 800,
          letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '0.45rem',
        }}
      >
        {pillar.tagline}
      </motion.div>

      {/* Title */}
      <motion.div
        animate={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.32)' }}
        transition={{ duration: 0.35 }}
        style={{
          fontSize: '1.25rem', fontWeight: 800,
          letterSpacing: '-0.5px', lineHeight: 1.2,
        }}
      >
        {pillar.title}
      </motion.div>

      {/* Active underline */}
      <motion.div
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          marginTop: '0.75rem', height: '1.5px',
          background: `linear-gradient(90deg, ${pillar.color}, transparent)`,
          transformOrigin: 'left',
        }}
      />
    </div>
  </div>
);

// ── Right content panel ───────────────────────────────────────────────────────

const ContentPanel = ({ pillar }) => {
  const panelRef   = useRef(null);
  const glowRef    = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const handleMove = useCallback((e) => {
    const r = panelRef.current.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top)  / r.height;
    mx.set(cx); my.set(cy);
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, ${pillar.color}1a, transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [pillar.color, mx, my]);

  const handleLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, []);

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      key={pillar.num}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '24px',
        border: `1px solid ${pillar.color}22`,
        background: `linear-gradient(145deg, rgba(255,255,255,0.025) 0%, ${pillar.color}07 100%)`,
        padding: '3.5rem',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${pillar.color}cc, transparent)`,
      }} />

      {/* Cursor glow layer */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: 0, transition: 'opacity 0.4s ease',
          borderRadius: '24px',
        }}
      />

      {/* Watermark number */}
      <div style={{
        position: 'absolute', right: '-0.05em', bottom: '-0.12em',
        fontSize: '20rem', fontWeight: 900, lineHeight: 1,
        color: pillar.color, opacity: 0.04,
        fontFamily: "'Cinzel', serif",
        pointerEvents: 'none', userSelect: 'none',
        letterSpacing: '-10px',
      }}>
        {pillar.num}
      </div>

      {/* ── Content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Badge row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2.2rem' }}>
          <span style={{
            fontSize: '0.58rem', fontWeight: 800,
            color: pillar.color, textTransform: 'uppercase', letterSpacing: '3.5px',
          }}>
            {pillar.tagline}
          </span>
          <span style={{
            fontSize: '0.58rem', fontWeight: 700,
            color: `${pillar.color}80`,
            border: `1px solid ${pillar.color}35`,
            borderRadius: '100px', padding: '0.15rem 0.7rem',
            letterSpacing: '1.5px',
          }}>
            STEP {pillar.num}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
          fontWeight: 800, letterSpacing: '-3px', lineHeight: 0.95,
          color: '#fff', margin: '0 0 1.8rem 0',
        }}>
          {pillar.title}
        </h3>

        {/* Divider */}
        <div style={{
          width: '40px', height: '2px',
          background: `linear-gradient(90deg, ${pillar.color}, ${pillar.color}00)`,
          marginBottom: '1.8rem',
          borderRadius: '2px',
        }} />

        {/* Description */}
        <p style={{
          fontSize: '1rem', lineHeight: 1.8,
          color: 'rgba(255,255,255,0.52)',
          fontWeight: 300, margin: '0 0 2.2rem 0',
          maxWidth: '520px',
        }}>
          {pillar.description}
        </p>

        {/* Outcome */}
        <div style={{
          display: 'flex', gap: '1rem',
          padding: '1.2rem 1.5rem',
          background: `${pillar.color}0d`,
          borderLeft: `2px solid ${pillar.color}90`,
          borderRadius: '0 12px 12px 0',
          alignItems: 'flex-start',
        }}>
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ flexShrink: 0, marginTop: '1px' }}
          >
            <path d="M3 8h10M9 4l4 4-4 4" stroke={pillar.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{
              fontSize: '0.58rem', fontWeight: 800,
              color: pillar.color, textTransform: 'uppercase',
              letterSpacing: '2px', marginBottom: '0.4rem',
            }}>
              Outcome
            </div>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
              {pillar.outcome}
            </p>
          </div>
        </div>

        {/* Step image — small, bottom-right decorative */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '88px', height: '88px',
          borderRadius: '14px 0 24px 0',
          overflow: 'hidden',
          border: `1px solid ${pillar.color}25`,
          opacity: 0.55,
        }}>
          <img
            src={pillar.icon}
            alt={pillar.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${pillar.color}30, transparent 60%)`,
          }} />
        </div>
      </div>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

const AIAFramework = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePillar = pillars[activeIdx];

  const handleActivate = useCallback((idx) => setActiveIdx(idx), []);

  return (
    <section
      id="services"
      style={{
        padding: '130px 0 180px',
        background: '#050505',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 5%' }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: '9vh' }}>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1.2rem',
              border: '1px solid rgba(0,242,255,0.2)',
              borderRadius: '100px',
              fontSize: '0.6rem', letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--accent-primary)',
              background: 'rgba(0,242,255,0.05)',
              marginBottom: '1.5rem', fontWeight: 700,
            }}
          >
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ repeat: Infinity, duration: 2.6 }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}
            />
            Our Approach
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
              fontWeight: 800, letterSpacing: '-3.5px',
              lineHeight: 1, color: '#fff', display: 'block',
              marginBottom: '1.4rem',
            }}
          >
            The AIA Framework
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: '560px', margin: '0 auto',
              fontSize: '1.05rem', color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7, fontWeight: 300,
            }}
          >
            Most AI initiatives underdeliver not because of technology — but because of approach.
            The AIA Framework treats the full journey as a single, continuous process.
          </motion.p>
        </div>

        {/* ── Two-column body ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '290px 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Left: step tabs */}
          <div>
            {/* Section label */}
            <div style={{
              fontSize: '0.58rem', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '4px',
              color: 'rgba(255,255,255,0.22)',
              marginBottom: '1.2rem',
            }}>
              Process
            </div>

            {pillars.map((pillar, i) => (
              <StepTab
                key={i}
                pillar={pillar}
                index={i}
                isActive={i === activeIdx}
                onActivate={handleActivate}
              />
            ))}

            {/* Hover hint */}
            <div style={{
              marginTop: '1.6rem',
              fontSize: '0.62rem', color: 'rgba(255,255,255,0.18)',
              letterSpacing: '1.5px', fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              </svg>
              Hover to explore
            </div>
          </div>

          {/* Right: sticky content panel */}
          <div style={{ position: 'sticky', top: '110px' }}>
            <AnimatePresence mode="wait">
              <ContentPanel key={activeIdx} pillar={activePillar} />
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AIAFramework;
