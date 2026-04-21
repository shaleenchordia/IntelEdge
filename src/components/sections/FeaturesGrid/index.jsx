import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, FileText, Users, Mic } from 'lucide-react';

const products = [
  {
    id: 'prospect_iq',
    name: 'Prospect IQ',
    status: 'Available (Live)',
    statusColor: '#00f2ff', // Cyan
    icon: BarChart,
    sub: 'Sales Intelligence Platform',
    points: [
      'Pipeline risk scoring',
      'Account research & prep',
      'AI-driven forecast models',
      'Revenue opportunity flags'
    ],
    cta: 'Enquiry Call',
    bgOffset: 'radial-gradient(circle at 100% 0%, rgba(0,242,255,0.1) 0%, transparent 70%)'
  },
  {
    id: 'docmind',
    name: 'DocMind',
    status: 'Available (Live)',
    statusColor: '#00f2ff',
    icon: FileText,
    sub: 'Contract Intelligence Platform',
    points: [
      'Intelligent contract review',
      'Risk & clause flagging',
      'Obligation tracking & alerts',
      'Portfolio-level analysis'
    ],
    cta: 'Enquiry Call',
    bgOffset: 'radial-gradient(circle at 100% 0%, rgba(0,242,255,0.1) 0%, transparent 70%)'
  },
  {
    id: 'talentlens',
    name: 'TalentLens',
    status: 'In Development',
    statusColor: '#fdcb6e', // Yellowish/amber
    icon: Users,
    sub: 'Talent Intelligence Platform',
    points: [
      'Intelligent candidate screening',
      'Attrition prediction',
      'Workforce analytics & planning',
      'Talent pipeline intelligence'
    ],
    cta: 'Enquiry Call',
    bgOffset: 'radial-gradient(circle at 100% 0%, rgba(253,203,110,0.08) 0%, transparent 70%)'
  },
  {
    id: 'voiceops',
    name: 'VoiceOps',
    status: 'Coming Soon',
    statusColor: '#a0a0a0', // Grey
    icon: Mic,
    sub: 'Enterprise Voice AI Platform',
    points: [
      'Customer interaction automation',
      'Internal ops voice agents',
      'Escalation intelligence',
      'Compliance monitoring'
    ],
    cta: 'Enquiry Call',
    bgOffset: 'radial-gradient(circle at 100% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)'
  }
];

const ProductsSlider = ({ id }) => {
  return (
    <section id={id || 'products'} style={{
      background: 'transparent',
      minHeight: '100vh',
      padding: 'clamp(60px, 10vw, 120px) 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Backdrops */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px',
      }} />

      {/* Header Container */}
      <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '3px',
          color: '#00f2ff',
          textTransform: 'uppercase',
          margin: '0 0 1rem 0'
        }}>
          Inteledge Labs Ecosystem
        </h2>

        {/* Pills Navigation Menu */}
        <div className="products-pills-nav" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '20px',
          maxWidth: '90vw',
          margin: '20px auto 0'
        }}>
          {products.map((p) => (
            <div
              key={`pill-${p.id}`}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.82rem',
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* INFINITE MARQUEE AREA */}
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          padding: '20px 0 100px',
          position: 'relative'
        }}
        className="marquee-container"
      >
        <style>{`
          @keyframes slideQueue {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .marquee-group {
            display: flex;
            gap: 30px;
            padding-right: 30px;
            min-width: max-content;
            flex-shrink: 0;
            animation: slideQueue 25s linear infinite;
          }
          .marquee-container:hover .marquee-group {
            animation-play-state: paused;
          }
          /* Pills: single-row swipeable on mobile */
          @media (max-width: 768px) {
            .products-pills-nav {
              flex-wrap: nowrap !important;
              justify-content: flex-start !important;
              overflow-x: auto !important;
              overflow-y: hidden !important;
              scrollbar-width: none !important;
              -webkit-overflow-scrolling: touch;
              border-radius: 50px !important;
            }
            .products-pills-nav::-webkit-scrollbar { display: none; }
          }
          /* Cards: fade edges + tighter sizing on mobile */
          @media (max-width: 768px) {
            .marquee-container {
              -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
              mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
              padding-bottom: 60px !important;
            }
            .marquee-group { gap: 20px; padding-right: 20px; }
            .product-card-wrap { width: min(300px, 78vw) !important; }
            .product-card-inner { border-radius: 24px !important; }
            .product-card-inner > div:last-child { padding: 28px !important; }
          }
          @media (max-width: 480px) {
            .product-card-wrap { width: min(270px, 76vw) !important; }
            .marquee-group { gap: 16px; padding-right: 16px; }
          }
        `}</style>

        {/* Render 4 identical groups to ensure screen is always filled seamlessly */}
        {[1, 2, 3, 4].map((groupIndex) => (
          <div key={`group-${groupIndex}`} className="marquee-group">
            {products.map((p, i) => (
              <div key={`${groupIndex}-${p.id}`}
                className="product-card-wrap"
                style={{
                  width: 'min(380px, 82vw)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Title above the card element */}
                <h4 style={{
                  textAlign: 'center',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '16px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {p.name}
                </h4>

                {/* Application Vertical Phone-style Card */}
                <div className="product-card-inner" style={{
                  background: 'linear-gradient(180deg, #111216 0%, #0A0A0C 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '32px',
                  height: '620px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  transition: 'all 0.4s ease',
                }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.8)';
                    e.currentTarget.style.borderColor = 'rgba(0,242,255,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {/* Background gradient hint */}
                  <div style={{ background: p.bgOffset, position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5 }} />

                  <div style={{ padding: '40px', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>

                    {/* Header: Icon & Live Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                      <div style={{
                        width: '56px', height: '56px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <p.icon color="#fff" size={24} />
                      </div>

                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: 'rgba(0,0,0,0.4)',
                        border: `1px solid ${p.statusColor}33`,
                      }}>
                        {p.statusColor !== '#a0a0a0' && (
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: p.statusColor }} />
                        )}
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {p.status}
                        </span>
                      </div>
                    </div>

                    {/* Typography and Titles */}
                    <div style={{ marginBottom: '35px' }}>
                      <h3 style={{ fontSize: '2.2rem', fontWeight: 600, color: '#fff', letterSpacing: '-1px', marginBottom: '10px', lineHeight: 1.1 }}>
                        {p.name}
                      </h3>
                      <p style={{ fontSize: '1rem', color: p.statusColor, fontWeight: 500, letterSpacing: '-0.3px' }}>
                        {p.sub}
                      </p>
                    </div>

                    {/* Subdued separator line */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '30px' }} />

                    {/* Highlight/Bullets point section */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                      {p.points.map((pt, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '18px',
                          fontSize: '0.95rem',
                          color: 'rgba(255,255,255,0.65)',
                          lineHeight: 1.4,
                          fontWeight: 300,
                        }}>
                          <div style={{ flexShrink: 0, opacity: 0.6, display: 'flex', alignItems: 'center' }}>
                            <svg width="5" height="5" viewBox="0 0 5 5" fill="none"><circle cx="2.5" cy="2.5" r="2.5" fill="white" /></svg>
                          </div>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {/* Bottom CTA Block */}
                    <button style={{
                      width: '100%',
                      padding: '16px 0',
                      borderRadius: '16px',
                      background: 'rgba(255,255,255,0.05)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.1)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginTop: 'auto'
                    }}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#000';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        e.currentTarget.style.color = '#fff';
                      }}
                    >
                      {p.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSlider;
