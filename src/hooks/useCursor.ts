import { useState, useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'motion/react';

export interface UseCursorResult {
  dotX: MotionValue<number>;
  dotY: MotionValue<number>;
  ringX: MotionValue<number>;
  ringY: MotionValue<number>;
  isHovered: boolean;
  isDragMode: boolean;
}

export const useCursor = (): UseCursorResult => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });
  
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleDragEnter = () => setIsDragMode(true);
    const handleDragLeave = () => setIsDragMode(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveSelectors = '.gi, .s-img, .about-img, .t-card, .phil-card, .pc, button, a';
    const dragSelectors = '#pcscroll';

    const setupListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      document.querySelectorAll(dragSelectors).forEach(el => {
        el.addEventListener('mouseenter', handleDragEnter);
        el.addEventListener('mouseleave', handleDragLeave);
      });
    };

    setupListeners();

    const mutationObserver = new MutationObserver(() => {
      setupListeners();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.querySelectorAll(dragSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleDragEnter);
        el.removeEventListener('mouseleave', handleDragLeave);
      });
      mutationObserver.disconnect();
    };
  }, [mouseX, mouseY]);

  return { dotX, dotY, ringX, ringY, isHovered, isDragMode };
};

export default useCursor;
