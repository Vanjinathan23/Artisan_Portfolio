import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createRecognizer, isVoiceOutputEnabled, setVoiceOutputEnabled } from '../utils/voiceEngine.js';
import { VoiceOrb } from './VoiceOrb';
import { computeBubblePosition } from '../utils/bubblePositioning.js';

// Import poses and custom hooks
import { getPose } from '../data/apprenticePoses.js';
import { useIdleVariation } from '../hooks/useIdleVariation.js';
import { useEyeTracking } from '../hooks/useEyeTracking.js';
import { usePageBehaviorReactions } from '../hooks/usePageBehaviorReactions.js';
import type { ApprenticeStateName, BubbleVariant, DisplayMode, BubbleAction } from '../hooks/useApprenticeState';

// Configure marked
marked.setOptions({ breaks: true });

interface ApprenticeProps {
  state: ApprenticeStateName;
  setState: (val: ApprenticeStateName) => void;
  position: { x: number | null; y: number | null };
  setPosition: (pos: { x: number | null; y: number | null }) => void;
  bubbleText: string | null;
  setBubbleText: (val: string | null) => void;
  bubbleActions: BubbleAction[] | null;
  setBubbleActions: (actions: BubbleAction[] | null) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  bubbleVariant: BubbleVariant;
  setBubbleVariant: (val: BubbleVariant) => void;
  onQuery: (text: string) => void;
  tourActive?: boolean;
  stepIndex?: number;
  totalSteps?: number;
  panelTitle?: string;
  onNext?: () => void;
  onBack?: () => void;
  onDismiss?: () => void;
  preferredBubbleSide?: 'top' | 'bottom' | 'left' | 'right' | string;
  messages?: Array<{ id?: string; role: string; content: string; typing?: boolean }>;
  loading?: boolean;
  hintVisible: boolean;
  setHintVisible: (val: boolean) => void;
  displayMode: DisplayMode;
  setDisplayMode: (val: DisplayMode) => void;
}

