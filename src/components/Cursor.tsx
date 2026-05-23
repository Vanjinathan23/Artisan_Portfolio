import { motion } from 'motion/react';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { dotX, dotY, ringX, ringY, isHovered, isDragMode } = useCursor();

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-[7px] h-[7px] bg-terra rounded-full pointer-events-none z-[99999] -ml-[3.5px] -mt-[3.5px]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div 
        className={`fixed top-0 left-0 rounded-full border-[1.5px] border-terra/50 pointer-events-none z-[99999] -ml-[17px] -mt-[17px] transition-[width,height,border-color,background] duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isHovered ? 'w-[58px] h-[58px] -ml-[29px] -mt-[29px] border-terra bg-terra/5' : 'w-[34px] h-[34px]'}
          ${isDragMode ? 'w-[50px] h-[50px] -ml-[25px] -mt-[25px] border-copper bg-copper/5' : ''}
        `}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
};

export default Cursor;
