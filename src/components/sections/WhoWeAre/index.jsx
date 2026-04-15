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

const WhoWeAre = ({ theme }) => {
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
        end: "+=150%",
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
      id="who-we-are" 
      style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden',
        position: 'relative' 
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
          <h2 
            ref={titleRef}
            className="glitch-text"
            data-text="Traditional Transformation Is No Longer Enough."
            style={{ fontSize: 'max(3.5rem, 5vw)', fontWeight: 800, marginBottom: '2.5rem', lineHeight: 1, letterSpacing: '-2px', position: 'relative' }}
          >
            Traditional Transformation <br />
            <span className="gradient-text">Is No Longer Enough.</span>
          </h2>
          <p style={{ fontSize: '1.4rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '2rem', maxWidth: '600px' }}>
            The next frontier is <strong>Applied Intelligence Architecture (AIA)</strong>—where AI is not just a tool, but the core engine of the enterprise.
          </p>
          <p style={{ fontSize: '1.1rem', opacity: 0.5, lineHeight: 1.6, maxWidth: '500px' }}>
            We don't just implement models; we architect the systemic intelligence that powers autonomous decision-making and non-linear growth.
          </p>
          
          <div style={{ display: 'flex', gap: '4rem', marginTop: '4rem' }}>
            <div className="stat-item">
              <h4 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>14+</h4>
              <span style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Years Experience</span>
            </div>
            <div className="stat-item">
              <h4 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>50+</h4>
              <span style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Enterprise Systems</span>
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
