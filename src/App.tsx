import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Stylesheet
import './styles/main.css';

// Hooks
import { useScrollProgress } from './hooks/useScrollProgress';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

// Data Types
import { GalleryItem } from './data/galleryItems';

// Components
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Process } from './components/Process';
import { WaitingRoom } from './components/WaitingRoom';
import { Gallery } from './components/Gallery';
import { Stories } from './components/Stories';
import { CraftDNA } from './components/CraftDNA';
import { Philosophy } from './components/Philosophy';
import { PieceJourney } from './components/PieceJourney';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsApp } from './components/WhatsApp';
import { GalleryModal } from './components/GalleryModal';
import { PieceMemory } from './components/PieceMemory';

function MainPortfolio() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [modalData, setModalData] = useState<GalleryItem | null>(null);

  const scaleX = useScrollProgress();
  useIntersectionObserver();

  // Smooth Scroll Initialization via Lenis
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

    return () => {
      lenis.destroy();
    };
  }, []);

  // Preloader Scroll Locking
  useEffect(() => {
    document.body.classList.toggle('locked', !preloaderDone);
    return () => {
      document.body.classList.remove('locked');
    };
  }, [preloaderDone]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      </AnimatePresence>

      <Cursor />

      {/* Top Scroll Progress Line */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-terra z-[99990] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero preloaderDone={preloaderDone} />
        <Marquee />
        <About />
        <Process />
        <WaitingRoom />
        <Gallery onSelectItem={(item) => setModalData(item)} />
        <Stories />
        <CraftDNA />
        <Philosophy />
        <PieceJourney />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <WhatsApp />

      <GalleryModal 
        modalData={modalData} 
        onClose={() => setModalData(null)} 
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/piece/:id" element={<PieceMemory />} />
      </Routes>
    </BrowserRouter>
  );
}

