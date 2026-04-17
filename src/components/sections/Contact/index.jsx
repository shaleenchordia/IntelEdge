import React, { useRef } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════
   3D BACKGROUND SCENE
═══════════════════════════════════════════ */

/* Floating wireframe icosahedron */
const FloatIco = ({ position, scale = 1, speed = 0.4, rotAxis = [1, 1, 0] }) => {
  const meshRef = useRef();
  const t = useRef(Math.random() * 100);
  useFrame((_, delta) => {
    t.current += delta * speed;
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotAxis[0] * 0.3;
    meshRef.current.rotation.y += delta * rotAxis[1] * 0.2;
    meshRef.current.rotation.z += delta * rotAxis[2] * 0.15;
    meshRef.current.position.y = position[1] + Math.sin(t.current) * 0.3;
  });
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#00f2ff" wireframe opacity={0.18} transparent />
    </mesh>
  );
};

/* Spinning torus ring */
const TorusRing = ({ position, radius = 1.2, tube = 0.04, speed = 0.25, color = '#aa66ff' }) => {
  const meshRef = useRef();
  const t = useRef(Math.random() * 100);
  useFrame((_, delta) => {
    t.current += delta;
    if (!meshRef.current) return;
    meshRef.current.rotation.x = t.current * speed;
    meshRef.current.rotation.z = t.current * speed * 0.6;
    meshRef.current.position.y = position[1] + Math.sin(t.current * 0.5) * 0.25;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, tube, 16, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

/* Particle field */
const ParticleField = ({ count = 120 }) => {
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);
  const pRef = useRef();
  useFrame(({ clock }) => {
    if (pRef.current) pRef.current.rotation.y = clock.getElapsedTime() * 0.025;
  });
  return (
    <points ref={pRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

/* Glowing inner sphere */
const GlowOrb = ({ position, radius = 0.6, color = '#00f2ff' }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 1.2) * 0.08;
      meshRef.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} />
    </mesh>
  );
};

const ContactScene = () => (
  <>
    <ambientLight intensity={0.3} />
    <ParticleField count={150} />
    <FloatIco position={[-5.5, 1.5, -2]}  scale={1.1} speed={0.3} rotAxis={[1, 0.5, 0.2]} />
    <FloatIco position={[5.5, -1, -3]}   scale={0.75} speed={0.5} rotAxis={[0.3, 1, 0.5]} />
    <FloatIco position={[-2, -2.5, -4]}  scale={0.5}  speed={0.7} rotAxis={[0.5, 0.5, 1]} />
    <FloatIco position={[3.5, 2.5, -5]}  scale={0.6}  speed={0.4} rotAxis={[1, 1, 0.3]} />

    <TorusRing position={[-4.5, 0, -3]}   radius={1.4} tube={0.04} speed={0.35} color="#00f2ff" />
    <TorusRing position={[4.5, 1.5, -4]}  radius={1.0} tube={0.03} speed={0.28} color="#aa66ff" />
    <TorusRing position={[0, -2, -5]}     radius={1.8} tube={0.03} speed={0.2}  color="#ffcc44" />

    <GlowOrb position={[-4, 0.5, -2]} radius={1.2} color="#00f2ff" />
    <GlowOrb position={[4.5, 0, -3]}  radius={0.9} color="#aa66ff" />
  </>
);

/* ═══════════════════════════════════════════
   REUSABLE SUB-COMPONENTS
═══════════════════════════════════════════ */

const MethodPill = ({ icon, title, value, href, delay = 0 }) => (
  <motion.a
    href={href || '#'}
    initial={{ opacity: 0, x: -30, rotateX: 15 }}
    whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, scale: 1.02 }}
    style={{
      display: 'flex', alignItems: 'center', gap: '16px',
      padding: '18px 22px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '16px', textDecoration: 'none',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      perspective: '800px',
      transformStyle: 'preserve-3d',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,242,255,0.08)';
      e.currentTarget.querySelector('.pill-arrow').style.background = '#fff';
      e.currentTarget.querySelector('.pill-arrow').style.color = '#000';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.querySelector('.pill-arrow').style.background = 'rgba(255,255,255,0.05)';
      e.currentTarget.querySelector('.pill-arrow').style.color = '#fff';
    }}
  >
    <div style={{
      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
      width: 42, height: 42, borderRadius: '12px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', flexShrink: 0,
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <h4 style={{ margin: '0 0 3px 0', fontSize: '0.9rem', fontWeight: 600, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>{title}</h4>
      <p  style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontFamily: "'Montserrat', sans-serif" }}>{value}</p>
    </div>
    <div className="pill-arrow" style={{
      width: 30, height: 30, borderRadius: '50%',
      background: 'rgba(255,255,255,0.05)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', transition: 'background 0.3s, color 0.3s', flexShrink: 0,
    }}>
      <ArrowUpRight size={16} />
    </div>
  </motion.a>
);

const fieldBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '12px', padding: '14px 16px',
  color: '#fff', fontSize: '0.9rem',
  fontFamily: "'Montserrat', sans-serif",
  outline: 'none', width: '100%', boxSizing: 'border-box',
  transition: 'all 0.3s ease',
};
const focusHandlers = {
  onFocus: e => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(0,242,255,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,242,255,0.06)'; },
  onBlur:  e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.borderColor = 'rgba(255,255,255,0.09)'; e.target.style.boxShadow = 'none'; },
};

