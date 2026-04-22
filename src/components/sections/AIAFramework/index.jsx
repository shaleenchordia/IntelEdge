import React, { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';

// --- Custom SVGs matching the Wireframe aesthetic ---

const StrategyIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    {/* Top Header Bar */}
    <rect x="20" y="24" width="80" height="14" rx="7" />

    {/* Left Box with Figma-like symbol (four circles) */}
    <rect x="20" y="48" width="36" height="36" rx="8" />
    <circle cx="33" cy="58" r="4" />
    <circle cx="43" cy="58" r="4" />
    <circle cx="33" cy="68" r="4" />
    <path d="M 43 64 A 4 4 0 0 1 43 72 A 4 4 0 0 1 39 68" />

    {/* Right lines */}
    <line x1="64" y1="52" x2="94" y2="52" />
    <line x1="64" y1="62" x2="88" y2="62" />
    <line x1="64" y1="72" x2="94" y2="72" />
    <line x1="64" y1="82" x2="84" y2="82" />

    {/* Bottom Dots & button */}
    <circle cx="24" cy="100" r="4" />
    <circle cx="36" cy="100" r="4" />
    <circle cx="48" cy="100" r="4" />
    <rect x="62" y="92" width="36" height="14" rx="6" />
  </svg>
);

const ImplementationIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    {/* Left Sidebar block */}
    <rect x="22" y="24" width="28" height="76" rx="6" />
    {/* Sidebar content */}
    <path d="M 28 36 L 31 44 L 34 36 L 37 44 L 40 36" strokeWidth="2.5" />
    <line x1="28" y1="52" x2="42" y2="52" strokeWidth="2.5" />
    <line x1="28" y1="60" x2="42" y2="60" strokeWidth="2.5" />
    <line x1="28" y1="68" x2="42" y2="68" strokeWidth="2.5" />
    <path d="M 31 86 L 27 82 L 31 78" strokeWidth="2.5" />
    <path d="M 39 86 L 43 82 L 39 78" strokeWidth="2.5" />
    <line x1="33" y1="87" x2="37" y2="77" strokeWidth="2" />

    {/* Right grids */}
    <rect x="58" y="24" width="40" height="30" rx="6" />
    <rect x="58" y="60" width="16" height="16" rx="4" />
    <rect x="82" y="60" width="16" height="16" rx="4" />
    <rect x="58" y="84" width="16" height="16" rx="4" />
    <rect x="82" y="84" width="16" height="16" rx="4" />
  </svg>
);

const AdoptionIcon = () => (
  <svg viewBox="0 0 120 120" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    {/* Cyclical arrows outer ring */}
    <path d="M 36 34 A 36 36 0 0 1 96 56" strokeWidth="2.5" />
    <path d="M 96 56 L 96 44 M 96 56 L 84 56" strokeWidth="2.5" />

    <path d="M 84 86 A 36 36 0 0 1 24 64" strokeWidth="2.5" />
    <path d="M 24 64 L 24 76 M 24 64 L 36 64" strokeWidth="2.5" />

    {/* Chat bubble inside */}
    <rect x="42" y="44" width="36" height="28" rx="6" />
    <path d="M 48 72 L 56 82 L 60 72" fill="transparent" />
    {/* Lines inside chat bubble */}
    <line x1="50" y1="54" x2="70" y2="54" />
    <line x1="50" y1="62" x2="62" y2="62" />
  </svg>
);

const NoiseGlow = () => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    background: 'radial-gradient(circle at top left, rgba(255,255,255,0.12) 0%, transparent 60%)',
    zIndex: 0
  }}>
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.35,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      mixBlendMode: 'overlay'
    }} />
  </div>
);

// --- Content Data ---

const pillars = [
  {
    title: "AI Strategy",
    tagline: "Value Mapping & Roadmap",
    description: "Before any recommendation is made, we build a clear picture of where the organisation stands and where it needs to go. Deep diagnostics, stakeholder alignment, and opportunity mapping form the foundation of everything that follows.",
    icon: StrategyIcon,
    num: "1",
  },
  {
    title: "Implementation",
    tagline: "Execution & Engineering",
    description: "Strategy without execution is a slide deck. We handle solution design, vendor-neutral technology selection, systems integration, and performance tracking — built to run in your environment - not just look good in a presentation",
    icon: ImplementationIcon,
    num: "2",
  },
  {
    title: "Adoption",
    tagline: "Sustain & Scale",
    description: "AI only works if people use it. We focus on training, workflow integration, governance, and the cultural shift required for long-term success — turning sceptics into champions and early wins into lasting transformation.",
    icon: AdoptionIcon,
    num: "3",
  },
];

