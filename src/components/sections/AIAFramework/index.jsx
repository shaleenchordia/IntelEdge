import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, TrendingUp, Shield, Layers } from 'lucide-react';

const pillars = [
  {
    title: 'Strategic Intel Design',
    icon: <Target size={28} />,
    features: ['Value Mapping', 'Architectural Roadmaps', 'AI Governance'],
    color: '#00f2ff'
  },
  {
    title: 'Process Engineering',
    icon: <Cpu size={28} />,
    features: ['Workflow Discovery', 'Agentic Orchestration', 'Efficiency Audit'],
    color: '#00d2ff'
  },
  {
    title: 'Capability Enablement',
    icon: <TrendingUp size={28} />,
    features: ['Stakeholder Literacy', 'Decision Systems', 'Talent Strategy'],
    color: '#00b2ff'
  },
  {
    title: 'Risk Architecture',
    icon: <Shield size={28} />,
    features: ['Ethics Frameworks', 'Security Layers', 'Compliance Monitoring'],
    color: '#0092ff'
  },
  {
    title: 'Scalable Platforms',
    icon: <Layers size={28} />,
    features: ['Infrastructure Design', 'API-First Logic', 'Unified Data Fabric'],
    color: '#0072ff'
  }
];

const PillarCard = ({ title, icon, features, index, isLight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="interactive"
      style={{
        padding: '2.5rem',
        borderRadius: '24px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'blur(30px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.03)' : '0 20px 50px rgba(0,0,0,0.3)'
      }}
    >
      <div style={{ color: 'var(--accent-primary)', opacity: 0.9 }}>
        {icon}
      </div>
      <h3 style={{ 
        fontSize: '1.4rem', 
        fontWeight: 850, 
        color: 'var(--text-primary)', 
        letterSpacing: '-0.5px' 
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {features.map((feat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, color: 'var(--text-primary)' }}>
              {feat}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const AIAFramework = ({ isLight }) => {
  return (
    <section 
      id="services"
      style={{ 
        padding: '100px 10%', 
        background: 'var(--bg-color)', 
        position: 'relative', 
        zIndex: 10 
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '5vh' }}>
        <motion.span style={{ 
          color: 'var(--accent-primary)', 
          letterSpacing: '6px', 
          fontWeight: 900, 
          textTransform: 'uppercase', 
          fontSize: '0.7rem' 
        }}>
          Strategic Blueprint
        </motion.span>
        <h2 style={{ 
          fontSize: 'max(3rem, 5vw)', 
          fontWeight: 800, 
          letterSpacing: '-2px', 
          lineHeight: 1, 
          marginTop: '0.8rem', 
          color: 'var(--text-primary)' 
        }}>
          The <span className="gradient-text">AIA Framework</span>
        </h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto' 
      }}>
        {pillars.map((pillar, i) => (
          <PillarCard key={i} {...pillar} index={i} isLight={isLight} />
        ))}
      </div>
    </section>
  );
};

export default AIAFramework;
