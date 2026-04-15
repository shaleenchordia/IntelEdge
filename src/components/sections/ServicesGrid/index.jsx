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

const ServiceCard = ({ service, index, scrollYProgress, color, total, isLight }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const range = end - start;
  
  const scale = useTransform(scrollYProgress, [start, end - range * 0.1, end], [1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [start, start + range * 0.2, end - range * 0.2, end], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [start, end], [0, -80]);
  const rotate = useTransform(scrollYProgress, [start, end], [0, -1]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        rotate,
        position: 'sticky',
        top: '22vh',
        width: '100%',
        maxWidth: '850px',
        height: '60vh',
        margin: '0 auto',
        zIndex: index,
        marginBottom: '-55vh'
      }}
    >
      <div style={{
        padding: '50px',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '30px',
        alignItems: 'center',
        borderRadius: '28px',
        overflow: 'hidden',
        background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'var(--glass-bg)',
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: isLight ? '0 15px 40px rgba(0,0,0,0.04)' : `0 30px 60px rgba(0,0,0,0.5)`,
        backdropFilter: 'blur(40px)'
      }}>
        <div style={{
          position: 'absolute', top: '-10%', right: '-10%',
          width: '50%', height: '50%',
          background: color, filter: 'blur(100px)',
          opacity: 0.08, pointerEvents: 'none'
        }} />

        <div>
          <div style={{
            width: '50px', height: '50px', borderRadius: '12px',
            background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color, marginBottom: '20px',
            border: `1px solid ${color}33`
          }}>
            <service.icon size={28} />
          </div>

          <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color, letterSpacing: '3px', fontWeight: 800 }}>
            {service.div}
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '12px 0 16px', letterSpacing: '-1.2px', lineHeight: 1, color: 'var(--text-primary)' }}>
            {service.title}
          </h2>
          <p style={{ fontSize: '1rem', opacity: 0.6, lineHeight: 1.5, marginBottom: '24px', color: 'var(--text-primary)' }}>
            {service.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            {service.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: color }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, color: 'var(--text-primary)' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center',
          border: `1px solid ${isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)'}`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ fontSize: '3.8rem', fontWeight: 900, color, marginBottom: '8px', letterSpacing: '-2px' }}>
            {service.metric.value}
          </h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            {service.metric.label}
          </p>
          
          <button className="interactive" style={{ 
            marginTop: '30px', 
            padding: '10px 20px', 
            borderRadius: '100px', 
            border: `1px solid ${color}`,
            color,
            fontSize: '0.75rem',
            fontWeight: 700,
            background: 'transparent'
          }}>
            Case Study →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesGrid = ({ theme, isLight }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const color = !isLight 
    ? (theme === 'labs' ? '#ff00f2' : (theme === 'advisory' ? '#00f2ff' : '#00f2ff'))
    : (theme === 'labs' ? '#d400d4' : '#0072ff');

  return (
    <section 
      id="services-grid" 
      ref={containerRef}
      style={{ 
        height: `${services.length * 75}vh`,
        position: 'relative',
        padding: 0,
        background: 'var(--bg-color)'
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '8vh',
        background: 'var(--bg-color)',
      }}>
        <motion.div
          style={{ textAlign: 'center', marginBottom: '6vh', padding: '0 5%' }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '4px', color, textTransform: 'uppercase', opacity: 0.6 }}>
            Architecture of Value
          </span>
          <h2 style={{ fontSize: 'max(3rem, 5vw)', fontWeight: 800, letterSpacing: '-2px', lineHeight: 1, marginTop: '0.8rem', color: 'var(--text-primary)' }}>
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
              isLight={isLight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
