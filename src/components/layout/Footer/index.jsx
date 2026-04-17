import React, { useRef, Suspense } from 'react';
import { ArrowUpRight, Mail, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ACCENT = '#00f2ff';

/* ═══════════════════════════════════════════════════════════════════════
   3D METAL SHAPES — floating chrome/metallic objects (screws, torus, sphere)
═══════════════════════════════════════════════════════════════════════ */

const MetalMaterial = () => (
  <meshStandardMaterial
    color="#d8d8d8"
    metalness={0.95}
    roughness={0.18}
    envMapIntensity={1.5}
  />
);

const FloatingShape = ({ position, rotation, scale = 1, speed = 0.3, geometry }) => {
  const groupRef = useRef();
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.position.y = position[1] + Math.sin(t * speed + phase.current) * 0.25;
    groupRef.current.rotation.x = rotation[0] + t * speed * 0.15;
    groupRef.current.rotation.y = rotation[1] + t * speed * 0.22;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {geometry}
    </group>
  );
};

/* Screw-like elongated torus stack */
const Screw = ({ position, rotation, scale }) => (
  <FloatingShape position={position} rotation={rotation} scale={scale} speed={0.4}
    geometry={
      <>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh key={i} position={[0, i * 0.22 - 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.09, 10, 32]} />
            <MetalMaterial />
          </mesh>
        ))}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.2, 16]} />
          <MetalMaterial />
        </mesh>
      </>
    }
  />
);

/* Twisted ribbon / heart-like form — rounded torus knot */
const Heart = ({ position, rotation, scale }) => (
  <FloatingShape position={position} rotation={rotation} scale={scale} speed={0.25}
    geometry={
      <mesh>
        <torusKnotGeometry args={[0.7, 0.32, 80, 14, 2, 3]} />
        <MetalMaterial />
      </mesh>
    }
  />
);

/* Sliced sphere — sphere with rings */
const SlicedSphere = ({ position, rotation, scale }) => (
  <FloatingShape position={position} rotation={rotation} scale={scale} speed={0.3}
    geometry={
      <>
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <MetalMaterial />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0, -0.4 + i * 0.28, 0]}>
            <torusGeometry args={[0.78, 0.02, 8, 64]} />
            <meshStandardMaterial color="#000" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
      </>
    }
  />
);

/* Angular chrome prism / ribbon */
const Prism = ({ position, rotation, scale }) => (
  <FloatingShape position={position} rotation={rotation} scale={scale} speed={0.35}
    geometry={
      <mesh>
        <octahedronGeometry args={[0.8, 2]} />
        <MetalMaterial />
      </mesh>
    }
  />
);

/* Long arrow / stake form */
const Spear = ({ position, rotation, scale }) => (
  <FloatingShape position={position} rotation={rotation} scale={scale} speed={0.28}
    geometry={
      <>
        <mesh position={[0, 0.2, 0]}>
          <coneGeometry args={[0.35, 0.9, 4]} />
          <MetalMaterial />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.2, 12]} />
          <MetalMaterial />
        </mesh>
      </>
    }
  />
);

const FooterScene = () => {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} color="#b0d4e8" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#00f2ff" />

      {/* LEFT SIDE shapes */}
      <Screw position={[-6.5, 2.2, -1]} rotation={[0.3, 0.8, -0.2]} scale={0.85} />
      <Heart position={[-5.8, -1.8, 0]} rotation={[0.2, -0.5, 0.3]} scale={1.1} />
      <Prism position={[-7.2, -0.3, -2]} rotation={[0.6, 1.2, 0]} scale={0.9} />

      {/* RIGHT SIDE shapes */}
      <Spear position={[6.5, 2.5, -1]} rotation={[-0.2, 0.4, -0.6]} scale={1.1} />
      <SlicedSphere position={[7.0, -1.5, 0]} rotation={[0, 0.5, 0]} scale={0.95} />
      <Screw position={[5.8, 0.8, -2]} rotation={[1.2, 0.3, 0.5]} scale={0.7} />

      {/* BOTTOM middle */}
      <Prism position={[-3, -3, -2]} rotation={[0.5, 0.7, 0.3]} scale={0.6} />
      <Heart position={[3, -3.2, -1]} rotation={[0.8, 0.2, 0.5]} scale={0.7} />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   BRAND ICONS
