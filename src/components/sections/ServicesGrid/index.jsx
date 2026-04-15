import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Cpu, Users, Bot, MessageSquare, BarChart, Database, X } from 'lucide-react';

const services = [
  { 
    id: 0, 
    title: "AI Strategy", 
    icon: Zap, 
    div: "Advisory", 
    desc: "Long-term architectural roadmaps for intelligence-first enterprise transformation.",
    features: ["Operating Model Design", "Capital Allocation Strategy", "AI Value Discovery"],
    metric: { value: "40%", label: "Avg. Efficiency Gain" }
  },
  { 
    id: 1, 
    title: "Governance & Risk", 
    icon: Shield, 
    div: "Advisory", 
    desc: "Robust framework for ethical, compliant, and secure AI deployment at scale.",
    features: ["Bias Monitoring", "Security Architecture", "Regulatory Compliance"],
    metric: { value: "Zero", label: "Critical Risk Incidents" }
  },
  { 
    id: 2, 
    title: "Automation CoE", 
    icon: Cpu, 
    div: "Advisory", 
    desc: "Establishing Centers of Excellence to industrialize autonomous operations.",
    features: ["Scale Frameworks", "Standardization", "Talent Enablement"],
    metric: { value: "3x", label: "Deployment Velocity" }
  },
  { 
    id: 3, 
    title: "Leadership Enablement", 
    icon: Users, 
    div: "Advisory", 
    desc: "Upskilling stakeholders to manage and architect unified agentic systems.",
    features: ["AI Literacy Workshops", "Decision Architecture", "Cultural Change"],
    metric: { value: "100%", label: "Stakeholder Alignment" }
  },
  { 
    id: 4, 
    title: "AI Agents", 
    icon: Bot, 
    div: "Labs", 
    desc: "Developing custom autonomous agents for complex, non-linear enterprise workflows.",
    features: ["Multi-Agent Orchestration", "Dynamic Task Planning", "Self-Correction"],
    metric: { value: "24/7", label: "Autonomous Operations" }
  },
  { 
    id: 5, 
    title: "Conversational AI", 
    icon: MessageSquare, 
    div: "Labs", 
    desc: "Next-gen LLM interfaces that bridge human intent with structured system actions.",
    features: ["Intent Mapping", "RAG Integration", "Semantic Routing"],
    metric: { value: "95%", label: "Accuracy Threshold" }
  },
  { 
    id: 6, 
    title: "Process Mining", 
    icon: BarChart, 
    div: "Labs", 
    desc: "Algorithmic discovery of systemic inefficiencies to target for AI-first re-engineering.",
    features: ["Bottleneck Analysis", "Shadow Process Discovery", "Simulation"],
    metric: { value: "10x", label: "Discovery Speed" }
  },
  { 
    id: 7, 
    title: "SaaS Platforms", 
    icon: Database, 
    div: "Labs", 
    desc: "Cloud-native intelligence infrastructure powered by AIA methodologies.",
    features: ["Scalable Architecture", "API First Design", "Data Fabric"],
    metric: { value: "99.9%", label: "Uptime SLA" }
  },
];

const ServiceCard = ({ service, index, scrollYProgress, color, total }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const range = end - start;
  
  // High-impact exit animation: card shrinks and fades upward
  // Use relative offsets (e.g., 0.1 * range) to ensure they are always monotonic
  const scale = useTransform(scrollYProgress, [start, end - range * 0.1, end], [1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [start, start + range * 0.2, end - range * 0.2, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, end], [0, -100]);
  const rotate = useTransform(scrollYProgress, [start, end], [0, -2]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        rotate,
        position: 'sticky',
        top: '20vh',
        width: '100%',
        maxWidth: '900px',
        height: '65vh',
        margin: '0 auto',
        zIndex: index,
        marginBottom: '-60vh' // Overlap cards
      }}
      className="glass"
    >
      <div style={{
        padding: '60px',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '40px',
        alignItems: 'center',
        borderRadius: '32px',
        overflow: 'hidden',
        border: `1px solid ${color}33`,
        boxShadow: `0 30px 60px rgba(0,0,0,0.5), 0 0 100px ${color}11`
      }}>
        {/* Card Accent Glow */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: '40%', height: '40%',
          background: color, filter: 'blur(120px)',
          opacity: 0.1, pointerEvents: 'none'
        }} />

        <div>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color, marginBottom: '24px',
            border: `1px solid ${color}44`
          }}>
            <service.icon size={32} />
          </div>

          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color, letterSpacing: '4px', fontWeight: 800 }}>
            {service.div}
          </span>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '14px 0 20px', letterSpacing: '-1.5px', lineHeight: 1 }}>
            {service.title}
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.6, lineHeight: 1.6, marginBottom: '32px' }}>
            {service.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {service.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.8 }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '24px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ fontSize: '4.5rem', fontWeight: 900, color, marginBottom: '10px', letterSpacing: '-3px' }}>
            {service.metric.value}
          </h3>
          <p style={{ fontSize: '0.9rem', opacity: 0.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {service.metric.label}
          </p>
          
          <button className="interactive" style={{ 
            marginTop: '40px', 
            padding: '12px 24px', 
            borderRadius: '100px', 
            border: `1px solid ${color}`,
            color,
            fontSize: '0.8rem',
            fontWeight: 700
          }}>
            Case Study →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesGrid = ({ theme }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const color = typeof theme === 'string' 
    ? (theme === 'labs' ? '#ff00f2' : (theme === 'advisory' ? '#00f2ff' : '#00f2ff'))
    : (theme?.accent || '#00f2ff');

  return (
    <section 
      id="services" 
      ref={containerRef}
      style={{ 
        height: '600vh', // Significant scroll length for 8 cards
        position: 'relative',
        padding: 0
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '10vh',
        background: 'radial-gradient(circle at center, rgba(10,10,10,0) 0%, #050505 100%)',
      }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '8vh', padding: '0 5%' }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '5px', color, textTransform: 'uppercase', opacity: 0.6 }}>
            Architecture of Value
          </span>
          <h2 style={{ fontSize: 'max(3.5rem, 5vw)', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1, marginTop: '1rem' }}>
            High-Impact <br />
            <span className="gradient-text">Core Competencies</span>
          </h2>
        </motion.div>

        <div style={{ width: '100%', padding: '0 5%' }}>
          {services.map((s, index) => (
            <ServiceCard 
              key={s.id} 
              service={s} 
              index={index} 
              scrollYProgress={scrollYProgress}
              color={color}
              total={services.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
