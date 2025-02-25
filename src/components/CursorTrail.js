import { useEffect } from 'react';
import './CursorTrail.css';

const CursorTrail = () => {
  useEffect(() => {
    const MAX_PARTICLES = 50;
    const particles = [];
    
    const createParticle = (x, y) => {
      if (particles.length >= MAX_PARTICLES) {
        const oldParticle = particles.shift();
        oldParticle.element.remove();
      }
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);
      
      particles.push({
        element: particle,
        x: x,
        y: y,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        opacity: 1
      });
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.opacity -= 0.02;

        if (particle.opacity <= 0) {
          particle.element.remove();
          particles.splice(i, 1);
        } else {
          particle.element.style.left = `${particle.x}px`;
          particle.element.style.top = `${particle.y}px`;
          particle.element.style.opacity = particle.opacity;
        }
      }
      requestAnimationFrame(updateParticles);
    };

    const handleMouseMove = (e) => {
      createParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      createParticle(touch.clientX, touch.clientY);
      e.preventDefault();
    };
    if (!('ontouchstart' in window)) {
      document.addEventListener('mousemove', handleMouseMove);
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    requestAnimationFrame(updateParticles);

    return () => {
      if (!('ontouchstart' in window)) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('touchmove', handleTouchMove);
      particles.forEach(p => p.element.remove());
    };
  }, []);

  return null;
};

export default CursorTrail;