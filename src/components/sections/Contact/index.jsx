import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      {/* Background radial gradient based on Photo 1 (Green/Cyan tint) */}
      <div className="contact-glow"></div>
      
      {/* Backplate Watermark */}
      <div className="contact-watermark">CONTACT</div>

      <div className="contact-container">
        
        {/* Left Side: Info */}
        <div className="contact-left">
          <button className="contact-badge">
            <span className="contact-badge-icon">
              <Mail size={12} fill="currentColor" />
            </span>
            Contact
          </button>
          
          <h2 className="contact-heading">Get in touch</h2>
          <p className="contact-subheading">
            Have questions or ready to transform your business with AI automation?
          </p>

          <div className="contact-methods">
            {/* Email Pill */}
            <div className="contact-method-pill">
              <div className="cmp-icon-wrapper"><Mail size={20} /></div>
              <div className="cmp-text">
                <h4>Email</h4>
                <p>hello@inteledge.com</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </div>

            {/* Labs Pill */}
            <div className="contact-method-pill">
              <div className="cmp-icon-wrapper"><Mail size={20} /></div>
              <div className="cmp-text">
                <h4>Labs</h4>
                <p>labs@inteledge.com</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </div>

            {/* Partnerships Pill */}
            <div className="contact-method-pill">
              <div className="cmp-icon-wrapper"><Mail size={20} /></div>
              <div className="cmp-text">
                <h4>Partnerships</h4>
                <p>partners@inteledge.com</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </div>

            {/* LinkedIn Pill */}
            <div className="contact-method-pill">
              <div className="cmp-icon-wrapper"><ArrowUpRight size={20} /></div>
              <div className="cmp-text">
                <h4>LinkedIn</h4>
                <p>Inteledge Advisory & Labs</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Block */}
        <div className="contact-right">
          <form className="contact-form-glass" onSubmit={(e) => e.preventDefault()}>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="Your first name" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Your last name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Business Email</label>
                <input type="email" placeholder="you@company.com" />
              </div>
              <div className="form-group">
                <label>Organisation</label>
                <input type="text" placeholder="Company name" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Your Role</label>
                <select defaultValue="">
                  <option value="" disabled hidden>CEO / COO / CXO</option>
                  <option value="ceo">CEO / COO / CXO</option>
                  <option value="vp">VP / Director</option>
                  <option value="ic">Engineer / Developer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Primary Interest</label>
                <select defaultValue="">
                  <option value="" disabled hidden>AI Strategy & Advisory</option>
                  <option value="strategy">AI Strategy & Advisory</option>
                  <option value="dev">Custom AI Development</option>
                  <option value="auto">Process Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Brief Context <span>(optional)</span></label>
              <textarea placeholder="What are you trying to solve? A few sentences helps us prepare for a more focused conversation."></textarea>
            </div>

            <button type="submit" className="form-submit-btn">
              Book Enquiry Call
            </button>
            <p className="form-disclaimer">We respond to all enquiries within one business day.</p>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
