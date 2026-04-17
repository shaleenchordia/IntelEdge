import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import WhoAreWeBackground from './WhoAreWeBackground';

const pillars = [
  {
    num: '01',
    accent: '#4488ff',
    title: 'What We Are',
    text: 'An Applied Intelligence Architecture firm — built at the intersection of strategy, systems, and scalable execution.',
    tag: 'Foundation'
  },
  {
    num: '02',
    accent: '#ffcc44',
    title: 'What We Do',
    text: 'We move organizations beyond AI experimentation — building strategies that are executable and solutions that are adoptable.',
    tag: 'Execution'
  },
  {
    num: '03',
    accent: '#ff6633',
    title: 'How We Operate',
    text: 'Through two integrated functions — Inteledge Advisory and Inteledge Labs — spanning strategy, governance, and AI product development.',
    tag: 'Structure'
  }
];

const WhoAreWe = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start'],
  });

  const orbScale   = useTransform(scrollYProgress, [0.0, 0.42], [0.9, 26]);
  const orbOpacity = useTransform(scrollYProgress, [0.0, 0.05, 0.35, 0.48], [0.85, 1, 1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.38, 0.58], [0, 1]);
  const contentY       = useTransform(scrollYProgress, [0.38, 0.56], [30, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* 3D arc background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Canvas gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 2, 9]} fov={65} />
          <WhoAreWeBackground />
        </Canvas>
      </div>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 25%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Burst orb */}
      <motion.div style={{
        position: 'absolute',
        top: '-5vh', left: '-8vw',
        width: '52vmin', height: '52vmin',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 65% 35%, #ff4400 0%, #1e2d50 45%, #0a0a20 75%, transparent 100%)',
        scale: orbScale,
        opacity: orbOpacity,
        transformOrigin: '35% 20%',
        zIndex: 2, pointerEvents: 'none',
        boxShadow: '0 0 120px 40px rgba(255,80,0,0.25)',
      }} />

      {/* ── Content — perfectly centred ── */}
      <motion.div style={{
        position: 'relative',
        zIndex: 3,
        width: '100%',
        maxWidth: '1100px',
        padding: '0 5%',
        textAlign: 'center',
        opacity: contentOpacity,
        y: contentY,
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 1.2rem',
          border: '1px solid rgba(68,136,255,0.35)',
          borderRadius: '100px',
          fontSize: '0.65rem', letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#7aadff',
          background: 'rgba(68,136,255,0.08)',
          backdropFilter: 'blur(8px)',
          marginBottom: '1.8rem',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7aadff', display: 'inline-block' }} />
          Who We Are
        </div>

        {/* Main heading */}
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#ffffff',
          marginBottom: '1rem',
          letterSpacing: '-0.5px',
        }}>
          Applied Intelligence Architecture
        </h2>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(1.9rem, 4vw, 3.2rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '1.2rem',
          letterSpacing: '-0.5px',
          background: 'linear-gradient(90deg, #5599ff 0%, #aa66ff 50%, #ffcc44 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          for Enterprise Transformation.
        </h2>

        {/* Sub-line */}
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 300,
          lineHeight: 1.6,
          maxWidth: '600px',
          margin: '0 auto 3rem auto',
        }}>
          We build the systems, strategies, and products that help enterprises
          transition from digital experimentation to intelligent transformation.
        </p>

        {/* Three cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2rem',
          textAlign: 'left',
        }}>
          {pillars.map(({ num, accent, title, text, tag }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                padding: '1.8rem 1.6rem',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '12px',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderTop: `2px solid ${accent}99`,
                boxShadow: `0 4px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
                cursor: 'default',
              }}
            >
              {/* num + tag row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem', fontWeight: 800,
                  letterSpacing: '3px', textTransform: 'uppercase',
                  color: accent,
                }}>{num}</span>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '0.6rem', fontWeight: 600,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                  padding: '0.2rem 0.6rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px',
                }}>{tag}</span>
              </div>

              {/* Title */}
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '1.05rem', fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.75rem',
                letterSpacing: '-0.2px',
              }}>{title}</div>

              {/* Body */}
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.7, fontWeight: 300,
                margin: 0,
              }}>{text}</p>

              {/* Coloured bottom accent line */}
              <div style={{
                marginTop: '1.4rem',
                height: '1px',
                background: `linear-gradient(90deg, ${accent}55, transparent)`,
              }} />
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
};

export default WhoAreWe;
