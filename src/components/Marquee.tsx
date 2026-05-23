import { motion } from 'motion/react';

export const Marquee = () => {
  const items = ["Handcrafted Pottery", "Artisan Jewelry", "Original Paintings", "Woven Textiles", "Traditional Craft", "Made with Soul"];

  return (
    <div className="bg-terra py-[13px] overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex hover:[animation-play-state:paused]"
      >
        {[1, 2].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {items.map((text, j) => (
              <div key={j} className="mi inline-flex items-center gap-7 px-7 font-head italic text-[1.05rem] text-white/90">
                {text}
                <span className="not-italic text-[0.6rem] opacity-55 font-serif">✦</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
