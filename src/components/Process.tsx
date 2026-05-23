import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '../data/processSteps';

export const Process = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [pcProgress, setPcProgress] = useState(0);

  const handlePcScroll = () => {
    if (carouselRef.current) {
      const el = carouselRef.current;
      const max = el.scrollWidth - el.clientWidth;
      setPcProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
    }
  };

  useEffect(() => {
    const slider = carouselRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
    };

    const handleMouseUp = () => {
      isDown = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // scroll speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="craft" className="sec bg-walnut overflow-hidden">
      <div className="wrap flex justify-between items-end flex-wrap gap-5 mb-10 sm:mb-15">
        <div>
          <div className="tag-label light">Behind the Craft</div>
          <h2 className="sec-h2 light mt-2">The <i>Making</i><br />of Each Piece</h2>
        </div>
        <div className="font-body text-[0.6rem] font-medium tracking-[0.22em] uppercase text-muted flex items-center gap-2.5">
          Drag to explore <ArrowRight size={14} />
        </div>
      </div>
      
      <div 
        id="pcscroll"
        ref={carouselRef}
        onScroll={handlePcScroll}
        className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-[3px] px-6 sm:px-16 w-max">
          {processSteps.map((p, i) => (
            <div key={i} className="shrink-0 w-[250px] sm:w-[27vw] max-w-[360px] bg-white/[0.03] border border-white/[0.07] overflow-hidden group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" 
                />
                <div className="absolute top-[14px] left-[18px] font-head text-[0.85rem] text-sand tracking-[0.1em]">{p.num}</div>
              </div>
              <div className="p-[22px_22px_26px]">
                <div className="w-7 h-[1px] bg-terra mb-3" />
                <h3 className="font-head text-[1.45rem] text-ondark mb-2.5">{p.title}</h3>
                <p className="font-body text-[0.78rem] font-light text-white/[0.42] leading-[1.75]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="px-6 sm:px-16 mt-7 flex items-center gap-3.5">
        <span className="font-body text-[0.58rem] font-medium tracking-[0.18em] uppercase text-muted">0%</span>
        <div className="flex-1 h-[1px] bg-white/10">
          <div className="h-full bg-terra" style={{ width: `${pcProgress}%` }} />
        </div>
        <span className="font-body text-[0.58rem] font-medium tracking-[0.18em] uppercase text-muted">100%</span>
      </div>
    </section>
  );
};

export default Process;
