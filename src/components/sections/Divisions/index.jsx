import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const TiltCard = ({ tagline, title, description, buttonText, label, onHoverStart, onHoverEnd, background, accentColor }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHoverEnd();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { 
      scaleX: 1, 
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }
    }
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverStart}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        flex: 1,
        background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 5%',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1000px',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Architectural Reveal Line */}
      <motion.div 
        variants={lineVariants}
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '60px',
          height: '2px',
          background: accentColor,
          boxShadow: `0 0 15px ${accentColor}`,
          zIndex: 1
        }}
      />

      <div style={{ transform: "translateZ(50px)", zIndex: 2, pointerEvents: 'none' }}>
        <motion.span variants={childVariants} style={{ fontSize: '0.8rem', color: accentColor, fontWeight: 800, letterSpacing: '4px', textTransform: 'uppercase', display: 'block' }}>
          {tagline}
        </motion.span>
        
        <motion.h3 variants={childVariants} style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '2rem', marginTop: '1rem' }}>
          {title}
        </motion.h3>

        <motion.p variants={childVariants} style={{ opacity: 0.6, maxWidth: '450px', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: 1.5 }}>
          {description}
        </motion.p>

        <motion.button variants={childVariants} className="interactive" style={{ pointerEvents: 'auto', color: accentColor, fontWeight: 700, fontSize: '1.1rem', background: 'transparent', border: 'none', cursor: 'none' }}>
          {buttonText} <span style={{ marginLeft: '10px' }}>→</span>
        </motion.button>
      </div>

      {/* Decorative Background ID */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 0.03, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ 
          position: 'absolute', 
          right: '-50px', 
          bottom: '-50px', 
          fontSize: '20rem', 
          fontWeight: 900, 
          letterSpacing: '-15px',
          transform: "translateZ(-20px)",
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const Divisions = ({ setGlobalTheme }) => {
  return (
    <section id="divisions" style={{ padding: 0, minHeight: '100vh', display: 'flex', background: '#000', overflow: 'hidden' }}>
      {/* Advisory */}
      <TiltCard 
        tagline="Strategic Arm"
        title="Advisory"
        description="Architecting board-level intelligence strategies. We bridge the gap between enterprise goals and architectural reality."
        buttonText="Explore Design"
        label="ADV"
        background="linear-gradient(180deg, #050505 0%, #001a33 100%)"
        accentColor="var(--accent-cyan)"
        onHoverStart={() => setGlobalTheme('advisory')}
        onHoverEnd={() => {}}
      />

      {/* Labs */}
      <TiltCard 
        tagline="Engineering Arm"
        title="Labs"
        description="Building the frontier of agentic systems. From R&D to production-grade intelligent infrastructure."
        buttonText="Explore Build"
        label="LAB"
        background="linear-gradient(180deg, #050505 0%, #33001a 100%)"
        accentColor="var(--accent-magenta)"
        onHoverStart={() => setGlobalTheme('labs')}
        onHoverEnd={() => {}}
      />
    </section>
  );
};

export default Divisions;
