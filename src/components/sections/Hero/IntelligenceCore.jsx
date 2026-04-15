import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Shard = ({ color, speed, radius, size, initialRotation }) => {
  const ref = useRef();
  const originalPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    const { mouse, clock } = state;
    const time = clock.getElapsedTime() * speed;

    if (ref.current) {
      // Base orbital movement
      const x = Math.cos(time + initialRotation) * radius;
      const z = Math.sin(time + initialRotation) * radius;
      const y = Math.sin(time * 0.5) * (radius * 0.3);

      // Target position
      const targetX = x + (mouse.x * 2);
      const targetY = y + (mouse.y * 2);

      // Smoothly follow cursor movement (Magnetic effect)
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.1);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.1);
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, z, 0.1);

      // Spin faster as mouse moves
      ref.current.rotation.x += 0.02 + Math.abs(mouse.x) * 0.05;
      ref.current.rotation.y += 0.02 + Math.abs(mouse.y) * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={6}
        transparent
        opacity={0.8}
        metalness={1}
        roughness={0}
      />
    </mesh>
  );
};

const IntelligenceCore = ({ theme }) => {
  const isLabs = theme === 'labs' || theme?.mode === 'labs';
  const color = isLabs ? '#ff00f2' : '#00f2ff';
  const groupRef = useRef();
  const pointsRef = useRef();

  // 18 shards for a dense, high-fidelity orbital system
  const shards = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    initialRotation: (i / 18) * Math.PI * 2,
    radius: 3 + Math.random() * 2.5,
    speed: 0.1 + Math.random() * 0.3,
    size: 0.1 + Math.random() * 0.15
  })), []);

  const points = useMemo(() => {
    const p = new Float32Array(6000 * 3);
    for (let i = 0; i < 6000; i++) {
      const radius = 15 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);
    }
    return p;
  }, []);

  useFrame((state) => {
    const { mouse } = state;
    if (groupRef.current) {
      // Entire system parallax
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (mouse.x * Math.PI) / 4, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-mouse.y * Math.PI) / 4, 0.05);
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, (mouse.y * 0.2), 0.02);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={30} />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} color={color} intensity={12} distance={25} />
      <pointLight position={[20, 20, 20]} color={color} intensity={3} />

      <group ref={groupRef}>
        {/* Pulsar Core */}
        <Float speed={5} rotationIntensity={3} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial
              color="#fff"
              emissive={color}
              emissiveIntensity={25}
              toneMapped={false}
            />
          </mesh>
          <mesh scale={5}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </mesh>
        </Float>

        {/* Dynamic Shard Swarm */}
        {shards.map((s, i) => (
          <Shard key={i} color={color} {...s} />
        ))}
      </group>

      {/* Galactic Background Dots */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={6000}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color={color}
          transparent
          opacity={0.25}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

export default IntelligenceCore;