const FormGroup = ({ label, optional, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: "'Montserrat', sans-serif" }}>
      {label}
      {optional && <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400, marginLeft: 4 }}>(optional)</span>}
    </label>
    {children}
  </div>
);

/* ═══════════════════════════════════════════
   INTERACTIVE TEXT COMPONENTS
═══════════════════════════════════════════ */

const InteractiveTitle = ({ text }) => (
  <span style={{ display: 'inline-flex' }}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 30, rotateX: 90 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          y: -8,
          scale: 1.1,
          color: '#00f2ff',
          textShadow: '0 10px 20px rgba(0,242,255,0.4)',
          rotateZ: i % 2 === 0 ? 4 : -4,
        }}
        style={{
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          cursor: 'crosshair',
          transformOrigin: 'bottom center',
        }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const InteractiveWatermark = ({ text }) => (
  <span style={{ display: 'inline-flex', pointerEvents: 'auto' }}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{
          color: 'rgba(255,255,255,0.06)',
          y: -20,
          scale: 1.05,
        }}
        style={{ display: 'inline-block', cursor: 'crosshair', transition: 'color 0.4s' }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const Contact = ({ id }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const smoothY = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  /* Parallax layers */
  const bgY   = useTransform(smoothY, [0, 1], ['-8%', '8%']);
  const leftY = useTransform(smoothY, [0, 1], [30, -20]);
  const rightY = useTransform(smoothY, [0, 1], [50, -30]);

  return (
    <section
      ref={sectionRef}
      id={id || 'contact'}
      style={{
        position: 'relative', background: '#000', color: '#fff',
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '10vh 5% 100px',
        fontFamily: "'Inter', system-ui, sans-serif", overflow: 'hidden',
      }}
    >
      {/* ── 3D canvas background ── */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          y: bgY,
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} gl={{ antialias: true, alpha: true }}>
          <ContactScene />
        </Canvas>
      </motion.div>

      {/* Top ambient glow */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '70vh',
        background: 'radial-gradient(ellipse at top, rgba(0,242,255,0.07), transparent 65%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '15%', left: '50%',
        transform: 'translate(-50%, -20%)',
        fontSize: 'clamp(6rem, 15vw, 15rem)', fontWeight: 800,
        color: 'rgba(255,255,255,0.015)', zIndex: 0, pointerEvents: 'none',
        fontFamily: "'Montserrat', sans-serif", letterSpacing: '-2px', userSelect: 'none',
      }}>
        <InteractiveWatermark text="CONTACT" />
      </div>

      {/* ── Content grid ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1200px', width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1.4fr',
        gap: '80px', alignItems: 'center',
      }}>

        {/* ── LEFT ── */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', y: leftY }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px', borderRadius: '30px', color: '#fff',
              fontSize: '0.8rem', alignSelf: 'flex-start',
              backdropFilter: 'blur(10px)', marginBottom: '24px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', padding: 2 }}>
              <Mail size={12} fill="currentColor" />
            </div>
            Contact
          </motion.div>

          {/* Heading */}
          <div
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 5rem)', fontWeight: 800,
              margin: '0 0 16px 0', letterSpacing: '-3px', textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif", perspective: '1000px'
            }}
          >
            <InteractiveTitle text="Get in" /><br />
            <InteractiveTitle text="touch" />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            style={{
              fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7, margin: '0 0 36px 0', maxWidth: '340px',
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Ready to transform your enterprise with applied AI? Reach us through any channel below.
          </motion.p>

          {/* Pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <MethodPill icon={<Mail size={18} />}   title="Email us"      value="hello@inteledge.com"  href="mailto:hello@inteledge.com" delay={0.2} />
            <MethodPill icon={<Phone size={18} />}   title="Call us"       value="+1 (800) ARCHITECT"   href="tel:+18002724386"            delay={0.3} />
            <MethodPill icon={<MapPin size={18} />}  title="Our location"  value="Crosby Street, NY, US" href="#"                           delay={0.4} />
          </div>
        </motion.div>

        {/* ── RIGHT — Glass form ── */}
        <motion.div
          style={{ y: rightY, perspective: 1200, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, rotateY: -8, x: 60 }}
          whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.form
            onSubmit={e => e.preventDefault()}
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '24px', padding: '40px',
              backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: '22px',
            }}
            whileHover={{ boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,242,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)' }}
            transition={{ duration: 0.4 }}
          >
            {/* Row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
            >
              <FormGroup label="First Name"><input type="text" placeholder="Your first name" style={fieldBase} {...focusHandlers} /></FormGroup>
              <FormGroup label="Last Name"><input type="text" placeholder="Your last name" style={fieldBase} {...focusHandlers} /></FormGroup>
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.28, duration: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
            >
              <FormGroup label="Business Email"><input type="email" placeholder="you@company.com" style={fieldBase} {...focusHandlers} /></FormGroup>
              <FormGroup label="Organisation"><input type="text" placeholder="Company name" style={fieldBase} {...focusHandlers} /></FormGroup>
            </motion.div>

            {/* Row 3 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.36, duration: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}
            >
              <FormGroup label="Your Role">
                <select defaultValue="" style={{ ...fieldBase, appearance: 'none', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }} {...focusHandlers}>
                  <option value="" disabled hidden>CEO / COO / CXO</option>
                  <option>CEO / COO / CXO</option><option>VP / Director</option>
                  <option>Engineer / Developer</option><option>Other</option>
                </select>
              </FormGroup>
              <FormGroup label="Primary Interest">
                <select defaultValue="" style={{ ...fieldBase, appearance: 'none', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }} {...focusHandlers}>
                  <option value="" disabled hidden>AI Strategy &amp; Advisory</option>
                  <option>AI Strategy &amp; Advisory</option><option>Custom AI Development</option>
                  <option>Process Automation</option><option>Other</option>
                </select>
              </FormGroup>
            </motion.div>

            {/* Textarea */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.44, duration: 0.5 }}
            >
              <FormGroup label="Brief Context" optional>
                <textarea
                  placeholder="What are you trying to solve? A few sentences helps us prepare for a more focused conversation."
                  style={{ ...fieldBase, resize: 'vertical', minHeight: '120px' }}
                  {...focusHandlers}
                />
              </FormGroup>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.52, duration: 0.5 }}
              whileHover={{ y: -3, boxShadow: '0 12px 28px rgba(0,0,0,0.35)', background: '#f0f0f0' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', background: '#fff', color: '#000',
                border: 'none', borderRadius: '12px', padding: '17px',
                fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Montserrat', sans-serif", marginTop: '4px',
                transition: 'background 0.3s',
              }}
            >
              Book Enquiry Call
            </motion.button>

            <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)', margin: 0, fontStyle: 'italic', fontFamily: "'Montserrat', sans-serif" }}>
              We respond to all enquiries within one business day.
            </p>
          </motion.form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
