import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════
   INTELLIGENCE CORE  —  cut-crystal cube + gradient prism light rays
═══════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   ENVIRONMENT MAP (tiny procedural cubemap so transmission has reflections)
───────────────────────────────────────── */

function ProceduralEnvironment() {
  const { scene } = useThree();

  useEffect(() => {
    // Build a simple gradient env as equirectangular
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Sky gradient — dark top, horizon warm, bottom deep
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0.0, '#1a1428');
    grad.addColorStop(0.4, '#2a2238');
    grad.addColorStop(0.5, '#4a3a40');
    grad.addColorStop(0.55, '#5a4438');
    grad.addColorStop(0.7, '#1a1222');
    grad.addColorStop(1.0, '#08060c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    // Add colored "suns" so reflections pick up tints
    ctx.globalCompositeOperation = 'lighter';
    const suns = [
      { x: 80, y: 90, r: 60, color: 'rgba(255, 190, 100, 0.8)' },   // warm
      { x: 200, y: 100, r: 50, color: 'rgba(255, 140, 60, 0.7)' },    // orange
      { x: 360, y: 110, r: 55, color: 'rgba(100, 160, 255, 0.8)' },   // cool blue
      { x: 460, y: 95, r: 45, color: 'rgba(180, 220, 255, 0.7)' },   // cyan
    ];
    suns.forEach(s => {
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
      g.addColorStop(0, s.color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.mapping = THREE.EquirectangularReflectionMapping;
    tex.colorSpace = THREE.SRGBColorSpace;

    scene.environment = tex;

    return () => {
      tex.dispose();
      scene.environment = null;
    };
  }, [scene]);

  return null;
}

/* ─────────────────────────────────────────
   CRYSTAL CUBE — outer glass + nested inner glass + chrome edges
───────────────────────────────────────── */

function CrystalCube({ mouseRef }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // slow deliberate rotation — cinematic pace
    groupRef.current.rotation.y = t * 0.14 + mouseRef.current.x * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.12 + mouseRef.current.y * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.11) * 0.04;
    // float
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.1;
  });

  // pre-build edge geometries
  const outerEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 2.2, 2.2)), []);
  const innerEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.3, 1.3, 1.3)), []);
  const coreEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.6, 0.6, 0.6)), []);

  return (
    <group ref={groupRef}>
      {/* ── OUTER CUBE — big glass shell ── */}
      <mesh renderOrder={1}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshPhysicalMaterial
          transmission={1.0}
          thickness={0.8}
          roughness={0.02}
          ior={1.5}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.03}
          envMapIntensity={1.5}
          transparent
          attenuationColor="#d8e4ff"
          attenuationDistance={6}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <lineSegments geometry={outerEdges} renderOrder={3}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </lineSegments>

      {/* ── INNER CUBE — rotated 45° so its corners poke toward outer faces ── */}
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <mesh renderOrder={2}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshPhysicalMaterial
            transmission={1.0}
            thickness={0.6}
            roughness={0.03}
            ior={1.55}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.8}
            transparent
            attenuationColor="#c8d8ff"
            attenuationDistance={4}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <lineSegments geometry={innerEdges} renderOrder={4}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </lineSegments>
      </group>

      {/* ── INNERMOST TINY CORE — small visible speck through all layers ── */}
      <group rotation={[Math.PI / 6, -Math.PI / 4, Math.PI / 8]}>
        <mesh renderOrder={3}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshPhysicalMaterial
            transmission={0.9}
            thickness={0.4}
            roughness={0.04}
            ior={1.6}
            metalness={0}
            clearcoat={1}
            envMapIntensity={2.0}
            transparent
            attenuationColor="#a8c0ff"
            attenuationDistance={2}
            depthWrite={false}
          />
        </mesh>
        <lineSegments geometry={coreEdges} renderOrder={5}>
          <lineBasicMaterial color="#ffffff" transparent opacity={1} />
        </lineSegments>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────
   PRISM BEAMS — shader-based, soft gradient fade from center outward
   These are the rainbow light rays visible in the reference.
───────────────────────────────────────── */

const beamVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uPulse;

  void main() {
    // vUv.x = 0 at root (center), 1 at tip (far end)
    // vUv.y = 0..1 across beam width

    // Fade along length: bright at center, fades to 0 at tip
    float lengthFade = 1.0 - vUv.x;
    lengthFade = pow(lengthFade, 1.8);

    // Fade along width: bright at center line, 0 at edges
    float widthDist = abs(vUv.y - 0.5) * 2.0;
    float widthFade = 1.0 - widthDist;
    widthFade = pow(widthFade, 2.5);

    // Gentle shimmer along the beam
    float shimmer = 0.85 + 0.15 * sin(vUv.x * 8.0 - uTime * 1.5 + uPulse);

    float alpha = lengthFade * widthFade * uIntensity * shimmer;
    
    // Slight color brightening at the bright end
    vec3 color = uColor + vec3(lengthFade * 0.3);
    
    gl_FragColor = vec4(color, alpha);
  }
