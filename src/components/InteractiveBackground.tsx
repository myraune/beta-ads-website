import React, { useEffect, useRef } from "react";

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    let rafId: number;
    let program: WebGLProgram;

    const startGL = async () => {
      const gl = canvas.getContext('webgl', { 
        antialias: false, 
        depth: false, 
        stencil: false, 
        powerPreference: 'high-performance', 
        preserveDrawingBuffer: false 
      });
      
      if (!gl) {
        console.warn('WebGL not supported, using CSS fallback');
        return;
      }

      canvas.style.display = 'block';
      container.style.animation = 'none';

      const vert = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const frag = `
        precision highp float;
        varying vec2 v_uv;

        uniform vec2  u_resolution;
        uniform float u_time;
        uniform float u_scroll;
        uniform vec2  u_mouse;
        uniform vec2  u_mouseVel;
        uniform float u_scrollVel;
        uniform float u_strength;

        uniform vec3 u_c1;
        uniform vec3 u_c2;
        uniform vec3 u_c3;

        vec2 hash2(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)),
                   dot(p, vec2(269.5, 183.3)));
          return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = dot(hash2(i + vec2(0.0,0.0)), f - vec2(0.0,0.0));
          float b = dot(hash2(i + vec2(1.0,0.0)), f - vec2(1.0,0.0));
          float c = dot(hash2(i + vec2(0.0,1.0)), f - vec2(0.0,1.0));
          float d = dot(hash2(i + vec2(1.0,1.0)), f - vec2(1.0,1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
          for (int i = 0; i < 6; i++) {
            v += a * noise(p);
            p = rot * p * 2.0;
            a *= 0.5;
          }
          return v;
        }

        // Particle field simulation
        float particles(vec2 p, float t) {
          float result = 0.0;
          for (int i = 0; i < 8; i++) {
            float fi = float(i);
            vec2 offset = vec2(sin(t * 0.5 + fi * 0.8), cos(t * 0.3 + fi * 1.2)) * 2.0;
            vec2 particlePos = p + offset + vec2(sin(fi), cos(fi * 1.3)) * 1.5;
            float dist = length(particlePos);
            result += 0.015 / (dist * dist + 0.01);
          }
          return result;
        }

        void main() {
          vec2 uv = v_uv;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
          vec2 p = (uv - 0.5) * aspect;

          // Even faster time progression
          float t = u_time * 0.25;
          
          // Extreme scroll and mouse influence
          vec2 scrollShift = vec2(sin(u_scroll * 3.14) * 0.3, u_scroll * 2.0);
          vec2 mouseShift = (u_mouse - 0.5) * vec2(2.5, 1.8);
          
          // Intense mouse velocity ripples
          float mouseVelMag = length(u_mouseVel) * 5.0;
          vec2 ripple = u_mouseVel * mouseVelMag * sin(length(p - (u_mouse - 0.5) * 2.0) * 8.0 - t * 6.0);
          
          // Dynamic scroll waves
          float scrollVelEffect = u_scrollVel * 3.5;
          vec2 swoosh = vec2(sin(t * 2.0 + scrollVelEffect) * scrollVelEffect * 0.5, scrollVelEffect);

          // Rotating base layer
          vec2 rotated = p;
          float angle = t * 0.1 + length(p) * 0.5;
          rotated = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * rotated;

          // Multiple aggressive FBM layers
          float base = fbm(rotated * 2.5 + t * 1.2 + scrollShift + mouseShift + ripple);
          float detail = fbm(p * 5.5 - t * 1.8 + mouseShift * 0.7 + swoosh);
          float energy = fbm(p * 8.0 + t * 3.0 + ripple * 2.0);
          float micro = fbm(p * 12.0 - t * 2.5);
          
          // Add particle field
          float particleField = particles(p - mouseShift * 0.3, t);
          
          // Dynamic pulsing
          float pulse = sin(t * 1.2) * 0.25 + 0.75;
          float fastPulse = sin(t * 3.0) * 0.1 + 0.9;
          
          // Aggressive color blending
          float blend = smoothstep(0.1, 0.9, base * pulse);
          vec3 col = mix(u_c1, u_c2, blend);
          
          // Layer in third color with detail
          col = mix(col, u_c3, detail * 0.8);
          
          // Energy layer adds glow
          col += energy * 0.25 * u_c1 * fastPulse;
          
          // Micro detail adds texture
          col += micro * 0.1 * u_c2;
          
          // Particle glow effect
          col += particleField * u_c1 * 2.0;
          
          // Mouse proximity glow
          float mouseDist = length(p - (u_mouse - 0.5) * aspect);
          float mouseGlow = exp(-mouseDist * 2.0) * mouseVelMag * 0.3;
          col += mouseGlow * u_c2;
          
          // Dynamic vignette
          float v = length(p) * 0.5;
          col *= 1.0 - v * 0.3;
          
          // Enhance contrast
          col = pow(col, vec3(0.95));
          
          col = mix(vec3(0.0), col, clamp(u_strength, 0.0, 1.0));

          gl_FragColor = vec4(col, 1.0);
        }
      `;

      const createShader = (type: number, source: string) => {
        const sh = gl.createShader(type);
        if (!sh) throw new Error('Failed to create shader');
        gl.shaderSource(sh, source);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          const msg = gl.getShaderInfoLog(sh);
          gl.deleteShader(sh);
          throw new Error('Shader compile error: ' + msg);
        }
        return sh;
      };

      const createProgram = (vsSrc: string, fsSrc: string) => {
        const vs = createShader(gl.VERTEX_SHADER, vsSrc);
        const fs = createShader(gl.FRAGMENT_SHADER, fsSrc);
        const prog = gl.createProgram();
        if (!prog) throw new Error('Failed to create program');
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          const msg = gl.getProgramInfoLog(prog);
          gl.deleteProgram(prog);
          throw new Error('Program link error: ' + msg);
        }
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return prog;
      };

      program = createProgram(vert, frag);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,  1, -1,  -1,  1,
        -1,  1,  1, -1,   1,  1
      ]), gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uResolution = gl.getUniformLocation(program, 'u_resolution');
      const uTime = gl.getUniformLocation(program, 'u_time');
      const uScroll = gl.getUniformLocation(program, 'u_scroll');
      const uMouse = gl.getUniformLocation(program, 'u_mouse');
      const uMouseVel = gl.getUniformLocation(program, 'u_mouseVel');
      const uScrollVel = gl.getUniformLocation(program, 'u_scrollVel');
      const uStrength = gl.getUniformLocation(program, 'u_strength');
      const uC1 = gl.getUniformLocation(program, 'u_c1');
      const uC2 = gl.getUniformLocation(program, 'u_c2');
      const uC3 = gl.getUniformLocation(program, 'u_c3');

      let dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 1.8);
        const w = Math.floor(window.innerWidth * dpr);
        const h = Math.floor(window.innerHeight * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          gl.uniform2f(uResolution, w, h);
        }
      };
      
      resize();
      window.addEventListener('resize', resize);

      const mouse = { x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5 };
      const mouseVel = { x: 0, y: 0 };
      const handleMouseMove = (e: PointerEvent) => {
        const newX = e.clientX / window.innerWidth;
        const newY = 1 - e.clientY / window.innerHeight;
        
        // Calculate velocity with smooth decay
        mouseVel.x += (newX - mouse.x) * 0.3;
        mouseVel.y += (newY - mouse.y) * 0.3;
        mouseVel.x *= 0.85; // decay
        mouseVel.y *= 0.85;
        
        mouse.x = newX;
        mouse.y = newY;
      };
      window.addEventListener('pointermove', handleMouseMove, { passive: true });

      let scrollNorm = 0;
      let scrollVel = 0;
      let lastScrollY = 0;
      let lastScrollTime = performance.now();
      
      const updateScroll = () => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollNorm = window.scrollY / max;
        
        // Calculate scroll velocity
        const now = performance.now();
        const dt = Math.max(1, now - lastScrollTime);
        const delta = (window.scrollY - lastScrollY) / max;
        scrollVel += (delta / dt) * 1000 * 0.5; // normalize to per second
        scrollVel *= 0.92; // decay
        
        lastScrollY = window.scrollY;
        lastScrollTime = now;
      };
      updateScroll();
      window.addEventListener('scroll', updateScroll, { passive: true });

      const sections = Array.from(document.querySelectorAll('[data-colors]')) as HTMLElement[];
      let targetColors = [[0.35, 0.08, 0.11], [0.28, 0.05, 0.08], [0.02, 0.02, 0.04]]; // softer red theme
      let currentColors = targetColors.map(c => [...c]);
      let targetStrength = 1;
      let currentStrength = targetStrength;

      const hexToRgb01 = (hex: string): [number, number, number] => {
        const m = hex.trim().replace('#', '');
        const bigint = parseInt(m.length === 3 ? m.split('').map(c => c + c).join('') : m, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r / 255, g / 255, b / 255];
      };

      const io = new IntersectionObserver(entries => {
        entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = entries[0];
        if (top && top.isIntersecting) {
          const el = top.target as HTMLElement;
          const colors = el.dataset.colors ? el.dataset.colors.split(',') : [];
          if (colors.length === 3) {
            targetColors = colors.map(hexToRgb01);
          }
          const s = parseFloat(getComputedStyle(el).getPropertyValue('--bg-strength')) || 1;
          targetStrength = s;
        }
      }, { threshold: [0.15, 0.4, 0.6, 0.9] });

      sections.forEach(el => io.observe(el));

      let start = performance.now();

      const frame = (tNow: number) => {
        const t = (tNow - start) / 1000;

        // Faster color transitions for snappier section changes
        for (let i = 0; i < 3; i++) {
          currentColors[i][0] += (targetColors[i][0] - currentColors[i][0]) * 0.12;
          currentColors[i][1] += (targetColors[i][1] - currentColors[i][1]) * 0.12;
          currentColors[i][2] += (targetColors[i][2] - currentColors[i][2]) * 0.12;
        }
        currentStrength += (targetStrength - currentStrength) * 0.15;

        gl.uniform1f(uTime, t);
        gl.uniform1f(uScroll, scrollNorm);
        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform2f(uMouseVel, mouseVel.x, mouseVel.y);
        gl.uniform1f(uScrollVel, scrollVel);
        gl.uniform1f(uStrength, currentStrength);
        gl.uniform3f(uC1, currentColors[0][0], currentColors[0][1], currentColors[0][2]);
        gl.uniform3f(uC2, currentColors[1][0], currentColors[1][1], currentColors[1][2]);
        gl.uniform3f(uC3, currentColors[2][0], currentColors[2][1], currentColors[2][2]);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(frame);
      };

      rafId = requestAnimationFrame(frame);

      const handleVisibilityChange = () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
        } else {
          start = performance.now();
          rafId = requestAnimationFrame(frame);
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', resize);
        window.removeEventListener('pointermove', handleMouseMove);
        window.removeEventListener('scroll', updateScroll);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        io.disconnect();
        if (program) gl.deleteProgram(program);
      };
    };

    startGL().catch(err => {
      console.warn('WebGL initialization failed:', err);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(ellipse 1400px 900px at 30% 20%, rgba(159, 28, 38, 0.18), transparent 70%),
          radial-gradient(ellipse 1200px 800px at 70% 50%, rgba(120, 20, 28, 0.15), transparent 65%),
          radial-gradient(ellipse 1000px 700px at 50% 80%, rgba(80, 15, 20, 0.12), transparent 70%),
          linear-gradient(180deg, #0a0a0f 0%, #0d0a0f 50%, #0a0a0f 100%)
        `,
        filter: 'blur(25px) saturate(1.1) contrast(1.05)',
        animation: 'bgFlow 20s ease-in-out infinite',
      }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'none' }} />
    </div>
  );
};
