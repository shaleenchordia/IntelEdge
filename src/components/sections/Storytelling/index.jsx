import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const chapters = [
  { tag: "The Challenge", title: "Digital is no longer enough.", description: "Transformation has stalled. Data is siloed. Intelligence is fragmented. The old digital world is reaching its limits." },
  { tag: "The Shift", title: "The Architecture of Intelligence.", description: "We don't just add AI. We rebuild the foundation using Applied Intelligence Architecture to create autonomous, self-evolving enterprises." },
  { tag: "The Outcome", title: "Unified Agentic Systems.", description: "A future where every process, every node, and every decision is underpinned by architected intelligence." }
];

const Chapter = ({ chapter, index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.5, 1, 2]);
  const opacity = useTransform(scrollYProgress, [start, mid - 0.1, mid + 0.1, end], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [start, mid, end], ["blur(10px)", "blur(0px)", "blur(20px)"]);
  return (
    <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 10%', scale, opacity, filter: blur, zIndex: total - index }}>
      <div style={{ maxWidth: '800px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '2rem', display: 'block' }}>{chapter.tag}</span>
        <h2 style={{ fontSize: 'max(4rem, 6vw)', lineHeight: 1.1, fontWeight: 700, letterSpacing: '-4px', marginBottom: '2rem' }}>{chapter.title}</h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.6, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>{chapter.description}</p>
      </div>
    </motion.div>
  );
};

const Storytelling = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  return (
    <div ref={containerRef} id="storytelling" style={{ height: '400vh', position: 'relative', scrollSnapAlign: 'start' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', background: 'radial-gradient(circle at center, #0a0a0a 0%, #050505 100%)', perspective: '1000px' }}>
        {chapters.map((chapter, index) => (
          <Chapter key={index} chapter={chapter} index={index} total={chapters.length} scrollYProgress={scrollYProgress} />
        ))}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40vh', background: 'linear-gradient(to top, rgba(0, 242, 255, 0.05), transparent)', opacity: 0.5 }} />
      </div>
    </div>
  );
};

export default Storytelling;
