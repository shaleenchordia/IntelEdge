import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// ─── Config ──────────────────────────────────────────────────────────────────
const CITIES = [
  { name: 'Delhi',     lat: 28.61, lon: 77.21 },
  { name: 'Mumbai',    lat: 19.07, lon: 72.88 },
  { name: 'Pune',      lat: 18.52, lon: 73.86 },
  { name: 'Bengaluru', lat: 12.97, lon: 77.59 },
];

// ─── Maths ───────────────────────────────────────────────────────────────────
// Standard spherical coords (no lon+180 offset):
//   theta = lon°  →  lon 77° gives z > 0 (facing camera) by default.
const latLonTo3D = (lat, lon, r = 1) => {
  const phi   = (90 - lat) * (Math.PI / 180);  // polar from Y-up
  const theta =       lon  * (Math.PI / 180);  // azimuth from X
  return new THREE.Vector3(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
};

// ─── Component ───────────────────────────────────────────────────────────────
const IndiaPresenceGlobe = ({ theme }) => {
  const containerRef = useRef();
  const canvasRef    = useRef();
  const [labels, setLabels]         = useState([]);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  const isLabs = theme?.mode === 'labs';
  const hex    = isLabs ? 0xff00f2 : 0x00f2ff;
  const css    = isLabs ? '#ff00f2' : '#00f2ff';

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    setCanvasSize({ w: W, h: H });

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 1000);
    camera.position.z = 3.2;

    // ── Globe group ───────────────────────────────────────────────────
    const globe = new THREE.Group();
    scene.add(globe);

    // Opaque core sphere
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.MeshPhongMaterial({
        color: 0x010108,
        emissive: new THREE.Color(hex),
        emissiveIntensity: 0.06,
        shininess: 30,
      }),
    ));

    // ── India landmass point cloud ────────────────────────────────────
    const pts = [];

    // 18 000 clustered in the India bounding box (tapered triangle)
    for (let i = 0; i < 18000; i++) {
      const lat    = 8  + Math.random() * 29;           // 8°N – 37°N
      const spread = (lat - 8) / 29;                    // 0 = south tip, 1 = north
      const minLon = 68.5 + (1 - spread) * 6;           // narrow south
      const maxLon = 97.5 - (1 - spread) * 6;
      const lon    = minLon + Math.random() * (maxLon - minLon);
      const v = latLonTo3D(lat, lon, 1.004);
      pts.push(v.x, v.y, v.z);
    }

    // 3 000 sparse worldwide background
    for (let i = 0; i < 3000; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      pts.push(
        1.004 * Math.sin(phi) * Math.cos(theta),
        1.004 * Math.cos(phi),
        1.004 * Math.sin(phi) * Math.sin(theta),
      );
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    globe.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({
      color:       new THREE.Color(hex),
      size:        0.0055,
      transparent: true,
      opacity:     0.85,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
      sizeAttenuation: true,
    })));

    // Glowing wireframe atmosphere
    globe.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.035, 36, 36),
      new THREE.MeshBasicMaterial({
        color:       new THREE.Color(hex),
        wireframe:   true,
        transparent: true,
        opacity:     0.04,
        blending:    THREE.AdditiveBlending,
      }),
    ));

    // ── City dots ─────────────────────────────────────────────────────
    const cityMeshes = CITIES.map(city => {
      const pos  = latLonTo3D(city.lat, city.lon, 1.02);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 12, 12),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(hex) }),
      );
      mesh.position.copy(pos);
      globe.add(mesh);
      return { city, localPos: pos.clone() };
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const pLight = new THREE.PointLight(new THREE.Color(hex), 3, 10);
    pLight.position.set(2, 5, 3);
    scene.add(pLight);

    // Scanning Beam Mesh
    const beamGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.02, 64, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    globe.add(beam);

    // ── Animation loop ────────────────────────────────────────────────
    let rafId;

    const animate = (time) => {
      rafId = requestAnimationFrame(animate);
      const t = time * 0.001; // convert to seconds

      // Gentle breathing – NO full spin so India stays centered
      globe.rotation.y = Math.sin(t * 0.15) * 0.022;
      // Scanning Beam Logic
      const scanY = Math.sin(t * 1.2) * 1.5;
      beam.position.y = scanY;
      beam.material.opacity = 0.5 + Math.sin(t * 5) * 0.2; // pulse
      
      renderer.render(scene, camera);

      // ── Project city dots → 2D screen coords ─────────────────────
      const nextLabels = cityMeshes.map(({ city, localPos }) => {
        const world = localPos.clone();
        globe.localToWorld(world);          // apply globe rotation

        // Check if facing camera (dot product of position and camera direction)
        const camDir = new THREE.Vector3(0, 0, 1);
        const isFacing = world.dot(camDir) > 0;

        const proj = world.clone().project(camera);
        const x    =  ( proj.x * 0.5 + 0.5) * W;
        const y    = (-proj.y * 0.5 + 0.5) * H;

        return { name: city.name, lat: city.lat, lon: city.lon, x, y, visible: isFacing };
      });

      setLabels(nextLabels);
    };

    animate();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const nW = container.clientWidth;
      const nH = container.clientHeight;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      setCanvasSize({ w: nW, h: nH });
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [hex]);

  // ── Label offset directions ──────────────────────────────────────────
  // Give each city a fixed radial direction so they never collide.
  const LABEL_DIR = {
    'Delhi':     { dx:  90, dy: -45 },   // top-right
    'Mumbai':    { dx: -90, dy:  10 },   // mid-left
    'Pune':      { dx: -90, dy:  50 },   // lower-left
    'Bengaluru': { dx:  90, dy:  55 },   // lower-right
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Three.js canvas */}
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

      {/* HTML labels – absolutely positioned using projected 2D coords */}
      {labels.map(lbl => {
        if (!lbl.visible) return null;
        const { dx, dy } = LABEL_DIR[lbl.name] || { dx: 70, dy: -30 };
        const lx = lbl.x + dx;
        const ly = lbl.y + dy;

        return (
          <React.Fragment key={lbl.name}>
            {/* SVG leader line from dot → label */}
            <svg
              style={{ position: 'absolute', inset: 0, width: canvasSize.w, height: canvasSize.h, pointerEvents: 'none', overflow: 'visible' }}
            >
              <line
                x1={lbl.x} y1={lbl.y}
                x2={lx}    y2={ly}
                stroke={css} strokeWidth={1} strokeOpacity={0.55}
              />
              {/* Accent dot at the globe surface */}
              <circle cx={lbl.x} cy={lbl.y} r={3} fill={css} />
            </svg>

            {/* Label chip */}
            <div style={{
              position:  'absolute',
              left:      `${lx}px`,
              top:       `${ly}px`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              <div style={{
                color:       '#fff',
                background:  'rgba(0,2,8,0.92)',
                border:      `1px solid ${css}`,
                padding:     '6px 13px',
                borderRadius:'2px',
                fontSize:    '10px',
                fontWeight:  900,
                letterSpacing: '1.4px',
                whiteSpace:  'nowrap',
                textTransform:'uppercase',
                boxShadow:   `0 0 18px ${css}60`,
                fontFamily:  "'Orbitron', sans-serif",
              }}>
                {lbl.name}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default IndiaPresenceGlobe;
