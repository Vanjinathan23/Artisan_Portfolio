import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const Testimonials = () => {
  const [tSlide, setTSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxTSlide = testimonials.length - visibleCards;

  const nextSlide = () => {
    setTSlide((prev) => (prev >= maxTSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setTSlide((prev) => (prev <= 0 ? maxTSlide : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHoveredRef.current) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [tSlide, visibleCards]);

  return (
    <section 
      id="testi" 
      className="sec bg-cream"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="wrap">
        <div className="flex justify-between items-end flex-wrap gap-5 mb-10 sm:mb-15">
          <div>
            <div className="tag-label">Voices</div>
            <h2 className="sec-h2 mt-2">Those Who<br /><i>Own a Piece</i></h2>
          </div>
          <div className="flex gap-[3px]">
            <button 
              onClick={prevSlide} 
              className="w-[46px] h-[46px] flex items-center justify-center border border-border text-umber hover:bg-terra hover:border-terra hover:text-white transition-all cursor-none bg-transparent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={nextSlide} 
              className="w-[46px] h-[46px] flex items-center justify-center border border-border text-umber hover:bg-terra hover:border-terra hover:text-white transition-all cursor-none bg-transparent"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex gap-2 sm:gap-[3px] transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
            style={{ transform: `translateX(-${tSlide * (100 / visibleCards)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="shrink-0 w-full sm:w-[calc(50%-4px)] lg:w-[calc(33.33%-2px)] bg-linen border border-border p-6 sm:p-10 relative overflow-hidden"
              >
                <div className="font-head text-[7rem] font-light text-terra/10 absolute top-0 left-4 leading-[0.9] pointer-events-none select-none">“</div>
                <div className="text-terra text-[0.78rem] tracking-[3px] mb-4.5">★★★★★</div>
                <p className="font-accent italic text-[clamp(0.92rem,1.4vw,1.1rem)] text-umber leading-[1.8] mb-5.5 relative z-10">{t.text}</p>
                <div className="border-t border-border pt-4">
                  <div className="font-body text-[0.85rem] font-semibold text-espresso mb-1">{t.name}</div>
                  <div className="font-body text-[0.62rem] font-medium tracking-[0.12em] uppercase text-muted">{t.piece}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex gap-1.25 justify-center mt-7">
          {Array.from({ length: testimonials.length }).map((_, i) => (
            <div 
              key={i} 
              onClick={() => {
                setTSlide(Math.min(i, maxTSlide));
              }}
              className={`h-[2px] cursor-pointer transition-all duration-400 ${
                Math.min(tSlide, maxTSlide) === Math.min(i, maxTSlide) ? 'bg-terra w-9' : 'bg-border w-5.5'
              }`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