`;

function PrismBeam({ angle, color, length, width, intensity, pulseOffset = 0 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // beam points OUTWARD from center along the angle
  const [posX, posY, rotZ] = useMemo(() => {
    const mid = length / 2;
    return [Math.cos(angle) * mid, Math.sin(angle) * mid, angle];
  }, [angle, length]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[posX, posY, -2.5]} rotation={[0, 0, rotZ]}>
      <planeGeometry args={[length, width, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={beamVertexShader}
        fragmentShader={beamFragmentShader}
        uniforms={{
          uColor: { value: new THREE.Color(color) },
          uIntensity: { value: intensity },
          uTime: { value: 0 },
          uPulse: { value: pulseOffset },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function PrismBeams() {
  // carefully placed beams matching the reference composition
  const beams = useMemo(() => [
    // Right side — warm amber group
    { angle: Math.PI * 0.14, color: '#ffb457', length: 22, width: 1.6, intensity: 0.85, pulseOffset: 0.0 },
    { angle: Math.PI * 0.08, color: '#ff8a3c', length: 18, width: 1.1, intensity: 0.7, pulseOffset: 0.5 },
    { angle: Math.PI * 0.20, color: '#ffcc7a', length: 16, width: 0.9, intensity: 0.65, pulseOffset: 1.0 },

    // Left side — cool blue group  
    { angle: Math.PI * 0.92, color: '#4a90ff', length: 24, width: 1.8, intensity: 0.85, pulseOffset: 1.5 },
    { angle: Math.PI * 0.85, color: '#6eb4ff', length: 18, width: 1.0, intensity: 0.65, pulseOffset: 2.0 },
    { angle: Math.PI * 0.98, color: '#3a6cdd', length: 20, width: 1.3, intensity: 0.7, pulseOffset: 2.5 },

    // Subtle bottom-right deep blue
    { angle: -Math.PI * 0.18, color: '#3a66cc', length: 16, width: 1.0, intensity: 0.55, pulseOffset: 3.0 },

    // Subtle bottom-left
    { angle: -Math.PI * 0.82, color: '#4a7acc', length: 14, width: 0.9, intensity: 0.5, pulseOffset: 3.5 },

    // Top center — soft white highlight
    { angle: Math.PI * 0.5, color: '#c8d8ff', length: 14, width: 0.7, intensity: 0.6, pulseOffset: 4.0 },
  ], []);

  return (
    <group>
      {beams.map((b, i) => (
        <PrismBeam key={i} {...b} />
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   SUBTLE CONNECTING CURVE — thin hairline arc behind (like reference)
───────────────────────────────────────── */

function ConnectingArc() {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,
      2.6, 2.6,
      Math.PI * -0.15, Math.PI * 0.55,
      false, 0
    );
    const points = curve.getPoints(80);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, []);

  return (
    <line geometry={geometry} position={[0.3, 0, -1]}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
    </line>
  );
}

/* ─────────────────────────────────────────
   LIGHTING
───────────────────────────────────────── */

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.2} color="#1a2040" />

      {/* Warm amber key — upper-right (makes right side of cube pick up warm tints) */}
      <pointLight position={[5, 4, 3]} intensity={2.2} color="#ffb070" distance={14} decay={1.6} />

      {/* Cool blue fill — upper-left */}
      <pointLight position={[-5, 3, 3]} intensity={2.0} color="#5088ff" distance={14} decay={1.6} />

      {/* Orange rim — below-back */}
      <pointLight position={[2, -4, -3]} intensity={1.4} color="#ff6a3c" distance={10} decay={1.8} />

      {/* Cool rim — back */}
      <pointLight position={[-2, 2, -4]} intensity={1.2} color="#6aa0ff" distance={10} decay={1.8} />

      {/* Direct front fill so edges catch specular */}
      <directionalLight position={[0, 2, 5]} intensity={0.5} color="#ffffff" />

      {/* Top subtle key */}
      <directionalLight position={[0, 5, 1]} intensity={0.4} color="#d8d0e8" />
    </>
  );
}

/* ─────────────────────────────────────────
   CAMERA RIG
───────────────────────────────────────── */

function CameraRig({ mouseRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetX = mouseRef.current.x * 0.4;
    const targetY = -mouseRef.current.y * 0.25;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */

const IntelligenceCore = ({ theme, isLight }) => {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <fog attach="fog" args={['#02030a', 9, 26]} />
      <ProceduralEnvironment />
      <SceneLights />
      <PrismBeams />
      <ConnectingArc />
      <CrystalCube mouseRef={mouseRef} />
      <CameraRig mouseRef={mouseRef} />
    </>
  );
};

export default IntelligenceCore;