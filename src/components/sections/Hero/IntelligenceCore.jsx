import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const IntelligenceCore = ({ theme }) => {
  const meshRef = useRef();
  
  const isLabs = theme.mode === 'labs';
  const color = isLabs ? '#ff00f2' : '#00f2ff';
  const secondaryColor = isLabs ? '#ff0066' : '#0066ff';

  useFrame((state) => {
    const { mouse, clock } = state;
    const time = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Rotation logic: combine time-based rotation with subtle mouse parallax
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 
        (mouse.x * Math.PI) / 4 + time * (isLabs ? 0.3 : 0.1), 
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        (-mouse.y * Math.PI) / 4, 
        0.1
      );
      
      // Floating effect tied to mouse
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.x * 0.5, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.y * 0.5, 0.1);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color={color} intensity={2} />
      <pointLight position={[-10, -10, -10]} color={secondaryColor} intensity={1} />

      <Float speed={isLabs ? 4 : 2} rotationIntensity={isLabs ? 2 : 1} floatIntensity={1}>
        <mesh ref={meshRef}>
          {isLabs ? (
            <icosahedronGeometry args={[2.2, 15]} />
          ) : (
            <octahedronGeometry args={[2.5, 2]} />
          )}
          <meshPhongMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={0.15} 
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        <Sphere args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color="#050505"
            speed={isLabs ? 6 : 3}
            distort={isLabs ? 0.6 : 0.3}
            radius={1}
            emissive={isLabs ? color : secondaryColor}
            emissiveIntensity={0.4}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={isLabs ? 3000 : 1500}
            array={new Float32Array(isLabs ? 9000 : 4500).map(() => (Math.random() - 0.5) * 40)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.03} color={color} transparent opacity={0.3} />
      </points>
    </>
  );
};

export default IntelligenceCore;
