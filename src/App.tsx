import { useState, useEffect, useRef } from 'react';
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
import { UnseenHours } from './components/UnseenHours';

import Apprentice from './components/Apprentice';
import { SpotlightOverlay } from './components/SpotlightOverlay';
import { PointerArrow } from './components/PointerArrow';
import { useApprenticeState } from './hooks/useApprenticeState';
import { useFirstVisitWelcome } from './hooks/useFirstVisitWelcome.js';
import { useTourGuides } from './hooks/useTourGuides';
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
  const [messages, setMessages] = useState<Array<{ id?: string; role: string; content: string; typing?: boolean }>>([]);
  const [loading, setLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState<any>(null);
  const [hasPointerArrow, setHasPointerArrow] = useState(false);

  const sendInFlightRef = useRef(false);
  const messagesRef = useRef<Array<{ id?: string; role: string; content: string; typing?: boolean }>>([]);

  // Keep messagesRef ALWAYS in sync with the latest messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const {
    showReturnPill,
    setShowReturnPill,
    returnAnchor,
    setReturnAnchor,
    stepIndex,
    startOverviewTour,
    goToNextStep,
    goToPreviousStep,
    endOverviewTour,
    openApprenticeGuide,
    endTourEarly
  } = useTourGuides({
    apprentice,
    setCutout,
    setTourActive,
    setCurrentStep,
    setHasPointerArrow
  });

  // Use the welcome hook
  useFirstVisitWelcome(
    true, // apprenticeReady
    apprentice.setBubbleText,
    apprentice.setBubbleVariant,
    apprentice.setBubbleActions,
    startOverviewTour
  );

  // Expose context-aware help globally for components
  useEffect(() => {
    (window as any).openApprenticeGuide = openApprenticeGuide;
  }, [openApprenticeGuide]);

  // Models list
  const envModel = (import.meta as any).env?.VITE_GEMINI_MODEL;
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

  const getTargetSectionFromQuery = (text: string): string | null => {
    const q = text.toLowerCase().trim();
    
    if (['waiting room', 'waiting-room', 'reserve', 'booking', 'appointment', 'spot', 'slot', 'waitinglist', 'waitlist'].some(k => q.includes(k))) {
      return 'waiting-room';
    }
    if (['craft dna', 'craft-dna', 'dna', 'quiz', 'match', 'style quiz'].some(k => q.includes(k))) {
      return 'craft-dna';
    }
    if (['piece journey', 'piece-journey', 'provenance', 'origin', 'timeline', 'history', 'journey'].some(k => q.includes(k))) {
      return 'piece-journey';
    }
    if (['process', 'how do you make', 'clay', 'throwing', 'kiln', 'glazing', 'steps', 'crafting'].some(k => q.includes(k))) {
      return 'process';
    }
    if (['gallery', 'collection', 'pieces', 'artworks', 'creations', 'pottery', 'showcase'].some(k => q.includes(k))) {
      return 'gallery';
    }
    if (['about', 'maker', 'who are you', 'story', 'background', 'craftsman', 'profile'].some(k => q.includes(k))) {
      return 'about';
    }
    if (['philosophy', 'wabi-sabi', 'wabi sabi', 'imperfection', 'soul', 'concept'].some(k => q.includes(k))) {
      return 'philosophy';
    }
    if (['testimonials', 'reviews', 'feedback', 'customers', 'collector', 'thoughts'].some(k => q.includes(k))) {
      return 'testimonials';
    }
    if (['contact', 'location', 'map', 'reach', 'email', 'find you', 'address'].some(k => q.includes(k))) {
      return 'contact';
    }
    if (['hero', 'intro', 'welcome', 'header', 'home'].some(k => q.includes(k))) {
      return 'hero';
    }
    
    return null;
  };

  const handleApprenticeQuery = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || sendInFlightRef.current) return;

    sendInFlightRef.current = true;

    // Check for pre-built tour request
    const q = trimmedText.toLowerCase();
    const isTourRequest = ['tour', 'show me around', 'walk me through everything', 'overview of the site', 'guided tour', 'overview tour'].some(keyword => q.includes(keyword));
    if (isTourRequest) {
      apprentice.setIsOpen(false);
      startOverviewTour();
      sendInFlightRef.current = false;
      return;
    }

    // Auto-scroll to matched section
    const targetSection = getTargetSectionFromQuery(trimmedText);
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) {
        if (!tourActive) {
          setReturnAnchor(window.scrollY);
          setShowReturnPill(true);
        }
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }

    const userMsgId = `u-${Date.now()}`;
    const userMessage = { id: userMsgId, role: 'user', content: trimmedText };

    // ALWAYS use functional setMessages
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    apprentice.setState('thinking');
    apprentice.setBubbleText(null);
    apprentice.setBubbleActions(null);

    const assistantMsgId = `a-${Date.now()}`;
    // Add placeholder immediately
    setMessages(prev => [
      ...prev,
      { id: assistantMsgId, role: 'assistant', content: '', typing: true }
    ]);

    try {
      // ── STEP 1: RAG RETRIEVAL ────────────────────────────────────────────────
      const retrievedDocs = retrieveWithBoost(trimmedText, 5);

      // ── STEP 2: BUILD SYSTEM PROMPT WITH CONTEXT ─────────────────────────────
      const systemPrompt = buildSystemPrompt(retrievedDocs);

      // ── STEP 3: BUILD CONVERSATION HISTORY (Ref-backed snapshot to avoid stale closures) ────────
      const history = messagesRef.current
        .filter(m => !m.typing)
        .slice(-6)
        .map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));
      // Append current user message
      history.push({
        role: 'user',
        parts: [{ text: trimmedText }]
      });

      // ── STEP 4: CALL GEMINI API (with retry + model fallback) ──────────────────
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
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
          buildLocalResponse(trimmedText, retrievedDocs);
      } else {
        assistantContent = buildLocalResponse(trimmedText, retrievedDocs);
      }

      // Parse the response
      const parsed = parseAIResponse(assistantContent);

      if (parsed.type === 'tour') {
        // Remove typing placeholder, a tour runs instead
        setMessages(prev => prev.filter(m => m.id !== assistantMsgId));
        
        // Auto-close chat box panel so user can see visual tour clearly
        apprentice.setIsOpen(false);

        if (!tourActive) {
          setReturnAnchor(window.scrollY);
          setShowReturnPill(true);
        }

        await runTour(parsed.steps, {
          setCutout,
          setState: apprentice.setState,
          setPosition: apprentice.setPosition,
          setBubbleText: apprentice.setBubbleText,
          setBubbleActions: apprentice.setBubbleActions,
          setTourActive,
          setCurrentStep,
          setHasPointerArrow,
          voiceEnabled: isVoiceOutputEnabled()
        });

      } else {
        // Plain text response - update placeholder in place
        setMessages(prev => prev.map(m =>
          m.id === assistantMsgId
            ? { ...m, content: parsed.content ?? '', typing: false }
            : m
        ));

        // Detect JSON response format (e.g. overview)
        const isJson = typeof parsed.content === 'string' && parsed.content.trim().startsWith('{');
        if (isJson) {
          apprentice.setState('speaking');
          apprentice.setBubbleVariant('overview');
          const formatted = JSON.stringify(JSON.parse(parsed.content), null, 2);
          apprentice.setBubbleText(formatted as string);
          localStorage.setItem('apprenticeOverview', 'true');
          localStorage.setItem('apprenticeOverviewText', formatted);
        } else {
          // Speak or set state
          if (apprentice.isOpen) {
            if (isVoiceOutputEnabled()) {
              apprentice.setState('speaking');
              speak(parsed.content ?? '', {
                onEnd: () => apprentice.setState('idle')
              });
            } else {
              apprentice.setState('idle');
            }
          } else {
            apprentice.setState('speaking');
            apprentice.setBubbleText(parsed.content ?? null);
            apprentice.setBubbleActions([
              {
                label: 'Close',
                onClick: () => {
                  apprentice.setState('idle');
                  apprentice.setBubbleText(null);
                  apprentice.setBubbleActions(null);
                  localStorage.removeItem('apprenticeOverview');
                  localStorage.removeItem('apprenticeOverviewText');
                }
              }
            ]);
            if (isVoiceOutputEnabled()) {
              speak(parsed.content ?? '', {
                onEnd: () => apprentice.setState('idle')
              });
            }
          }
        }
      }
    } catch (err: any) {
      console.error('[Apprentice] handleApprenticeQuery failed:', err);
      // Update placeholder in place with visible friendly error
      setMessages(prev => prev.map(m =>
        m.id === assistantMsgId
          ? { ...m, content: 'Sorry — I had trouble with that. Could you try asking again?', typing: false }
          : m
      ));
      apprentice.setState('idle');
    } finally {
      setLoading(false);
      sendInFlightRef.current = false;
    }
  };

  // Expose global window.openApprentice function
  useEffect(() => {
    (window as any).openApprentice = (query?: string) => {
      apprentice.setIsOpen(true);
      if (query) {
        handleApprenticeQuery(query);
      }
    };
    return () => {
      (window as any).openApprentice = undefined;
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

      {showReturnPill && (
        <button
          className="return-pill"
          onClick={() => {
            window.scrollTo({ top: returnAnchor || 0, behavior: 'smooth' });
            setShowReturnPill(false);
          }}
          style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 9999 }}
        >
          Return to Previous Section
        </button>
      )}

      {/* Top Scroll Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-terra z-[99990] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <section id="hero">
          <Hero preloaderDone={preloaderDone} />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="process">
          <Process />
        </section>
        <section id="waiting-room">
          <WaitingRoom />
        </section>
        <section id="gallery">
          <Gallery onSelectItem={(item) => setModalData(item)} />
        </section>
        <section id="craft-dna">
          <CraftDNA />
        </section>
        <section id="philosophy">
          <Philosophy />
        </section>
        <section id="piece-journey">
          <PieceJourney />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
      <Apprentice
        state={apprentice.state}
        setState={apprentice.setState}
        position={apprentice.position}
        setPosition={apprentice.setPosition}
        bubbleText={apprentice.bubbleText}
        setBubbleText={apprentice.setBubbleText}
        bubbleActions={apprentice.bubbleActions}
        setBubbleActions={apprentice.setBubbleActions}
        isOpen={apprentice.isOpen}
        setIsOpen={apprentice.setIsOpen}
        hintVisible={apprentice.hintVisible}
        setHintVisible={apprentice.setHintVisible}
        displayMode={apprentice.displayMode}
        setDisplayMode={apprentice.setDisplayMode}
        bubbleVariant={apprentice.bubbleVariant}
        setBubbleVariant={apprentice.setBubbleVariant}
        onQuery={handleApprenticeQuery}
        tourActive={tourActive}
        stepIndex={stepIndex}
        totalSteps={8}
        panelTitle={currentStep?.panelTitle || ''}
        onNext={goToNextStep}
        onBack={goToPreviousStep}
        onDismiss={endOverviewTour}
        preferredBubbleSide={currentStep?.apprenticePosition}
        messages={messages}
        loading={loading}
      />
      <SpotlightOverlay cutout={cutout} tourActive={tourActive} />

      {tourActive && cutout && hasPointerArrow && (
        <PointerArrow cutout={cutout} fromSide={currentStep?.apprenticePosition || 'bottom'} />
      )}

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
        <Route path="/journal" element={<UnseenHours />} />
      </Routes>
    </BrowserRouter>
  );
}