═══════════════════════════════════════════════════════════════════════ */

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════
   SPEECH BUBBLE (with tail)
═══════════════════════════════════════════════════════════════════════ */

const SpeechBubble = ({ children, bg, color, href, tailSide = 'bottom-left', animateIn = true }) => {
  const isLeft = tailSide === 'bottom-left';

  return (
    <motion.a
      href={href || '#'}
      initial={animateIn ? { opacity: 0, scale: 0.8, y: -10 } : false}
      whileInView={animateIn ? { opacity: 1, scale: 1, y: 0 } : false}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
      whileHover={{ y: -2, scale: 1.04 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 20px',
        borderRadius: 100,
        background: bg,
        color,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: '-0.1px',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        boxShadow: `0 10px 30px ${bg}40`,
        cursor: 'pointer',
      }}
    >
      {children}
      {/* tail */}
      <div style={{
        position: 'absolute',
        [isLeft ? 'left' : 'right']: isLeft ? 14 : 14,
        bottom: -6,
        width: 0, height: 0,
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderTop: `8px solid ${bg}`,
        transform: isLeft ? 'rotate(-10deg)' : 'rotate(10deg)',
      }} />
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PANEL
═══════════════════════════════════════════════════════════════════════ */

const Panel = ({ children, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    style={{
      background: 'rgba(12, 14, 18, 0.88)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: 28,
      padding: '48px 52px',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 500,
      position: 'relative',
      boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
      ...style,
    }}
  >
    {children}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════
   SOCIAL ICON
═══════════════════════════════════════════════════════════════════════ */

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    style={{
      width: 60, height: 60,
      borderRadius: 14,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </a>
);

/* ═══════════════════════════════════════════════════════════════════════
   COLLAB LINK
═══════════════════════════════════════════════════════════════════════ */

const CollabLink = ({ href, children }) => (
  <a
    href={href || '#'}
    style={{
      fontSize: 15,
      color: 'rgba(255,255,255,0.55)',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'all 0.25s',
      letterSpacing: '-0.1px',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = 'rgba(255,255,255,0.95)';
      e.currentTarget.style.transform = 'translateX(6px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
      e.currentTarget.style.transform = 'translateX(0)';
    }}
  >
    {children}
  </a>
);

/* ═══════════════════════════════════════════════════════════════════════
   LINK COLUMN
═══════════════════════════════════════════════════════════════════════ */

const LinkCol = ({ title, items }) => (
  <div>
    <h5 style={{
      fontSize: 13,
      fontWeight: 700,
      color: '#fff',
      marginBottom: 18,
      letterSpacing: '-0.1px',
    }}>
      {title}
    </h5>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li
          key={item}
          style={{
            fontSize: 13.5,
            color: 'rgba(255,255,255,0.45)',
            cursor: 'pointer',
            transition: 'color 0.25s, transform 0.25s',
            letterSpacing: '-0.1px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   MAIN FOOTER
═══════════════════════════════════════════════════════════════════════ */

const Footer = () => (
  <footer style={{
    position: 'relative',
    padding: 0,
    overflow: 'hidden',
    background: '#050505',
    minHeight: 'auto',
  }}>

    {/* top edge glow */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 1, zIndex: 3,
      background: `linear-gradient(90deg, transparent, ${ACCENT} 30%, ${ACCENT} 70%, transparent)`,
      opacity: 0.3,
    }} />

    {/* 3D metal shapes scene */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <FooterScene />
        </Suspense>
      </Canvas>
    </div>

    {/* subtle ambient glow blobs */}
    <div style={{
      position: 'absolute', top: '30%', left: '-10%', width: '40%', height: '60%',
      background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`,
      pointerEvents: 'none', zIndex: 1,
    }} />
    <div style={{
      position: 'absolute', bottom: '10%', right: '-10%', width: '40%', height: '60%',
      background: 'radial-gradient(ellipse, rgba(0,150,200,0.05) 0%, transparent 70%)',
      pointerEvents: 'none', zIndex: 1,
    }} />

    {/* noise */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.035, mixBlendMode: 'overlay', pointerEvents: 'none', zIndex: 1,
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
    }} />

    {/* ═══════════════ CONTENT ═══════════════ */}
    <div style={{ position: 'relative', zIndex: 2, padding: '100px 5% 50px', maxWidth: 1500, margin: '0 auto' }}>

      {/* Two-panel grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: '1.5rem',
        marginBottom: 70,
      }} className="footer-grid">

        {/* ═══════ LEFT PANEL ═══════ */}
        <Panel>
          {/* Header: title + speech bubble CTA */}
          <div style={{ position: 'relative' }}>
            <h3 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-1.2px',
              color: '#fff',
              margin: 0,
              maxWidth: 360,
            }}>
              Before you go,<br />
              check out these<br />
              links
            </h3>

            {/* speech bubble — "See you at Inteledge!" */}
            <div style={{
              position: 'absolute',
              top: 40,
              right: -10,
            }}>
              <SpeechBubble
                href="#contact"
                bg={ACCENT}
                color="#000"
                tailSide="bottom-left"
              >
                See you at Inteledge!
              </SpeechBubble>
            </div>
          </div>

          {/* Link columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: 'auto',
          }}>
            <LinkCol title="Company" items={['About Us', 'Careers', 'Press', 'Contact']} />
            <LinkCol title="Division" items={['Advisory', 'Labs', 'Research']} />
            <LinkCol title="Resources" items={['Privacy Policy', 'Terms', 'Documentation']} />
          </div>
        </Panel>

        {/* ═══════ RIGHT PANEL ═══════ */}
        <Panel>
          <div>
            <h3 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-1.2px',
              color: '#fff',
              margin: '0 0 32px',
            }}>
              Let&apos;s work<br />together
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <CollabLink href="#contact">Book a strategy session</CollabLink>
              <CollabLink href="#contact">Partner with us</CollabLink>
              <CollabLink href="#contact">Join the team</CollabLink>
              <CollabLink href="mailto:hello@inteledge.com">hello@inteledge.com</CollabLink>
            </div>
          </div>

          {/* Social row with speech bubble */}
          <div style={{
            position: 'relative',
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <SocialIcon href="#" label="Twitter / X"><TwitterIcon /></SocialIcon>
            <div style={{ position: 'relative' }}>
              <SocialIcon href="#" label="LinkedIn"><LinkedInIcon /></SocialIcon>
              {/* "Follow us" speech bubble under LinkedIn */}
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 5,
              }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.8 }}
                  style={{
                    position: 'relative',
                    padding: '8px 18px',
                    borderRadius: 100,
                    background: '#ff6ec7',
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 10px 30px rgba(255,110,199,0.3)',
                  }}
                >
                  Follow us
                  {/* tail pointing up to LinkedIn */}
                  <div style={{
                    position: 'absolute',
                    top: -6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: '7px solid transparent',
                    borderRight: '7px solid transparent',
                    borderBottom: '8px solid #ff6ec7',
                  }} />
                </motion.div>
              </div>
            </div>
            <SocialIcon href="#" label="Instagram"><InstagramIcon /></SocialIcon>
            <SocialIcon href="mailto:hello@inteledge.com" label="Email"><Mail size={20} strokeWidth={2} /></SocialIcon>
          </div>
        </Panel>
      </div>

      {/* ═══════ Bottom bar ═══════ */}
      <div style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 80,
      }}>
        {/* Award badge — left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px 10px 12px',
            background: '#fff',
            borderRadius: 10,
            color: '#000',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `linear-gradient(135deg, ${ACCENT}, #00bbd4)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Award size={14} strokeWidth={2.5} color="#000" />
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#666' }}>
              Recognition
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#000', letterSpacing: '-0.2px' }}>
              Top 5% Advisory Firm 2024
            </div>
          </div>
        </motion.div>

        {/* Centered caption */}
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 13,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '-0.1px',
        }}>
          Inteledge is a division of{' '}
          <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
            A & L ©
          </span>
        </span>

        {/* Right side copyright */}
        <span style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.2px',
        }}>
          © 2026 Inteledge. All rights reserved.
        </span>
      </div>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .footer-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  </footer>
);

export default Footer;