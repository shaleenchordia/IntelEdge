import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ── Single bubble orb ─────────────────────────────────────────────────────────
// Layered spheres: core glow → inner body → surface → rim glow (back-face) → outer halo → specular dot

function GlowOrb({ position, radius, color, speed, phase }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Float on Y axis
    groupRef.current.position.y = position[1] + Math.sin(t * speed * 0.42 + phase) * 0.36;
    // Breathe (subtle scale pulse)
    const breathe = 1 + Math.sin(t * speed * 0.88 + phase) * 0.022;
    groupRef.current.scale.setScalar(breathe);
    // Slow drift rotation
    groupRef.current.rotation.y = t * speed * 0.038;
    groupRef.current.rotation.x = t * speed * 0.022;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 1 — Core: tight bright centre */}
      <mesh>
        <sphereGeometry args={[radius * 0.28, 32, 32]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.7}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 2 — Inner atmosphere */}
      <mesh>
        <sphereGeometry args={[radius * 0.60, 40, 40]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.22}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 3 — Bubble surface (nearly transparent) */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.055}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 4 — Rim glow: back-face trick — bright only at silhouette edges */}
      <mesh>
        <sphereGeometry args={[radius * 1.04, 48, 48]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.28}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 5 — Outer halo: large, very faint */}
      <mesh>
        <sphereGeometry args={[radius * 1.90, 24, 24]} />
        <meshBasicMaterial
          color={color} transparent opacity={0.045}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 6 — Specular highlight: white dot for glass sheen */}
      <mesh position={[radius * 0.38, radius * 0.44, radius * 0.72]}>
        <sphereGeometry args={[radius * 0.09, 16, 16]} />
        <meshBasicMaterial
          color="#ffffff" transparent opacity={0.80}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 7 — Secondary smaller specular (realism) */}
      <mesh position={[radius * -0.22, radius * 0.52, radius * 0.80]}>
        <sphereGeometry args={[radius * 0.04, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff" transparent opacity={0.50}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 8 — Subsurface warmth: significantly richer orange internal volume */}
      <mesh>
        <sphereGeometry args={[radius * 0.65, 32, 32]} />
        <meshBasicMaterial
          color="#ff7700" transparent opacity={0.32}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      {/* 9 — Orange Rim: sharp edge highlight for that 'orangeious' punch */}
      <mesh>
        <sphereGeometry args={[radius * 1.05, 48, 48]} />
        <meshBasicMaterial
          color="#ff4400" transparent opacity={0.45}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Ambient particle cloud ────────────────────────────────────────────────────

function Particles() {
  const ref = useRef();
  const COUNT = 340;

  const { positions, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const phases    = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.45) * 11;
      positions[i * 3 + 1] = (Math.random() - 0.5)  * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5)  * 6 - 2;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, []);

  const baseY = useMemo(() => {
    const arr = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) arr[i] = positions[i * 3 + 1];
    return arr;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t   = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      pos.setY(i, baseY[i] + Math.sin(t * 0.28 + phases[i]) * 0.14);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026} color="#88ddff"
        transparent opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false} sizeAttenuation
      />
    </points>
  );
}

// ── Energy filaments between orbs ─────────────────────────────────────────────

function Filaments() {
  const orbs = [
    [0.5,  0.2,  0.0],
    [-1.0, -1.0, -1.5],
    [2.0,  -0.5, -2.0],
    [-0.2,  1.8, -1.2],
  ];

  const geo = useMemo(() => {
    const pts = [];
    for (let i = 0; i < orbs.length; i++) {
      for (let j = i + 1; j < orbs.length; j++) {
        const dx = orbs[i][0] - orbs[j][0];
        const dy = orbs[i][1] - orbs[j][1];
        const dz = orbs[i][2] - orbs[j][2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.2) {
          pts.push(new THREE.Vector3(...orbs[i]));
          pts.push(new THREE.Vector3(...orbs[j]));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial
        color="#00f2ff" transparent opacity={0.07}
        blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </lineSegments>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

const IntelligenceCore = () => {
  const masterRef = useRef();

  useFrame(({ pointer }) => {
    if (!masterRef.current) return;
    masterRef.current.rotation.x = THREE.MathUtils.lerp(
      masterRef.current.rotation.x, pointer.y * -0.09, 0.032
    );
    masterRef.current.rotation.y = THREE.MathUtils.lerp(
      masterRef.current.rotation.y, pointer.x *  0.09, 0.032
    );
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 8]} fov={55} />

      {/* Subtle deep-space background bloom */}
      <mesh position={[1, 0, -5]}>
        <sphereGeometry args={[7, 20, 20]} />
        <meshBasicMaterial
          color="#001020" transparent opacity={0.18}
          blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>

      <group ref={masterRef} position={[1.2, 0, 0]}>

        {/* ── Main cyan orb (hero) ── */}
        <GlowOrb
          position={[0.5, 0.2, 0.0]}
          radius={1.80} color="#00f2ff"
          speed={0.55} phase={0.0}
        />

        {/* ── Purple secondary ── */}
        <GlowOrb
          position={[-1.0, -1.0, -1.5]}
          radius={1.25} color="#a855f7"
          speed={0.75} phase={2.1}
        />

        {/* ── Green tertiary ── */}
        <GlowOrb
          position={[2.0, -0.5, -2.0]}
          radius={0.95} color="#00ff88"
          speed={0.90} phase={4.2}
        />

        {/* ── Small accent orbs ── */}
        <GlowOrb
          position={[-0.2, 1.8, -1.2]}
          radius={0.46} color="#ffffff"
          speed={1.30} phase={1.0}
        />
        <GlowOrb
          position={[2.8, 0.8, -1.0]}
          radius={0.40} color="#00f2ff"
          speed={1.20} phase={3.5}
        />

        <Filaments />
        <Particles />
      </group>
    </>
  );
};

export default IntelligenceCore;
