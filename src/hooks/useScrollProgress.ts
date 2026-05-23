import { useScroll, useSpring, MotionValue } from 'motion/react';

export const useScrollProgress = (): MotionValue<number> => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return scaleX;
};
