import { motion } from 'motion/react';

export const About = () => {
  const stats = [
    { n: '300+', l: 'Unique Pieces' },
    { n: '12+', l: 'Exhibitions' },
    { n: '100%', l: 'Handmade' },
    { n: '4', l: 'Craft Forms' },
  ];

  return (
    <section id="story" className="sec">
      <div className="wrap">
        <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -44 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute bottom-[-50px] left-[-24px] font-head text-[12rem] font-light text-parch/55 leading-none pointer-events-none select-none z-0">18</div>
            <div className="relative z-10 w-full aspect-[3/4] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=900&auto=format&fit=crop&q=80" 
                alt="Artisan at work"
                className="w-full h-full transition-transform duration-[1.2s] group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute bottom-[-20px] right-[-20px] w-27 h-27 bg-terra flex flex-col items-center justify-center z-20">
              <b className="font-head text-[2.4rem] font-light text-white leading-none">6+</b>
              <small className="font-body text-[0.5rem] tracking-[0.18em] uppercase text-white/65">Years</small>
            </div>
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="tag-label"
            >
              The Artisan's Journey
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="sec-h2"
            >
              A Story Told<br />in <i>Clay & Fire</i>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-[clamp(0.84rem,1.1vw,0.93rem)] font-light text-umber leading-[1.9] mt-6 mb-[18px]"
            >
              Rooted in the traditions of slow craft, this studio was born from a single conviction: that the most meaningful objects are those that carry the memory of their making.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              className="font-body text-[clamp(0.84rem,1.1vw,0.93rem)] font-light text-umber leading-[1.9] mb-[40px]"
            >
              Every piece begins with a question and ends with something that holds time still — not a product, but a practice. Not speed, but presence.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.44 }}
              className="grid grid-cols-2 gap-[2px] mt-10 border border-border"
            >
              {stats.map((stat, i) => (
                <div key={i} className={`p-4 sm:p-[26px] bg-linen border-border ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}`}>
                  <div className="font-head text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-espresso leading-none">{stat.n}</div>
                  <div className="font-body text-[0.6rem] font-medium tracking-[0.18em] uppercase text-muted mt-1.2">{stat.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
