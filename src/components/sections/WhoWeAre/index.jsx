import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ArchitectureCore from './ArchitectureCore';

gsap.registerPlugin(ScrollTrigger);

const ArchitecturalBackground = ({ color }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: 'none' }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 5px rgba(0,242,255,0.2))' }}>
      <defs>
        <pattern id="archGrid" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#archGrid)" />

      {/* Animated Structural Lines */}
      <motion.line
        x1="20%" y1="0" x2="20%" y2="100%"
        stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.line
        x1="80%" y1="0" x2="80%" y2="100%"
        stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.line
        x1="0" y1="30%" x2="100%" y2="30%"
        stroke={color} strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
      />
    </svg>
  </div>
);

const WhoWeAre = ({ theme, id }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and animate text/engine
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=80%", // Reduced from 150% for snappier experience
        pin: true,
        scrub: 1,
      });

      // Animate Title
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: -100, filter: 'blur(10px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        }
      );

      // Animate Paragraph Lines
      const lines = textRef.current.querySelectorAll('p');
      gsap.fromTo(lines,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 10%",
            scrub: true
          }
        }
      );

      // Parallax Text headers
      gsap.to(titleRef.current, {
        y: -50,
        x: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Subtle Engine Tilt boost on scroll - boosted for impact
      gsap.to(engineRef.current, {
        rotateY: 35,
        rotateX: -10,
        z: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top",
          scrub: true
        }
      });

      // Stats appearance
      gsap.from(".stat-item", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id || "who-we-are"}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        background: '#050505', // Solid background to prevent Hero bleed-through
        zIndex: 2
      }}
    >
      <ArchitecturalBackground color={theme.mode === 'labs' ? '#ff00f2' : '#00f2ff'} />

      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-10%',
        width: '50%',
        height: '80%',
        background: 'var(--accent-glow)',
        filter: 'blur(150px)',
        borderRadius: '50%',
        zIndex: 1,
        opacity: 0.3
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5%',
        width: '100%',
        padding: '0 5%',
        zIndex: 2,
        position: 'relative'
      }}>
        <div ref={textRef}>
          <motion.h2 
            ref={titleRef}
            style={{ 
              fontFamily: "'Cinzel', serif",
              fontSize: 'max(3.5rem, 6vw)', 
              fontWeight: 800, 
              lineHeight: 0.9, 
              letterSpacing: '-3px',
              marginBottom: '2.5rem',
              color: 'var(--text-primary)'
            }}
          >
            THE ARCHITECTURE OF <span className="gradient-text">AUTONOMY.</span>
          </motion.h2>

          <div ref={textRef} style={{ maxWidth: '550px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.4, opacity: 0.8, color: 'var(--text-primary)', fontWeight: 500 }}>
              We don't just implement AI. We architect the systems that allow intelligence to thrive as the core engine of the modern enterprise.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.6, opacity: 0.5, color: 'var(--text-primary)' }}>
              Inteledge was born from the realization that most enterprises are trapped in legacy human-led architectures. We provide the blueprint for the transition to non-linear, autonomous scale.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
            <div className="stat-item">
              <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>14+</h4>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 900 }}>Years Experience</span>
            </div>
            <div className="stat-item">
              <h4 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>50+</h4>
              <span style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 900 }}>Enterprise Systems</span>
            </div>
          </div>
        </div>

        <div style={{ height: '75vh', position: 'relative', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <div ref={engineRef} style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ArchitectureCore theme={theme} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
