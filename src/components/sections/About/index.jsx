import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-cinematic-wrapper" id="about">
      {/* Ambient frost glow — no canvas bubbles to block text */}
      <div className="about-cinematic-bg"></div>

      <div className="about-glass-card">

        {/* Header: Mission Statement */}
        <div className="about-header-row">
          <h2 className="about-title">About Us</h2>
          <div className="about-mission-text">
            <p><strong>Applied Intelligence Architecture for Enterprise Transformation.</strong></p>
            <p style={{ marginTop: '1.2rem', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(200, 220, 255, 0.6)', lineHeight: 1.7 }}>
              We are an Applied Intelligence Architecture firm — built at the intersection of strategy, systems, and scalable execution. Our work spans AI strategy, governance, workforce enablement, and purpose-built AI products.
            </p>
            <p style={{ marginTop: '0.8rem', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(200, 220, 255, 0.6)', lineHeight: 1.7 }}>
              We help organizations move beyond AI experimentation — building strategies that are executable, solutions that are adoptable, and products built around how businesses actually operate.
            </p>
            <p style={{ marginTop: '0.8rem', fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(200, 220, 255, 0.6)', lineHeight: 1.7 }}>
              We operate through two integrated functions: Inteledge Advisory and Inteledge Labs — covering the full spectrum from strategy and governance to custom AI product development.
            </p>
          </div>
        </div>

        <div className="about-separator"></div>

        {/* Stats */}
        <div className="about-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="about-stat-item">
            <h3>14+</h3>
            <p>Years</p>
          </div>
          <div className="about-stat-item">
            <h3>7000+</h3>
            <p>Participants</p>
          </div>
          <div className="about-stat-item">
            <h3>4.75</h3>
            <p>Avg. Rating</p>
          </div>
        </div>

        <div className="about-separator"></div>

        {/* Values */}
        <div className="about-values-row">
          <div className="about-value-block">
            <h4>Our commitment to purposeful impact</h4>
            <p>
              At IntelEdge, doing good is embedded in our architecture. We're committed to making a meaningful difference for our engineers, our partners, and the communities surrounding our infrastructure through responsible model training, technology that creates equal opportunity, and a culture where diversity drives logical expansion.
            </p>
            <a href="#impact" className="about-value-link" onClick={(e) => e.preventDefault()}>Learn about our impact</a>
          </div>
          <div className="about-value-block">
            <h4>Enterprise-ready privacy and security</h4>
            <p>
              Our solutions are backed by an industry-leading Trust Center. All core logic flows are rigorously audited (ISO 27001, SOC 2 Type II) to deliver security that is just as comprehensive as the autonomy we provide. Streamline your entire pipeline lifecycle with zero-trust protocols out of the box.
            </p>
            <a href="#trust" className="about-value-link" onClick={(e) => e.preventDefault()}>Visit our Trust Center</a>
          </div>
        </div>


      </div>
    </section>
  );
};

export default About;
