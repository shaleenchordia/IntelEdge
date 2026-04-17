import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const OrbitalArc = ({ radiusX, radiusY, tiltX, tiltZ, opacity, speed = 0.04 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed;
  });
  const points = [];
  for (let i = 0; i <= 300; i++) {
    const a = (i / 300) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(a) * radiusX, Math.sin(a) * radiusY, 0));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <group ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <line geometry={geo}>
        <lineBasicMaterial
          color="#88aaff"
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>
    </group>
  );
};

const ArchitectureCore = ({ explodeRef }) => {
  const sphereRef = useRef();
  const groupRef = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (sphereRef.current) sphereRef.current.rotation.y = t * 0.035;
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.04, 0.03);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.04, 0.03);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={55} />
      <ambientLight intensity={0} />

      <group ref={groupRef}>
        <group position={[-3.5, 2.0, 0]}>

          {/* Strong BLUE — top-left */}
          <pointLight position={[-5, 5, 3]} color="#1155ff" intensity={800} distance={22} decay={2} />
          {/* RED-ORANGE — right */}
          <pointLight position={[5.5, -1.5, 2.5]} color="#ff3300" intensity={600} distance={20} decay={2} />
          {/* Warm AMBER — lower rim */}
          <pointLight position={[2, -5, 1]} color="#ff8800" intensity={300} distance={14} decay={2} />
          {/* Cool fill front */}
          <pointLight position={[0, 0, 6]} color="#112255" intensity={50} distance={15} decay={2} />

          {/* Main sphere */}
          <mesh ref={sphereRef}>
            <sphereGeometry args={[2.8, 128, 128]} />
            <meshPhongMaterial
              color="#1e2d50"
              emissive="#050510"
              emissiveIntensity={1}
              shininess={90}
              specular="#ff6600"
            />
          </mesh>

          {/* Blue atmospheric rim */}
          <mesh scale={1.025}>
            <sphereGeometry args={[2.8, 64, 64]} />
            <meshBasicMaterial color="#112266" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
          </mesh>

          {/* Orange/red rim */}
          <mesh scale={1.04}>
            <sphereGeometry args={[2.8, 64, 64]} />
            <meshBasicMaterial color="#331100" transparent opacity={0.10} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
          </mesh>

          {/* Orbital Arcs */}
          <OrbitalArc radiusX={3.8} radiusY={2.4} tiltX={Math.PI / 2.2} tiltZ={0.25}  opacity={0.45} speed={0.04} />
          <OrbitalArc radiusX={4.2} radiusY={2.0} tiltX={Math.PI / 2.8} tiltZ={-0.4}  opacity={0.28} speed={0.03} />
          <OrbitalArc radiusX={3.5} radiusY={3.0} tiltX={0.55}          tiltZ={1.1}   opacity={0.18} speed={0.05} />

        </group>
      </group>
    </>
  );
};

export default ArchitectureCore;
