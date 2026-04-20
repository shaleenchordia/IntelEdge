import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════
   SCROLL RAIL — vertical section indicator (dots + labels) that appears
   on scroll and highlights the active section.
═══════════════════════════════════════════════════════════════════════ */

const AMBER = '#e67338';
const WARM_WHITE = '#f5e6d3';

const ScrollRail = ({ sections = [], showAfter = 300, hideBefore = 300 }) => {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const t = max > 0 ? y / max : 0;
        setProgress(t);

        setVisible(y > showAfter && y < max - hideBefore);

        let current = sections[0]?.id;
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.45) current = s.id;
        }
        setActiveId(current);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sections, showAfter, hideBefore]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeIndex = sections.findIndex(s => s.id === activeId);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-rail"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            right: '2.5vw',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 14,
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          {/* Progress track + fill */}
          <div style={{
            width: 1,
            height: 28,
            background: 'rgba(245,230,211,0.15)',
            marginRight: 5,
            marginBottom: 6,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                background: `linear-gradient(180deg, ${AMBER}, transparent)`,
                height: `${progress * 100}%`,
                transition: 'height 0.1s linear',
              }}
            />
          </div>

          {sections.map((s, i) => {
            const isActive = s.id === activeId;
            const isHovered = hoveredId === s.id;
            const isPassed = i < activeIndex;

            return (
              <div
                key={s.id}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => scrollToSection(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {/* Label */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        fontSize: 10,
                        letterSpacing: '2.5px',
                        textTransform: 'uppercase',
                        color: isActive ? AMBER : `rgba(245,230,211,0.7)`,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  animate={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    borderColor: isActive
                      ? AMBER
                      : isHovered
                        ? 'rgba(245,230,211,0.6)'
                        : isPassed
                          ? 'rgba(230,115,56,0.45)'
                          : 'rgba(245,230,211,0.25)',
                    background: isActive
                      ? AMBER
                      : isPassed
                        ? 'rgba(230,115,56,0.35)'
                        : 'transparent',
                    boxShadow: isActive
                      ? `0 0 12px ${AMBER}88`
                      : '0 0 0 transparent',
                  }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    borderRadius: '50%',
                    border: '1px solid',
                    flexShrink: 0,
                  }}
                />
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollRail;
