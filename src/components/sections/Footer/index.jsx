import React, { useRef, Suspense } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Footer.css';

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

// Brand icons as inline SVGs (lucide-react removed brand icons in v1.8+)
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const Footer = ({ theme }) => {
  return (
    <footer className="footer-section">
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

      {/* Content */}
      <div className="footer-content-wrapper">
        {/* Main Two-Panel Grid */}
        <div className="footer-grid">
          {/* ── Left Panel ── */}
          <div className="footer-left-panel">
            <div className="footer-left-header">
              <h3 className="footer-left-title">
                Before you go,<br />
                check out these links
              </h3>
              <a href="#contact" className="footer-cta-button">
                See you at IntelEdge!
                <span className="footer-cta-arrow">
                  <ArrowUpRight size={14} />
                </span>
              </a>
            </div>

            <div className="footer-links-grid">
              <div className="footer-link-column">
                <h5>Services</h5>
                <ul>
                  <li>AI Consulting</li>
                  <li>Digital Transformation</li>
                  <li>AI Strategy & Implementation</li>
                  <li>AI Product Development</li>
                  <li>Experimentation & Innovation</li>
                </ul>
              </div>
              <div className="footer-link-column">
                <h5>Labs Products</h5>
                <ul>
                  <li>Prospect IQ</li>
                  <li>DocMind</li>
                  <li>TalentLens</li>
                  <li>VoiceOps</li>
                </ul>
              </div>
              <div className="footer-link-column">
                <h5>Company</h5>
                <ul>
                  <li>About Us</li>
                  <li>Services</li>
                  <li>Products</li>
                  <li>Contact</li>
                  <li>LinkedIn</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Right Panel Wrapper ── */}
          <div className="footer-right-wrapper">
          
            <div className="footer-right-panel">
              <div>
                <h3 className="footer-right-title">
                  Let's work<br />
                  together
                </h3>

                <div className="footer-collab-links">
                  <div className="footer-collab-link">
                    <span>Sponsor a member deal</span>
                  </div>
                  <div className="footer-collab-link">
                    <span>Apply as a mentor</span>
                  </div>
                  <div className="footer-collab-link">
                    <span>Host a workshop</span>
                  </div>
                  <div className="footer-collab-link">
                    <span>Join the team</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-social-grid">
              <a className="footer-social-card" href="#" aria-label="Twitter">
                <TwitterIcon />
              </a>
              
              <a className="footer-social-card footer-linkedin-card" href="#" aria-label="LinkedIn">
                <LinkedInIcon />
                <span className="footer-follow-tag">Follow us</span>
              </a>
              
              <a className="footer-social-card" href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="footer-bottom-bar">
          <span className="footer-bottom-text">
            © 2026 Inteledge Advisory & Labs. All rights reserved.
          </span>
          <span className="footer-bottom-text" style={{ display: 'flex', gap: '10px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <span>·</span>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Use</a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
