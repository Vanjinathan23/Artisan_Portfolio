/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'motion/react';
import Lenis from 'lenis';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Menu, 
  X, 
  ArrowRight,
  Send,
  Mail,
  Phone,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

/* ═══════════════════════════════
   TYPES
═══════════════════════════════ */

interface GalleryItem {
  id: string;
  cat: string;
  title: string;
  desc: string;
  full: string;
  thumb: string;
  className: string;
}

/* ═══════════════════════════════
   COMPONENTS
═══════════════════════════════ */

const Cursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });
  
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleDragEnter = () => setIsDragMode(true);
    const handleDragLeave = () => setIsDragMode(false);

    window.addEventListener('mousemove', handleMouseMove);

    const interactiveSelectors = '.gi, .s-img, .about-img, .t-card, .phil-card, .pc, button, a';
    const dragSelectors = '#pcscroll';

    const setupListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      document.querySelectorAll(dragSelectors).forEach(el => {
        el.addEventListener('mouseenter', handleDragEnter);
        el.addEventListener('mouseleave', handleDragLeave);
      });
    };

    setupListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.querySelectorAll(dragSelectors).forEach(el => {
        el.removeEventListener('mouseenter', handleDragEnter);
        el.removeEventListener('mouseleave', handleDragLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-[7px] height-[7px] bg-terra rounded-full pointer-events-none z-[99999] -ml-[3.5px] -mt-[3.5px]"
        style={{ x: dotX, y: dotY }}
      />
      <motion.div 
        className={`fixed top-0 left-0 rounded-full border-[1.5px] border-terra/50 pointer-events-none z-[99999] -ml-[17px] -mt-[17px] transition-[width,height,border-color,background] duration-500 ease-custom
          ${isHovered ? 'w-[58px] h-[58px] -ml-[29px] -mt-[29px] border-terra bg-terra/5' : 'w-[34px] h-[34px]'}
          ${isDragMode ? 'w-[50px] h-[50px] -ml-[25px] -mt-[25px] border-copper bg-copper/5' : ''}
        `}
        style={{ x: ringX, y: ringY }}
      />
    </>
  );
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
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
    <div className={`fixed inset-0 z-[99500] bg-walnut flex flex-col items-center justify-center transition-transform duration-860 ease-io-custom ${isWiping ? '-translate-y-full' : ''}`}>
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const galleryItems: GalleryItem[] = [
    { id: '1', cat: 'pottery', title: 'Morning Calm', desc: 'Inspired by the stillness of dawn mist over still water. This vessel was thrown on a cold January morning.', thumb: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&auto=format&fit=crop', className: 'g-big' },
    { id: '2', cat: 'jewelry', title: 'Ember Ring', desc: 'Forged from the memory of a campfire. Hammered over three days from Rajasthan copper.', thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&auto=format&fit=crop', className: 'g-med' },
    { id: '4', cat: 'textile', title: 'Woven Dusk', desc: 'Each thread woven at the hour when light turns amber. Passed down four generations.', thumb: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop', className: 'g-tall' },
    { id: '3', cat: 'painting', title: 'Rainy Season', desc: 'Every brushstroke carried the weight of a monsoon afternoon. Painted on unprimed linen.', thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&auto=format&fit=crop', className: 'g-med' },
    { id: '5', cat: 'pottery', title: 'Earth Vessel', desc: 'Shapened by hands that remember the patience of the soil. Unglazed exterior.', thumb: '/src/assets/images/collection_pottery_vessel_1779208861961.png', full: '/src/assets/images/collection_pottery_vessel_1779208861961.png', className: 'g-wide' },
    { id: '6', cat: 'jewelry', title: 'Silver Drift', desc: 'A sculptural piece that moves like a thought. Hand-forged sterling silver with an organic finish.', thumb: '/src/assets/images/collection_jewelry_silver_1779208879078.png', full: '/src/assets/images/collection_jewelry_silver_1779208879078.png', className: 'g-med' },
    { id: '7', cat: 'painting', title: 'Ochre Mind', desc: 'Abstract explorations of landscape and memory using raw pigments on linen.', thumb: '/src/assets/images/collection_painting_ochre_1779208919121.png', full: '/src/assets/images/collection_painting_ochre_1779208919121.png', className: 'g-med' },
    { id: '8', cat: 'textile', title: 'Indigo Throw', desc: 'Hand-woven using traditional techniques and natural indigo dye. A piece of living heritage.', thumb: '/src/assets/images/collection_textile_thow_1779208900443.png', full: '/src/assets/images/collection_textile_thow_1779208900443.png', className: 'g-med' },
    { id: '9', cat: 'pottery', title: 'Midnight Cup', desc: 'Crafted for the tea ritual of solitude. Dark glaze that holds the color of 3am.', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop', className: 'g-sm' },
    { id: '10', cat: 'jewelry', title: 'Copper Echo', desc: 'Minimalist statement piece that echoes the curves of the landscape.', thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&auto=format&fit=crop', className: 'g-sm' },
    { id: '11', cat: 'painting', title: 'Azure Hour', desc: 'Capturing the brief moment when the sky is neither day nor night.', thumb: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&auto=format&fit=crop', className: 'g-sm' },
    { id: '12', cat: 'pottery', title: 'Stone Jar', desc: 'Heavy, grounded, and permanent. A sentinel for the domestic space.', thumb: '/src/assets/images/collection_stone_jar_1779209073362.png', full: '/src/assets/images/collection_stone_jar_1779209073362.png', className: 'g-med' },
  ];

  const filteredItems = useMemo(() => {
    return activeFilter === 'all' ? galleryItems : galleryItems.filter(item => item.cat === activeFilter);
  }, [activeFilter, galleryItems]);

  const stats = [
    { n: '300+', l: 'Unique Pieces' },
    { n: '12+', l: 'Exhibitions' },
    { n: '100%', l: 'Handmade' },
    { n: '4', l: 'Craft Forms' },
  ];

  const processes = [
    { num: '01 / 07', title: 'Material Selection', desc: 'Only sustainably sourced earth clays. Each batch tested by hand for texture and elasticity.', img: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&auto=format&fit=crop&q=80' },
    { num: '02 / 07', title: 'The Shaping', desc: 'Hands meet clay on the wheel. No templates, no molds. Every form emerges through conversation.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80' },
    { num: '03 / 07', title: 'Refinement', desc: 'Days of drying, trimming, and texturing. The piece is touched hundreds of times.', img: '/src/assets/images/refinement_process_1779208669292.png' },
    { num: '04 / 07', title: 'Slow Drying', desc: 'Patience is a material. We allow moisture to leave the clay naturally over weeks to prevent internal stress.', img: '/src/assets/images/slow_drying_process_1779208490709.png' },
    { num: '05 / 07', title: 'The Bisque Fire', desc: 'Transformative heat at 900°C changes Earth into Stone. A permanent chemical change that prepares the piece.', img: '/src/assets/images/bisque_fire_process_1779208509777.png' },
    { num: '06 / 07', title: 'Glazing Ritual', desc: 'Applied by hand using minerals gathered from the landscape. Each brushstroke creates a unique landscape on the surface.', img: '/src/assets/images/glazing_ritual_process_1779208531913.png' },
    { num: '07 / 07', title: 'The Final Piece', desc: 'Fired at 1280°C. What emerges belongs to both the maker and the flame — a finished piece of soul.', img: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&auto=format&fit=crop&q=80' },
  ];

  /* ═══════════════════════════════
     EVENT HANDLERS
  ═══════════════════════════════ */

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1300);
  };

  const [visibleCards, setVisibleCards] = useState(3);
  useEffect(() => {
    if (mobMenuOpen) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [mobMenuOpen]);
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

  const testimonials = [
    { stars: '★★★★★', text: '"I placed it by my window and it changed how I start my day. It is not just an object — it breathes."', name: 'Priya Mehta', piece: 'Morning Calm Vase' },
    { stars: '★★★★★', text: '"My wife cried when she saw it. Not because it was expensive. Because it looked like it understood her."', name: 'James Holloway', piece: 'Ember Ring' },
    { stars: '★★★★★', text: '"The craftsmanship is unlike anything I found in galleries twice the price. This is the real thing."', name: 'Aiko Tanaka', piece: 'Woven Dusk Scarf' },
    { stars: '★★★★★', text: '"Tea tastes different in these cups. Whoever made them put something invisible in the clay."', name: 'Leila Rostami', piece: 'Midnight Cup Set' },
    { stars: '★★★★★', text: '"Three people asked if it was vintage. No — it is brand new and already timeless."', name: 'Marcus Wren', piece: 'Forest Clasp' },
  ];

  const [testiIdx, setTestiIdx] = useState(0);
  const maxTestiIdx = testimonials.length - visibleCards;
  
  const nextTesti = () => setTestiIdx(i => Math.min(maxTestiIdx, i + 1));
  const prevTesti = () => setTestiIdx(i => Math.max(0, i - 1));

  const pcScrollRef = useRef<HTMLDivElement>(null);
  const [pcProgress, setPcProgress] = useState(0);

  const handlePcScroll = () => {
    if (pcScrollRef.current) {
      const el = pcScrollRef.current;
      const max = el.scrollWidth - el.clientWidth;
      setPcProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <Cursor />}

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-terra z-[99990] origin-left"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <nav id="nav" className={`fixed top-0 w-full z-[9000] transition-all duration-450 ease-custom`}>
        <div className={`flex items-center justify-between transition-all duration-450 py-4 sm:py-8 px-5 sm:px-16 ${scrolled ? 'bg-cream/93 backdrop-blur-[22px] border-b border-border !py-3 sm:!py-4' : ''}`}>
          <a href="#" className={`font-head text-[1.35rem] sm:text-[1.55rem] tracking-[0.28em] transition-colors duration-400 ${scrolled ? 'text-espresso' : 'text-ondark'}`}>ARTISANA</a>
          
          <ul className="hidden md:flex gap-11">
            {['Story', 'Craft', 'Gallery', 'Philosophy', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`relative pb-1 text-[0.65rem] font-medium tracking-[0.22em] uppercase font-body transition-colors group ${scrolled ? 'text-umber hover:text-terra' : 'text-ondark/70 hover:text-ondark'}`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-350 ease-custom group-hover:w-full ${scrolled ? 'bg-terra' : 'bg-sand'}`}></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a href="#contact">
              <button className={`hidden sm:block font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase border px-[22px] py-[10px] transition-all duration-350 ${scrolled ? 'border-border text-espresso hover:bg-terra hover:border-terra hover:text-white' : 'border-ondark/28 text-ondark hover:bg-terra hover:border-terra hover:text-white'}`}>
                Enquire
              </button>
            </a>
            <button 
              onClick={() => setMobMenuOpen(!mobMenuOpen)}
              className={`flex flex-col gap-[5px] p-1 z-[9001] md:hidden`}
            >
              <span className={`block h-[1.5px] transition-all duration-350 ease-io-custom ${mobMenuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'} ${scrolled || mobMenuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
              <span className={`block h-[1.5px] transition-all duration-350 ease-io-custom ${mobMenuOpen ? 'opacity-0' : 'w-[18px]'} ${scrolled || mobMenuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
              <span className={`block h-[1.5px] transition-all duration-350 ease-io-custom ${mobMenuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-[20px]'} ${scrolled || mobMenuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.87, 0, 0.13, 1] }}
            className="fixed inset-0 z-[8900] bg-walnut flex flex-col justify-center px-[32px] sm:px-[80px]"
          >
            {['Story', 'The Craft', 'Gallery', 'Philosophy', 'Contact'].map((item, i) => (
              <div key={item} className="mb-[20px] overflow-hidden">
                <motion.a 
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.07 + i * 0.06, duration: 0.55 }}
                  href={`#${item.replace(' ', '').toLowerCase()}`}
                  onClick={() => setMobMenuOpen(false)}
                  className="font-head text-[clamp(2.2rem,7vw,4.5rem)] font-light text-ondark hover:text-sand"
                >
                  {item}
                </motion.a>
              </div>
            ))}
            <div className="mt-auto pt-[48px] border-t border-ondark/10 flex gap-6 flex-wrap">
              {['Instagram', 'Pinterest', 'YouTube'].map(social => (
                <a key={social} href="#" className="text-[0.65rem] tracking-[0.18em] uppercase text-muted hover:text-sand transition-colors">{social}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section id="hero" className="w-full h-screen min-h-[640px] grid md:grid-cols-[55%_45%] relative overflow-hidden bg-cream">
          <div className="relative z-10 flex flex-col justify-end bg-walnut px-7 py-20 sm:px-16 sm:py-24 md:px-16 overflow-hidden">
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
                <a href="#gallery" className="inline-block bg-terra text-white px-8 sm:px-10 py-4 sm:py-4.5 font-body text-[0.6rem] sm:text-[0.62rem] font-semibold tracking-[0.22em] uppercase hover:bg-sepia transition-all whitespace-nowrap">Explore Works</a>
                <a href="#contact" className="inline-block border border-white/20 text-white px-8 sm:px-10 py-4 sm:py-4.5 font-body text-[0.6rem] sm:text-[0.62rem] font-semibold tracking-[0.22em] uppercase hover:bg-white/5 hover:border-white/40 transition-all whitespace-nowrap">Begin a Story</a>
              </motion.div>
            </div>
          </div>
          
          <div className="hidden md:block relative overflow-hidden bg-parch">
            <img 
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop&q=85" 
              alt="Artisan hands"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-walnut/55 via-walnut/10 to-transparent" />
            <div className="absolute top-[clamp(90px,14vh,130px)] left-5 font-head text-[0.65rem] tracking-[0.3em] uppercase text-ondark/50 [writing-mode:vertical-rl]">Since 2018</div>
            <div className="absolute top-[clamp(90px,14vh,130px)] right-10 w-[90px] h-[90px] rounded-full bg-terra flex flex-col items-center justify-center animate-[spin_20s_linear_infinite]">
              <span className="font-head text-[1.5rem] font-light text-white leading-none">6+</span>
              <small className="font-body text-[0.45rem] tracking-[0.15em] uppercase text-white/70">Years</small>
            </div>
            <div className="absolute bottom-[clamp(28px,5vw,52px)] right-10 bg-cream/92 backdrop-blur-md p-[18px_22px] max-w-[200px] border-l-2 border-terra">
              <div className="font-body text-[0.55rem] font-medium tracking-[0.22em] uppercase text-muted mb-1">Currently available</div>
              <div className="font-head text-[1.15rem] text-espresso leading-tight">Commission a Piece</div>
            </div>
          </div>

          <div className="absolute left-[55%] top-0 bottom-0 w-[1px] bg-white/5 z-20 hidden md:block" />
          
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

        {/* MARQUEE */}
        <div className="bg-terra py-[13px] overflow-hidden whitespace-nowrap">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex hover:[animation-play-state:paused]"
          >
            {[1, 2].map((_, i) => (
              <div key={i} className="flex shrink-0">
                {["Handcrafted Pottery", "Artisan Jewelry", "Original Paintings", "Woven Textiles", "Traditional Craft", "Made with Soul"].map((text, j) => (
                  <div key={j} className="mi inline-flex items-center gap-7 px-7 font-head italic text-[1.05rem] text-white/90">
                    {text}
                    <span className="not-italic text-[0.6rem] opacity-55 font-serif">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ABOUT */}
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

        {/* PROCESS */}
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
            ref={pcScrollRef}
            onScroll={handlePcScroll}
            className="overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-[3px] px-6 sm:px-16 w-max">
              {processes.map((p, i) => (
                <div key={i} className="shrink-0 w-[250px] sm:w-[27vw] max-w-[360px] bg-white/[0.03] border border-white/[0.07] overflow-hidden group">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
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

        {/* GALLERY */}
        <section id="gallery" className="sec bg-linen">
          <div className="wrap">
            <div className="flex justify-between items-end flex-wrap gap-6 mb-10 sm:mb-14">
              <div>
                <div className="tag-label">The Collection</div>
                <h2 className="sec-h2 mt-2">Works That<br /><i>Hold Memory</i></h2>
              </div>
              <div className="flex gap-[3px] flex-wrap">
                {['all', 'pottery', 'jewelry', 'painting', 'textile'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`font-body text-[0.6rem] font-medium tracking-[0.18em] uppercase px-[18px] py-[9px] border border-border transition-all duration-300 ${activeFilter === f ? 'bg-terra border-terra text-white' : 'bg-transparent text-umber hover:bg-terra hover:border-terra hover:text-white'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-12 gap-2 sm:gap-[4px]">
              {filteredItems.map((item, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`gi relative group overflow-hidden cursor-none ${item.className} 
                    ${item.className === 'g-big' ? 'col-span-12 md:col-span-12 lg:col-span-5 row-span-1 lg:row-span-2 min-h-[280px] md:min-h-[380px] lg:min-h-[440px]' : ''}
                    ${item.className === 'g-med' ? 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[240px] md:min-h-[210px]' : ''}
                    ${item.className === 'g-tall' ? 'col-span-12 sm:col-span-6 lg:col-span-3 row-span-1 lg:row-span-2 min-h-[300px] md:min-h-[440px]' : ''}
                    ${item.className === 'g-wide' ? 'col-span-12 md:col-span-12 lg:col-span-8 min-h-[260px] md:min-h-[230px]' : ''}
                    ${item.className === 'g-sm' ? 'col-span-12 sm:col-span-6 lg:col-span-4 min-h-[220px] md:min-h-[230px]' : ''}
                  `}
                >
                  <img src={item.thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-750 ease-custom group-hover:scale-[1.06]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-walnut/[0.88] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-custom flex flex-col justify-end p-[18px]">
                    <div className="font-head text-[1.2rem] text-ondark">{item.title}</div>
                    <div className="font-body text-[0.58rem] font-medium tracking-[0.18em] uppercase text-sand mt-1">{item.cat}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY MODAL */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-[60000] bg-walnut/[0.97] flex items-center justify-center p-5"
            >
              <button className="absolute top-4 right-4 bg-transparent border border-white/[0.15] text-ondark w-[42px] h-[42px] flex items-center justify-center hover:bg-terra hover:border-terra transition-all">
                <X size={20} />
              </button>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="grid md:grid-cols-[1.25fr_1fr] max-w-[1000px] w-full max-h-[90vh] overflow-hidden rounded-sm"
              >
                <div className="bg-black relative min-h-[260px] md:min-h-0">
                  <img src={selectedItem.full} alt={selectedItem.title} className="w-full h-full object-cover" />
                </div>
                <div className="bg-parch p-7 md:p-13 flex flex-col justify-center relative overflow-y-auto">
                  <div className="font-head text-[5rem] font-light text-espresso/[0.1] leading-none mb-[-20px] select-none">
                    {selectedItem.id.padStart(2, '0')}
                  </div>
                  <div className="font-body text-[0.6rem] font-medium tracking-[0.25em] uppercase text-terra mb-3">
                    {selectedItem.cat}
                  </div>
                  <h2 className="font-head text-[clamp(1.7rem,3vw,2.6rem)] text-espresso mb-4 leading-[1.1]">
                    {selectedItem.title}
                  </h2>
                  <p className="font-body text-[0.87rem] font-light text-umber leading-[1.85] mb-8">
                    {selectedItem.desc}
                  </p>
                  <a href={`https://wa.me/919999999999?text=Hello%2C+I+am+interested+in+${selectedItem.title}`} target="_blank" className="inline-block bg-terra text-white px-8 py-3.5 font-body text-[0.68rem] font-medium tracking-[0.2em] uppercase text-center">
                    Enquire About This Piece
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STORIES */}
        <section id="stories" className="sec bg-cream">
          <div className="wrap">
            <div className="mb-14 sm:mb-25">
              <div className="tag-label">Featured Works</div>
              <h2 className="sec-h2 mt-2">Every Piece<br />Has a <i>Story</i></h2>
            </div>
            
            {[
              { id: '01', title: 'Morning Calm', text: 'Inspired by the calmness of rainy mornings. This vessel was thrown before dawn — when the studio held the same silence as the world outside.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80', cat: 'Pottery · 2024', flip: false },
              { id: '02', title: 'Ember Ring', text: 'Forged from the memory of a campfire that burned through the night. The copper was sourced from a single mine in Rajasthan. No molds. No casting.', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&auto=format&fit=crop&q=80', cat: 'Jewelry · 2023', flip: true },
              { id: '03', title: 'Rainy Season', text: 'Painted on unprimed linen with hand-ground mineral pigments — the same materials used by painters four centuries ago.', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&auto=format&fit=crop&q=80', cat: 'Painting · 2023', flip: false },
            ].map((story, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-10 md:gap-24 items-center mb-20 md:mb-32 last:mb-0`}>
                <motion.div 
                  initial={{ opacity: 0, x: story.flip ? 44 : -44 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative ${story.flip ? 'md:order-2' : ''}`}
                >
                  <div className="relative z-10 aspect-[4/5] overflow-hidden group">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover transition-transform duration-[1.1s] group-hover:scale-[1.04]" />
                  </div>
                  <div className="absolute bottom-[-16px] right-[-16px] font-head text-[7rem] font-light text-parch/60 leading-none z-0 select-none">
                    {story.id}
                  </div>
                </motion.div>
                <div className={`${story.flip ? 'md:order-1' : ''}`}>
                  <div className="tag-label">{story.cat}</div>
                  <h3 className="s-h3 font-head text-[clamp(2rem,4vw,3.4rem)] text-espresso leading-none mb-5">{story.title}</h3>
                  <p className="font-body text-[clamp(0.83rem,1.1vw,0.92rem)] font-light text-umber leading-[1.9] mb-7">{story.text}</p>
                  <a href="https://wa.me/919999999999" target="_blank" className="inline-flex items-center gap-3 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-terra border-b border-border pb-2 group transition-all">
                    Enquire About This Piece
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="philosophy" className="sec bg-walnut relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-head text-[clamp(8rem,20vw,24rem)] font-light text-white/[0.018] whitespace-nowrap pointer-events-none select-none tracking-[0.08em]">CRAFT</div>
          <div className="wrap relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center mb-12 sm:mb-20">
              <div>
                <div className="tag-label light">The Philosophy</div>
                <h2 className="sec-h2 light mt-2">What This<br />Craft <i>Believes</i></h2>
              </div>
              <p className="font-body text-[clamp(0.84rem,1.2vw,0.95rem)] font-light text-white/48 leading-[1.9]">
                Craft is not a style. It is a conviction. A daily act of resistance against the disposable and the fast. Each piece is a small argument for permanence in a world that celebrates speed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-[2px]">
              {[
                { icon: '◉', title: 'Handmade Always', text: 'No machines. No shortcuts. Every curve is the result of hands that chose slowness over efficiency.' },
                { icon: '◈', title: 'Sustainable Materials', text: 'Earth-sourced, responsibly gathered. The materials leave the land as whole as they found it.' },
                { icon: '⬡', title: 'Traditional Techniques', text: 'Methods passed through generations. The knowledge of ancestors lives in every movement.' },
              ].map((phil, i) => (
                <div key={i} className="bg-white/[0.025] border border-white/[0.06] p-7 sm:p-12 relative overflow-hidden group transition-bg duration-400 hover:bg-white/[0.045]">
                  <div className="font-head text-[2.8rem] font-light text-sand opacity-38 mb-[22px] leading-none">{phil.icon}</div>
                  <div className="absolute top-[18px] right-[18px] font-body text-[0.55rem] font-medium tracking-[0.2em] text-white/12">0{i+1}</div>
                  <h3 className="font-head text-[1.45rem] text-ondark mb-3">{phil.title}</h3>
                  <p className="font-body text-[0.8rem] font-light text-white/42 leading-[1.8]">{phil.text}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-terra scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 md:mt-20 p-9 sm:p-16 border border-white/[0.07] relative">
              <div className="font-head text-[9rem] font-light text-white/[0.05] absolute top-0 left-7 leading-none select-none">"</div>
              <p className="font-head italic text-[clamp(1.6rem,3.5vw,2.8rem)] font-light text-ondark leading-[1.35] relative z-10">
                "Every imperfection tells a story more interesting than perfection ever could."
              </p>
              <cite className="font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase text-muted mt-4.5 block not-italic">— Studio Artisana, 2024</cite>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testi" className="sec bg-cream">
          <div className="wrap">
            <div className="flex justify-between items-end flex-wrap gap-5 mb-10 sm:mb-15">
              <div>
                <div className="tag-label">Voices</div>
                <h2 className="sec-h2 mt-2">Those Who<br /><i>Own a Piece</i></h2>
              </div>
              <div className="flex gap-[3px]">
                <button onClick={prevTesti} className="w-[46px] h-[46px] flex items-center justify-center border border-border text-umber hover:bg-terra hover:border-terra hover:text-white transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextTesti} className="w-[46px] h-[46px] flex items-center justify-center border border-border text-umber hover:bg-terra hover:border-terra hover:text-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <div 
                className="flex gap-2 sm:gap-[3px] transition-transform duration-700 ease-io-custom"
                style={{ transform: `translateX(-${testiIdx * (100 / visibleCards)}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="shrink-0 w-full sm:w-[calc(50%-4px)] lg:w-[calc(33.33%-2px)] bg-linen border border-border p-6 sm:p-10 relative overflow-hidden">
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
              {testimonials.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setTestiIdx(i)}
                  className={`h-[2px] cursor-pointer transition-all duration-400 ${testiIdx === i ? 'bg-terra w-9' : 'bg-border w-5.5'}`} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec bg-walnut relative overflow-hidden">
          <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] border border-white/[0.04] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-240px] right-[-240px] w-[800px] h-[800px] border border-white/[0.025] rounded-full pointer-events-none" />
          
          <div className="wrap relative z-10">
            <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 sm:gap-28 items-start">
              <div>
                <div className="tag-label light">Get in Touch</div>
                <h2 className="sec-h2 light mb-[22px] mt-2">Begin a<br /><i>Conversation</i></h2>
                <p className="font-body text-[0.9rem] font-light text-white/48 leading-[1.85] mb-10 max-w-[380px]">
                  Every commission starts with a conversation. Tell me what you're looking for — not just the object, but the feeling it should carry.
                </p>
                
                <div className="flex flex-col gap-4.5">
                  {[
                    { icon: <Mail size={16} />, label: 'Email', val: 'hello@artisana.in' },
                    { icon: <Phone size={16} />, label: 'Phone', val: '+91 99999 99999' },
                    { icon: <MapPin size={16} />, label: 'Studio', val: 'Artisan Quarter, Chennai' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3.5 items-start">
                      <div className="w-[38px] h-[38px] border border-white/10 flex items-center justify-center shrink-0">{item.icon}</div>
                      <div>
                        <span className="block font-body text-[0.58rem] font-medium tracking-[0.2em] uppercase text-muted mb-[2px]">{item.label}</span>
                        <span className="font-body text-[0.84rem] font-light text-white/68">{item.val}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-[3px] mt-8">
                  {['Ig', 'Pt', 'Yt', 'Be'].map(soc => (
                    <a key={soc} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center font-body text-[0.6rem] font-medium tracking-[0.1em] text-white/38 hover:border-sand hover:text-sand hover:bg-sand/[0.08] transition-all uppercase">{soc}</a>
                  ))}
                </div>
              </div>

              <div>
                <form onSubmit={handleFormSubmit} className="bg-white/[0.03] border border-white/[0.08] p-7 sm:p-12 relative">
                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-accent italic text-[1.15rem] text-sand text-center p-5.5 border border-sand/20"
                    >
                      Your message has been received. I'll respond within 24 hours.
                    </motion.div>
                  ) : (
                    <>
                      <div className="relative mb-[3px]">
                        <input type="text" id="fn" placeholder=" " required className="peer w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all" />
                        <label htmlFor="fn" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Your Name</label>
                      </div>
                      <div className="relative mb-[3px]">
                        <input type="email" id="fe" placeholder=" " required className="peer w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all" />
                        <label htmlFor="fe" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Email Address</label>
                      </div>
                      <div className="relative mb-[3px]">
                        <select className="w-full bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all appearance-none cursor-none">
                          <option value="">Interested in...</option>
                          <option>Commission a Piece</option>
                          <option>Exhibition Enquiry</option>
                          <option>Collaboration</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="relative mb-[3px]">
                        <textarea id="fm" placeholder=" " required className="peer w-full h-[100px] bg-white/[0.035] border-none border-b border-white/12 text-ondark p-[20px_16px_10px] font-body text-[0.88rem] font-light outline-none focus:border-b-sand focus:bg-white/[0.06] transition-all resize-none" />
                        <label htmlFor="fm" className="absolute top-4.5 left-4 font-body text-[0.68rem] text-white/30 pointer-events-none transition-all peer-focus:top-1.5 peer-focus:text-[0.57rem] peer-focus:text-sand peer-focus:tracking-[0.15em] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[0.57rem] peer-[:not(:placeholder-shown)]:text-sand">Your Message</label>
                      </div>
                      <button 
                        type="submit" 
                        disabled={formStatus === 'sending'}
                        className="w-full mt-[3px] bg-terra text-white p-[17px] font-body text-[0.68rem] font-medium tracking-[0.22em] uppercase hover:bg-[#9e4e2e] transition-colors"
                      >
                        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-walnut border-t border-white/[0.06] pt-15 pb-8 sm:pt-25">
        <div className="wrap">
          <div className="font-head text-[clamp(4rem,10vw,10rem)] tracking-[0.15em] text-white/[0.05] leading-none mb-9 sm:mb-15 select-none text-center pl-[0.15em]">
            ARTISANA
          </div>
          <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-7 sm:gap-15 mb-11 sm:mb-16">
            <div className="footer-col">
              <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Artisana</h4>
              <p className="font-body text-[0.78rem] font-light text-white/35 leading-[1.8]">A living philosophy of craft. Handmade with intention. Made to last a lifetime and carry a story worth telling to whoever asks.</p>
            </div>
            <div className="footer-col">
              <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Navigate</h4>
              <ul className="flex flex-col gap-2.5">
                {['Story', 'Craft', 'Gallery', 'Philosophy', 'Contact'].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="font-body text-[0.75rem] text-white/32 hover:text-sand transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="font-head text-[1.05rem] text-ondark mb-3.5">Connect</h4>
              <ul className="flex flex-col gap-2.5">
                {['Instagram', 'Pinterest', 'YouTube', 'Behance'].map(item => (
                  <li key={item}><a href="#" className="font-body text-[0.75rem] text-white/32 hover:text-sand transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.07] pt-6.5 flex flex-col sm:flex-row justify-between items-center gap-2.5 text-center sm:text-left">
            <p className="font-body text-[0.63rem] tracking-[0.1em] text-white/20">© 2024 Artisana Studio. All rights reserved.</p>
            <a href="#" className="font-body text-[0.63rem] tracking-[0.1em] text-white/20 hover:text-sand transition-colors">Privacy Policy</a>
            <p className="font-body text-[0.63rem] tracking-[0.1em] text-white/20">Crafted with Soul · Chennai, India</p>
          </div>
        </div>
      </footer>

      {/* WHATSAPP */}
      <a 
        href="https://wa.me/919999999999?text=Hello%2C+I+found+your+work+on+Artisana" 
        target="_blank" 
        className="fixed bottom-[20px] right-[20px] sm:bottom-[30px] sm:right-[30px] z-[8500] flex items-center group gap-0 hover:gap-2.5 transition-all duration-350 ease-custom"
      >
        <div className="bg-walnut/85 border border-[#25d366]/25 text-[#25d366]/80 font-body text-[0.58rem] font-medium tracking-[0.15em] uppercase px-0 py-[9px] max-w-0 opacity-0 group-hover:max-w-[160px] group-hover:px-[13px] group-hover:opacity-100 overflow-hidden whitespace-nowrap transition-all duration-400 ease-custom hidden sm:block">
          Enquire Now
        </div>
        <div className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] bg-[#25d366] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_0_0_rgba(37,211,102,0.4)] animate-[wap_2.5s_ease_infinite] group-hover:scale-110 transition-transform">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </div>
      </a>

      <style>{`
        @keyframes wap {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 14px rgba(37, 211, 102, 0); }
        }
      `}</style>
    </>
  );
}
