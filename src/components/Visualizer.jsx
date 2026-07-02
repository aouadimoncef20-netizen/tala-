import React, { useEffect, useRef } from 'react';
import './Visualizer.css';

const MODES = {
  bars: 'Bars',
  circle: 'Circle',
  waves: 'Waves',
};

const Visualizer = ({ isPlaying, currentTime, duration, color = '#D4875E', mode = 'bars' }) => {
  const canvasRef = useRef(null);
  const barsRef = useRef([]);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    timeRef.current = currentTime || 0;
  }, [currentTime]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = canvas.offsetWidth * 2;
    const H = canvas.height = canvas.offsetHeight * 2;
    const NUM_BARS = mode === 'circle' ? 128 : 64;
    const barW = W / NUM_BARS - 2;

    // Initialize bars with random heights
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: NUM_BARS }, () => Math.random());
    }

    const drawBars = () => {
      ctx.clearRect(0, 0, W, H);

      // Update bar heights based on playing state
      barsRef.current = barsRef.current.map((h, i) => {
        if (isPlaying) {
          const beat = Math.sin(timeRef.current * 2 + i * 0.3) * 0.3 + 0.5;
          const target = beat * 0.8 + 0.1;
          return h + (target - h) * 0.12;
        } else {
          return h * 0.95;
        }
      });

      // Draw bars
      barsRef.current.forEach((h, i) => {
        const x = i * (barW + 2) + 1;
        const barH = h * H;
        const gradient = ctx.createLinearGradient(0, H - barH, 0, H);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + '22');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, H - barH, barW, barH, 2);
        ctx.fill();
      });
    };

    const drawCircle = () => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const radius = Math.min(W, H) * 0.3;

      // Update bars
      barsRef.current = barsRef.current.map((h, i) => {
        if (isPlaying) {
          const beat = Math.sin(timeRef.current * 2.5 + i * 0.2) * 0.3 + 0.5;
          const target = beat * 0.8 + 0.1;
          return h + (target - h) * 0.12;
        } else {
          return h * 0.95;
        }
      });

      // Draw circular bars
      barsRef.current.forEach((h, i) => {
        const angle = (i / barsRef.current.length) * Math.PI * 2 - Math.PI / 2;
        const barLen = h * radius * 0.8;
        const innerR = radius - barLen * 0.3;
        const x1 = cx + Math.cos(angle) * innerR;
        const y1 = cy + Math.sin(angle) * innerR;
        const x2 = cx + Math.cos(angle) * (innerR + barLen);
        const y2 = cy + Math.sin(angle) * (innerR + barLen);

        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(2, (W / barsRef.current.length) * 0.8);
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.4 + h * 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    };

    const drawWaves = () => {
      ctx.clearRect(0, 0, W, H);

      // Update heights for wave
      barsRef.current = barsRef.current.map((h, i) => {
        if (isPlaying) {
          const target = (Math.sin(timeRef.current * 1.5 + i * 0.15) * 0.5 + 0.5) * 0.7 + 0.1;
          return h + (target - h) * 0.08;
        } else {
          return h * 0.95;
        }
      });

      // Draw multiple waves
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        const waveOffset = w * 0.5;
        const amp = 30 + w * 20;
        ctx.moveTo(0, H / 2);

        for (let x = 0; x <= W; x += 4) {
          const progress = x / W;
          const barIdx = Math.floor(progress * barsRef.current.length);
          const h = barsRef.current[barIdx] || 0.5;
          const y = H / 2 + Math.sin(progress * Math.PI * 4 + timeRef.current * 2 + waveOffset) * amp * h;
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = w === 1 ? color : w === 0 ? color + '88' : color + '44';
        ctx.lineWidth = 3 - w * 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Fill below the main wave
        if (w === 0) {
          ctx.lineTo(W, H);
          ctx.lineTo(0, H);
          ctx.closePath();
          const grad = ctx.createLinearGradient(0, 0, 0, H);
          grad.addColorStop(0, color + '22');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }
    };

    const animate = () => {
      if (!isPlaying) {
        timeRef.current = 0;
      } else {
        timeRef.current += 0.03;
      }

      if (mode === 'circle') drawCircle();
      else if (mode === 'waves') drawWaves();
      else drawBars();

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, color, mode]);

  return (
    <canvas
      ref={canvasRef}
      className="visualizer-canvas"
    />
  );
};

export { MODES };
export default Visualizer;
