import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from 'framer-motion';
import { Compass, RefreshCw, Zap, ArrowUpRight } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const SERVICES = [
  {
    num: 'SERVICE 01',
    Icon: Compass,
    title: 'Enterprise AI Consulting',
    tag: 'Strategy & Governance',
    points: [
      'AI opportunity assessment',
      'Board-ready AI roadmap',
      'Governance & responsible AI',
      'Vendor-neutral selection',
      'ROI measurement framework',
    ],
    outcome: 'A clear, funded, executable AI strategy',
  },
  {
    num: 'SERVICE 02',
    Icon: RefreshCw,
    title: 'Digital Transformation',
    tag: 'Operating Model Redesign',
    points: [
      'Transformation readiness assessment',
      'AI-enabled process redesign',
      'Operating model design',
      'Cross-functional alignment',
      'Change management planning',
    ],
    outcome: 'A transformation program built for execution',
  },
  {
    num: 'SERVICE 03',
    Icon: Zap,
    title: 'AI Strategy & Implementation',
    tag: 'Roadmap to Working Solution',
    points: [
      'Implementation-ready roadmap',
      'Pilot design & deployment',
      'Systems integration oversight',
      'Vendor accountability',
      'Scaling & performance optimization',
    ],
    outcome: 'Strategy that moves to a working solution',
  },
];

const BUILD_STACK = [
  { label: 'Problem Def.', value: 100 },
  { label: 'Architecture', value: 92 },
  { label: 'Development', value: 85 },
  { label: 'Integration', value: 80 },
  { label: 'Deployment', value: 75 },
  { label: 'Monitoring', value: 70 },
];

const ease = [0.16, 1, 0.3, 1];
const springConfig = { stiffness: 120, damping: 30, mass: 0.8 };

// ═══════════════════════════════════════════════════════════════════════════
// Reusable: word-by-word mask reveal
// ═══════════════════════════════════════════════════════════════════════════

