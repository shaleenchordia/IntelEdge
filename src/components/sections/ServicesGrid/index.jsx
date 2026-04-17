import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: '01',
    title: 'AI STRATEGY & ROADMAPPING',
    desc: 'We map out a comprehensive trajectory for integrating intelligence into your core operations. From initial readiness assessments to identifying high-impact AI use cases, our strategy ensures Capital Allocation is strictly tied to measurable enterprise value rather than technological novelty.',
    location: 'Global (Remote + On-site)',
    impact: 'Accelerated Time-to-Value'
  },
  {
    id: '02',
    title: 'GOVERNANCE & RISK',
    desc: 'Establishing robust frameworks for ethical, compliant, and secure AI deployment at scale. We design guardrails that mitigate systemic biases, prevent hallucination cascades, and ensure your deployments meet evolving global regulatory standards.',
    location: 'North America / EMEA',
    impact: 'Zero Critical Risk Incidents'
  },
  {
    id: '03',
    title: 'AUTOMATION COE',
    desc: 'Building and scaling Centers of Excellence designed to industrialize autonomous operations. We help standardise toolsets, establish governance models, and train internal champions to sustain AI momentum across the entire enterprise.',
    location: 'Global Hubs',
    impact: '3x Deployment Velocity'
  },
  {
    id: '04',
    title: 'LEADERSHIP ENABLEMENT',
    desc: 'Upskilling executives and key stakeholders to manage and architect unified agentic systems. Through immersive workshops and decision architecture sprints, we shift mindsets from traditional software management to probabilistic, agent-driven operations.',
    location: 'Global',
    impact: '100% Stakeholder Alignment'
  },
  {
    id: '05',
    title: 'AUTONOMOUS AGENTS',
    desc: 'Developing custom autonomous agents for complex, non-linear enterprise workflows. Our engineered multi-agent systems coordinate seamlessly to resolve tasks that previously required human mediation, offering 24/7 reliability.',
    location: 'Inteledge Labs',
    impact: 'Scale Operational Capacity'
  }
];

const AccordionItem = ({ item, isOpen, onClick, onHover }) => {
  return (
    <div 
      style={{
        borderTop: '1px solid rgba(255,255,255,0.15)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        background: '#09090b', // Deep dark theme matching the screenshot
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      className={`accordion-item ${isOpen ? 'open' : 'closed'}`}
    >
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : '120px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'flex-start',
        }}
      >
        {/* HUGE SCALED NUMBER */}
        <div style={{
          width: '35%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          overflow: 'hidden',
          paddingTop: '20px', 
          paddingLeft: '40px'
        }}>
          <h2 style={{
            fontSize: 'clamp(10rem, 15vw, 15rem)', // massive number
            lineHeight: 0.75, // Pulls the baseline up so we can chop it
            fontFamily: "'Inter', sans-serif", // Clean sans-serif like the image
            fontWeight: 300,
            margin: 0,
            transform: 'translateY(-8px)', // Adjust so the cap height is nicely spaced from top
            color: '#fff',
            letterSpacing: '-0.06em',
            userSelect: 'none',
          }}>
            {item.id}
          </h2>
        </div>

        {/* CENTER CONTENT */}
        <div style={{
          width: '55%',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '45px',
          paddingBottom: isOpen ? '60px' : '0'
        }}>
          <h3 style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            fontWeight: 400,
            letterSpacing: '1px',
            color: '#fff',
            margin: 0,
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif",
          }}>
            {item.title}
          </h3>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
                style={{ marginTop: '2.5rem' }}
              >
                <div style={{ display: 'flex', gap: '15px' }}>
                  {/* Subtle decorative circle */}
                  <div style={{ marginTop: '5px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', background: 'transparent' }} />
                  </div>
                  
                  <div>
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.65)',
                      maxWidth: '90%',
                      margin: '0 0 2rem 0',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300
                    }}>
                      {item.desc}
                    </p>

                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 2,
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 300
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Location:</span> {item.location}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Key Impact:</span> {item.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TOGGLE ICON */}
        <div style={{
          width: '10%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '45px',
          paddingRight: '40px'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '16px',
            fontWeight: 300,
            transition: 'all 0.3s ease',
          }}
          className="toggle-icon-wrap"
          >
            {isOpen ? '−' : '+'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ServicesGrid = ({ id }) => {
  const [openIndex, setOpenIndex] = useState(0); // First one open by default

  return (
    <section 
      id={id || 'services'}
      style={{
        background: '#09090b',
        minHeight: '100vh',
        padding: '120px 0',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* Section Header */}
        <div style={{ padding: '0 40px', marginBottom: '80px' }}>
           <h2 style={{
             fontSize: '0.85rem',
             fontWeight: 600,
             letterSpacing: '3px',
             color: '#00f2ff',
             textTransform: 'uppercase',
             margin: '0 0 1rem 0'
           }}>
             Advisory & Capabilities
           </h2>
           <p style={{
             fontSize: 'clamp(2rem, 3.5vw, 3rem)',
             fontWeight: 300,
             color: '#fff',
             lineHeight: 1.2,
             margin: 0,
             maxWidth: '800px',
             fontFamily: "'Playfair Display', Georgia, serif",
           }}>
             A unified approach to intelligent architecture.
           </p>
        </div>

        {/* Accordion Container */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          {services.map((service, index) => (
            <AccordionItem 
              key={service.id} 
              item={service} 
              isOpen={openIndex === index} 
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)} 
              onHover={() => setOpenIndex(index)}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ServicesGrid;
