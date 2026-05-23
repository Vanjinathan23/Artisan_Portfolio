import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 12 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setShowName(true);
        setTimeout(() => setIsWiping(true), 1200);
        setTimeout(onComplete, 2060); // 1200 + 860
      }
      setProgress(p);
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[99500] bg-walnut flex flex-col items-center justify-center transition-transform duration-[860ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${isWiping ? '-translate-y-full' : ''}`}>
      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="flex font-head text-[clamp(2.2rem,8vw,5rem)] font-light tracking-[0.55em] text-ondark pr-[0.55em] mb-7 overflow-hidden h-[1.2em]">
          {showName && "ARTISANA".split("").map((char, i) => (
            <motion.span 
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                delay: i * 0.08, 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
        <div className="w-[180px] h-[1.5px] bg-white/10 overflow-hidden mb-3.5 relative">
          <div 
            className="h-full bg-terra transition-[width] duration-300" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="font-body text-[0.6rem] tracking-[0.3em] text-muted uppercase">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
