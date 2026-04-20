import React, { useState, useEffect, useCallback } from "react"
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    quote: "Anurag didn’t just deliver a workshop—he helped us rethink how we approach AI-led transformation at scale. The clarity on aligning automation, analytics, and business outcomes was exceptional. Our entire team walked away with a clear roadmap, not just concepts.",
    author: "Innaci Dass",
    role: "Chief Human Resource Officer, RIDA Group",
  },
  {
    id: 2,
    quote: "What stood out was the ability to translate complex AI concepts into practical, deployable strategies. The sessions were deeply relevant to our business context, and we’ve already started identifying automation and AI use cases across operations.",
    author: "Neha Kapoor",
    role: "VP – Strategy & Innovation, Axis Bank",
  },
  {
    id: 3,
    quote: "Anurag brings a rare combination of strategic thinking and hands-on execution. He helped us bridge the gap between leadership vision and on-ground implementation of AI and automation initiatives.",
    author: "Purnima Parashar",
    role: "Head – Talent and Leadership, Siemens",
  },
  {
    id: 4,
    quote: "The engagement was one of the most impactful learning experiences for our executive cohort. The blend of real-world case studies, frameworks, and hands-on exposure to AI tools made it immediately applicable.",
    author: "Prof. Shalini Verma",
    role: "Program Director, IIM Sambalpur",
  },
  {
    id: 5,
    quote: "We were able to move from ‘AI curiosity’ to actually building working solutions within days. The structured approach and practical frameworks provided by Anurag significantly accelerated our innovation cycle.",
    author: "Anurag Maheshwari",
    role: "Head, Learning and Development, TATA AIA",
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
    <section className="testimonials-section" id="testimonials">
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
                  <div
                    className={`testimonial-name-container ${showName ? "show" : ""}`}
                  >
                    <div className="testimonial-name-overflow">
                      <span className="testimonial-name">
                        {testimonial.author}
                      </span>
                    </div>
                  </div>
                  {!showName && <div className="testimonial-dot" />}
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
