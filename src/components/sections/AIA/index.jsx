import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IndiaPresenceGlobe from './IndiaPresenceGlobe';

const pillars = [
  { id: 1, title: "Strategic Intelligence Design", description: "Aligning AI outcomes with business architecture and long-term value creation.", color: "#00f2ff" },
  { id: 2, title: "Process & Automation Engineering", description: "Re-engineering workflows for high-autonomy intelligent systems.", color: "#00d2ff" },
  { id: 3, title: "Capability & Leadership Enablement", description: "Upskilling leadership to manage and scale intelligence-first organizations.", color: "#00b2ff" },
  { id: 4, title: "Governance & Risk Architecture", description: "Trust, ethics, and robust compliance for enterprise-grade AI deployment.", color: "#0092ff" },
  { id: 5, title: "Scalable Intelligence Platforms", description: "The underlying infrastructure that powers unified agentic systems.", color: "#0072ff" }
];

const AIAFramework = ({ theme }) => {
  const [activeNode, setActiveNode] = useState(null);
  return (
    <section id="about-us" style={{ alignItems: 'center', textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h2 style={{ fontSize: '4.5rem', fontWeight: 800, letterSpacing: '-4px', marginBottom: '1rem', lineHeight: 1 }}><span className="gradient-text">Applied Intelligence <br/> Architecture</span></h2>
        <p style={{ opacity: 0.5, maxWidth: '700px', margin: '0 auto 5rem auto', fontSize: '1.2rem', letterSpacing: '1px' }}>OUR PROPRIETARY BLUEPRINT FOR TRANSITIONING TO AN INTELLIGENCE-FIRST ENTERPRISE.</p>
      </motion.div>
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '600px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '130px', height: '130px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 80px var(--accent-glow)' }}>
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: `2px solid var(--accent-primary)` }}
          />
          <motion.div 
            animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', inset: -40, borderRadius: '50%', border: `1px dashed var(--accent-primary)` }}
          />
          <span style={{ color: '#000', fontWeight: 900, fontSize: '1.4rem' }}>AIA</span>
        </div>
        {pillars.map((pillar, index) => {
          const angle = (index * (360 / pillars.length) - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 230;
          const y = Math.sin(angle) * 230;
          const isActive = activeNode === pillar.id;

          return (
            <React.Fragment key={pillar.id}>
              {/* Connection Line with pulsing active state */}
              <motion.div 
                initial={{ width: 0 }} 
                whileInView={{ width: '230px' }} 
                style={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  height: isActive ? '2px' : '1px', 
                  background: isActive ? pillar.color : 'rgba(255, 255, 255, 0.1)', 
                  transformOrigin: 'left center', 
                  transform: `translate(0, -50%) rotate(${index * (360 / pillars.length) - 90}deg)`, 
                  zIndex: 0,
                  boxShadow: isActive ? `0 0 15px ${pillar.color}` : 'none'
                }} 
              />
              <motion.div className="interactive glass" onClick={() => setActiveNode(activeNode === pillar.id ? null : pillar.id)} style={{ position: 'absolute', top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)`, transform: 'translate(-50%, -50%)', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11, cursor: 'none', border: activeNode === pillar.id ? `2px solid ${pillar.color}` : '1px solid rgba(255, 255, 255, 0.1)', boxShadow: activeNode === pillar.id ? `0 0 40px ${pillar.color}55` : 'none' }} whileHover={{ scale: 1.15 }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700 }}>{pillar.id}</span>
              </motion.div>
              <AnimatePresence>
                {activeNode === pillar.id && (
                  <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} style={{ position: 'absolute', top: `calc(50% + ${y}px - 160px)`, left: `calc(50% + ${x}px - 120px)`, width: '240px', padding: '24px', borderRadius: '20px', background: 'rgba(5, 5, 5, 0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)', zIndex: 20, textAlign: 'left' }}>
                    <h4 style={{ color: pillar.color, fontSize: '1rem', marginBottom: '10px', fontWeight: 800 }}>{pillar.title}</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: 1.5 }}>{pillar.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </div>
      
      {/* India Presence Globe Section */}
      <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', alignItems: 'center', textAlign: 'left', width: '100%', maxWidth: '1200px', margin: '5rem auto 0 auto' }}>
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Our Presence in <span style={{ color: 'var(--accent-primary)' }}>India</span>
          </h3>
          <p style={{ opacity: 0.6, fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Operating at the intersection of local expertise and global intelligence standards. We are physically present across India's largest tech hubs to architect systemic change.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {['Delhi (NCR)', 'Mumbai', 'Bengaluru', 'Pune'].map((city, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                <span style={{ fontWeight: 600, opacity: 0.8 }}>{city}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: '620px', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <IndiaPresenceGlobe theme={theme} />
        </div>
      </div>
    </section>
  );
};

export default AIAFramework;
