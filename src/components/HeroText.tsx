import { motion } from 'motion/react';

export const HeroText = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative z-10 flex flex-col justify-end bg-walnut px-7 py-20 sm:px-16 sm:py-24 md:px-16 overflow-hidden hero-m">
      {/* Mobile Hero Background */}
      <div className="absolute inset-0 md:hidden">
        <img 
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop&q=85" 
          alt="Artisan hands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-walnut/85 lg:bg-walnut/70" />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_20%_80%,rgba(184,92,56,0.12)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-15px] right-[-5px] sm:bottom-[-30px] sm:right-[-15px] lg:right-[-10px] font-head text-[clamp(6rem,18vw,20rem)] font-light text-ondark/[0.025] leading-[0.85] pointer-events-none tracking-tight">01</div>
      
      <div className="relative">
        <div className="overflow-hidden mb-6 sm:mb-7 lg:mb-8">
          <motion.span 
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="block font-body text-[0.52rem] sm:text-[0.55rem] font-medium tracking-[0.45em] sm:tracking-[0.5em] lg:tracking-[0.55em] uppercase text-sand"
          >
            Handcrafted with Soul · Est. 2018
          </motion.span>
        </div>
        <h1 className="font-head text-[clamp(2.4rem,4.6vw,4.4rem)] font-light leading-[0.9] text-white mb-8 sm:mb-9 lg:mb-10">
          <span className="block overflow-hidden h-[1.12em]">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Where
            </motion.span>
          </span>
          <span className="block overflow-hidden h-[1.12em]">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.72, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              Craft
            </motion.span>
          </span>
          <span className="block overflow-hidden h-[1.12em]">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.84, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block italic text-sand"
            >
              Becomes
            </motion.span>
          </span>
          <span className="block overflow-hidden h-[1.12em]">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.96, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block italic text-sand"
            >
              Art.
            </motion.span>
          </span>
        </h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="font-body text-[0.88rem] font-light text-white/40 leading-[1.8] max-w-[400px] mb-12"
        >
          Every piece is a conversation between hands, material, and time. Made slowly. Made once. Made to outlive the moment it was born in.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 sm:gap-4"
        >
          <a 
            href="#gallery" 
            onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}
            className="inline-block bg-terra text-white px-8 sm:px-10 py-4 sm:py-4.5 font-body text-[0.6rem] sm:text-[0.62rem] font-semibold tracking-[0.22em] uppercase hover:bg-sepia transition-all whitespace-nowrap"
          >
            Explore Works
          </a>
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            className="inline-block border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-4.5 font-body text-[0.6rem] sm:text-[0.62rem] font-semibold tracking-[0.22em] uppercase hover:bg-white/5 hover:border-white/40 transition-all whitespace-nowrap"
          >
            Begin a Story
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroText;
