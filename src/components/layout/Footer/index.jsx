import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { ShaderCanvas } from '../../ui/aether-flow';

/* ── Brand icons ── */
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

/* ── Reusable sub-components ── */
const Panel = ({ children, style }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '24px',
    padding: '48px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '380px',
    ...style,
  }}>
    {children}
  </div>
);

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    aria-label={label}
    style={{
      width: 48, height: 48,
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color:'#fff', textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {children}
  </a>
);

const CollabLink = ({ href, children }) => (
  <a
    href={href || '#'}
    style={{
      fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)',
      textDecoration: 'none', display: 'flex', alignItems: 'center',
      gap: '8px', transition: 'all 0.25s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
      e.currentTarget.style.transform = 'translateX(6px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
      e.currentTarget.style.transform = 'translateX(0)';
    }}
  >
    <span style={{
      display:'inline-block', width:4, height:4, borderRadius:'50%',
      background:'var(--accent-primary,#00f2ff)',
      opacity: 0, transition: 'opacity 0.25s',
    }} />
    {children}
  </a>
);

const LinkCol = ({ title, items }) => (
  <div>
    <h5 style={{
      fontSize:'0.75rem', fontWeight:700, letterSpacing:'2px',
      textTransform:'uppercase', color:'#fff', marginBottom:'1.2rem',
    }}>{title}</h5>
    <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
      {items.map(item => (
        <li
          key={item}
          style={{ fontSize:'0.85rem', color:'rgba(255,255,255,0.45)', cursor:'pointer', transition:'color 0.25s, transform 0.25s' }}
          onMouseEnter={e => { e.currentTarget.style.color='rgba(255,255,255,0.85)'; e.currentTarget.style.transform='translateX(4px)'; }}
          onMouseLeave={e => { e.currentTarget.style.color='rgba(255,255,255,0.45)'; e.currentTarget.style.transform='translateX(0)'; }}
        >{item}</li>
      ))}
    </ul>
  </div>
);

/* ── Main Footer ── */
const Footer = () => (
  <footer style={{ position:'relative', padding:0, overflow:'hidden', background:'#000', minHeight:'auto' }}>

    {/* Top edge glow */}
    <div style={{
      position:'absolute', top:0, left:0, right:0, height:'1px', zIndex:3,
      background:'linear-gradient(90deg, transparent, var(--accent-primary,#00f2ff) 20%, var(--accent-primary,#00f2ff) 50%, transparent 80%)',
      opacity:0.3,
    }} />

    {/* WebGL shader backdrop */}
    <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.7 }}>
      <ShaderCanvas hue={190} speed={0.08} intensity={0.45} complexity={6.0} warp={0.25} />
    </div>

    {/* Content */}
    <div style={{ position:'relative', zIndex:2, padding:'80px 5% 40px' }}>

      {/* Two-panel grid */}
      <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:'2rem', marginBottom:60 }}>

        {/* ── Left panel ── */}
        <Panel>
          {/* Header row */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:48 }}>
            <h3 style={{
              fontFamily:"'Inter',system-ui,sans-serif", fontSize:'2.2rem',
              fontWeight:800, lineHeight:1.15, letterSpacing:'-1px', color:'#fff', maxWidth:300,
            }}>
              Before you go,<br />check out these links
            </h3>
            <a
              href="#contact"
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                padding:'12px 24px', borderRadius:'100px',
                background:'var(--accent-primary,#00f2ff)', color:'#000',
                fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.3px',
                textDecoration:'none', whiteSpace:'nowrap', border:'none',
                transition:'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,242,255,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
            >
              See you at IntelEdge!
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Link columns */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2rem' }}>
            <LinkCol title="Division"  items={['Advisory','Labs','Research']} />
            <LinkCol title="Company"   items={['About Us','Careers','Press']} />
            <LinkCol title="Resources" items={['Privacy Policy','Terms of Service','Documentation']} />
          </div>
        </Panel>

        {/* ── Right panel ── */}
        <Panel>
          <div>
            <h3 style={{
              fontFamily:"'Inter',system-ui,sans-serif", fontSize:'2.2rem',
              fontWeight:800, lineHeight:1.15, letterSpacing:'-1px', color:'#fff', marginBottom:24,
            }}>
              Let's work<br />together
            </h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
              <CollabLink href="#contact">Book a strategy session</CollabLink>
              <CollabLink href="#contact">Partner with us</CollabLink>
              <CollabLink href="#contact">Join the team</CollabLink>
              <CollabLink href="mailto:hello@inteledge.com">hello@inteledge.com</CollabLink>
            </div>
          </div>

          {/* Social row */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <SocialIcon href="#" label="Twitter / X"><TwitterIcon /></SocialIcon>
            <SocialIcon href="#" label="LinkedIn"><LinkedInIcon /></SocialIcon>
            <SocialIcon href="#" label="Instagram"><InstagramIcon /></SocialIcon>
            <SocialIcon href="mailto:hello@inteledge.com" label="Email"><Mail size={18} /></SocialIcon>

            {/* Follow tag */}
            <span style={{
              marginLeft:8, padding:'6px 14px', borderRadius:'100px',
              background:'var(--accent-primary,#00f2ff)', color:'#000',
              fontSize:'0.7rem', fontWeight:800, letterSpacing:'0.5px',
              textTransform:'uppercase', position:'relative',
            }}>
              Follow us
            </span>
          </div>
        </Panel>
      </div>

      {/* Bottom bar */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        paddingTop:24, borderTop:'1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.5px' }}>
          © 2026 Inteledge Advisory &amp; Labs. All rights reserved.
        </span>
        <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.25)', letterSpacing:'0.5px' }}>
          Built by <span style={{ fontWeight:700, color:'rgba(255,255,255,0.4)' }}>INTELEDGE</span>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
