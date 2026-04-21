import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Logo Assets ─── */
import WiproLogo from '../../../assets/wipro.png';
import HCLLogo from '../../../assets/hcl.png';
import TataAigLogo from '../../../assets/tataaig.png';
import UiPathLogo from '../../../assets/uipath.png';
import IciciLogo from '../../../assets/icici.png';
import BajajLogo from '../../../assets/bajaj.png';
import DlfLogo from '../../../assets/dlf.png';
import SiemensLogo from '../../../assets/siemens.png';

const logoMeta = [
  { src: WiproLogo, name: 'Wipro' },
  { src: HCLLogo, name: 'HCL' },
  { src: TataAigLogo, name: 'Tata AIG' },
  { src: UiPathLogo, name: 'UiPath' },
  { src: IciciLogo, name: 'ICICI' },
  { src: BajajLogo, name: 'Bajaj' },
  { src: DlfLogo, name: 'DLF' },
  { src: SiemensLogo, name: 'Siemens' },
];

const LogoStrip = () => {
  const displayLogos = [...logoMeta, ...logoMeta, ...logoMeta];
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="hero-logo-strip-outer">
      <style>{`
        @keyframes logoScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        .logo-track { animation: logoScroll 50s linear infinite; }
        .logo-track.paused { animation-play-state: paused; }
        .hero-logo-strip-outer {
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 2rem 0;
          margin-top: 0.5rem;
          opacity: 1;
          z-index: 10;
          background: #fff;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .hero-trusted-slider-wrap {
          margin-bottom: 8rem;
          position: relative;
          z-index: 10;
        }
        .logo-item { padding-right: 120px; position: relative; }
        .logo-item img { height: 38px; width: auto; display: block; }
        @media (max-width: 768px) {
          .logo-item { padding-right: 64px; }
          .logo-item img { height: 28px; }
          .hero-trusted-slider-wrap { margin-bottom: 4rem; margin-top: 3rem; }
        }
        @media (max-width: 480px) {
          .logo-item { padding-right: 44px; }
          .logo-item img { height: 22px; }
          .hero-trusted-slider-wrap { margin-top: 2rem; }
        }
      `}</style>


      <div
        className={`logo-track${paused ? ' paused' : ''}`}
        style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {displayLogos.map((logo, index) => {
          const isHovered = hoveredIdx === index;
          return (
            <div
              key={index}
              className="logo-item"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                src={logo.src}
                alt={logo.name}
                style={{
                  filter: isHovered
                    ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))'
                    : 'none',
                  opacity: isHovered ? 1 : 0.8,
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Arrow Icon ── */
const ArrowIcon = () => (

  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Star Icon ── */
const StarIcon = () => (
  <svg className="hero-star" width="14" height="14" viewBox="0 0 24 24" fill="#FF801E" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

/* ═══════════════════════════════════════════
   PARTICLE EXPLOSION SYSTEM
   ═══════════════════════════════════════════ */
const PARTICLE_COUNT = 60;
const PARTICLE_COLORS = [
  'rgba(180, 230, 255, 0.6)',
  'rgba(210, 240, 255, 0.5)',
  'rgba(150, 210, 255, 0.55)',
  'rgba(230, 250, 255, 0.65)',
  'rgba(0, 242, 255, 0.4)',
  'rgba(100, 200, 255, 0.5)',
];

const ParticleSystem = ({ active, origin, targetRef, onComplete, phase: initialPhase = 'explode' }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const phaseRef = useRef(initialPhase); // 'explode' | 'drift' | 'implode'
  const explodeTimerRef = useRef(0); // Separate timer just for explode→drift transition
  const timerRef = useRef(0);        // General animation timer
  const prevPhaseRef = useRef(initialPhase);
  const isMouseDown = useRef(false);

  // Sync internal phase with prop AND handle re-burst/re-implode
  useEffect(() => {
    const newPhase = initialPhase;
    const oldPhase = prevPhaseRef.current;

    if (newPhase === oldPhase) return; // No change, skip

    if (newPhase === 'explode') {
      // Switching TO explode — give every particle fresh burst velocities
      phaseRef.current = 'explode';
      explodeTimerRef.current = 0; // Reset the explode→drift countdown

      particlesRef.current.forEach(p => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 12;
        p.vx = Math.cos(angle) * speed * 1.5;
        p.vy = Math.sin(angle) * speed * 0.8;
        p.alpha = 1;
        // Keep their current position so the burst radiates from wherever they are
      });
    } else {
      // Switching to 'implode' or 'drift'
      phaseRef.current = newPhase;
    }

    prevPhaseRef.current = newPhase;
  }, [initialPhase]);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    phaseRef.current = 'explode';
    explodeTimerRef.current = 0;
    timerRef.current = 0;

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 6 + Math.random() * 12;
      const size = 1 + Math.random() * 7;
      return {
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed * 1.5,
        vy: Math.sin(angle) * speed * 0.8,
        size,
        baseSize: size,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        alpha: 1,
        originX: origin.x,
        originY: origin.y,
        friction: 0.95 + Math.random() * 0.03,
        pulse: Math.random() * Math.PI * 2,
      };
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timerRef.current++;
      const phase = phaseRef.current;

      // Only auto-transition explode→drift using the dedicated counter
      if (phase === 'explode') {
        explodeTimerRef.current++;
        if (explodeTimerRef.current > 70) {
          phaseRef.current = 'drift';
        }
      }

      let allReturned = true;

      particlesRef.current.forEach((p) => {
        if (phaseRef.current === 'explode') {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += 0.01;
        } else if (phaseRef.current === 'drift') {
          const centerX = window.innerWidth / 2;
          const pushForce = 0.15;
          if (p.x < centerX) p.vx -= pushForce;
          else p.vx += pushForce;

          p.vx *= 0.98;
          p.vy *= 0.98;
          p.x += p.vx + Math.sin(timerRef.current * 0.02 + p.pulse) * 0.4;
          p.y += p.vy + Math.cos(timerRef.current * 0.015 + p.pulse) * 0.4;
        } else if (phaseRef.current === 'implode') {
          let tx = p.originX;
          let ty = p.originY;
          if (targetRef?.current) {
            const rect = targetRef.current.getBoundingClientRect();
            tx = rect.left + rect.width / 2;
            ty = rect.top + rect.height / 2;
          }

          const dx = tx - p.x;
          const dy = ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Visible spiral vortex: balanced pull + orbit
          const pullStrength = 0.012;            // Stronger pull to tighten the spiral
          const spiralStrength = 0.08;           // Strong orbit for visible rotation
          const perpX = -dy / (dist + 1);
          const perpY = dx / (dist + 1);

          // Combine pull + orbit forces — cap orbit distance so far particles don't spin wildly
          let newVx = dx * pullStrength + perpX * spiralStrength * Math.min(dist, 150);
          let newVy = dy * pullStrength + perpY * spiralStrength * Math.min(dist, 150);

          // Cap maximum speed
          const maxSpeed = 5;
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > maxSpeed) {
            newVx = (newVx / speed) * maxSpeed;
            newVy = (newVy / speed) * maxSpeed;
          }

          p.vx = newVx;
          p.vy = newVy;
          p.x += p.vx;
          p.y += p.vy;

          // Full brightness while spiraling
          p.alpha = Math.min(1, Math.max(0.4, 1.2 - dist / 500));

          // Fade only when very close to center
          if (dist < 15) {
            p.alpha *= dist / 15;
          }

          if (dist > 5) allReturned = false;
        }

        // Size: shrink particles during implode for a tighter convergence look
        const implodeSizeFactor = phaseRef.current === 'implode' ? 0.7 : 1;
        p.size = Math.max(0.1, (p.baseSize + Math.sin(timerRef.current * 0.05 + p.pulse) * 2.5) * implodeSizeFactor);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e) => {
      if (phaseRef.current !== 'drift' && phaseRef.current !== 'explode') return;
      particlesRef.current.forEach((p) => {
        const dx = e.clientX - p.x;
        const dy = e.clientY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          if (isMouseDown.current) {
            // Magnetic Attract
            p.vx += (dx / dist) * force * 1.5;
            p.vy += (dy / dist) * force * 1.5;
          } else {
            // Repel
            p.vx -= (dx / dist) * force * 0.8;
            p.vy -= (dy / dist) * force * 0.8;
          }
        }
      });
    };

    const handleMouseDown = () => (isMouseDown.current = true);
    const handleMouseUp = () => (isMouseDown.current = false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Fade out the particles later, when we are deep into the 4th page
    const fadeOutTween = gsap.to(canvas, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '#services',
        start: 'top top', // Start fading only when 4th page hits the top of screen
        end: 'bottom top',   // Fully faded out by the time we leave the 4th page
        scrub: true,
      }
    });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      fadeOutTween.kill();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [active, origin, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1, // Visible but behind text (text is usually z-index 10 or 100)
        pointerEvents: 'none',
      }}
    />
  );
};

/* ═══════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════ */
const Hero = () => {
  const orbRef = useRef(null);
  const innerOrbRef = useRef(null);
  const sectionRef = useRef(null);
  const [exploded, setExploded] = useState(false);
  const [particleOrigin, setParticleOrigin] = useState({ x: 0, y: 0 });
  const [particlePhase, setParticlePhase] = useState('explode');
  const hasExplodedRef = useRef(false);

  useEffect(() => {
    if (!orbRef.current || !innerOrbRef.current || !sectionRef.current) return;

    // 1. Scroll-based horizontal movement (right to left) using ScrollTrigger
    const ctx = gsap.context(() => {
      // Move left as you scroll down the first two sections
      gsap.to(orbRef.current, {
        x: '-30vw',
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=1050vh', // Gradual movement over 1.5 screen heights
          scrub: 1,
        },
      });

      // 1) Orb fade — SHORT range, fully gone before burst point
      gsap.to(orbRef.current, {
        scale: 0,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: '#gaps',
          start: 'top 70%',
          end: 'top 30%',   // Orb only reappears in a narrow late window
          scrub: 1,
        },
      });

      // 2) Particle logic — LONG range for full explode/implode/reset cycle
      ScrollTrigger.create({
        trigger: '#gaps',
        start: 'top 90%',
        end: 'top -150%',
        scrub: 1,
        onUpdate: (self) => {
          const { progress } = self;

          if (progress > 0.45) {
            // Past the burst point — ensure explosion is active
            if (!hasExplodedRef.current) {
              hasExplodedRef.current = true;
              if (orbRef.current) {
                const rect = orbRef.current.getBoundingClientRect();
                setParticleOrigin({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                });
                setExploded(true);
              }
            }
            setParticlePhase('explode');
          } else if (progress > 0.15 && progress <= 0.45 && hasExplodedRef.current) {
            // Between start and burst point, scrolled back — implode
            setParticlePhase('implode');
          } else if (progress <= 0.15 && hasExplodedRef.current) {
            // Orb is becoming visible again — full reset
            hasExplodedRef.current = false;
            setExploded(false);
            setParticlePhase('explode'); // Reset for next time
          }
        }
      });
    });

    // 2. Mouse Follow for cursor-based movement (applied to inner orb only)
    const handleMouseMove = (e) => {
      if (!innerOrbRef.current) return;

      // Get mouse position relative to viewport
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Move inner orb (responsive to cursor)
      const innerX = (mouseX - 0.5) * 120;
      const innerY = (mouseY - 0.5) * 180;

      gsap.to(innerOrbRef.current, {
        x: innerX,
        y: innerY,
        duration: 1.0,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleOrbClick = useCallback((e) => {
    // Removed explosion effect - orb no longer bursts on click
  }, []);

  const handleParticlesComplete = useCallback(() => {
    // We can reset the explosion state here if we want to allow it to explode again,
    // but usually scroll scrub will handle reset via onUpdate.
  }, []);

  return (
    <section className="hero-liquid" id="hero" ref={sectionRef}>
      {/* Background Particles Burst */}
      <ParticleSystem
        active={exploded}
        origin={particleOrigin}
        targetRef={orbRef}
        phase={particlePhase}
        onComplete={handleParticlesComplete}
      />

      {/* ── Background Glow ── */}
      <div className="hero-glow-wrapper">
        <div className="hero-glow-blob-1" />
        <div className="hero-glow-blob-2" />
      </div>

      {/* ── Scroll-Linked Orb Wrapper ── */}
      <div className="hero-orb-container" ref={orbRef}>
        {/* ── Mouse-Follow Inner Container ── */}
        <div
          className="hero-orb-inner"
          ref={innerOrbRef}
          onClick={handleOrbClick}
          style={{ cursor: 'default', pointerEvents: 'auto' }}
        >
          <video
            className="hero-orb-video"
            src="https://future.co/images/homepage/glassy-orb/orb-purple.webm"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>



      {/* ── Hero Content ── */}
      <div className="hero-content-grid">
        <div className="hero-left">


          {/* Headline */}
          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            AI That Works<br />for the Business.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="hero-subheadline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Inteledge Advisory & Labs helps enterprises translate AI investment into business performance — through independent strategy, structured execution, and purpose-built AI products.
          </motion.p>

          {/* CTA Buttons */}
          <div className="hero-ctas">
            <motion.button
              className="hero-cta-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
              <span className="hero-cta-icon">
                <ArrowIcon />
              </span>
            </motion.button>

            <motion.button
              className="hero-cta-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
              <span className="hero-cta-icon">
                <ArrowIcon />
              </span>
            </motion.button>
          </div>
        </div>

        {/* Right side — orb occupies this space via absolute positioning */}
        <div className="hero-right" />
      </div>

      {/* ── Trusted Logos (Dynamic Slider) ── */}
      <motion.div
        className="hero-trusted-slider-wrap"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <p className="hero-trusted-label" style={{ textAlign: 'center', opacity: 0.8, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '10px', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
          Trusted by Industry Leaders
        </p>
        <LogoStrip />
      </motion.div>
    </section>
  );
};

export default Hero;
