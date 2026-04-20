import React from 'react';
import { Target, Cpu, TrendingUp, Shield, Layers, Bot } from 'lucide-react';
import './HoverServices.css';

const servicesData = [
  {
    title: 'Strategic Intel Design',
    subtitle: 'Value Mapping & Roadmaps',
    icon: <Target size={36} />,
    desc: 'Long-term architectural roadmaps for intelligence-first enterprise transformation.',
    features: ['Value Mapping', 'Architectural Roadmaps', 'AI Governance'],
  },
  {
    title: 'Process Engineering',
    subtitle: 'Systemic Optimization',
    icon: <Cpu size={36} />,
    desc: 'Algorithmic discovery of systemic inefficiencies to target for AI-first re-engineering.',
    features: ['Workflow Discovery', 'Agentic Orchestration', 'Efficiency Audit'],
  },
  {
    title: 'Capability Enablement',
    subtitle: 'Talent & Decision Systems',
    icon: <TrendingUp size={36} />,
    desc: 'Establishing frameworks and upskilling stakeholders to manage unified agentic systems.',
    features: ['Stakeholder Literacy', 'Decision Systems', 'Talent Strategy'],
  },
  {
    title: 'Risk Architecture',
    subtitle: 'Compliance & Security',
    icon: <Shield size={36} />,
    desc: 'Robust framework for ethical, compliant, and secure AI deployment at scale.',
    features: ['Ethics Frameworks', 'Security Layers', 'Compliance Monitoring'],
  },
  {
    title: 'Scalable Platforms',
    subtitle: 'Cloud-Native Infrastructure',
    icon: <Layers size={36} />,
    desc: 'Cloud-native intelligence infrastructure powered by our proprietary methodologies.',
    features: ['Infrastructure Design', 'API-First Logic', 'Unified Data Fabric'],
  },
  {
    title: 'Autonomous Agents',
    subtitle: 'Custom Agentic Orchestration',
    icon: <Bot size={36} />,
    desc: 'Developing custom autonomous agents for complex, non-linear enterprise workflows.',
    features: ['Multi-Agent Logic', 'Dynamic Planning', 'Self-Correction'],
  }
];

const HoverServices = ({ theme }) => {
  return (
    <section className="hover-services-section" id="services">
      <div className="hs-header">
        <span style={{ color: 'var(--accent-primary)', letterSpacing: '6px', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Consulting Services
        </span>
        <h2 style={{ fontSize: 'max(3.5rem, 5vw)', fontWeight: 800, letterSpacing: '-2px', marginTop: '1rem', color: '#fff', lineHeight: 1 }}>
          Systemic <span className="gradient-text">Enablement</span>
        </h2>
      </div>

      <div className="hs-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="hs-card">
            <div className="hs-icon-wrapper">
              {service.icon}
            </div>
            
            <h3 className="hs-title">{service.title}</h3>
            <span className="hs-base-subtitle">{service.subtitle}</span>

            <div className="hs-desc-container">
              <p className="hs-desc">{service.desc}</p>
              <div className="hs-features">
                {service.features.map((feat, i) => (
                  <div key={i} className="hs-feature-item">
                    <div className="hs-feature-dot" />
                    <span className="hs-feature-text">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverServices;
