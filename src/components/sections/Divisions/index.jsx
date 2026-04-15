import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion';

const BubbleButton = ({ title, color, onClick }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      y: [0, -20, 0],
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
      width: '220px',
      height: '220px',
      borderRadius: '50%',
      background: `radial-gradient(circle at 30% 30%, ${color} 0%, ${color}99 100%)`,
      border: `2px solid rgba(255, 255, 255, 0.2)`,
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: `0 0 40px ${color}33`,
      fontSize: '1.4rem',
      fontWeight: 900,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '4px',
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

const TiltCard = ({ tagline, title, description, buttonText, label, onHoverStart, onHoverEnd, background, accentColor, isVisible }) => {
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
    hidden: { opacity: 0, x: (title === "Advisory" ? -100 : 100) },
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
      animate={isVisible ? "visible" : "hidden"}
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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [isPopped, setIsPopped] = React.useState(false);

  // Trigger pop earlier and more responsively
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Trigger when section top enters viewport more (0.3 instead of 0.45)
      if (latest > 0.3 && !isPopped) {
        setIsPopped(true);
      } else if (latest < 0.15 && isPopped) {
        // Reset when scrolling back up
        setIsPopped(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isPopped]);

  return (
    <section 
      id="divisions" 
      ref={containerRef}
      style={{ 
        padding: 0, 
        minHeight: '180vh', // Reduced height for quicker passage
        background: '#000', 
        position: 'relative',
        marginTop: '-20vh' // Pull the section up higher into the previous section's space
      }}
    >
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AnimatePresence mode="wait">
          {!isPopped ? (
            <motion.div
              key="bubble-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ 
                scale: 3, 
                opacity: 0,
                filter: 'blur(30px)',
                transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
              }}
              style={{
                display: 'flex',
                gap: '8rem',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                width: '100%'
              }}
            >
              <BubbleButton 
                title="Advisory" 
                color="#00f2ff" 
                onClick={() => setIsPopped(true)} 
              />
              <BubbleButton 
                title="Labs" 
                color="#ff00ff" 
                onClick={() => setIsPopped(true)} 
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  fontSize: '0.9rem',
                  letterSpacing: '8px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  fontWeight: 300
                }}
              >
                Scroll to Pop
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
                tagline="Strategic Arm"
                title="Advisory"
                description="Architecting board-level intelligence strategies. We bridge the gap between enterprise goals and architectural reality."
                buttonText="Explore Design"
                label="ADV"
                background="linear-gradient(180deg, #050505 0%, #001a33 100%)"
                accentColor="var(--accent-cyan)"
                onHoverStart={() => setGlobalTheme('advisory')}
                onHoverEnd={() => {}}
                isVisible={isPopped}
              />

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
                isVisible={isPopped}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Divisions;
