import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// ─── Custom Hook ───────────────────────────────────────────────────────────────
const useShaderAnimation = (mountRef, shaderProps) => {
  const threeRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Core setup
    const scene    = new THREE.Scene();
    const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const uniforms = {
      u_time:       { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      u_mouse:      { value: new THREE.Vector2(mount.clientWidth * 0.5, mount.clientHeight * 0.5) },
      u_hue:        { value: shaderProps.hue },
      u_speed:      { value: shaderProps.speed },
      u_intensity:  { value: shaderProps.intensity },
      u_complexity: { value: shaderProps.complexity },
      u_warp:       { value: shaderProps.warp },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2  u_resolution;
      uniform float u_time;
      uniform vec2  u_mouse;
      uniform float u_hue;
      uniform float u_speed;
      uniform float u_intensity;
      uniform float u_complexity;
      uniform float u_warp;

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(random(i),               random(i + vec2(1.0, 0.0)), u.x),
          mix(random(i + vec2(0.0,1.0)), random(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 st) {
        float value     = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 10; i++) {
          if (i >= int(u_complexity)) break;
          value     += amplitude * noise(st);
          st        *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      mat2 rotate(float angle) {
        return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float t = u_time * u_speed;

        vec2 mouse_uv   = (u_mouse * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float warp_effect = smoothstep(0.7, 0.0, distance(uv, mouse_uv)) * u_warp;

        vec2 p = uv * rotate(t * 0.1) + warp_effect;

        float n1 = fbm(p * 1.2 + vec2( t * 0.10,  t * 0.20));
        float n2 = fbm(p * 2.0 + n1 + vec2(-t * 0.25,  t * 0.15));
        float n3 = fbm(p * 3.5 + n2 + vec2( t * 0.10, -t * 0.20));

        float final_noise = n1 * 0.6 + n2 * 0.25 + n3 * 0.15;

        float hue_shift  = final_noise * 0.1;
        float saturation = 0.6 + final_noise * 0.4;
        float value      = 0.15 + pow(final_noise, 2.5) * u_intensity;

        value += pow(smoothstep(0.7, 1.0, final_noise), 3.0) * 0.7 * u_intensity;

        vec3 color = hsv2rgb(vec3((u_hue / 360.0) + hue_shift, saturation, value));
        color *= 1.0 - smoothstep(0.8, 1.5, length(uv));

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    scene.add(new THREE.Mesh(geometry, material));

    threeRef.current = { renderer, scene, camera, material };

    // Animate
    const clock = new THREE.Clock();
    let raf;
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const { clientWidth: w, clientHeight: h } = mountRef.current;
      renderer.setSize(w, h);
      uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const handleMouseMove = (e) => {
      uniforms.u_mouse.value.x = e.clientX;
      uniforms.u_mouse.value.y = window.innerHeight - e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hot-update uniforms when props change
  useEffect(() => {
    if (!threeRef.current) return;
    const { material } = threeRef.current;
    material.uniforms.u_hue.value        = shaderProps.hue;
    material.uniforms.u_speed.value      = shaderProps.speed;
    material.uniforms.u_intensity.value  = shaderProps.intensity;
    material.uniforms.u_complexity.value = shaderProps.complexity;
    material.uniforms.u_warp.value       = shaderProps.warp;
  }, [shaderProps]);
};

// ─── ShaderCanvas ──────────────────────────────────────────────────────────────
export const ShaderCanvas = ({ hue = 260, speed = 0.15, intensity = 0.7, complexity = 6.0, warp = 0.4 }) => {
  const mountRef = useRef(null);
  const props    = { hue, speed, intensity, complexity, warp };
  useShaderAnimation(mountRef, props);
  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

// ─── ControlSlider (optional UI helper) ───────────────────────────────────────
export const ControlSlider = ({ label, value, onChange, min, max, step }) => (
  <div style={{ display: 'flex', flexDirection: 'column', color: 'rgba(255,255,255,0.9)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>{label}</label>
      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '100px', fontFamily: 'monospace' }}>
        {Number(value).toFixed(2)}
      </span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value} onChange={onChange}
      style={{ width: '100%' }}
    />
  </div>
);
