import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Single glowing arc with a dot node ── */
const GlowArc = ({ start, cp1, cp2, end, color, dotT = 0.55, opacity = 0.75 }) => {
  const dotRef = useRef();

  const { geometry, dotPosition } = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...cp1),
      new THREE.Vector3(...cp2),
      new THREE.Vector3(...end)
    );
    const pts = curve.getPoints(180);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const dotPos = curve.getPoint(dotT);
    return { geometry: geo, dotPosition: dotPos };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (dotRef.current) {
      dotRef.current.scale.setScalar(1 + Math.sin(t * 1.8 + dotT * 10) * 0.25);
    }
  });

  return (
    <group>
      {/* The arc line */}
      <line geometry={geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>

      {/* Bright white core dot */}
      <mesh ref={dotRef} position={[dotPosition.x, dotPosition.y, dotPosition.z]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent opacity={0.95}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Colored outer halo */}
      <mesh position={[dotPosition.x, dotPosition.y, dotPosition.z]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/* ── Star particles ── */
const Stars = () => {
  const ref = useRef();
  const COUNT = 90;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.55 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#8899ff"
        size={0.035}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

/* ── Fan of arcs from bottom-centre ── */
// All arcs originate from [0, -5.5, 0]
// Color palette: matching blues, purples, gold, pink to theme
const ORIGIN = [0, -5.5, 0];

const arcDefs = [
  // Far left — deep blue
  {
    cp1: [-1.8, -3.0, 0], cp2: [-5.5, -0.5, 0], end: [-7.0, 2.5, 0],
    color: '#2244ee', dotT: 0.48, opacity: 0.55
  },
  // Left-mid — indigo
  {
    cp1: [-1.1, -2.5, 0], cp2: [-3.8, 0.5, 0],  end: [-4.8, 3.8, 0],
    color: '#6633dd', dotT: 0.52, opacity: 0.65
  },
  // Left-inner — violet
  {
    cp1: [-0.6, -2.0, 0], cp2: [-2.0, 1.5, 0],  end: [-2.5, 4.8, 0],
    color: '#aa44ff', dotT: 0.58, opacity: 0.70
  },
  // Centre — pink/magenta (focal)
  {
    cp1: [0,    -1.5, 0], cp2: [0,    2.5, 0],   end: [0,    5.5, 0],
    color: '#cc44aa', dotT: 0.50, opacity: 0.80
  },
  // Right-inner — gold
  {
    cp1: [0.6,  -2.0, 0], cp2: [2.0,  1.5, 0],  end: [2.5,  4.8, 0],
    color: '#eebb33', dotT: 0.56, opacity: 0.70
  },
  // Right-mid — blue-purple
  {
    cp1: [1.1,  -2.5, 0], cp2: [3.8,  0.5, 0],  end: [4.8,  3.8, 0],
    color: '#4488ff', dotT: 0.60, opacity: 0.65
  },
  // Far right — blue
  {
    cp1: [1.8,  -3.0, 0], cp2: [5.5,  -0.5, 0], end: [7.0,  2.5, 0],
    color: '#2266ff', dotT: 0.50, opacity: 0.55
  },
];

const WhoAreWeBackground = () => {
  return (
    <>
      <ambientLight intensity={0} />

      {/* Stars in the dark sky */}
      <Stars />

      {/* Fan of glowing arcs */}
      {arcDefs.map((arc, i) => (
        <GlowArc
          key={i}
          start={ORIGIN}
          cp1={arc.cp1}
          cp2={arc.cp2}
          end={arc.end}
          color={arc.color}
          dotT={arc.dotT}
          opacity={arc.opacity}
        />
      ))}

      {/* Central convergence glow at origin */}
      <mesh position={[0, -5.5, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, -5.5, 0]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshBasicMaterial color="#8866ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
};

export default WhoAreWeBackground;
