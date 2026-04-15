import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';

const BubbleButton = ({ title, color, onClick, isLight }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: 1,
      opacity: 1,
      y: [0, -15, 0],
    }}
    transition={{
      scale: { type: "spring", stiffness: 200, damping: 15 },
      opacity: { duration: 0.5 },
      y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
    }}
    whileHover={{ scale: 1.1, boxShadow: `0 0 50px ${color}44` }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    style={{
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${color} 0%, ${color}99 100%)`,
      border: `2px solid rgba(255, 255, 255, 0.4)`,
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: `0 0 30px ${color}33`,
      fontSize: '1rem',
      fontWeight: 900,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <motion.div
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{ repeat: Infinity, duration: 3 }}
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)`,
      }}
    />
    <span style={{ zIndex: 1 }}>{title}</span>
  </motion.div>
);

const TiltCard = ({ tagline, title, description, buttonText, label, onHoverStart, onHoverEnd, background, accentColor, isVisible, isLight }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
    hidden: { opacity: 0, x: (title === "Advisory" ? -50 : 50) },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHoverStart}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        flex: 1,
        background: isLight 
          ? (title.includes("Engineering") ? 'linear-gradient(180deg, #f7f9fa 0%, #edf2f5 100%)' : 'linear-gradient(180deg, #f7f9fa 0%, #f5eef7 100%)')
          : background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 6%',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1000px',
        borderLeft: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
        borderRight: isLight ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div style={{ transform: "translateZ(30px)", zIndex: 2, pointerEvents: 'none' }}>
        <motion.span variants={childVariants} style={{ fontSize: '0.75rem', color: accentColor, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', display: 'block' }}>
          {tagline}
        </motion.span>

        <motion.h3 variants={childVariants} style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1.5rem', marginTop: '0.8rem', color: 'var(--text-primary)' }}>
          {title}
        </motion.h3>

        <motion.p variants={childVariants} style={{ opacity: 0.6, maxWidth: '400px', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>
          {description}
        </motion.p>

        <motion.button variants={childVariants} className="interactive" style={{ pointerEvents: 'auto', color: accentColor, fontWeight: 700, fontSize: '1rem', background: 'transparent', border: 'none', cursor: 'none' }}>
          {buttonText} <span style={{ marginLeft: '10px' }}>→</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: isLight ? 0.04 : 0.03, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: 'absolute',
          right: '-30px',
          bottom: '-30px',
          fontSize: '12rem',
          fontWeight: 900,
          letterSpacing: '-10px',
          transform: "translateZ(-10px)",
          userSelect: 'none',
          pointerEvents: 'none',
          color: 'var(--text-primary)'
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const Divisions = ({ setGlobalTheme, id, isLight }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isPopped, setIsPopped] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.45 && !isPopped) {
        setIsPopped(true);
      } else if (latest < 0.25 && isPopped) {
        setIsPopped(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isPopped]);

  const prePopScale = useTransform(scrollYProgress, [0, 0.45], [0.8, 1.05]);
  const prePopOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45], [0, 1, 1]);

  return (
    <section
      id={id || "labs"}
      ref={containerRef}
      style={{
        padding: 0,
        minHeight: '170vh',
        background: 'var(--bg-color)',
        position: 'relative',
        marginTop: '-5vh'
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-color)'
      }}>
        {!isPopped && (
          <div style={{ position: 'absolute', top: '15vh', textAlign: 'center', zIndex: 10 }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 'max(3rem, 5vw)', fontWeight: 800, letterSpacing: '-3px', color: 'var(--text-primary)' }}>
              INTELEDGE <span className="gradient-text">LABS</span>
            </h2>
            <p style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '6px', opacity: 0.5, marginTop: '0.8rem', textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-primary)' }}>
              Engineering the Intelligent Frontier
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!isPopped ? (
            <motion.div
              key="bubble-container"
              style={{
                display: 'flex',
                gap: '6rem',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                width: '100%',
                scale: prePopScale,
                opacity: prePopOpacity
              }}
              exit={{
                scale: 4,
                opacity: 0,
                filter: 'blur(30px)',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
              }}
            >
              <BubbleButton
                title="Engineering"
                color="#00f2ff"
                onClick={() => setIsPopped(true)}
                isLight={isLight}
              />
              <BubbleButton
                title="Research"
                color="#ff00ff"
                onClick={() => setIsPopped(true)}
                isLight={isLight}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  fontSize: '0.8rem',
                  letterSpacing: '5px',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  fontWeight: 400
                }}
              >
                Scroll to Reveal Labs
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content-container"
              style={{ display: 'flex', width: '100%', height: '100%' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <TiltCard
                tagline="Active Build"
                title="Labs Engineering"
                description="Translating architectural theory into production-ready agentic infrastructure. We build high-throughput intelligence layers for the modern enterprise."
                buttonText="View Tech Stack"
                label="ENG"
                background="linear-gradient(180deg, #050505 0%, #001a33 100%)"
                accentColor="var(--accent-cyan)"
                onHoverStart={() => setGlobalTheme('cyan')}
                onHoverEnd={() => { }}
                isVisible={isPopped}
                isLight={isLight}
              />

              <TiltCard
                tagline="Future Frontier"
                title="Labs Research"
                description="Exploring the boundaries of non-linear intelligence and autonomous systems. Our R&D division focuses on what comes after GPT."
                buttonText="Read Papers"
                label="R&D"
                background="linear-gradient(180deg, #050505 0%, #33001a 100%)"
                accentColor="var(--accent-magenta)"
                onHoverStart={() => setGlobalTheme('magenta')}
                onHoverEnd={() => { }}
                isVisible={isPopped}
                isLight={isLight}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Divisions;
