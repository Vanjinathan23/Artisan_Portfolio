import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { stories } from '../data/stories';

export const Stories = () => {
  return (
    <section id="stories" className="sec bg-cream">
      <div className="wrap">
        <div className="mb-14 sm:mb-25">
          <div className="tag-label">Featured Works</div>
          <h2 className="sec-h2 mt-2">Every Piece<br />Has a <i>Story</i></h2>
        </div>
        
        {stories.map((story, i) => (
          <div key={i} className="s-item grid md:grid-cols-2 gap-10 md:gap-24 items-center mb-20 md:mb-32 last:mb-0" data-piece={i}>
            <motion.div 
              initial={{ opacity: 0, x: story.flip ? 44 : -44 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className={`relative ${story.flip ? 'md:order-2' : ''}`}
            >
              <div className="relative z-10 aspect-[4/5] overflow-hidden group">
                <img 
                  src={story.img} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-[1.1s] group-hover:scale-[1.04]" 
                />
              </div>
              <div className="absolute bottom-[-16px] right-[-16px] font-head text-[7rem] font-light text-parch/60 leading-none z-0 select-none">
                {story.id}
              </div>
            </motion.div>
            <div className={story.flip ? 'md:order-1' : ''}>
              <div className="tag-label">{story.cat}</div>
              <h3 className="s-h3 font-head text-[clamp(2rem,4vw,3.4rem)] text-espresso leading-none mb-5">{story.title}</h3>
              <p className="font-body text-[clamp(0.83rem,1.1vw,0.92rem)] font-light text-umber leading-[1.9] mb-7">{story.text}</p>
              <button 
                onClick={() => {
                  window.openApprentice?.(`Hello, I am interested in the ${story.title}.`);
                }}
                className="inline-flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terra border-b border-border pb-2 group transition-all cursor-none bg-transparent border-t-0 border-l-0 border-r-0 outline-none"
              >
                Enquire About This Piece
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stories;