function Apprentice(props: ApprenticeProps) {
  const {
    state,
    setState,
    position,
    setPosition,
    bubbleText,
    setBubbleText,
    bubbleActions,
    setBubbleActions,
    isOpen,
    setIsOpen,
    bubbleVariant,
    setBubbleVariant,
    onQuery,
    tourActive = false,
    stepIndex = 0,
    totalSteps = 8,
    panelTitle = '',
    onNext,
    onBack,
    onDismiss,
    preferredBubbleSide,
    hintVisible,
    setHintVisible,
    displayMode,
    setDisplayMode,
    messages = [],
    loading = false
  } = props;

  const [textInput, setTextInput] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isPeeking, setIsPeeking] = useState(false);
  const [badgeSeen, setBadgeSeen] = useState(false);
  const [voiceOutputEnabled, setVoiceOutput] = useState(isVoiceOutputEnabled());
  const [persistedOverview, setPersistedOverview] = useState<boolean>(false);
    // Load persisted overview state on mount
    useEffect(() => {
      const saved = localStorage.getItem('apprenticeOverview');
      if (saved === 'true') {
        setPersistedOverview(true);
        // Optionally restore previous bubble text if stored
        const savedText = localStorage.getItem('apprenticeOverviewText');
        if (savedText) {
          setBubbleText(savedText);
          setBubbleVariant('overview');
        }
        // Ensure apprentice is open to display the overview
        setIsOpen(true);
      }
    }, []);


  // Pose & reaction states
  const [poseName, setPoseName] = useState('idle-default');
  const [renderedState, setRenderedState] = useState(state);
  const [anticipating, setAnticipating] = useState(false);

  const holdTimerRef = useRef<number | null>(null);
  const recognizerRef = useRef<any>(null);
  
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wasHoldRef = useRef(false);

  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const [bubblePos, setBubblePos] = useState<{ left: number | null; top: number | null; side: string } | null>(null);

  const hintRef = useRef<HTMLDivElement | null>(null);
  const [hintPos, setHintPos] = useState<{ left: number | null; top: number | null; side: string } | null>(null);

  useLayoutEffect(() => {
    if (!hintVisible || !hintRef.current || !figureRef.current) {
      setHintPos(null);
      return;
    }

    function measureHint() {
      if (window.innerWidth <= 768) {
        setHintPos({ left: null, top: null, side: 'mobile-sheet' });
        return;
      }
      const figureEl = figureRef.current;
      const hintEl = hintRef.current;
      if (!figureEl || !hintEl) return;

      const figureRect = figureEl.getBoundingClientRect();
      const hintRect = hintEl.getBoundingClientRect();

      const pos = computeBubblePosition(figureRect, hintRect, 'top');
      setHintPos(pos);
    }

    measureHint();
    window.addEventListener('resize', measureHint);
    return () => window.removeEventListener('resize', measureHint);
  }, [hintVisible, isPeeking, displayMode]);

  const voiceOrbRef = useRef<HTMLDivElement | null>(null);
  const [voiceOrbPos, setVoiceOrbPos] = useState<{ left: number | null; top: number | null; side: string } | null>(null);

  useLayoutEffect(() => {
    if (!isOpen || !voiceOrbRef.current || !figureRef.current) {
      setVoiceOrbPos(null);
      return;
    }

    function measureOrb() {
      if (window.innerWidth <= 768) {
        setVoiceOrbPos({ left: null, top: null, side: 'mobile-sheet' });
        return;
      }
      const figureEl = figureRef.current;
      const orbEl = voiceOrbRef.current;
      if (!figureEl || !orbEl) return;

      const figureRect = figureEl.getBoundingClientRect();
      const orbRect = orbEl.getBoundingClientRect();

      const pos = computeBubblePosition(figureRect, orbRect, 'top');
      setVoiceOrbPos(pos);
    }

    measureOrb();
    window.addEventListener('resize', measureOrb);
    return () => window.removeEventListener('resize', measureOrb);
  }, [isOpen, voiceOutputEnabled, liveTranscript, textInput]);

  useLayoutEffect(() => {
    if (!bubbleText || !bubbleRef.current || !figureRef.current) {
      setBubblePos(null);
      return;
    }

    function measure() {
      if (window.innerWidth <= 768) {
        // Mobile: skip JS positioning entirely, let CSS handle it
        setBubblePos({ left: null, top: null, side: 'mobile-sheet' });
        return;
      }
      const figureEl = figureRef.current;
      const bubbleEl = bubbleRef.current;
      if (!figureEl || !bubbleEl) return;

      const figureRect = figureEl.getBoundingClientRect();
      const bubbleRect = bubbleEl.getBoundingClientRect();
      const preferredSide = preferredBubbleSide || 'top';

      const pos = computeBubblePosition(figureRect, bubbleRect, preferredSide);
      setBubblePos(pos);
    }

    // Measure now, and re-measure on window resize
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [bubbleText, bubbleActions, bubbleVariant, stepIndex, preferredBubbleSide]);

  // Safe fallback callbacks for overview navigation
  const safeOnBack = onBack ?? (() => {});
  const safeOnNext = onNext ?? (() => {});
  const safeOnDismiss = onDismiss ?? (() => {});

  // 1. Idle variation hook
  useIdleVariation(state, setPoseName);

  // 2. Eye tracking hook
  const eyeOffset = useEyeTracking(figureRef, isOpen, tourActive);

  // 3. User behavior micro-reactions hook
  usePageBehaviorReactions({
    setState,
    setPoseName,
    setBubbleText,
    setBubbleVariant,
    currentState: state,
    isOpen,
    tourActive
  });

  // 4. Anticipation state transition handler
  useEffect(() => {
    if (state === 'walking' || state === 'pointing') {
      setAnticipating(true);
      const timer = setTimeout(() => {
        setAnticipating(false);
        setRenderedState(state);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      setAnticipating(false);
      setRenderedState(state);
    }
  }, [state]);

  // 5. Pose sync handler (ignoring reaction states since hook sets them manually)
  useEffect(() => {
    if (renderedState === 'idle') {
      setPoseName('idle-default');
    } else if (renderedState !== 'curious-reacting' && renderedState !== 'reacting') {
      setPoseName(renderedState);
    }
  }, [renderedState]);

  // Force full-body display mode:
  useEffect(() => {
    setDisplayMode('full-body');
  }, [setDisplayMode]);

  // Fade welcome bubble on scroll
  useEffect(() => {
    if (!bubbleText || bubbleVariant !== 'welcome') return;
    function handleScroll() {
      setBubbleText(null);
      setBubbleActions?.(null);
    }
    window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bubbleText, bubbleVariant, setBubbleText, setBubbleActions]);

  function handleMiniHover() {
    setIsPeeking(true);
    setHintVisible(true);
  }

  function handleMiniUnhover() {
    setIsPeeking(false);
    if (!isOpen) setHintVisible(false);
  }

  function handleMiniClick() {
    setBadgeSeen(true);
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) {
      setIsOpen(true);
      setHintVisible(false);
      return;
    }
    setIsOpen(true);
    setHintVisible(false);
  }

  const handleVoiceOutputToggle = (enabled: boolean) => {
    setVoiceOutput(enabled);
    setVoiceOutputEnabled(enabled);
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (holdTimerRef.current) return;
    
    wasHoldRef.current = false;
    holdTimerRef.current = window.setTimeout(() => {
      wasHoldRef.current = true;
      startListening();
    }, 400);
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent | React.SyntheticEvent) => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    if (state === 'listening') {
      stopListening();
    }
  };

  // handleApprenticeQuery function removed (moved to App.tsx)

  const handleApprenticeClick = (e: React.MouseEvent) => {
    if (wasHoldRef.current) {
      wasHoldRef.current = false;
      return;
    }
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen) {
      setBubbleVariant('welcome');
      setBubbleText("Welcome to the studio — I'm the Apprentice. Would you like a quick walk-through of everything here?");
      setBubbleActions([
        {
          label: "Yes, show me around",
          onClick: () => {
            setBubbleText(null);
            setBubbleActions(null);
            onQuery("tour");
          }
        },
        {
          label: "No, I'll explore myself",
          onClick: () => {
            setBubbleText(null);
            setBubbleActions(null);
          }
        }
      ]);
    } else {
      setBubbleText(null);
      setBubbleActions(null);
    }
  };

  const startListening = () => {
    const recognizer = createRecognizer({
      onResult: (transcript, isFinal) => {
        setLiveTranscript(transcript);
        if (isFinal) {
          onQuery(transcript);
          setLiveTranscript('');
        }
      },
      onEnd: () => {},
      onError: (err) => {
        console.error("SpeechRecognition error: ", err);
        setState('idle');
        setBubbleText("I didn't catch that — try typing instead?");
      }
    });
    
    if (!recognizer) {
      setBubbleText("Voice isn't available on this browser — but I'm listening via text!");
      setIsOpen(true);
      return;
    }
    
    recognizerRef.current = recognizer;
    setState('listening');
    setLiveTranscript('');
    try {
      recognizer.start();
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.stop();
      } catch (e) {
        console.error(e);
      }
      
      setTimeout(() => {
        if (liveTranscript.trim() && state === 'listening') {
          onQuery(liveTranscript.trim());
          setLiveTranscript('');
          setIsOpen(false);
        } else if (state === 'listening') {
          setState('idle');
        }
      }, 150);
    }
  };

  // Safe markdown render
  const renderMarkdown = (text: string) => {
    const rawHTML = marked.parse(text) as string;
    return { __html: DOMPurify.sanitize(rawHTML) };
  };

  // Safe fallback callbacks for overview navigation
  


  // Close behaviors (updated to clear persisted overview on close)
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node;
      // Check all portal-rendered elements (VoiceOrb, bubble, hint) in addition to wrapRef
      const isInsideWrap = wrapRef.current && wrapRef.current.contains(target);
      const isInsideVoiceOrb = voiceOrbRef.current && voiceOrbRef.current.contains(target);
      const isInsideBubble = bubbleRef.current && bubbleRef.current.contains(target);
      const isInsideHint = hintRef.current && hintRef.current.contains(target);

      if (isInsideWrap || isInsideVoiceOrb || isInsideBubble || isInsideHint) {
        return; // Click is inside one of our elements, not outside
      }

      setIsOpen(false);
      // Clear persisted overview when closing the apprentice
      localStorage.removeItem('apprenticeOverview');
      localStorage.removeItem('apprenticeOverviewText');
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        localStorage.removeItem('apprenticeOverview');
        localStorage.removeItem('apprenticeOverviewText');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, setIsOpen]);


  // Auto-close on walking
  useEffect(() => {
    if (state === 'walking') {
      setIsOpen(false);
    }
  }, [state, setIsOpen]);

  // Autofocus input
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const pose = getPose(poseName);

  return (
    <div 
      ref={wrapRef}
      className={`apprentice-wrap ${isOpen ? 'is-open' : ''} ${position.x !== null ? 'is-positioned' : ''} ${state === 'walking' ? 'apprentice-wrap--walking' : ''}`}
      style={{ 
        left: position.x !== null ? `${position.x}px` : undefined,
        top: position.y !== null ? `${position.y}px` : undefined 
      }}
      data-display-mode={displayMode}
    >
      {/* Ambient Hint Bubble */}
      {hintVisible && createPortal(
        <div
          ref={hintRef}
          className={`apprentice-bubble apprentice-hint-bubble ${hintVisible ? 'show' : ''}`}
          style={hintPos ? (hintPos.side === 'mobile-sheet' ? {
            position: 'fixed',
            opacity: 1
          } : {
            position: 'fixed',
            left: `${hintPos.left}px`,
            top: `${hintPos.top}px`,
            bottom: 'auto',
            right: 'auto',
            opacity: 1
          }) : {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            bottom: 'auto',
            right: 'auto',
            visibility: 'hidden'
          }}
          data-bubble-side={hintPos?.side}
        >
          <div className="apprentice-bubble-text">I'm here to help!</div>
        </div>,
        document.body
      )}

      {/* Speech bubble */}
      {!isOpen && bubbleText && createPortal(
        <div 
          ref={bubbleRef}
          className={`apprentice-bubble ${bubbleVariant === 'micro' ? 'apprentice-bubble--micro' : ''} ${bubbleVariant === 'overview' ? 'apprentice-bubble--overview' : ''} ${bubbleVariant === 'guide-mcq' ? 'apprentice-bubble--guide-mcq' : ''} ${bubbleVariant === 'welcome' ? 'apprentice-bubble--welcome' : ''}`} 
          style={bubblePos ? (bubblePos.side === 'mobile-sheet' ? {
            position: 'fixed',
            opacity: 1
          } : {
            position: 'fixed',
            left: `${bubblePos.left}px`,
            top: `${bubblePos.top}px`,
            bottom: 'auto',
            right: 'auto',
            opacity: 1
          }) : {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            bottom: 'auto',
            right: 'auto',
            visibility: 'hidden'
          }}
          data-bubble-side={bubblePos?.side}
          onClick={(e) => e.stopPropagation()}
        >
          {bubbleVariant !== 'micro' && (
            <button 
              className="apprentice-bubble-close" 
              onClick={() => { 
                safeOnDismiss(); 
                setBubbleText(null); 
                setBubbleActions?.(null);
                if (state === 'pointing' || state === 'speaking') {
                  setState('idle');
                }
              }} 
              aria-label="Close"
            >✕</button>
          )}

          {bubbleVariant === 'overview' && (
            <div className="ov-panel-header">
              <span className="ov-panel-title">{panelTitle || 'Overview'}</span>
              <span className="ov-panel-progress">{stepIndex + 1} / {totalSteps}</span>
            </div>
          )}

          <div className={`apprentice-bubble-text ${bubbleVariant === 'overview' ? 'ov-panel-body' : ''}`} dangerouslySetInnerHTML={renderMarkdown(bubbleText)} />

          {bubbleVariant === 'overview' ? (
            <div className="ov-panel-footer">
              <button
                className="ov-btn ov-btn-primary"
                onClick={stepIndex === totalSteps - 1 ? safeOnDismiss : safeOnNext}
              >
                {stepIndex === totalSteps - 1
                  ? "That's everything — thank you!"
                  : "Yes, continue →"}
              </button>

              {!(stepIndex === totalSteps - 1) && (
                <button
                  className="ov-btn ov-btn-ghost"
                  onClick={safeOnDismiss}
                >
                  I've got it for now
                </button>
              )}
            </div>
          ) : (
            bubbleVariant !== 'micro' && bubbleVariant !== 'guide-mcq' && bubbleActions && (
              <div className="apprentice-bubble-actions">
                {bubbleActions.map((action, i) => (
                  <button key={i} onClick={action.onClick}>
                    {action.label}
                  </button>
                ))}
              </div>
            )
          )}
        </div>,
        document.body
      )}

      {/* Expanded Interaction Box */}
      {isOpen && createPortal(
        <div
          ref={voiceOrbRef}
          style={voiceOrbPos ? (voiceOrbPos.side === 'mobile-sheet' ? {
            position: 'fixed',
            zIndex: 9900,
            opacity: 1
          } : {
            position: 'fixed',
            left: `${voiceOrbPos.left}px`,
            top: `${voiceOrbPos.top}px`,
            bottom: 'auto',
            right: 'auto',
            zIndex: 9900,
            opacity: 1
          }) : {
            position: 'fixed',
            left: '-9999px',
            top: '-9999px',
            bottom: 'auto',
            right: 'auto',
            zIndex: 9900,
            visibility: 'hidden'
          }}
        >
          <VoiceOrb
            inputRef={inputRef}
            textInput={textInput}
            setTextInput={setTextInput}
            voiceOutputEnabled={voiceOutputEnabled}
            setVoiceOutput={handleVoiceOutputToggle}
            liveTranscript={liveTranscript}
            messages={messages}
            loading={loading}
            onSend={(text) => {
              onQuery(text);
            }}
            onYes={() => {
              onQuery("tour");
              setIsOpen(false);
            }}
            onNo={() => {
              setIsOpen(false);
            }}
          />
        </div>,
        document.body
      )}

      {displayMode === 'minimized' ? (
        <div
          ref={figureRef}
          className={`apprentice-mini ${isPeeking ? 'apprentice-mini--peek' : ''}`}
          data-badge-seen={badgeSeen}
          onMouseEnter={handleMiniHover}
          onMouseLeave={handleMiniUnhover}
          onClick={handleMiniClick}
          onTouchStart={handleMiniHover}
        >
          <div className="apprentice-mini-badge">✦</div>
          <div className="apprentice-mini-head">
            <div className="af-grain" />
            <div className="apprentice-mini-eyes">
              {isPeeking ? (
                <>
                  <svg className="mini-eye-curve" viewBox="0 0 12 6" width="12" height="6">
                    <path d="M1,1 Q6,7 11,1" stroke="var(--espresso)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                  <svg className="mini-eye-curve" viewBox="0 0 12 6" width="12" height="6">
                    <path d="M1,1 Q6,7 11,1" stroke="var(--espresso)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </svg>
                </>
              ) : (
                <>
                  <span className="af-eye af-eye-l" />
                  <span className="af-eye af-eye-r" />
                </>
              )}
            </div>
            <span className="apprentice-mini-cheek apprentice-mini-cheek-l" />
            <span className="apprentice-mini-cheek apprentice-mini-cheek-r" />
          </div>
        </div>
      ) : (
        /* Apprentice Clay Figurine (full body) */
        <div 
          ref={figureRef}
          className={`apprentice-figure apprentice-figure--${renderedState} ${anticipating ? 'apprentice-figure--anticipate' : ''}`}
          data-arm-l={pose.armL}
          data-arm-r={pose.armR}
          data-legs={pose.legs}
          data-eyes={pose.eyes}
          data-smile={pose.smile}
          style={{
            '--head-tilt': `${pose.headTilt}deg`,
            '--body-lean': `${pose.bodyLean}deg`
          } as React.CSSProperties}
          onClick={handleApprenticeClick}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onMouseEnter={() => {
            if (state === 'idle' && !isOpen && !tourActive) {
              setState('hover-greeting');
              setBubbleVariant('micro');
              setBubbleText("I'm here to help!");
              setBubbleActions(null);
            }
          }}
          onMouseLeave={(e) => {
            handlePointerUp(e);
            if (state === 'hover-greeting') {
              setState('idle');
              setBubbleText(null);
            }
          }}
        >
          {/* GROUND SHADOW */}
          <div className="af-shadow" />

          {/* LEGS */}
          <div className="af-leg af-leg-l">
            <div className="af-foot" />
          </div>
          <div className="af-leg af-leg-r">
            <div className="af-foot" />
          </div>

          {/* TORSO */}
          <div className="af-torso">
            <div className="af-grain" />
            <div className="af-throwing-lines">
              <span/><span/><span/>
            </div>
          </div>

          {/* ARMS */}
          <div className="af-arm af-arm-l">
            <div className="af-hand" />
          </div>
          <div className="af-arm af-arm-r">
            <div className="af-hand" />
          </div>

          {/* HEAD */}
          <div className="af-head">
            <div className="af-grain" />
            
            {/* Eyes */}
            <div 
              className="af-eyes"
              style={{ 
                transform: `translateX(calc(-50% + ${eyeOffset.x}px)) translateY(${eyeOffset.y}px)` 
              }}
            >
              <span className="af-eye af-eye-l" />
              <span className="af-eye af-eye-r" />
            </div>

            {/* Cheeks */}
            <span className="af-cheek af-cheek-l" />
            <span className="af-cheek af-cheek-r" />

            {/* Smile */}
            <svg className="af-smile" viewBox="0 0 20 8" width="20" height="8">
              <path 
                d="M2,2 Q10,8 18,2" 
                fill="none" 
                stroke="var(--copper)" 
                strokeWidth="1.5" 
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* STATE-SPECIFIC OVERLAYS */}
          {renderedState === 'listening' && <div className="af-pulse-ring" />}
          {renderedState === 'thinking' && (
            <div className="af-thinking"><span/><span/><span/></div>
          )}
          {renderedState === 'speaking' && <div className="af-speak-glow" />}
        </div>
      )}
    </div>
  );
};

export default Apprentice;
