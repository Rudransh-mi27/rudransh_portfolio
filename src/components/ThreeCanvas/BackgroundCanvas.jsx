'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // 1. 3D Neural Constellation Nodes on a 3D Sphere
    const nodeCount = 100;
    const sphereRadius = Math.min(width, height) * 0.42;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      nodes.push({
        x: sphereRadius * Math.cos(theta) * Math.sin(phi),
        y: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z: sphereRadius * Math.cos(phi),
        baseSize: Math.random() * 1.8 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // 2. Ambient 3D Floating Space Dust Distributed Throughout the Viewport
    const dustCount = 85;
    const dust = [];
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 1.6,
        z: (Math.random() - 0.5) * 900,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.45 + 0.2
      });
    }

    // 3. Dual 3D Gyroscopic Quantum Orbital Rings
    const ring1Radius = sphereRadius * 1.25;
    const ring2Radius = sphereRadius * 1.5;
    const ringPointsCount = 80;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.0008;
      targetMouseY = (e.clientY - height / 2) * 0.0008;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.0015;
      lastScrollY = currentScrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let angleX = 0.2;
    let angleY = 0;
    let angleZ = 0.1;
    let time = 0;

    const render = () => {
      time += 0.016;

      // Smooth mouse follow & scroll-driven spin
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollVelocity *= 0.92; // Damping

      angleY += 0.0035 + mouseX * 0.02 + scrollVelocity;
      angleX = Math.sin(time * 0.2) * 0.18 + mouseY * 0.8;
      angleZ = Math.cos(time * 0.15) * 0.12;

      ctx.clearRect(0, 0, width, height);

      // Centered stably on the viewport so it persists across all sections from start to end
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 750;

      // 1. Draw Ambient Floating 3D Dust Particles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < dustCount; i++) {
        const p = dust[i];
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.z < -450) p.z = 450;
        if (p.z > 450) p.z = -450;

        const scale = fov / (fov + p.z + 500);
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;

        if (x2d > 0 && x2d < width && y2d > 0 && y2d < height) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2);
          ctx.globalAlpha = p.alpha * Math.max(0, scale - 0.25);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1.0;

      // 2. Trigonometric 3D Rotation matrices
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      const projected = [];

      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        // 3D Matrix Rotation (Y -> X -> Z)
        let x1 = node.x * cosY + node.z * sinY;
        let y1 = node.y;
        let z1 = -node.x * sinY + node.z * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const scale = fov / (fov + z3);
        const x2d = centerX + x3 * scale;
        const y2d = centerY + y3 * scale;

        const pulse = Math.sin(time * 2 + node.pulseOffset) * 0.3 + 0.7;
        const alpha = Math.max(0.12, (z3 + sphereRadius) / (sphereRadius * 2)) * pulse;

        projected.push({
          x: x2d,
          y: y2d,
          z: z3,
          scale,
          alpha,
          size: node.baseSize * scale
        });
      }

      // 3. Draw Connecting Synaptic Filaments
      ctx.lineWidth = 0.8;
      const maxDist = 95;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const p1 = projected[i];
          const p2 = projected[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * Math.min(p1.alpha, p2.alpha) * 0.38;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Rotating 3D Quantum Gyroscopic Rings
      const drawRing = (radius, tiltX, tiltY, rotationSpeed, alphaVal) => {
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= ringPointsCount; i++) {
          const theta = (i / ringPointsCount) * Math.PI * 2 + time * rotationSpeed;
          let rx = radius * Math.cos(theta);
          let ry = 0;
          let rz = radius * Math.sin(theta);

          let y_t = ry * Math.cos(tiltX) - rz * Math.sin(tiltX);
          let z_t = ry * Math.sin(tiltX) + rz * Math.cos(tiltX);
          let x_t = rx * Math.cos(tiltY) + z_t * Math.sin(tiltY);
          z_t = -rx * Math.sin(tiltY) + z_t * Math.cos(tiltY);

          let x_rot = x_t * cosY + z_t * sinY;
          let y_rot = y_t * cosX - (-x_t * sinY + z_t * cosY) * sinX;
          let z_rot = y_t * sinX + (-x_t * sinY + z_t * cosY) * cosX;

          const scale = fov / (fov + z_rot);
          const px = centerX + x_rot * scale;
          const py = centerY + y_rot * scale;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${alphaVal})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      drawRing(ring1Radius, 0.75, 0.45, 0.16, 0.22);
      drawRing(ring2Radius, -0.65, -0.55, -0.12, 0.15);

      // 5. Draw Glowing Constellation Nodes
      for (let i = 0; i < nodeCount; i++) {
        const p = projected[i];
        if (p.alpha > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
          ctx.fill();

          if (p.z > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.14})`;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.88
      }}
      aria-hidden="true"
    />
  );
}