const PillarCard = ({ pillar, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-30% 0px -40% 0px" });
  const isActive = isInView;

  return (
    <div ref={ref} className="aia-pillar-row" style={{ display: 'flex', gap: '5vw', position: 'relative', width: '100%' }}>

      {/* Timeline Circle */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '2.5rem',
        zIndex: 2
      }}>
        <motion.div
          animate={{
            borderColor: isActive ? '#fff' : 'rgba(255,255,255,0.2)',
            color: isActive ? '#fff' : 'rgba(255,255,255,0.2)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: '45px', height: '45px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            background: '#050505',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {pillar.num}
        </motion.div>
      </div>

      {/* Card Content */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.25,
          borderColor: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.08)',
          scale: isActive ? 1 : 0.98,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="aia-pillar-card"
        style={{
          flex: 1,
          padding: '3.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
          display: 'flex',
          gap: '4rem',
          flexDirection: 'row',
          alignItems: 'center',
          boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Aesthetic Wireframe Box */}
        <div className="aia-icon-box" style={{
          width: '200px', height: '200px',
          borderRadius: '24px',
          border: `1px solid rgba(255, 255, 255, 0.08)`,
          overflow: 'hidden',
          flexShrink: 0,
          background: '#070707',
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <NoiseGlow />
          <motion.div
            animate={{ scale: isActive ? 1.05 : 1, opacity: isActive ? 1 : 0.5 }}
            transition={{ duration: 0.7 }}
            style={{ width: '130px', height: '130px', position: 'relative', zIndex: 1 }}
          >
            <pillar.icon />
          </motion.div>
        </div>

        {/* Text Details */}
        <div className="aia-pillar-text" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          <h3 style={{ fontSize: '2.4rem', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-1px' }}>
            {pillar.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', margin: 0, fontWeight: 500 }}>
            {pillar.tagline}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0, marginTop: '1rem', maxWidth: '90%' }}>
            {pillar.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Animated Subtitle ---

const textWords = [
  { text: "Most" },
  { text: "AI" },
  { text: "initiatives" },
  { text: "underdeliver" },
  { text: "not" },
  { text: "because" },
  { text: "of" },
  { text: "technology", highlight: true },
  { text: "—" },
  { text: "but" },
  { text: "because" },
  { text: "of" },
  { text: "approach.", highlight: true },
  { text: "The" },
  { text: "AIA", highlight: true },
  { text: "Framework", highlight: true },
  { text: "treats" },
  { text: "the" },
  { text: "full" },
  { text: "journey" },
  { text: "as" },
  { text: "a" },
  { text: "single," },
  { text: "continuous" },
  { text: "process." }
];

const AnimatedSubtitle = () => {
  return (
    <motion.div
      className="aia-subtitle-block"
      style={{
        fontSize: '1.2rem',
        maxWidth: '680px',
        margin: '2rem auto 0',
        lineHeight: 1.7,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        columnGap: '0.45rem',
        rowGap: '0.2rem'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.03 }
        }
      }}
    >
      {textWords.map((w, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { type: "spring", stiffness: 60, damping: 12 }
            }
          }}
          whileHover={{
            scale: 1.05,
            color: '#fff',
            textShadow: '0 0 12px rgba(255,255,255,0.6)',
            transition: { duration: 0.2 }
          }}
          style={{
            display: 'inline-block',
            color: w.highlight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
            fontWeight: w.highlight ? 600 : 400,
            cursor: 'default',
            transformOrigin: 'center center'
          }}
        >
          {w.text}
        </motion.span>
      ))}
    </motion.div>
  );
};

const AIAFramework = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section
      id="framework"
      className="aia-section"
      style={{
        padding: '150px 5%',
        background: 'transparent',
        position: 'relative'
      }}
    >
      <style>{`
        .aia-section { padding: 150px 5%; }
        @media (max-width: 768px) {
          .aia-section { padding: 80px 5%; }
          .aia-heading { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
          .aia-subtitle-block { font-size: 1rem !important; max-width: 100% !important; }
          .aia-heading-wrap { margin-bottom: 4rem !important; }
          .aia-pillar-row { gap: 3vw !important; }
          .aia-pillar-card { padding: 2rem !important; gap: 2rem !important; flex-direction: column !important; }
          .aia-icon-box { width: 120px !important; height: 120px !important; align-self: flex-start; }
          .aia-pillar-text h3 { font-size: 1.6rem !important; }
          .aia-pillar-text p { font-size: 0.9rem !important; }
        }
        @media (max-width: 480px) {
          .aia-section { padding: 60px 4%; }
          .aia-heading { font-size: clamp(2rem, 9vw, 2.8rem) !important; }
          .aia-pillar-card { padding: 1.4rem !important; gap: 1.2rem !important; }
          .aia-icon-box { width: 88px !important; height: 88px !important; border-radius: 16px !important; }
          .aia-pillar-text h3 { font-size: 1.4rem !important; }
          .aia-heading-wrap { margin-bottom: 3rem !important; }
        }
      `}</style>
      <div className="aia-heading-wrap" style={{ textAlign: 'center', marginBottom: '8rem' }}>
        <h2 className="aia-heading" style={{ fontSize: '4.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-2px', margin: 0 }}>How it works</h2>
        <AnimatedSubtitle />
      </div>

      <div
        ref={containerRef}
        style={{
          maxWidth: '1000px', margin: '0 auto',
          position: 'relative',
          display: 'flex', flexDirection: 'column', gap: '3rem',
          paddingBottom: '20vh' // Gives space to scroll past the last element
        }}
      >
        {/* Dim background line */}
        <div style={{
          position: 'absolute',
          left: '22px',
          top: '2.5rem',
          bottom: '40px',
          width: '1px',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />

        {/* Bright active scroll line */}
        <motion.div
          style={{
            position: 'absolute',
            left: '22px',
            top: '2.5rem',
            bottom: '40px',
            width: '1px',
            background: '#fff',
            scaleY: scrollYProgress,
            transformOrigin: 'top',
            zIndex: 1
          }}
        />

        {pillars.map((pillar, i) => (
          <PillarCard key={i} pillar={pillar} index={i} />
        ))}
      </div>
    </section>
  );
};

export default AIAFramework;
