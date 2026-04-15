import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Cpu, Users, Bot, MessageSquare, BarChart, Database, X } from 'lucide-react';

const services = [
  { id: 0, title: "AI Strategy",            icon: Zap,           div: "Advisory", desc: "Long-term architectural roadmaps for intelligence-first enterprise transformation." },
  { id: 1, title: "Governance & Risk",      icon: Shield,        div: "Advisory", desc: "Robust framework for ethical, compliant, and secure AI deployment at scale." },
  { id: 2, title: "Automation CoE",         icon: Cpu,           div: "Advisory", desc: "Establishing Centers of Excellence to industrialize autonomous operations." },
  { id: 3, title: "Leadership Enablement",  icon: Users,         div: "Advisory", desc: "Upskilling stakeholders to manage and architect unified agentic systems." },
  { id: 4, title: "AI Agents",              icon: Bot,           div: "Labs",     desc: "Developing custom autonomous agents for complex, non-linear enterprise workflows." },
  { id: 5, title: "Conversational AI",      icon: MessageSquare, div: "Labs",     desc: "Next-gen LLM interfaces that bridge human intent with structured system actions." },
  { id: 6, title: "Process Mining",         icon: BarChart,      div: "Labs",     desc: "Algorithmic discovery of systemic inefficiencies to target for AI-first re-engineering." },
  { id: 7, title: "SaaS Platforms",         icon: Database,      div: "Labs",     desc: "Cloud-native intelligence infrastructure powered by AIA methodologies." },
];

// ─── Shard particle spawned at blast origin ──────────────────────────────────
const SHARD_COUNT = 16;

