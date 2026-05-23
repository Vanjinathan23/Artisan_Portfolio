import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navStuck, setNavStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavStuck(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('locked', menuOpen);
    return () => {
      document.body.classList.remove('locked');
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id);
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      scrollTo(id);
    }, 450);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav id="nav" className="fixed top-0 w-full z-[9000] transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className={`flex items-center justify-between transition-all duration-[450ms] py-4 sm:py-8 px-5 sm:px-16 ${navStuck ? 'bg-cream/93 backdrop-blur-[22px] border-b border-border !py-3 sm:!py-4' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`font-head text-[1.35rem] sm:text-[1.55rem] tracking-[0.28em] transition-colors duration-400 ${navStuck ? 'text-espresso' : 'text-ondark'}`}>ARTISANA</a>
          
          <ul className="hidden md:flex gap-11">
            {['Story', 'Craft', 'Gallery', 'Philosophy', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className={`relative pb-1 text-[0.65rem] font-medium tracking-[0.22em] uppercase font-body transition-colors group ${navStuck ? 'text-umber hover:text-terra' : 'text-ondark/70 hover:text-ondark'}`}
                >
                  {item}
                  <span className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full ${navStuck ? 'bg-terra' : 'bg-sand'}`}></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollTo('contact')}
              className={`hidden sm:block font-body text-[0.62rem] font-medium tracking-[0.2em] uppercase border px-[22px] py-[10px] transition-all duration-[350ms] ${navStuck ? 'border-border text-espresso hover:bg-terra hover:border-terra hover:text-white' : 'border-ondark/28 text-ondark hover:bg-terra hover:border-terra hover:text-white'}`}
            >
              Enquire
            </button>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] p-1 z-[9001] md:hidden bg-transparent border-none cursor-none"
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] transition-all duration-[350ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${menuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'} ${navStuck || menuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
              <span className={`block h-[1.5px] transition-all duration-[350ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${menuOpen ? 'opacity-0' : 'w-[18px]'} ${navStuck || menuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
              <span className={`block h-[1.5px] transition-all duration-[350ms] ease-[cubic-bezier(0.87,0,0.13,1)] ${menuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-[20px]'} ${navStuck || menuOpen ? 'bg-espresso' : 'bg-ondark'}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
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
                  onClick={(e) => handleMobileNavClick(e, item.replace(' ', '').toLowerCase())}
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
    </>
  );
};

export default Navbar;
