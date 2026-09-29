import React, { useEffect, useRef } from 'react';

interface BitcoinManBackgroundProps {
  opacity: number;
  scrollProgress?: number; // 0 to 1 over full terminal scroll height
}

const TOTAL_TRANS_FRAMES = 40;
const TOTAL_NOVA_FRAMES = 60;

export const BitcoinManBackground: React.FC<BitcoinManBackgroundProps> = ({
  opacity,
  scrollProgress = 0
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);
  const transCanvasRef = useRef<HTMLCanvasElement>(null);
  const novaCanvasRef = useRef<HTMLCanvasElement>(null);

  const transImagesRef = useRef<HTMLImageElement[]>([]);
  const novaImagesRef = useRef<HTMLImageElement[]>([]);

  // 1. Preload Stage 2 Transition Video frames (trans_00 to trans_39)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_TRANS_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(2, '0');
      img.src = `/transition_frames/trans_${num}.jpg`;
      loadedImages.push(img);
    }
    transImagesRef.current = loadedImages;
  }, []);

  // 2. Preload Stage 3 NovaAI 3D Video frames (nova_00 to nova_59)
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_NOVA_FRAMES; i++) {
      const img = new Image();
      const num = i.toString().padStart(2, '0');
      img.src = `/nova_frames/nova_${num}.jpg`;
      loadedImages.push(img);
    }
    novaImagesRef.current = loadedImages;
  }, []);

  // Render Stage 2 Transition Video (Drive Video) to transCanvasRef
  useEffect(() => {
    const canvas = transCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Map first half of terminal scroll (0.0 to 0.45) to trans frames 0..39 (reaching still wires)
    const stage2Progress = Math.min(1, Math.max(0, scrollProgress / 0.45));
    const frameIndex = Math.min(
      TOTAL_TRANS_FRAMES - 1,
      Math.max(0, Math.floor(stage2Progress * TOTAL_TRANS_FRAMES))
    );

    const img = transImagesRef.current[frameIndex];

    const draw = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = w / h;

        let renderW = w;
        let renderH = h;
        let offsetX = 0;
        let offsetY = 0;

        if (screenRatio > imgRatio) {
          renderH = w / imgRatio;
          offsetY = (h - renderH) / 2;
        } else {
          renderW = h * imgRatio;
          offsetX = (w - renderW) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }
    };

    if (img && !img.complete) {
      img.onload = draw;
    } else {
      draw();
    }
  }, [scrollProgress]);

  // Render Stage 3 NovaAI 3D Video to novaCanvasRef (starts after still wires at scrollProgress > 0.40)
  useEffect(() => {
    const canvas = novaCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Map second half of terminal scroll (0.40 to 1.0) to nova frames 0..59
    const stage3Progress = Math.min(1, Math.max(0, (scrollProgress - 0.40) / 0.60));
    const frameIndex = Math.min(
      TOTAL_NOVA_FRAMES - 1,
      Math.max(0, Math.floor(stage3Progress * TOTAL_NOVA_FRAMES))
    );

    const img = novaImagesRef.current[frameIndex];

    const draw = () => {
      const w = (canvas.width = window.innerWidth);
      const h = (canvas.height = window.innerHeight);

      if (img && img.complete && img.naturalWidth > 0) {
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = w / h;

        let renderW = w;
        let renderH = h;
        let offsetX = 0;
        let offsetY = 0;

        if (screenRatio > imgRatio) {
          renderH = w / imgRatio;
          offsetY = (h - renderH) / 2;
        } else {
          renderW = h * imgRatio;
          offsetX = (w - renderW) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }
    };

    if (img && !img.complete) {
      img.onload = draw;
    } else {
      draw();
    }
  }, [scrollProgress]);

  // Animated sky chart & fireflies canvas
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const pointsCount = 42;
    const candles = Array.from({ length: pointsCount }, (_, i) => ({
      baseY: height * 0.30 + Math.sin(i * 0.42) * 65,
      phase: Math.random() * Math.PI * 2,
      speedX: 0.02 + (i % 3) * 0.008,
      speedY: 0.025 + Math.random() * 0.015,
      height: 16 + Math.random() * 34,
      isGreen: (i % 2 === 0)
    }));

    let t = 0;
    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      const step = width / (pointsCount - 1);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = 16;

      for (let i = 0; i < pointsCount; i++) {
        const c = candles[i];
        const yOffset = Math.sin(t * c.speedY * 18 + c.phase) * 22 + Math.cos(t * 0.5 + i * 0.3) * 14;
        const xOffset = Math.sin(t * 0.4 + i) * 6;
        const x = i * step + xOffset;
        const y = c.baseY + yOffset;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      candles.forEach((c, i) => {
        const yOffset = Math.sin(t * c.speedY * 18 + c.phase) * 22 + Math.cos(t * 0.5 + i * 0.3) * 14;
        const xOffset = Math.sin(t * 0.4 + i) * 6;
        const x = i * step + xOffset;
        const y = c.baseY + yOffset;
        const dynamicH = c.height + Math.sin(t * 2 + i) * 8;

        ctx.shadowBlur = 10;
        if (c.isGreen) {
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.85)';
          ctx.fillStyle = 'rgba(52, 211, 153, 0.7)';
          ctx.shadowColor = '#34d399';
        } else {
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.85)';
          ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.shadowColor = '#f59e0b';
        }

        ctx.beginPath();
        ctx.moveTo(x, y - dynamicH * 1.3);
        ctx.lineTo(x, y + dynamicH * 1.3);
        ctx.stroke();

        ctx.fillRect(x - 5, y - dynamicH * 0.5, 10, Math.max(4, dynamicH));
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (opacity <= 0.01) return null;

  // Compute crossfade opacity between Stage 2 (Transition Video) and Stage 3 (NovaAI Video)
  const novaOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.38) / 0.15));

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden transition-opacity duration-300 bg-[#0a0a0a]"
      style={{ opacity }}
    >
      {/* 1. Base Bitcoin Man Image Background */}
      <div className="absolute inset-0 w-full h-full wind-swaying-flowers">
        <img
          src="/bitcoin_man_bg.jpg"
          alt="Satosphere Bitcoin Background"
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
        />
      </div>

      {/* 2. Stage 2 Transition Video Canvas Layer (Drive Video: trans_00 -> trans_39 still wires) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{ opacity: Math.min(1, scrollProgress * 10) }}
      >
        <canvas
          ref={transCanvasRef}
          className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
        />
      </div>

      {/* 3. Stage 3 NovaAI 3D Video Canvas Layer (Triggers after wires are still: nova_00 -> nova_59) */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{ opacity: novaOpacity }}
      >
        <canvas
          ref={novaCanvasRef}
          className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
        />
      </div>

      {/* 4. Floating Animated Chart Wave Canvas in Sky */}
      <canvas
        ref={chartCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* 5. Subtle Dreamy Night Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/45 via-transparent to-[#0a0a0a]/90 pointer-events-none" />

      {/* Drifting Flower Petals blown by wind */}
      <div className="wind-petal bg-amber-200/40 w-3 h-2" style={{ top: '15%', left: '80%', animationDelay: '0s', animationDuration: '12s' }} />
      <div className="wind-petal bg-emerald-200/35 w-2.5 h-1.5" style={{ top: '25%', left: '92%', animationDelay: '2.5s', animationDuration: '15s' }} />
      <div className="wind-petal bg-rose-200/40 w-3 h-2" style={{ top: '35%', left: '70%', animationDelay: '5s', animationDuration: '13s' }} />
      <div className="wind-petal bg-amber-100/50 w-2 h-1.5" style={{ top: '50%', left: '85%', animationDelay: '7.5s', animationDuration: '14s' }} />
      <div className="wind-petal bg-amber-200/40 w-3.5 h-2" style={{ top: '10%', left: '60%', animationDelay: '9s', animationDuration: '16s' }} />

      {/* Random Fireflies lighting up at intervals */}
      <div className="firefly" style={{ top: '64%', left: '18%', animationDelay: '0s' }} />
      <div className="firefly" style={{ top: '76%', left: '34%', animationDelay: '1.8s' }} />
      <div className="firefly" style={{ top: '70%', left: '55%', animationDelay: '3.2s' }} />
      <div className="firefly" style={{ top: '80%', left: '72%', animationDelay: '0.9s' }} />
      <div className="firefly" style={{ top: '62%', left: '85%', animationDelay: '2.4s' }} />
      <div className="firefly" style={{ top: '73%', left: '44%', animationDelay: '4.1s' }} />
    </div>
  );
};