const SplitText = ({ text, delay = 0, isInView, charDelay = 0.1 }) => {
  const words = text.split(' ');
  return (
    <span style={{ display: 'inline-block' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: '0.28em' }}>
          <motion.span
            initial={{ y: '110%', rotate: 6 }}
            animate={{ y: isInView ? '0%' : '110%', rotate: isInView ? 0 : 6 }}
            transition={{ duration: 1.1, delay: delay + wi * charDelay, ease }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// Magnetic button
// ═══════════════════════════════════════════════════════════════════════════

const MagneticButton = ({ children, style, strength = 0.35, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1 — SPLIT HERO
// ═══════════════════════════════════════════════════════════════════════════

const SplitHero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState(null);

  const labsW = hovered === 'labs' ? '58%' : hovered === 'advisory' ? '42%' : '50%';
  const advW = hovered === 'advisory' ? '58%' : hovered === 'labs' ? '42%' : '50%';

  return (
    <section ref={ref} style={{ position: 'relative', width: '100%', height: '100vh', background: '#000', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }} transition={{ duration: 0.8, delay: 1.8, ease }}
        style={{ position: 'absolute', top: 32, left: 42, zIndex: 30, color: '#fff', fontSize: 11, lineHeight: 1.4, fontWeight: 600, letterSpacing: '0.5px', pointerEvents: 'none' }}>
        INTELEDGE<br />LABS<br />DIVISION
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -10 }} transition={{ duration: 0.8, delay: 1.8, ease }}
        style={{ position: 'absolute', top: 32, right: 42, zIndex: 30, color: '#fff', textAlign: 'right', pointerEvents: 'none' }}>
        <div style={{ opacity: 0.5, fontSize: 9, marginBottom: 4, letterSpacing: '1.5px' }}>EXPLORE</div>
        <div style={{ fontWeight: 700, fontSize: 13 }}>Advisory Services</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8, delay: 2.0, ease }}
        style={{ position: 'absolute', bottom: 36, left: 42, zIndex: 30, color: '#fff', fontSize: 13, fontWeight: 600, pointerEvents: 'none' }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.5)', paddingTop: 6, width: 26 }}>01</div>
        <div style={{ opacity: 0.5, marginTop: 2 }}>03</div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8, delay: 2.3, ease }}
        style={{ position: 'absolute', bottom: 36, right: 42, zIndex: 30, color: 'rgba(255,255,255,0.85)', fontSize: 11, textAlign: 'right', letterSpacing: '2px', fontWeight: 600 }}>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>SCROLL ↓</motion.div>
      </motion.div>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '68vh', overflow: 'hidden' }}>
        <motion.div
          initial={{ x: '-101%', width: '50%' }}
          animate={{ x: isInView ? 0 : '-101%', width: labsW, zIndex: hovered === 'labs' ? 3 : 1 }}
          transition={{ x: { duration: 1.3, ease }, width: { duration: 0.7, ease } }}
          onMouseEnter={() => setHovered('labs')} onMouseLeave={() => setHovered(null)}
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1e24 0%, #0f1318 50%, #080a0d 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.35, backgroundImage: `linear-gradient(rgba(120,160,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(120,160,200,0.08) 1px, transparent 1px), radial-gradient(circle at 25% 30%, rgba(100,180,220,0.1) 0%, transparent 40%), radial-gradient(circle at 75% 70%, rgba(80,140,200,0.08) 0%, transparent 45%)`, backgroundSize: '48px 48px, 48px 48px, 100% 100%, 100% 100%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)' }} />
        </motion.div>

        <motion.div
          initial={{ x: '101%', width: '50%' }}
          animate={{ x: isInView ? 0 : '101%', width: advW, zIndex: hovered === 'advisory' ? 3 : 1 }}
          transition={{ x: { duration: 1.3, ease }, width: { duration: 0.7, ease } }}
          onMouseEnter={() => setHovered('advisory')} onMouseLeave={() => setHovered(null)}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 0, overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #8b3a2e 0%, #5e1f17 55%, #2e0a07 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, opacity: 0.6, background: 'radial-gradient(ellipse at 30% 35%, rgba(210,110,70,0.35) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.5) 100%)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.92, y: isInView ? 0 : 30 }}
          transition={{ duration: 1.4, delay: 1.1, ease }}
          style={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', height: '92%', width: 'clamp(200px, 28%, 340px)', zIndex: 5, pointerEvents: 'none' }}>
          <svg viewBox="0 0 300 700" preserveAspectRatio="xMidYMax meet" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="coldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a5560" /><stop offset="50%" stopColor="#2a3038" /><stop offset="100%" stopColor="#0e1115" />
              </linearGradient>
              <linearGradient id="warmGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8a870" /><stop offset="30%" stopColor="#c56838" /><stop offset="70%" stopColor="#8b2e1e" /><stop offset="100%" stopColor="#3d0f08" />
              </linearGradient>
              <clipPath id="leftHalf"><rect x="0" y="0" width="150" height="700" /></clipPath>
              <clipPath id="rightHalf"><rect x="150" y="0" width="150" height="700" /></clipPath>
            </defs>
            <g clipPath="url(#leftHalf)">
              <rect x="140" y="20" width="20" height="280" fill="url(#coldGrad)" />
              <ellipse cx="150" cy="30" rx="28" ry="18" fill="url(#coldGrad)" />
              <path d="M 150 300 Q 60 320, 50 480 Q 50 640, 150 680 Z" fill="url(#coldGrad)" />
              {[80, 120, 160, 200, 240, 280].map((y, i) => (<line key={i} x1="143" y1={y} x2="157" y2={y} stroke="rgba(180,200,220,0.35)" strokeWidth="0.8" />))}
              <circle cx="110" cy="480" r="32" fill="rgba(0,0,0,0.55)" stroke="rgba(0,0,0,0.6)" strokeWidth="2" />
            </g>
            <g clipPath="url(#rightHalf)">
              <rect x="140" y="20" width="20" height="280" fill="url(#warmGrad)" />
              <ellipse cx="150" cy="30" rx="28" ry="18" fill="url(#warmGrad)" />
              <path d="M 150 300 Q 250 315, 255 470 Q 255 645, 150 680 Z" fill="url(#warmGrad)" />
              <rect x="172" y="440" width="52" height="18" rx="3" fill="rgba(245,230,180,0.9)" />
              <rect x="172" y="490" width="52" height="18" rx="3" fill="rgba(40,20,15,0.8)" />
              {[540, 570, 600].map((y, i) => (<circle key={i} cx={200 + i * 12} cy={y} r="5" fill="rgba(220,180,140,0.85)" />))}
              {[80, 120, 160, 200, 240, 280].map((y, i) => (<line key={i} x1="143" y1={y} x2="157" y2={y} stroke="rgba(255,220,180,0.4)" strokeWidth="0.8" />))}
            </g>
            <line x1="150" y1="15" x2="150" y2="685" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: isInView ? 1 : 0 }} transition={{ duration: 1.5, delay: 0.3, ease }}
          style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, transform: 'translateX(-50%)', transformOrigin: 'top', background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)', zIndex: 4, pointerEvents: 'none' }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32vh', display: 'flex' }}>
        <motion.div initial={{ y: '101%' }} animate={{ y: isInView ? 0 : '101%', width: labsW }} transition={{ y: { duration: 1.1, delay: 0.4, ease }, width: { duration: 0.7, ease } }} style={{ background: '#0a0a0a', height: '100%' }} />
        <motion.div initial={{ y: '101%' }} animate={{ y: isInView ? 0 : '101%', width: advW }} transition={{ y: { duration: 1.1, delay: 0.4, ease }, width: { duration: 0.7, ease } }} style={{ background: '#a82417', height: '100%', flex: 1 }} />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32vh', zIndex: 10, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} transition={{ duration: 1, delay: 1.3, ease }}
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95, color: '#fff', margin: 0, letterSpacing: '-2px', textTransform: 'uppercase', textShadow: '0 2px 20px rgba(0,0,0,0.4)', whiteSpace: 'nowrap' }}>
          LABS<span style={{ fontWeight: 300, opacity: 0.6, margin: '0 0.3em' }}>/</span>ADVISORY
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }} transition={{ duration: 1, delay: 1.55, ease }}
          style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 500, fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)', color: '#f5c08a', marginTop: '0.3em', letterSpacing: '0.5px' }}>
          two sides of one vision
        </motion.div>
      </div>
    </section>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2 — ADVISORY (cinematic)
