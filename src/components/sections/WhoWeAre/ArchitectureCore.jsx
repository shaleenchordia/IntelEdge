import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, MeshDistortMaterial, Grid } from '@react-three/drei';
import * as THREE from 'three';

const ArchitectureCore = ({ theme }) => {
  const monolithRef = useRef();
  const scannerRef = useRef();
  const gridRef = useRef();
  
  const isLabs = theme.mode === 'labs';
  const color = isLabs ? '#ff00f2' : '#00f2ff';

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (monolithRef.current) {
      monolithRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
    
    // Animate the vertical scanner plane
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(time * 1.5) * 2.5;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color={color} intensity={1.5} />
      <pointLight position={[-5, -5, 5]} color="#fff" intensity={0.5} />

      {/* Main Architectural Monolith */}
      <mesh ref={monolithRef}>
        <boxGeometry args={[2.5, 4.5, 0.4]} />
        <meshPhysicalMaterial
          color="#050505"
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={1}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.9}
        />
        
        {/* Glow Edges */}
        <Box args={[2.52, 4.52, 0.42]}>
          <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
        </Box>
      </mesh>

      {/* Scanning Grid Layer */}
      <group ref={scannerRef}>
        <mesh rotation-x={Math.PI / 2}>
          <planeGeometry args={[3, 1]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
        <pointLight intensity={2} distance={2} color={color} />
      </group>

      {/* Background Structural Grid */}
      <Grid
        ref={gridRef}
        sectionSize={1.5}
        sectionThickness={1}
        sectionColor={color}
        fadeDistance={20}
        infiniteGrid
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -5]}
        opacity={0.05}
      />
    </group>
  );
};

export default ArchitectureCore;
