import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Sphere, MeshDistortMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

const RollingBall = ({ theme }) => {
  const meshRef = useRef();
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for more professional movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map scroll progress to Y position (from top to bottom of viewport)
  // Viewport in THREE usually goes from ~5 to -5 vertically
  const yPos = useTransform(smoothProgress, [0, 1], [4, -4]);
  // Map scroll progress to horizontal movement (optional, but keep it centered/offset)
  const xPos = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [3, 2, -3, -2, 3]);

  const isLabs = theme === 'labs' || theme?.mode === 'labs';
  const color = isLabs ? '#ff00f2' : '#00f2ff';

  useFrame((state) => {
    if (meshRef.current) {
      // Manual rotation based on scroll to simulate rolling
      // We use the absolute scroll progress to determine rotation angle
      const rotationAngle = smoothProgress.get() * Math.PI * 10;
      meshRef.current.rotation.x = rotationAngle;
      meshRef.current.rotation.y += 0.01; // Constant slow spin
      
      // Update position from Framer Motion
      meshRef.current.position.y = yPos.get();
      meshRef.current.position.x = xPos.get();
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fff" />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial
            color="#111"
            speed={3}
            distort={0.4}
            radius={1}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0}
            metalness={1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </Float>
      
      {/* Subtle trail particles */}
      <Points count={50} color={color} />
    </group>
  );
};

const Points = ({ count, color }) => {
  const pointsRef = useRef();
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -5 + Math.random() * 10,
        yFactor: -5 + Math.random() * 10,
        zFactor: -5 + Math.random() * 10,
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.t += p.speed;
      const s = Math.cos(p.t);
      pointsRef.current.geometry.attributes.position.array[i * 3] += s * 0.01;
      pointsRef.current.geometry.attributes.position.array[i * 3 + 1] += s * 0.01;
    });
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      array[i] = (Math.random() - 0.5) * 15;
    }
    return array;
  }, [count]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color || '#00f2ff'} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

const Global3DLayer = ({ theme }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 5, // Above content background, below interactive elements if needed
      pointerEvents: 'none',
      opacity: 0.8
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <RollingBall theme={theme} />
      </Canvas>
    </div>
  );
};

export default Global3DLayer;
