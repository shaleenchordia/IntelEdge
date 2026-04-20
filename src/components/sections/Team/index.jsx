import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import './Team.css';

// Global mouse position tracker
const mousePos = { x: -9999, y: -9999 };
if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });
}

const BurstOrb = ({ progress, target, index }) => {
  const videoRef = useRef(null);
  const innerRef = useRef(null);
  const wrapperRef = useRef(null);
  const x = useTransform(progress, [0, 1], [0, target.x]);
  const y = useTransform(progress, [0, 1], [0, target.y]);
  const scale = useTransform(progress, [0, 0.3, 1], [target.scale, target.scale, target.scale]);
  const opacity = useTransform(progress, [0, 0.05, 1], [0, 1, 1]);

  // Repulsion offset and velocity
  const repelX = useRef(0);
  const repelY = useRef(0);
  const repelVX = useRef(0);
  const repelVY = useRef(0);

  // Random floating + cursor repulsion via rAF
  useEffect(() => {
    const el = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    const sx = Math.random() * 1000;
    const sy = Math.random() * 1000;
    const sr = Math.random() * 1000;
    const speedX = 0.3 + Math.random() * 0.4;
    const speedY = 0.25 + Math.random() * 0.5;
    const speedR = 0.15 + Math.random() * 0.3;
    const ampX = 25 + Math.random() * 30;
    const ampY = 20 + Math.random() * 35;
    const ampR = 8 + Math.random() * 15;

    const REPEL_RADIUS = 400;
    const REPEL_ACCEL = 2.5;

    let rafId;
    const animate = (t) => {
      const s = t * 0.001;

      // Random float
      const floatX = Math.sin(s * speedX + sx) * ampX + Math.sin(s * speedX * 1.7 + sx * 2) * ampX * 0.4;
      const floatY = Math.cos(s * speedY + sy) * ampY + Math.cos(s * speedY * 1.3 + sy * 3) * ampY * 0.3;
      const floatR = Math.sin(s * speedR + sr) * ampR;
      const floatS = 1 + Math.sin(s * 0.4 + sx) * 0.06;

      // Cursor repulsion - velocity based for free floating
      const rect = wrapper.getBoundingClientRect();
      const orbCX = rect.left + rect.width / 2 + repelX.current;
      const orbCY = rect.top + rect.height / 2 + repelY.current;
      const dx = orbCX - mousePos.x;
      const dy = orbCY - mousePos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
        // Add momentum away from cursor
        repelVX.current += (dx / dist) * force * REPEL_ACCEL;
        repelVY.current += (dy / dist) * force * REPEL_ACCEL;
      }

      // Apply velocity
      repelX.current += repelVX.current;
      repelY.current += repelVY.current;

      // Friction
      repelVX.current *= 0.94;
      repelVY.current *= 0.94;

      // Very gentle tether to slowly drift back eventually
      repelVX.current -= repelX.current * 0.002;
      repelVY.current -= repelY.current * 0.002;

      const totalX = floatX + repelX.current;
      const totalY = floatY + repelY.current;

      el.style.transform = `translate(${totalX}px, ${totalY}px) rotate(${floatR}deg) scale(${floatS})`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Force video to always play
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const forcePlay = () => { v.play().catch(() => {}); };
    forcePlay();
    v.addEventListener('pause', forcePlay);
    return () => v.removeEventListener('pause', forcePlay);
  }, []);

  return (
    <motion.div 
      ref={wrapperRef}
      className="burst-video-wrapper"
      style={{ x, y, scale, opacity }}
    >
      <div className="burst-orb-inner" ref={innerRef}>
        <video 
          ref={videoRef}
          className="burst-video"
          src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
      </div>
    </motion.div>
  );
};

const VideoBurst = ({ progress }) => {
  const targets = [
    { x: -300, y: -140, scale: 0.42 },
    { x: 280,  y: -100, scale: 0.50 },
    { x: -220, y: 120,  scale: 0.38 },
    { x: 250,  y: 140,  scale: 0.45 },
    { x: -60,  y: 180,  scale: 0.40 },
    { x: 80,   y: -160, scale: 0.36 },
  ];

  const groupRotate = useTransform(progress, [0, 1], [120, 0]);

  return (
    <motion.div className="video-burst-container" style={{ rotate: groupRotate }}>
      {targets.map((t, i) => (
        <BurstOrb key={i} progress={progress} target={t} index={i} />
      ))}
    </motion.div>
  );
};

