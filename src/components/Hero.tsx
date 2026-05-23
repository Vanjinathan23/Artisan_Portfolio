import { motion } from 'motion/react';
import HeroPortrait from './HeroPortrait';
import HeroText from './HeroText';
import HeroCraft from './HeroCraft';

interface HeroProps {
  preloaderDone: boolean;
}

export const Hero = ({ preloaderDone }: HeroProps) => {
  return (
    <section 
      id="hero" 
      className="w-full h-screen min-h-[640px] grid relative overflow-hidden bg-cream"
    >
      <HeroPortrait preloaderDone={preloaderDone} />
      <HeroText />
      <HeroCraft />

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-[clamp(24px,4vw,44px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20"
      >
        <div className="w-[1px] h-11 bg-gradient-to-b from-sand to-transparent animate-pulse" />
        <span className="font-body text-[0.58rem] font-medium tracking-[0.28em] uppercase text-ondark/40">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
