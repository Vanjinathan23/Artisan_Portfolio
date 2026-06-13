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
import { GalleryModal } from './components/GalleryModal';
import { PieceMemory } from './components/PieceMemory';

// The Apprentice visual companion components
import { Apprentice } from './components/Apprentice';
import { SpotlightOverlay } from './components/SpotlightOverlay';
import { useApprenticeState } from './hooks/useApprenticeState.js';
import { parseAIResponse, runTour } from './utils/tourEngine.js';
import { speak, isVoiceOutputEnabled } from './utils/voiceEngine.js';
import { retrieveWithBoost } from './utils/ragEngine.js';
import { buildSystemPrompt, buildLocalResponse } from './utils/chatPersona.js';

function MainPortfolio() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [modalData, setModalData] = useState<GalleryItem | null>(null);

  const apprentice = useApprenticeState();
  const [cutout, setCutout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = useState(false);

  // Models list
  const envModel = import.meta.env.VITE_GEMINI_MODEL;
  const MODELS = envModel
    ? [envModel, 'gemini-2.5-flash-preview-05-20', 'gemini-2.0-flash']
    : ['gemini-2.5-flash-preview-05-20', 'gemini-2.0-flash'];

  // Helper retry fetch
  const fetchWithRetry = async (url: string, options: RequestInit, retries = 3, delayMs = 1000): Promise<Response> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const response = await fetch(url, options);
      if ((response.status === 503 || response.status === 429) && attempt < retries) {
        await new Promise(r => setTimeout(r, delayMs * Math.pow(2, attempt)));
        continue;
      }
      return response;
    }
    throw new Error('Studio is temporarily busy. Please try again in a moment.');
  };

  const handleApprenticeQuery = async (text: string) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    apprentice.setState('thinking');
    apprentice.setBubbleText(null);
    apprentice.setBubbleActions(null);

    // Add user message to history
    const userMsg = { role: 'user', content: text.trim() };
    const updatedHistory = [...messages, userMsg].slice(-6);
    setMessages(prev => [...prev, userMsg]);

    try {
      // ── STEP 1: RAG RETRIEVAL ────────────────────────────────────────────────
      const retrievedDocs = retrieveWithBoost(text.trim(), 5);

      // ── STEP 2: BUILD SYSTEM PROMPT WITH CONTEXT ─────────────────────────────
      const systemPrompt = buildSystemPrompt(retrievedDocs);

      // ── STEP 3: BUILD CONVERSATION HISTORY ───────────────────────────────────
      const history = updatedHistory.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // ── STEP 4: CALL GEMINI API (with retry + model fallback) ──────────────────
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY is not set. Please add it to your .env file.');
      }

      const requestBody = {
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: history,
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7,
        }
      };

      const fetchOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      };

      let response: Response | null = null;
      let lastError = '';

      for (const model of MODELS) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const res = await fetchWithRetry(url, fetchOptions, 2, 800);
          if (res.ok) { response = res; break; }
          const errBody = await res.json().catch(() => ({}));
          lastError = errBody?.error?.message || `API error: ${res.status}`;
          if (res.status === 429 || res.status === 503) continue;
          if (res.status === 400 || res.status === 401 || res.status === 403) break;
          throw new Error(lastError);
        } catch (e: any) {
          lastError = e?.message || 'Unknown error';
          continue;
        }
      }

      let assistantContent: string;
      if (response) {
        const data = await response.json();
        assistantContent =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          buildLocalResponse(text.trim(), retrievedDocs);
      } else {
        assistantContent = buildLocalResponse(text.trim(), retrievedDocs);
      }

      // Add to conversation history
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);

      // Parse the response
      const parsed = parseAIResponse(assistantContent);

      if (parsed.type === 'tour') {
        // Run the guided tour
        await runTour(parsed.steps, {
          setCutout,
          setState: apprentice.setState,
          setPosition: apprentice.setPosition,
          setBubbleText: apprentice.setBubbleText,
          setBubbleActions: apprentice.setBubbleActions,
          setTourActive,
          voiceEnabled: isVoiceOutputEnabled()
        });
      } else {
        // Simple text response
        apprentice.setState('speaking');
        apprentice.setBubbleText(parsed.content);
        
        // Define simple close action
        apprentice.setBubbleActions([
          {
            label: 'Close',
            onClick: () => {
              apprentice.setState('idle');
              apprentice.setBubbleText(null);
              apprentice.setBubbleActions(null);
            }
          }
        ]);

        if (isVoiceOutputEnabled()) {
          speak(parsed.content, {
            onEnd: () => apprentice.setState('idle')
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      apprentice.setState('idle');
      apprentice.setBubbleText(err?.message || "I had trouble reaching the studio. Try typing your message or email hello@artisana.in");
      apprentice.setBubbleActions([
        {
          label: 'Close',
          onClick: () => {
            apprentice.setBubbleText(null);
            apprentice.setBubbleActions(null);
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Expose global window.openApprentice function
  useEffect(() => {
    window.openApprentice = (query?: string) => {
      apprentice.setIsOpen(true);
      if (query) {
        handleApprenticeQuery(query);
      }
    };
    return () => {
      window.openApprentice = undefined;
    };
  }, [apprentice]);

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
      <Apprentice {...apprentice} onQuery={handleApprenticeQuery} />
      <SpotlightOverlay cutout={cutout} tourActive={tourActive} />

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

