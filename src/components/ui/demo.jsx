import { useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function ShaderBackdrop({ speed = 0.8, className = "", style = {} }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, ...style }}>
      <MeshGradient
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        colors={["#000000", "#0a0a0a", "#1a1a1a", "#111111"]}
        speed={speed}
        backgroundColor="#000000"
      />

      {/* Subtle lighting overlay effects */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '33%',
            width: '128px',
            height: '128px',
            background: 'rgba(0, 242, 255, 0.03)',
            borderRadius: '50%',
            filter: 'blur(48px)',
            animation: `pulse ${3 / speed}s ease-in-out infinite`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '33%',
            right: '25%',
            width: '96px',
            height: '96px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '50%',
            filter: 'blur(32px)',
            animation: `pulse ${2 / speed}s ease-in-out infinite`,
            animationDelay: '1s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '33%',
            width: '80px',
            height: '80px',
            background: 'rgba(0, 242, 255, 0.02)',
            borderRadius: '50%',
            filter: 'blur(24px)',
            animation: `pulse ${4 / speed}s ease-in-out infinite`,
            animationDelay: '0.5s',
          }}
        />
      </div>
    </div>
  )
}