// ═══════════════════════════════════════════════════════════════════════════

const AdvisorySection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, springConfig);
  const bgY = useTransform(smooth, [0, 1], ['-15%', '15%']);
  const bgScale = useTransform(smooth, [0, 0.5, 1], [1.1, 1, 1.1]);
  const contentY = useTransform(smooth, [0, 1], ['10%', '-15%']);
  const watermarkX = useTransform(smooth, [0, 1], ['-25%', '25%']);
  const watermarkOpacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]);

  const [activeService, setActiveService] = useState(0);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setActiveService(p => (p + 1) % 3), 5500);
    return () => clearInterval(id);
  }, [isInView]);

  const onCardMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const cy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    setCardTilt({ x: cy * -5, y: cx * 6 });
  }, []);
  const onCardLeave = useCallback(() => setCardTilt({ x: 0, y: 0 }), []);

  const S = SERVICES[activeService];

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', minHeight: '110vh', background: '#0a0202', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}
    >
      <motion.div style={{ position: 'absolute', inset: '-10% 0', y: bgY, scale: bgScale, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #2e0a07 0%, #180606 60%, #0a0202 100%)' }} />
        <div style={{ position: 'absolute', top: '15%', right: '-10%', width: '65%', height: '65%', background: 'radial-gradient(ellipse, rgba(210,110,70,0.22) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '-15%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(139,22,22,0.18) 0%, transparent 65%)' }} />
      </motion.div>

      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'overlay', pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>")`
      }} />

      {/* scroll-linked watermark */}
      <motion.div
        style={{
          position: 'absolute', top: '30%', left: 0, right: 0,
          x: watermarkX, opacity: watermarkOpacity,
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: 'clamp(12rem, 28vw, 28rem)', lineHeight: 1,
          letterSpacing: '-10px', color: '#fff',
          textAlign: 'center', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}
      >
        ADVISORY
      </motion.div>

      {/* section header */}
      <div style={{ position: 'relative', zIndex: 2, padding: '7rem 6% 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}
        >
          <motion.div
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ height: 1, width: 60, background: '#e84a3a', transformOrigin: 'left' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#e84a3a' }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '4px', color: '#e84a3a', textTransform: 'uppercase' }}>
              02 · Inteledge Advisory
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ y: contentY }}>
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1400, margin: '0 auto', padding: '0 6% 8rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className="adv-grid">

          {/* LEFT */}
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5.2vw, 5.2rem)', lineHeight: 1.0,
              letterSpacing: '-3px', color: '#fff', margin: 0,
            }}>
              <div><SplitText text="Independent." isInView={isInView} delay={0.3} /></div>
              <div><SplitText text="Vendor-Neutral." isInView={isInView} delay={0.5} /></div>
              <div style={{ color: '#e84a3a' }}><SplitText text="Execution-Focused." isInView={isInView} delay={0.7} /></div>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.9, delay: 1.1, ease }}
              style={{ marginTop: '2rem', fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 460 }}
            >
              Strategic advisory that doesn&apos;t stop at the slide deck. We move from boardroom decisions to working systems — without vendor bias or execution gaps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 1.25, ease }}
              style={{ display: 'flex', gap: 8, marginTop: '2.8rem', flexWrap: 'wrap' }}
            >
              {SERVICES.map((s, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                  whileHover={{ y: -3 }}
                  style={{
                    position: 'relative', padding: '11px 22px', borderRadius: 100,
                    fontSize: 11, fontWeight: 800, letterSpacing: '2px',
                    background: activeService === i ? 'rgba(232,74,58,0.2)' : 'transparent',
                    color: activeService === i ? '#fff' : 'rgba(255,255,255,0.35)',
                    border: `1px solid ${activeService === i ? 'rgba(232,74,58,0.6)' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    transition: 'color 0.3s, border-color 0.3s, background 0.3s',
                    boxShadow: activeService === i ? '0 0 24px rgba(232,74,58,0.35)' : 'none',
                  }}
                >
                  0{i + 1}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — 3D tilt card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: -10 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40, rotateY: isInView ? 0 : -10 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            style={{ perspective: 1400 }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              animate={{ rotateX: cardTilt.x, rotateY: cardTilt.y }}
              transition={{ type: 'spring', stiffness: 250, damping: 28 }}
              style={{ transformStyle: 'preserve-3d', position: 'relative' }}
            >
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  position: 'absolute', inset: -20,
                  background: 'radial-gradient(ellipse, rgba(232,74,58,0.25) 0%, transparent 70%)',
                  filter: 'blur(30px)', pointerEvents: 'none',
                }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -25, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease }}
                  style={{
                    position: 'relative',
                    background: 'linear-gradient(145deg, rgba(30,8,8,0.8), rgba(12,3,3,0.6))',
                    border: '1px solid rgba(232,74,58,0.2)',
                    borderRadius: 20, padding: '2.4rem 2.6rem',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 16, right: 16, width: 28, height: 28,
                    borderTop: '1.5px solid rgba(232,74,58,0.5)', borderRight: '1.5px solid rgba(232,74,58,0.5)', pointerEvents: 'none'
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.6rem', transform: 'translateZ(30px)' }}>
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{ fontSize: 10, fontWeight: 800, letterSpacing: '3.5px', color: 'rgba(232,74,58,0.8)', marginBottom: 10, textTransform: 'uppercase' }}
                      >
                        {S.num}
                      </motion.div>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 30, fontWeight: 700, color: '#fff',
                        margin: 0, letterSpacing: '-0.6px', lineHeight: 1.1,
                      }}>
                        {S.title}
                      </h3>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 6, fontStyle: 'italic' }}>
                        {S.tag}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 6, 0, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        width: 62, height: 62, borderRadius: 16, flexShrink: 0,
                        background: 'linear-gradient(135deg, rgba(232,74,58,0.25), rgba(139,22,22,0.15))',
                        border: '1px solid rgba(232,74,58,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(232,74,58,0.25)',
                        transform: 'translateZ(40px)',
                      }}
                    >
                      <S.Icon size={26} color="#ff6b52" strokeWidth={1.5} />
                    </motion.div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: '1.8rem', transform: 'translateZ(20px)' }}>
                    {S.points.map((pt, i) => (
                      <motion.div
                        key={`${activeService}-${i}`}
                        initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease }}
                        style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 + i * 0.08, type: 'spring' }}
                          style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff6b52', flexShrink: 0, boxShadow: '0 0 8px rgba(255,107,82,0.6)' }}
                        />
                        <span style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4 }}>{pt}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ borderTop: '1px solid rgba(232,74,58,0.2)', paddingTop: '1.3rem', transform: 'translateZ(15px)' }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '3px', color: 'rgba(232,74,58,0.7)', textTransform: 'uppercase', marginBottom: 8 }}>
                      Outcome
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'rgba(255,255,255,0.9)', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                      {S.outcome}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* timed progress bar */}
            <div style={{ display: 'flex', gap: 6, marginTop: '1.6rem', justifyContent: 'center' }}>
              {SERVICES.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveService(i)}
                  animate={{
                    width: activeService === i ? 40 : 6,
                    background: activeService === i ? '#e84a3a' : 'rgba(255,255,255,0.15)',
                  }}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ background: 'rgba(232,74,58,0.7)' }}
                  style={{ height: 4, borderRadius: 2, border: 'none', cursor: 'pointer', padding: 0, overflow: 'hidden', position: 'relative' }}
                >
                  {activeService === i && (
                    <motion.div
                      key={`prog-${activeService}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                      style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)' }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// SECTION 3 — LABS (cinematic)
// ═══════════════════════════════════════════════════════════════════════════

const LabsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, springConfig);
  const bgY = useTransform(smooth, [0, 1], ['-15%', '15%']);
  const gridY = useTransform(smooth, [0, 1], ['0%', '-25%']);
  const watermarkX = useTransform(smooth, [0, 1], ['20%', '-20%']);
  const watermarkOpacity = useTransform(smooth, [0, 0.3, 0.7, 1], [0, 0.08, 0.08, 0]);
  const contentY = useTransform(smooth, [0, 1], ['10%', '-15%']);

  const particles = [
    { x: '12%', y: '18%', s: 4, d: 0 },
    { x: '72%', y: '24%', s: 3, d: 0.5 },
    { x: '20%', y: '68%', s: 3, d: 1 },
    { x: '85%', y: '75%', s: 4, d: 1.5 },
    { x: '55%', y: '45%', s: 2, d: 2 },
    { x: '38%', y: '85%', s: 3, d: 2.5 },
  ];

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', minHeight: '110vh', background: '#000', overflow: 'hidden', fontFamily: "'Inter', sans-serif" }}
    >
      <motion.div style={{ position: 'absolute', inset: '-10% 0', y: bgY, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050e1e 0%, #030709 60%, #000 100%)' }} />
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '65%', height: '65%', background: 'radial-gradient(ellipse, rgba(0,175,255,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-15%', width: '60%', height: '60%', background: 'radial-gradient(ellipse, rgba(0,100,200,0.1) 0%, transparent 65%)' }} />
      </motion.div>

      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(0,190,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,190,255,0.04) 1px, transparent 1px)',
          backgroundSize: '66px 66px', y: gridY,
        }}
      />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: p.d, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: p.x, top: p.y,
            width: p.s * 2, height: p.s * 2, borderRadius: '50%',
            background: '#00c0ee',
            boxShadow: `0 0 ${p.s * 4}px rgba(0,192,238,0.6)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <motion.div
        style={{
          position: 'absolute', top: '30%', left: 0, right: 0,
          x: watermarkX, opacity: watermarkOpacity,
          fontFamily: "'Playfair Display', serif", fontWeight: 900,
          fontSize: 'clamp(12rem, 30vw, 30rem)', lineHeight: 1,
          letterSpacing: '-12px', color: '#fff',
          textAlign: 'center', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}
      >
        LABS
      </motion.div>

      <motion.div
        animate={{ y: ['-5%', '105%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,200,255,0.35), transparent)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, padding: '7rem 6% 2rem', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '2.5rem' }}
        >
          <motion.div
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            style={{ height: 1, width: 60, background: '#00c0ee', transformOrigin: 'left' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#00c0ee' }} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '4px', color: '#00c0ee', textTransform: 'uppercase' }}>
              03 · Inteledge Labs
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ y: contentY }}>
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1400, margin: '0 auto', padding: '0 6% 8rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '5rem', alignItems: 'center',
        }} className="labs-grid">

          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5.2vw, 5.2rem)', lineHeight: 1.0,
              letterSpacing: '-3px', color: '#fff', margin: 0,
            }}>
              <div><SplitText text="When the Right" isInView={isInView} delay={0.3} /></div>
              <div><SplitText text="Solution Does Not" isInView={isInView} delay={0.5} /></div>
              <div><SplitText text="Exist —" isInView={isInView} delay={0.7} />
                <span style={{ color: '#00c0ee', marginLeft: '0.3em' }}>
                  <SplitText text="We Build It." isInView={isInView} delay={0.85} />
                </span>
              </div>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.9, delay: 1.3, ease }}
              style={{ marginTop: '2rem', fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 460 }}
            >
              Standard AI tools are built for general use. Enterprise operations are not. Labs designs and develops AI-powered systems purpose-built for enterprise use cases.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 14 }}
              transition={{ duration: 0.8, delay: 1.5, ease }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: '2.8rem' }}
            >
              <MagneticButton
                whileHover={{ boxShadow: '0 0 40px rgba(0,200,255,0.5)' }}
                style={{
                  background: '#00b4d8', color: '#000',
                  padding: '16px 32px', borderRadius: 100,
                  fontSize: 12, fontWeight: 800, letterSpacing: '2px',
                  border: 'none', cursor: 'pointer', textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                }}
              >
                View Products <ArrowUpRight size={14} strokeWidth={2.5} />
              </MagneticButton>
              <MagneticButton
                whileHover={{ borderColor: 'rgba(0,200,255,0.6)', color: '#fff', background: 'rgba(0,200,255,0.08)' }}
                style={{
                  background: 'transparent', color: 'rgba(255,255,255,0.75)',
                  padding: '16px 30px', borderRadius: 100,
                  fontSize: 12, fontWeight: 700, letterSpacing: '2px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'pointer', textTransform: 'uppercase',
                  transition: 'border-color 0.3s, color 0.3s, background 0.3s',
                }}
              >
                Enquiry Call
              </MagneticButton>
            </motion.div>
          </div>

          {/* Build stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }}
            transition={{ duration: 1.1, delay: 0.5, ease }}
            style={{
              position: 'relative',
              background: 'linear-gradient(145deg, rgba(6,18,32,0.7), rgba(2,6,12,0.5))',
              border: '1px solid rgba(0,200,255,0.18)',
              borderRadius: 20, padding: '2.6rem 2.8rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <motion.div
              animate={{ opacity: [0.25, 0.5, 0.25] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                position: 'absolute', inset: -20, zIndex: -1,
                background: 'radial-gradient(ellipse, rgba(0,200,255,0.2) 0%, transparent 70%)',
                filter: 'blur(30px)', pointerEvents: 'none',
              }}
            />

            <div style={{
              position: 'absolute', top: 16, left: 16, width: 28, height: 28,
              borderTop: '1.5px solid rgba(0,200,255,0.5)', borderLeft: '1.5px solid rgba(0,200,255,0.5)'
            }} />
            <div style={{
              position: 'absolute', bottom: 16, right: 16, width: 28, height: 28,
              borderBottom: '1.5px solid rgba(0,200,255,0.5)', borderRight: '1.5px solid rgba(0,200,255,0.5)'
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '4px', color: 'rgba(0,200,255,0.75)', textTransform: 'uppercase' }}>
                Build Stack
              </div>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: '2px',
                  color: 'rgba(0,200,255,0.7)', padding: '4px 10px',
                  border: '1px solid rgba(0,200,255,0.3)', borderRadius: 20,
                }}
              >
                ● LIVE
              </motion.div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {BUILD_STACK.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: '0.3px' }}>
                      {item.label}
                    </span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isInView ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 1.4 + i * 0.1 }}
                      style={{ fontSize: 12, color: '#00c0ee', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}
                    >
                      {item.value}%
                    </motion.span>
                  </div>
                  <div style={{
                    width: '100%', height: 4, background: 'rgba(255,255,255,0.05)',
                    borderRadius: 2, overflow: 'hidden', position: 'relative',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isInView ? `${item.value}%` : 0 }}
                      transition={{ duration: 1.4, delay: 0.9 + i * 0.12, ease }}
                      style={{
                        height: '100%', borderRadius: 2, position: 'relative',
                        background: 'linear-gradient(90deg, rgba(0,140,200,0.7), rgba(0,215,255,1))',
                        boxShadow: '0 0 12px rgba(0,200,255,0.7)',
                      }}
                    >
                      <motion.div
                        animate={isInView ? { x: ['-100%', '300%'] } : {}}
                        transition={{ duration: 2, delay: 2 + i * 0.15, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute', inset: 0, width: '40%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 2, ease }}
              style={{
                fontSize: 11, color: 'rgba(255,255,255,0.35)',
                marginTop: '2rem', letterSpacing: '1.5px',
                borderTop: '1px solid rgba(0,200,255,0.12)',
                paddingTop: '1.3rem', textTransform: 'uppercase', fontWeight: 600,
              }}
            >
              End-to-end — problem definition to production
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .labs-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
};


// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

const LabsAdvisoryPage = () => {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700;900&family=Inter:wght@400;500;600;700;800&family=Dancing+Script:wght@500;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #000; }
        html { scroll-behavior: smooth; }
      `}</style>

      <SplitHero />
      <AdvisorySection />
      <LabsSection />
    </div>
  );
};

export default LabsAdvisoryPage;