import React, { useState } from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Loader2, CheckCircle } from 'lucide-react';
import API_BASE_URL from '../../../config/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    organisation: '',
    role: '',
    primaryInterest: '',
    context: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again later.');
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        organisation: '',
        role: '',
        interest: '',
        context: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message === 'Failed to fetch' 
        ? 'Cannot connect to server. Please check your internet or retry later.' 
        : err.message
      );
    }
  };

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
            <a 
              href="mailto:anuragupadhyay@inteledge.co.in" 
              className="contact-method-pill"
              style={{ textDecoration: 'none' }}
            >
              <div className="cmp-icon-wrapper"><Mail size={20} /></div>
              <div className="cmp-text">
                <h4>Email</h4>
                <p>anuragupadhyay@inteledge.co.in</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </a>


            {/* LinkedIn Pill */}
            <a 
              href="https://www.linkedin.com/company/inteledge-advisory-labs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-method-pill"
              style={{ textDecoration: 'none' }}
            >
              <div className="cmp-icon-wrapper"><ArrowUpRight size={20} /></div>
              <div className="cmp-text">
                <h4>LinkedIn</h4>
                <p>IntelEdge Advisory & Labs</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </a>

            {/* Instagram Pill */}
            <a 
              href="https://www.instagram.com/inteledge.ai?igsh=dzVvbndtOXdnOHQ=" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-method-pill"
              style={{ textDecoration: 'none' }}
            >
              <div className="cmp-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <div className="cmp-text">
                <h4>Instagram</h4>
                <p>@inteledge.ai</p>
              </div>
              <div className="cmp-arrow"><ArrowUpRight size={18} /></div>
            </a>
          </div>
        </div>

        {/* Right Side: Form Block */}
        <div className="contact-right">
          {status === 'success' ? (
            <div className="contact-success-glass">
              <CheckCircle size={64} className="success-icon" />
              <h3>Message Sent!</h3>
              <p>We've received your enquiry and will get back to you within one business day.</p>
              <button 
                className="form-submit-btn" 
                onClick={() => setStatus('idle')}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form-glass" onSubmit={handleSubmit}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    placeholder="Your first name" 
                    required 
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Your last name" 
                    required 
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Business Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="you@company.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Organisation</label>
                  <input 
                    type="text" 
                    name="organisation" 
                    placeholder="Company name" 
                    required 
                    value={formData.organisation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Role</label>
                  <select 
                    name="role" 
                    required 
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>CEO / COO / CXO</option>
                    <option value="ceo">CEO / COO / CXO</option>
                    <option value="vp">VP / Director</option>
                    <option value="ic">Engineer / Developer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Primary Interest</label>
                  <select 
                    name="primaryInterest" 
                    required 
                    value={formData.primaryInterest}
                    onChange={handleChange}
                  >
                    <option value="" disabled>AI Strategy & Advisory</option>
                    <option value="strategy">AI Strategy & Advisory</option>
                    <option value="dev">Custom AI Development</option>
                    <option value="auto">Process Automation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Brief Context <span>(optional)</span></label>
                <textarea 
                  name="context" 
                  placeholder="What are you trying to solve? A few sentences helps us prepare for a more focused conversation."
                  value={formData.context}
                  onChange={handleChange}
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="error-message">{errorMessage}</p>
              )}

              <button type="submit" className="form-submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />
                    Processing...
                  </>
                ) : (
                  'Book Enquiry Call'
                )}
              </button>
              <p className="form-disclaimer">We respond to all enquiries within one business day.</p>
            </form>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
