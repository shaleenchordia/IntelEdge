import React, { useEffect, useRef } from 'react';
import './About.css';

/* ═══════════════════════════════════════════
   FLOATING BUBBLE SYSTEM
   ═══════════════════════════════════════════ */
const BUBBLE_COUNT = 25;
const BUBBLE_COLORS = [
  'rgba(0, 132, 255, 0.6)',
  'rgba(96, 177, 255, 0.5)',
  'rgba(49, 154, 255, 0.55)',
  'rgba(130, 200, 255, 0.5)',
  'rgba(0, 200, 255, 0.6)',
  'rgba(60, 140, 255, 0.55)',
];

const FloatingBubbles = () => {
  const canvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize bubbles at top, floating downward (continuing from Hero)
    bubblesRef.current = Array.from({ length: BUBBLE_COUNT }, () => {
      const size = 8 + Math.random() * 25;
      return {
        x: Math.random() * canvas.width,
        y: -Math.random() * 300, // Start above viewport
        vx: (Math.random() - 0.5) * 0.8, // Horizontal drift
        vy: 0.5 + Math.random() * 1.5, // Float downward
        size,
        baseSize: size,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        alpha: 0.4 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    });

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Add gentle sine wave motion
        bubble.x += Math.sin(time * 0.001 + bubble.pulse) * 0.3;

        // Pulsing size
        bubble.pulse += bubble.pulseSpeed;
        bubble.size = bubble.baseSize + Math.sin(bubble.pulse) * 3;

        // Reset bubble when it goes off bottom (recycle from top)
        if (bubble.y - bubble.size > canvas.height + 50) {
          bubble.y = -50;
          bubble.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;

        // Draw bubble with glow
        ctx.save();
        ctx.globalAlpha = bubble.alpha;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.shadowColor = bubble.color;
        ctx.shadowBlur = bubble.size * 2;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

const About = () => {
  return (
    <section className="about-cinematic-wrapper" id="about">
      {/* Floating Bubbles Background */}
      <FloatingBubbles />

      {/* Immersive blurred background mimicking the WES photo */}
      <div className="about-cinematic-bg"></div>

      <div className="about-glass-card">

        {/* Top: WES photo style Mission Statement */}
        <div className="about-header-row">
          <h2 className="about-title">About Us</h2>
          <div className="about-mission-text">
            <p><strong>Applied Intelligence Architecture for Enterprise Transformation.</strong></p>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
              We are an Applied Intelligence Architecture firm — built at the intersection of strategy, systems, and scalable execution. Our work spans AI strategy, governance, workforce enablement, and purpose-built AI products, all designed to help enterprises transition from digital experimentation to intelligent transformation.
            </p>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
              We help organizations move beyond AI experimentation — building strategies that are executable, solutions that are adoptable, and products built around how businesses actually operate.
            </p>
            <p style={{ marginTop: '1rem', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'rgba(255, 255, 255, 0.8)' }}>
              We operate through two integrated functions: Inteledge Advisory and Inteledge Labs — covering the full spectrum from strategy and governance to custom AI product development.
            </p>
          </div>
        </div>

        <div className="about-separator"></div>

        {/* Middle: Appfire structure Stats */}
        <div className="about-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="about-stat-item">
            <h3>14+</h3>
            <p>Years</p>
          </div>
          <div className="about-stat-item">
            <h3>7000+</h3>
            <p>Participants</p>
          </div>
          <div className="about-stat-item">
            <h3>4.75</h3>
            <p>Avg. Rating</p>
          </div>
        </div>

        <div className="about-separator"></div>

        {/* Bottom: Appfire structure Culture & Trust */}
        <div className="about-values-row">
          <div className="about-value-block">
            <h4>Our commitment to purposeful impact</h4>
            <p>
              At IntelEdge, doing good is embedded in our architecture. We're committed to making a meaningful difference for our engineers, our partners, and the communities surrounding our infrastructure. We achieve this through responsible model training, technology that creates equal opportunity, and a culture where diversity drives logical expansion.
            </p>
            <a href="#impact" className="about-value-link" onClick={(e) => e.preventDefault()}>Learn about our impact</a>
          </div>
          <div className="about-value-block">
            <h4>Enterprise-ready privacy and security</h4>
            <p>
              Our solutions are backed by an industry-leading Trust Center. All core logic flows are rigorously audited (ISO 27001, SOC 2 Type II) to deliver security that is just as comprehensive as the autonomy we provide. Streamline your entire pipeline lifecycle with zero-trust protocols out of the box.
            </p>
            <a href="#trust" className="about-value-link" onClick={(e) => e.preventDefault()}>Visit our Trust Center</a>
          </div>
        </div>

        {/* Very Bottom: WES photo style typography decoration */}
        <div className="about-footer-row">
          <h1 className="about-location">New York</h1>
          <h1 className="about-state">NY</h1>
        </div>

      </div>
    </section>
  );
};

export default About;
