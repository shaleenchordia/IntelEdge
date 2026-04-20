import React, { useState, useEffect, useCallback } from "react"
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    quote: "This changed everything for me.",
    author: "Sarah Chen",
    role: "Designer at Figma",
    avatar: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 2,
    quote: "Simply brilliant. Nothing else compares.",
    author: "Marcus Johnson",
    role: "Engineer at Vercel",
    avatar: "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: 3,
    quote: "The attention to detail is unmatched.",
    author: "Elena Rodriguez",
    role: "Founder at Craft",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote)
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const handleSelect = useCallback((index) => {
    if (index === activeIndex || isAnimating) return
    setIsAnimating(true)

    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote)
      setDisplayedRole(testimonials[index].role)
      setActiveIndex(index)
      setTimeout(() => setIsAnimating(false), 400)
    }, 200)
  }, [activeIndex, isAnimating])

  // Auto-rotating timer
  useEffect(() => {
    // If we are hovering any button, we can safely pause rotation (optional polish), 
    // but the prompt strictly asks for auto rotating.
    const timer = setInterval(() => {
      handleSelect((activeIndex + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [activeIndex, handleSelect])

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Quote Container */}
        <div className="testimonial-quote-container">
          <span className="quote-mark left">"</span>

          <p
            className={`testimonial-quote ${isAnimating ? "animating" : ""}`}
          >
            {displayedQuote}
          </p>

          <span className="quote-mark right">"</span>
        </div>

        <div className="testimonial-footer-wrap">
          {/* Role text */}
          <p
            className={`testimonial-role ${isAnimating ? "animating" : ""}`}
          >
            {displayedRole}
          </p>

          <div className="testimonial-controls">
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
                  className={`testimonial-btn ${isActive ? "active" : ""} ${showName ? "show-name" : ""}`}
                >
                  {/* Avatar with smooth ring animation */}
                  <div className="testimonial-avatar-wrapper">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="testimonial-avatar"
                    />
                  </div>

                  <div
                    className={`testimonial-name-container ${showName ? "show" : ""}`}
                  >
                    <div className="testimonial-name-overflow">
                      <span className="testimonial-name">
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

export default Testimonials;
