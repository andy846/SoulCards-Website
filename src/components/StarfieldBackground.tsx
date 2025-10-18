import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };

    const initializeStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      starsRef.current = [];

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Initialize shooting stars
      shootingStarsRef.current = [];
      for (let i = 0; i < 3; i++) {
        shootingStarsRef.current.push(createShootingStar());
      }
    };

    const createShootingStar = (): ShootingStar => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 6 + 2,
      angle: Math.random() * Math.PI / 6 + Math.PI / 6, // 30-60 degrees
      opacity: 0,
      active: false,
    });

    const drawStars = (time: number) => {
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        const alpha = star.opacity * twinkle;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Create a subtle glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#e0e7ff');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a bright center
        ctx.globalAlpha = alpha * 1.5;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    const drawShootingStars = (time: number) => {
      shootingStarsRef.current.forEach((shootingStar, index) => {
        if (!shootingStar.active && Math.random() < 0.001) {
          // Activate shooting star
          shootingStar.active = true;
          shootingStar.opacity = 1;
          shootingStar.x = Math.random() * canvas.width;
          shootingStar.y = Math.random() * canvas.height * 0.3;
        }

        if (shootingStar.active) {
          // Move shooting star
          shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
          shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
          shootingStar.opacity -= 0.01;

          if (shootingStar.opacity <= 0 || 
              shootingStar.x > canvas.width + 100 || 
              shootingStar.y > canvas.height + 100) {
            shootingStar.active = false;
            shootingStarsRef.current[index] = createShootingStar();
            return;
          }

          // Draw shooting star trail
          ctx.save();
          ctx.globalAlpha = shootingStar.opacity;
          
          const gradient = ctx.createLinearGradient(
            shootingStar.x,
            shootingStar.y,
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          
          gradient.addColorStop(0, '#ffffff');
          gradient.addColorStop(0.3, '#e0e7ff');
          gradient.addColorStop(0.7, '#c7d2fe');
          gradient.addColorStop(1, 'transparent');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
            shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
          );
          ctx.stroke();
          
          ctx.restore();
        }
      });
    };

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawStars(time);
      drawShootingStars(time);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(234, 179, 8, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #0f0f23 0%, #1e293b 50%, #0f172a 100%)
        `,
      }}
    />
  );
};

export default StarfieldBackground;