const teamData = [
  {
    id: '01',
    title: 'Strategic Leadership',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>AI Leadership Blueprint</h4>
        <p>For CXOs, Business Unit Heads, and Transformation Sponsors. Covers AI roadmap design, strategy governance, decision impact, risk management, and scaling AI programs across the enterprise. 📊</p>
      </>
    )
  },
  {
    id: '02',
    title: 'Enterprise Intelligence',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Enterprise Intelligence Acceleration (AAA)</h4>
        <p>For Directors, Senior Managers, and Automation CoE Leaders. Builds a cross-functional AI, Analytics & Automation strategy and aligns initiatives with measurable business KPIs. 🔄</p>
      </>
    )
  },
  {
    id: '03',
    title: 'Digital Transformation',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Digital Transformation for Managers</h4>
        <p>For Senior, Mid, and Functional Managers. Equips participants to lead or facilitate digital transformation programs, with real-world examples across critical business functions. 🛠️</p>
      </>
    )
  },
  {
    id: '04',
    title: 'Technical Builders',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>No-Code AI Builder Program</h4>
        <p>For Technical Teams, Automation Developers, and AI Engineers. Participants build production-ready AI bots, deploy internal copilots, and create reusable agent templates. ⚡</p>
      </>
    )
  },
  {
    id: '05',
    title: 'Business Productivity',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>The AI Productivity Stack</h4>
        <p>For non-technical professionals in Sales, Operations, and Finance. Hands-on exercises with 30+ Gen AI tools to build citizen developer capability and reduce manual operational work. 🤖</p>
      </>
    )
  },
  {
    id: '06',
    title: 'Hands-On Workshop',
    content: (
      <>
        <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>BYOB — Build Your Own Bot</h4>
        <p>For Individual Contributors, Analysts, and Early Career Professionals. A practical AI literacy workshop with 30+ tools, bots, and agents — building real automation capability from day one.</p>
      </>
    )
  }
];

const TeamAccordion = React.forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Manual rAF loop — Framer Motion useScroll doesn't work with Lenis
  const burstProgress = useMotionValue(0);

  useEffect(() => {
    let rafId;
    const loop = () => {
      const el = ref?.current || document.getElementById('services');
      if (el) {
        const rect = el.getBoundingClientRect();
        const wh = window.innerHeight;

        // Progress: 0 when section top is at bottom of viewport
        //           1 when section top reaches center of viewport
        const start = wh;       // section top at viewport bottom
        const end = wh * 0.4;   // section top at 40% from top
        
        let p = 0;
        if (rect.top < start && rect.top > end) {
          p = (start - rect.top) / (start - end);
        } else if (rect.top <= end) {
          p = 1;
        }
        
        p = Math.max(0, Math.min(1, p));
        burstProgress.set(p);
      }
      rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, [burstProgress, ref]);

  const smoothProgress = useSpring(burstProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section className="team-container" id="services" ref={ref}>
      <VideoBurst progress={smoothProgress} />
      
      {/* Red/Orange glow from the image */}
      <div className="team-glow"></div>

      <div className="team-header">
        <div style={{ flex: 1 }}>
          <h2 className="team-headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
            Training & Programs
          </h2>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Flagship Transformation Programs</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Delivered by a 2-Time TEDx Speaker with 14+ years of enterprise experience — designed for CXOs, senior managers, functional teams, and early-career professionals across the full AI readiness spectrum.
          </p>
        </div>
        <button className="team-get-in-touch" aria-label="Get in touch">
          GET IN TOUCH <ArrowUpRight size={14} />
        </button>
      </div>

      <div className="team-accordion" onMouseLeave={() => setActiveIndex(null)}>
        {teamData.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <motion.div 
              key={item.id}
              className="team-row"
              onMouseEnter={() => setActiveIndex(index)}
              initial={false}
              animate={{ height: isActive ? 'auto' : 120 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="team-row-inner">
                {/* 1. Large Number */}
                <div className="team-number">
                  {item.id}
                </div>

                {/* 2. Content: Title and details */}
                <div className="team-content">
                  <h3 className="team-title">{item.title}</h3>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="team-details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Status Icon */}
                <div className="team-icon">
                  {isActive ? <Minus size={24} /> : <Plus size={24} strokeWidth={1} />}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

export default TeamAccordion;
