import React, { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'

import anuragImg from '../../../assets/anura.jpeg'
import sahilImg from '../../../assets/sahil.jpeg'
import saranshImg from '../../../assets/saransh.jpeg'

const testimonials = [
  {
    id: 1,
    quote: "Inteledge didn't just automate our workflows; they fundamentally architected a new way for our entire enterprise to operate securely at scale.",
    author: "Anurag Upadhyay",
    role: "CEO, Inteledge",
    avatar: anuragImg,
  },
  {
    id: 2,
    quote: "Their approach to governance and risk in the generative space is simply brilliant. We deployed our internal LLM without a single compliance breach.",
    author: "Sahil Bhardwaj",
    role: "CTO, Inteledge",
    avatar: sahilImg,
  },
  {
    id: 3,
    quote: "The attention to detail and pure engineering horsepower behind the Prospect IQ platform changed our sales forecasting forever.",
    author: "Saaransh",
    role: "CMO, Inteledge",
    avatar: saranshImg,
  },
]

export default function Testimonials({ id }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleSelect = (index) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }

  return (
    <section id={id || 'testimonials'} style={{
      background: '#020202', // Slightly darker than the product section
      borderTop: '1px solid rgba(255,255,255,0.05)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '120px 0'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>

        {/* Quote Container */}
        <div style={{ position: 'relative', padding: '0 32px' }}>
          <span style={{
            position: 'absolute',
            left: '-20px',
            top: '-40px',
            fontSize: '8rem',
            fontFamily: "'Playfair Display', serif",
            color: 'rgba(255,255,255,0.04)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1
          }}>
            "
          </span>

          <p style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            fontWeight: 300,
            color: '#fff',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            transition: 'all 0.4s ease-out',
            opacity: isAnimating ? 0 : 1,
            filter: isAnimating ? 'blur(4px)' : 'none',
            transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
            fontFamily: "'Playfair Display', Georgia, serif"
          }}>
            {displayedQuote}
          </p>

          <span style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-70px',
            fontSize: '8rem',
            fontFamily: "'Playfair Display', serif",
            color: 'rgba(255,255,255,0.04)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1
          }}>
            "
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '40px' }}>
          {/* Role text */}
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            transition: 'all 0.5s ease-out',
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
            fontFamily: "'Inter', sans-serif"
          }}>
            {displayedRole}
          </p>

          {/* Avatar Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            {testimonials.map((testimonial, index) => {
              const isActive = activeIndex === index
              const isHovered = hoveredIndex === index && !isActive
              const showName = isActive || isHovered

              return (
                <button
                  key={testimonial.id}
                  onClick={() => handleSelect(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0,
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive ? '#fff' : (isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'),
                    boxShadow: isActive ? '0 10px 15px -3px rgba(0, 0, 0, 0.2)' : 'none',
                    padding: showName ? '8px 20px 8px 8px' : '6px',
                    border: '1px solid',
                    borderColor: isActive ? '#fff' : (isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'),
                  }}
                >
                  {/* Avatar wrapper */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9999px',
                        objectFit: 'cover',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isActive ? '0 0 0 2px #020202' : 'none', // Ring matches bg to look separated
                        transform: !isActive && isHovered ? 'scale(1.1)' : 'scale(1)',
                        filter: isActive ? 'grayscale(0%)' : 'grayscale(80%)',
                      }}
                    />
                  </div>

                  {/* Name expansion */}
                  <div style={{
                    display: 'grid',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    gridTemplateColumns: showName ? '1fr' : '0fr',
                    opacity: showName ? 1 : 0,
                    marginLeft: showName ? '12px' : '0',
                  }}>
                    <div style={{ overflow: 'hidden' }}>
                      <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        display: 'block',
                        transition: 'color 0.3s',
                        color: isActive ? '#000' : '#fff',
                        fontFamily: "'Inter', sans-serif"
                      }}>
                        {testimonial.author}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
