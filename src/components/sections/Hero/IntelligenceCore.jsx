import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const SEGS = 250;
const TOTAL_WIDTH = 14;

// A flat ribbon that flows like a sine wave
const WaveRibbon = ({ color, amplitude, frequency, speed, phase, ribbonHeight, opacity, zPos = 0 }) => {
  const ref = useRef();

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array((SEGS + 1) * 2 * 3);
    const indices = [];

    for (let i = 0; i <= SEGS; i++) {
      const x = (i / SEGS - 0.5) * TOTAL_WIDTH;
      const ti = i * 2;      // top vertex index
      const bi = i * 2 + 1;  // bottom vertex index

      verts[ti * 3]     = x;
      verts[ti * 3 + 1] = ribbonHeight * 0.5;
      verts[ti * 3 + 2] = zPos;

      verts[bi * 3]     = x;
      verts[bi * 3 + 1] = -ribbonHeight * 0.5;
      verts[bi * 3 + 2] = zPos;

      if (i < SEGS) {
        const a = ti, b = bi, c = ti + 2, d = bi + 2;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    g.setIndex(indices);
    return g;
  }, [ribbonHeight, zPos]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;

    for (let i = 0; i <= SEGS; i++) {
      const x = (i / SEGS - 0.5) * TOTAL_WIDTH;

      const y =
        Math.sin(x * frequency + t * speed + phase) * amplitude +
        Math.sin(x * frequency * 0.55 + t * speed * 0.8 + phase + 1.4) * amplitude * 0.45 +
        Math.sin(x * frequency * 1.7 + t * speed * 1.2 + phase - 0.8) * amplitude * 0.2;

      const ti = i * 2;
      const bi = i * 2 + 1;
      pos.setY(ti, y + ribbonHeight * 0.5);
      pos.setY(bi, y - ribbonHeight * 0.5);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Floating gold sparkle dots
const Sparkles = () => {
  const ref = useRef();
  const COUNT = 90;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const spd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = Math.random() * 2.5 + 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      const baseY = positions[i * 3 + 1];
      pos.setY(i, baseY + Math.sin(t * speeds[i] + i) * 0.08);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions.slice()}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffcc55"
        size={0.045}
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

const IntelligenceCore = () => {
  const groupRef = useRef();

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    // Subtle tilt following mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.12,
      0.04
    );
  });

  return (
    <>
      {/* Camera: slightly elevated, looking at wave plane */}
      <PerspectiveCamera makeDefault position={[0, 1.2, 5]} fov={55} />
      <ambientLight intensity={0} />

      {/* Tilt the whole group slightly for perspective depth feel */}
      <group ref={groupRef} rotation={[-0.25, 0, 0]} position={[0, 0.6, 0]}>

        {/* ── Thick glowing base ribbons ── */}
        <WaveRibbon color="#1144ff" amplitude={0.55} frequency={1.1} speed={1.0} phase={0}    ribbonHeight={0.14} opacity={0.60} zPos={0.0} />
        <WaveRibbon color="#ff6600" amplitude={0.60} frequency={0.9} speed={0.8} phase={1.2}  ribbonHeight={0.16} opacity={0.40} zPos={-0.1} />
        <WaveRibbon color="#0a2288" amplitude={0.45} frequency={1.3} speed={1.2} phase={2.4}  ribbonHeight={0.11} opacity={0.50} zPos={0.05} />

        {/* ── Bright mid ribbons ── */}
        <WaveRibbon color="#ffcc44" amplitude={0.50} frequency={1.0} speed={1.1} phase={0.6}  ribbonHeight={0.06} opacity={0.70} zPos={0.15} />
        <WaveRibbon color="#88aaff" amplitude={0.55} frequency={1.2} speed={0.9} phase={3.0}  ribbonHeight={0.04} opacity={0.60} zPos={0.10} />

        {/* ── Sharp bright centerline (white / gold light) ── */}
        <WaveRibbon color="#ffffff" amplitude={0.52} frequency={1.15} speed={1.05} phase={0.1}  ribbonHeight={0.018} opacity={0.95} zPos={0.2} />
        <WaveRibbon color="#ffddaa" amplitude={0.48} frequency={1.05} speed={0.95} phase={0.3}  ribbonHeight={0.014} opacity={0.80} zPos={0.18} />

        {/* ── Fiery/warm accent ribbons ── */}
        <WaveRibbon color="#ff4400" amplitude={0.42} frequency={0.85} speed={0.75} phase={4.5}  ribbonHeight={0.07} opacity={0.45} zPos={-0.05} />
        <WaveRibbon color="#4488ff" amplitude={0.38} frequency={0.95} speed={0.85} phase={5.2}  ribbonHeight={0.025} opacity={0.60} zPos={0.12} />

        {/* ── Glow halo behind (wide, very soft) ── */}
        <WaveRibbon color="#050522" amplitude={0.70} frequency={0.7}  speed={0.6} phase={1.8}  ribbonHeight={0.50} opacity={0.20} zPos={-0.4} />
        <WaveRibbon color="#221100" amplitude={0.65} frequency={0.6}  speed={0.5} phase={3.5}  ribbonHeight={0.65} opacity={0.15} zPos={-0.6} />

        {/* ── Floor reflection glow ── */}
        <WaveRibbon color="#112288" amplitude={0.30} frequency={1.1}  speed={1.0} phase={0.0}  ribbonHeight={0.03} opacity={0.30} zPos={0.0} />

        {/* ── Sparkle particles above the wave ── */}
        <Sparkles />

      </group>
    </>
  );
};

export default IntelligenceCore;
