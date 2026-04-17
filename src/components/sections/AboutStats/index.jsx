import React, { useRef, useMemo, useCallback, Suspense } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Card data ─────────────────────────────────────────────────────────────────

const cardData = [
  {
    id: 1, icon: '⏳', iconBg: '#6c5ce7', label: 'Experience',
    title: '14+ Years of Advisory', subtitle: '2010 – 2024',
    location: 'Global Operations', date: '12 Oct 2024', pattern: 'waves',
  },
  {
    id: 2, icon: '👥', iconBg: '#0984e3', label: 'Adoption',
    title: '7000+ Participants', subtitle: '2022 – 2024',
    location: 'Enterprise Scale', date: '28 Dec 2023', pattern: 'dots',
  },
  {
    id: 3, icon: '⭐', iconBg: '#fdcb6e', label: 'Rating',
    title: '4.75 Avg. Client Score', subtitle: '2023 – 2024',
    location: 'Global Feedback', date: '15 Jan 2024', pattern: 'lines',
  },
  {
    id: 4, icon: '🚀', iconBg: '#00b894', label: 'Impact',
    title: '250+ AI Solutions', subtitle: '2018 – 2024',
    location: 'Multi-Sector Delivery', date: '28 Nov 2023', pattern: 'circles',
  },
  {
    id: 5, icon: '🤝', iconBg: '#e17055', label: 'Network',
    title: 'Global Alliance Award', subtitle: '2023 – 2024',
    location: 'Strategic Operations', date: '30 Dec 2023', pattern: 'grid',
  },
  {
    id: 6, icon: '🏆', iconBg: '#d63031', label: 'Leadership',
    title: 'Top 5% Advisory Firm', subtitle: '2024 Status',
    location: 'Advisory Excellence', date: '13 Aug 2024', pattern: 'shapes',
  },
];

// ── Floating shapes config — one per card accent colour ───────────────────────

const SHAPES = [
  { pos: [-8,  1.5, -6], color: '#6c5ce7', type: 'torusKnot',    speed: 0.38, rot: 0.80 },
  { pos: [ 6.5,-2.0, -8], color: '#0984e3', type: 'icosahedron',  speed: 0.52, rot: 0.65 },
  { pos: [ 1.0, 3.5,-10], color: '#fdcb6e', type: 'octahedron',   speed: 0.33, rot: 1.00 },
  { pos: [-4.5,-2.5, -7], color: '#00b894', type: 'cone',         speed: 0.47, rot: 0.70 },
  { pos: [ 9.0, 0.5,-10], color: '#e17055', type: 'torus',        speed: 0.42, rot: 0.90 },
  { pos: [ 2.5,-4.0, -6], color: '#d63031', type: 'dodecahedron', speed: 0.58, rot: 0.55 },
];

// ── 3D: Floating wireframe shape ──────────────────────────────────────────────

function FloatingShape({ pos, color, type, speed, rot }) {
  const groupRef = useRef();
  const phase = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.position.y = pos[1] + Math.sin(t * speed + phase.current) * 1.1;
    groupRef.current.rotation.x += rot * 0.003;
    groupRef.current.rotation.y += rot * 0.005;
  });

  return (
    <group ref={groupRef} position={[pos[0], pos[1], pos[2]]}>
      <mesh>
        {type === 'torusKnot'    && <torusKnotGeometry    args={[0.85, 0.28, 90, 12]} />}
        {type === 'icosahedron'  && <icosahedronGeometry  args={[1.05, 1]}             />}
        {type === 'octahedron'   && <octahedronGeometry   args={[1.00, 0]}             />}
        {type === 'cone'         && <coneGeometry         args={[0.75, 1.5,  7]}       />}
        {type === 'torus'        && <torusGeometry        args={[0.75, 0.30, 14, 40]}  />}
        {type === 'dodecahedron' && <dodecahedronGeometry args={[0.95, 0]}             />}
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.22}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight intensity={50} color={color} distance={8} decay={2} />
    </group>
  );
}

