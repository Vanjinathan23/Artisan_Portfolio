import { useState, useEffect } from 'react';

export function useEyeTracking(figureRef, isOpen, tourActive) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isOpen || tourActive) {
      setEyeOffset({ x: 0, y: 0 });
      return;
    }

    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) {
      return;
    }

    function handleMouseMove(e) {
      const rect = figureRef.current?.getBoundingClientRect();
      if (!rect) return;

      const figCenterX = rect.left + rect.width / 2;
      const figCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - figCenterX;
      const dy = e.clientY - figCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const PROXIMITY_RADIUS = 150;

      if (distance < PROXIMITY_RADIUS) {
        const angle = Math.atan2(dy, dx);
        const intensity = 1 - distance / PROXIMITY_RADIUS;
        const maxOffset = 2;
        setEyeOffset({
          x: Math.cos(angle) * maxOffset * intensity,
          y: Math.sin(angle) * maxOffset * intensity
        });
      } else {
        setEyeOffset({ x: 0, y: 0 });
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [figureRef, isOpen, tourActive]);

  return eyeOffset;
}
