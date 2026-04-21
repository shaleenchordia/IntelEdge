import React from 'react';
import { CircleDollarSign, Compass, Puzzle } from 'lucide-react';
import './GapsSection.css';

const GapsSection = () => {
  return (
    <section className="gaps-section-wrapper" id="gaps">
      <div className="gaps-glass-container">
        
        <div className="gaps-header">
          <div className="gaps-eyebrow">
            <span className="eyebrow-line"></span>
            DOES THIS SOUND FAMILIAR?
          </div>
          <h2 className="gaps-title">The Gaps We Are Built to Close</h2>
          <p className="gaps-subtitle">
            Three persistent pain points driving enterprise AI underperformance — and how 
            <br className="gaps-br" /> Inteledge addresses each one.
          </p>
        </div>

        <div className="gaps-cards-grid">
          
          {/* Card 1 */}
          <div className="gaps-card">
            <div className="gaps-card-icon-wrapper">
              <CircleDollarSign size={28} color="#cda869" strokeWidth={1.5} />
            </div>
            <h3 className="gaps-card-title">AI Spend Without Visible Return</h3>
            <p className="gaps-card-desc">
              Investing in tools and pilots without a framework connecting spend to business metrics. ROI is assumed, not measured.
            </p>
            <div className="gaps-card-divider"></div>
            <div className="gaps-card-solution">
              <span className="gaps-check">✓</span>
              <p>We connect every AI initiative to a specific metric: time saved, cost reduced, decisions improved.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="gaps-card">
            <div className="gaps-card-icon-wrapper">
              <Compass size={28} color="#cda869" strokeWidth={1.5} />
            </div>
            <h3 className="gaps-card-title">No Enterprise-Wide AI Strategy</h3>
            <p className="gaps-card-desc">
              AI adoption happens department by department. The result: duplication, silos, vendor dependency — no governance, no alignment.
            </p>
            <div className="gaps-card-divider"></div>
            <div className="gaps-card-solution">
              <span className="gaps-check">✓</span>
              <p>We build AI strategies tied to business goals — not technology trends — with governance that scales.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="gaps-card">
            <div className="gaps-card-icon-wrapper">
              <Puzzle size={28} color="#cda869" strokeWidth={1.5} />
            </div>
            <h3 className="gaps-card-title">Internal Capability Gap</h3>
            <p className="gaps-card-desc">
              Most organizations lack in-house expertise to evaluate, implement, or govern AI. They depend on vendors with a commercial agenda.
            </p>
            <div className="gaps-card-divider"></div>
            <div className="gaps-card-solution">
              <span className="gaps-check">✓</span>
              <p>We act as an independent advisory layer — vendor-neutral, focused on building capability, not dependency.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GapsSection;
