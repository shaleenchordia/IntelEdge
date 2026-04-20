import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import anuragImg from '../../../assets/anura.jpeg'
import sahilImg from '../../../assets/sahil.jpeg'
import saranshImg from '../../../assets/saransh.jpeg'

// ─── Team Data ────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: 1,
    name: 'Anurag Upadhyay',
    role: 'CEO',
    avatar: anuragImg,
    // warm yellow pill
    gradientTop: 'rgba(255, 235, 150, 0.95)',
    gradientBottom: 'rgba(200, 180, 255, 0.85)',
  },
  {
    id: 2,
    name: 'Sahil Bhardwaj',
    role: 'CTO',
    avatar: sahilImg,
    // soft white/cream pill
    gradientTop: 'rgba(245, 245, 240, 0.95)',
    gradientBottom: 'rgba(200, 200, 200, 0.85)',
  },
  {
    id: 3,
    name: 'Saaransh',
    role: 'CMO',
    avatar: saranshImg,
    // ice blue pill
    gradientTop: 'rgba(200, 220, 255, 0.95)',
    gradientBottom: 'rgba(50, 60, 80, 0.85)',
  },
]

// ─── Single Pill Card ─────────────────────────────────────────────────────────
const PillCard = ({ member, index }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        position: 'relative',
        width: '190px',
        height: '460px',
        borderRadius: '9999px',
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        // pill background gradient — top pastel, bottom darker
        background: `linear-gradient(180deg, ${member.gradientTop} 0%, ${member.gradientBottom} 100%)`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
      }}
    >
      {/* Name & Role label — top of pill */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '0.95rem',
            color: 'rgba(10,10,15,0.85)',
            letterSpacing: '-0.2px',
          }}
        >
          {member.name}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '0.72rem',
            color: 'rgba(10,10,15,0.55)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          {member.role}
        </span>
      </div>

      {/* Person photo — bottom-aligned, fills lower 2/3 of pill */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '82%',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <img
          src={member.avatar}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Team({ id }) {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })

  return (
    <section
      id={id || 'team'}
      style={{
        background: '#0a0a0d',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(circle, rgba(120,100,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Section eyebrow + heading */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: '72px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '0.65rem',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: 'var(--accent-primary, #7b6fff)',
            marginBottom: '1.2rem',
          }}
        >
          The People Behind the Vision
        </span>
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            color: '#fff',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Meet Our Team
        </h2>
        <p
          style={{
            marginTop: '1.2rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '480px',
            lineHeight: 1.65,
          }}
        >
          Visionaries and builders shaping the future of enterprise AI.
        </p>
      </motion.div>

      {/* Pill Cards Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '45px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {TEAM.map((member, index) => (
          <PillCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  )
}