const BlastShards = ({ color }) => {
  return (
    <>
      {Array.from({ length: SHARD_COUNT }).map((_, i) => {
        const angle  = (i / SHARD_COUNT) * 360;
        const dist   = 80 + Math.random() * 140;
        const size   = 4 + Math.random() * 8;
        const rad    = (angle * Math.PI) / 180;
        const tx     = Math.cos(rad) * dist;
        const ty     = Math.sin(rad) * dist;
        const delay  = Math.random() * 0.05;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 + Math.random() * 0.3, ease: 'easeOut', delay }}
            style={{
              position:     'absolute',
              top:          '50%',
              left:         '50%',
              width:        `${size}px`,
              height:       `${size}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              background:   color,
              transform:    'translate(-50%, -50%)',
              pointerEvents:'none',
              zIndex:       30,
              boxShadow:    `0 0 ${size * 2}px ${color}`,
            }}
          />
        );
      })}
    </>
  );
};

// ─── Ripple ring at blast origin ─────────────────────────────────────────────
const BlastRing = ({ color }) => (
  <>
    {[0, 80, 160].map((delay, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0.3, opacity: 0.9 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: delay / 1000 }}
        style={{
          position:   'absolute',
          inset:      0,
          borderRadius: '50%',
          border:     `2px solid ${color}`,
          pointerEvents: 'none',
          zIndex:     20,
        }}
      />
    ))}
  </>
);

// ─── Individual bubble ────────────────────────────────────────────────────────
const Bubble = ({ service, onClick, blasted, color }) => {
  const sizes = [220, 200, 240, 210, 230, 215, 225, 205];
  const sz = sizes[service.id];

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={blasted
        ? { scale: [1, 1.3, 0], opacity: [1, 1, 0] }
        : { scale: 1, opacity: 1, y: [0, -12, 0] }
      }
      transition={blasted
        ? { duration: 0.35, ease: 'easeIn' }
        : {
            duration: 0.6,
            delay: service.id * 0.08,
            y: { duration: 3 + (service.id % 3), repeat: Infinity, ease: 'easeInOut' },
          }
      }
      whileHover={blasted ? {} : { scale: 1.12, translateY: -18 }}
      onClick={() => !blasted && onClick(service.id)}
      className="interactive"
      style={{
        width:        sz,
        height:       sz,
        borderRadius: '50%',
        display:      'flex',
        flexDirection:'column',
        alignItems:   'center',
        justifyContent: 'center',
        textAlign:    'center',
        padding:      '30px',
        margin:       '18px',
        cursor:       'none',
        position:     'relative',
        background:   'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(14px)',
        border:       '1px solid rgba(255,255,255,0.12)',
        boxShadow:    `inset 0 0 30px var(--accent-glow), 0 8px 32px rgba(0,0,0,0.35)`,
        flexShrink:   0,
      }}
    >
      {/* Gloss sheen */}
      <div style={{
        position: 'absolute', top: '14%', left: '18%',
        width: '32%', height: '12%',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',
        borderRadius: '100px', transform: 'rotate(-40deg)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '50px', height: '50px', borderRadius: '12px',
        background: 'var(--accent-glow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent-primary)', marginBottom: '14px',
      }}>
        <service.icon size={24} />
      </div>

      <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', opacity: 0.4, letterSpacing: '2px', fontWeight: 800 }}>
        {service.div}
      </span>
      <h4 style={{ fontSize: '1rem', fontWeight: 700, marginTop: '8px', lineHeight: 1.2 }}>
        {service.title}
      </h4>

      {/* Blast effects rendered on top when triggered */}
      {blasted && (
        <>
          <BlastRing  color={color} />
          <BlastShards color={color} />
        </>
      )}
    </motion.div>
  );
};

// ─── Expanded content card ────────────────────────────────────────────────────
const DetailCard = ({ service, onClose, color }) => (
  <motion.div
    key="card"
    initial={{ scale: 0.1, opacity: 0, borderRadius: '50%' }}
    animate={{ scale: 1, opacity: 1, borderRadius: '32px' }}
    exit={{    scale: 0, opacity: 0, borderRadius: '50%' }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    style={{
      width:         '100%',
      maxWidth:      '520px',
      padding:       '60px',
      background:    'rgba(6,8,14,0.92)',
      backdropFilter:'blur(40px)',
      border:        `1px solid ${color}`,
      boxShadow:     `0 0 120px ${color}33`,
      position:      'relative',
      zIndex:        50,
      textAlign:     'center',
    }}
  >
    {/* Particle ring inside card */}
    <motion.div
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: `2px solid ${color}`, pointerEvents: 'none',
      }}
    />

    <button
      onClick={onClose}
      className="interactive"
      style={{ position: 'absolute', top: 28, right: 28, color, cursor: 'none', background: 'none', border: 'none' }}
    >
      <X size={22} />
    </button>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4 }}
    >
      <div style={{
        width: '80px', height: '80px', borderRadius: '24px',
        background: 'var(--accent-glow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, margin: '0 auto 28px auto',
      }}>
        <service.icon size={40} />
      </div>

      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color, letterSpacing: '4px', fontWeight: 800 }}>
        {service.div}
      </span>
      <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '14px 0 18px', letterSpacing: '-1px' }}>
        {service.title}
      </h2>
      <p style={{ fontSize: '1.1rem', opacity: 0.65, lineHeight: 1.7 }}>
        {service.desc}
      </p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${color}88` }}
        whileTap={{ scale: 0.95 }}
        className="interactive"
        style={{
          marginTop: '40px', padding: '15px 44px',
          borderRadius: '100px', background: color,
          color: '#000', fontWeight: 800, fontSize: '0.9rem',
          border: 'none', cursor: 'none',
        }}
      >
        Learn More →
      </motion.button>
    </motion.div>
  </motion.div>
);

// ─── Main section ─────────────────────────────────────────────────────────────
const ServicesGrid = () => {
  const [blastId,  setBlastId]  = useState(null);
  const [activeId, setActiveId] = useState(null);

  // accent color lives in CSS var — pull it once
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-primary').trim() || '#00f2ff';

  const handleClick = (id) => {
    if (activeId !== null || blastId !== null) return;

    setBlastId(id);                       // ① bubble blasts
    setTimeout(() => setActiveId(id), 350);  // ② card expands ~at blast peak
  };

  const handleClose = () => {
    setActiveId(null);
    setBlastId(null);
  };

  return (
    <section id="services" style={{ minHeight: '120vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 5%' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '7rem' }}
      >
        <h2 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1.1 }}>
          High-Impact <br />
          <span className="gradient-text">Core Competencies</span>
        </h2>
        <p style={{ opacity: 0.45, marginTop: '1.2rem', fontSize: '1.05rem' }}>
          {activeId !== null
            ? 'Click elsewhere to collapse.'
            : 'Tap an intelligence sphere — watch it detonate.'}
        </p>
      </motion.div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '1200px' }}>
        <AnimatePresence mode="wait">
          {activeId === null ? (
            <motion.div
              key="field"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
            >
              {services.map((s) => (
                <Bubble
                  key={s.id}
                  service={s}
                  onClick={handleClick}
                  blasted={blastId === s.id}
                  color={color}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <DetailCard
                service={services.find(s => s.id === activeId)}
                onClose={handleClose}
                color={color}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesGrid;