// ── 3D: Particle field ────────────────────────────────────────────────────────

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 36;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 5;
    }
    return arr;
  }, []);

  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#7799dd"
        size={0.055}
        transparent
        opacity={0.38}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── 3D: Connecting energy lines between shapes ────────────────────────────────

function EnergyLines() {
  const ref = useRef();
  const positions = useMemo(() => {
    const pairs = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 3], [1, 4]];
    const arr = new Float32Array(pairs.length * 2 * 3);
    pairs.forEach(([a, b], i) => {
      arr[i * 6]     = SHAPES[a].pos[0]; arr[i * 6 + 1] = SHAPES[a].pos[1]; arr[i * 6 + 2] = SHAPES[a].pos[2];
      arr[i * 6 + 3] = SHAPES[b].pos[0]; arr[i * 6 + 4] = SHAPES[b].pos[1]; arr[i * 6 + 5] = SHAPES[b].pos[2];
    });
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.5) * 0.03;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial
        color="#4466aa"
        transparent
        opacity={0.07}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function StatsScene() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <ParticleField />
      <EnergyLines />
      {SHAPES.map((s, i) => <FloatingShape key={i} {...s} />)}
    </>
  );
}

// ── Mouse-tilt wrapper ────────────────────────────────────────────────────────

function TiltCard({ children, accent }) {
  const wrapRef = useRef();
  const glowRef = useRef();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 130, damping: 22 });
  const sy = useSpring(my, { stiffness: 130, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMove = useCallback((e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    const cx = (e.clientX - r.left) / r.width;
    const cy = (e.clientY - r.top)  / r.height;
    mx.set(cx - 0.5);
    my.set(cy - 0.5);
    if (glowRef.current) {
      glowRef.current.style.background =
        `radial-gradient(circle at ${cx * 100}% ${cy * 100}%, ${accent}45, transparent 65%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [accent, mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }, [mx, my]);

  return (
    <div style={{ perspective: '900px', height: '100%' }}>
      <motion.div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', height: '100%', position: 'relative' }}
      >
        {/* Mouse-following glow overlay */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute', inset: 0, borderRadius: '16px',
            zIndex: 3, pointerEvents: 'none',
            transition: 'opacity 0.35s ease', opacity: 0,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}

// ── SVG accent patterns ───────────────────────────────────────────────────────

const AccentPattern = ({ type, color }) => {
  const base = { position: 'absolute', bottom: 8, right: 8, opacity: 0.45, pointerEvents: 'none' };

  if (type === 'waves') return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      <path d="M0 78 Q30 56 60 78 T120 78" fill="none" stroke={color} strokeWidth="2" />
      <path d="M0 92 Q30 70 60 92 T120 92" fill="none" stroke={color} strokeWidth="2" opacity="0.55" />
      <path d="M0 106 Q30 84 60 106 T120 106" fill="none" stroke={color} strokeWidth="2" opacity="0.25" />
    </svg>
  );
  if (type === 'dots') return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      {[...Array(9)].map((_, i) => (
        <circle key={i} cx={76 + (i % 3) * 15} cy={76 + Math.floor(i / 3) * 15}
          r={i % 2 === 0 ? 4 : 3} fill={color} opacity={0.75 - i * 0.06} />
      ))}
    </svg>
  );
  if (type === 'lines') return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      <line x1="120" y1="120" x2="36" y2="36" stroke={color} strokeWidth="3.5" />
      <line x1="120" y1="100" x2="56" y2="36" stroke={color} strokeWidth="3.5" />
      <line x1="100" y1="120" x2="56" y2="76" stroke={color} strokeWidth="3.5" />
    </svg>
  );
  if (type === 'circles') return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      <circle cx="100" cy="100" r="17" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="100" cy="100" r="29" stroke={color} strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="100" cy="100" r="41" stroke={color} strokeWidth="0.6" fill="none" opacity="0.25" />
    </svg>
  );
  if (type === 'grid') return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      <path d="M76 76 L120 76 M76 91 L120 91 M76 106 L120 106 M86 66 L86 120 M101 66 L101 120"
        stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" style={base}>
      <rect x="80" y="80" width="27" height="27" fill={color} opacity="0.28" rx="3" />
      <path d="M68 110 L110 68" stroke={color} strokeWidth="2.5" />
      <path d="M79 110 L110 79" stroke={color} strokeWidth="2.5" opacity="0.45" />
    </svg>
  );
};

// ── Stat card ─────────────────────────────────────────────────────────────────

const StatCard = ({ data, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 45 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.75, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
    style={{ height: '330px' }}
  >
    <TiltCard accent={data.iconBg}>
      <div style={{
        background: 'rgba(255,255,255,0.035)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderRadius: '16px',
        padding: '1.9rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)`,
        cursor: 'default',
      }}>
        {/* Top gradient accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '12%', right: '12%', height: '1px',
          background: `linear-gradient(90deg, transparent, ${data.iconBg}90, transparent)`,
        }} />

        {/* Bottom ambient glow */}
        <div style={{
          position: 'absolute', bottom: -30, left: '15%', right: '15%', height: '90px',
          background: `radial-gradient(ellipse, ${data.iconBg}1a, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
          <motion.div
            whileHover={{ scale: 1.08, boxShadow: `0 0 28px ${data.iconBg}55` }}
            transition={{ duration: 0.2 }}
            style={{
              width: '48px', height: '48px',
              background: `${data.iconBg}1a`,
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem',
              border: `1px solid ${data.iconBg}40`,
              boxShadow: `0 0 16px ${data.iconBg}20, inset 0 1px 0 ${data.iconBg}25`,
              flexShrink: 0,
            }}
          >
            {data.icon}
          </motion.div>
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', fontWeight: 500, letterSpacing: '0.4px' }}>
            {data.date}
          </div>
        </div>

        {/* Main content */}
        <div style={{ zIndex: 1 }}>
          <div style={{
            fontSize: '0.62rem', color: data.iconBg, textTransform: 'uppercase',
            letterSpacing: '2.5px', marginBottom: '0.55rem', fontWeight: 800,
          }}>
            {data.label}
          </div>
          <h3 style={{
            fontSize: '1.42rem', color: '#fff', fontWeight: 700,
            lineHeight: 1.2, marginBottom: '0.35rem', letterSpacing: '-0.5px',
          }}>
            {data.title}
          </h3>
          <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
            {data.subtitle}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          zIndex: 1, fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: data.iconBg, opacity: 0.85 }} />
          {data.location}
        </div>

        <AccentPattern type={data.pattern} color={data.iconBg} />
      </div>
    </TiltCard>
  </motion.div>
);

// ── Section ───────────────────────────────────────────────────────────────────

const AboutStats = () => (
  <section style={{
    width: '100%',
    backgroundColor: '#080808',
    padding: '130px 0',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}>
    {/* ── 3D Background ── */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 72 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <StatsScene />
        </Suspense>
      </Canvas>
    </div>

    {/* Radial vignette keeps cards readable */}
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 110% 75% at 50% 50%, transparent 25%, #080808 88%)',
    }} />

    {/* Top + bottom gradient edge fades */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '200px', zIndex: 1, pointerEvents: 'none',
      background: 'linear-gradient(to bottom, #080808, transparent)',
    }} />
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', zIndex: 1, pointerEvents: 'none',
      background: 'linear-gradient(to top, #080808, transparent)',
    }} />

    {/* ── Content ── */}
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4%', position: 'relative', zIndex: 2, width: '100%' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '5rem' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.4rem 1.4rem',
          border: '1px solid rgba(0,242,255,0.2)',
          borderRadius: '100px',
          fontSize: '0.62rem', letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--accent-primary)',
          background: 'rgba(0,242,255,0.05)',
          backdropFilter: 'blur(10px)',
          marginBottom: '1.6rem',
          fontWeight: 700,
        }}>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block' }}
          />
          Track Record
        </div>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: '1rem',
        }}>
          Institutional Maturity<br />
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 30%, var(--accent-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>& Recognition</span>
        </h2>

        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: '480px', margin: '0 auto' }}>
          A decade-plus of enterprise AI advisory across industries and geographies
        </p>
      </motion.div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {cardData.map((card, i) => (
          <StatCard key={card.id} data={card} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default AboutStats;
