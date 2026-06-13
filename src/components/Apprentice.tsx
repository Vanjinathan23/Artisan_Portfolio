import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createRecognizer, isVoiceOutputEnabled, setVoiceOutputEnabled } from '../utils/voiceEngine.js';
import { VoiceOrb } from './VoiceOrb';

// Import poses and custom hooks
import { getPose } from '../data/apprenticePoses.js';
import { useIdleVariation } from '../hooks/useIdleVariation.js';
import { useEyeTracking } from '../hooks/useEyeTracking.js';
import { usePageBehaviorReactions } from '../hooks/usePageBehaviorReactions.js';

// Configure marked
marked.setOptions({ breaks: true });

interface ApprenticeProps {
  state: string;
  setState: (val: string) => void;
  position: { x: number | null; y: number | null };
  setPosition: (pos: { x: number | null; y: number | null }) => void;
  bubbleText: string | null;
  setBubbleText: (val: string | null) => void;
  bubbleActions: Array<{ label: string; onClick: () => void }> | null;
  setBubbleActions: (actions: Array<{ label: string; onClick: () => void }> | null) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onQuery: (text: string) => void;
  tourActive?: boolean;
}

export const Apprentice = ({
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
  onQuery,
  tourActive = false
}: ApprenticeProps) => {
  const [textInput, setTextInput] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [voiceOutputEnabled, setVoiceOutput] = useState(isVoiceOutputEnabled());

  // Pose & reaction states
  const [poseName, setPoseName] = useState('idle-default');
  const [bubbleVariant, setBubbleVariant] = useState<'full' | 'micro'>('full');
  const [renderedState, setRenderedState] = useState(state);
  const [anticipating, setAnticipating] = useState(false);

  const holdTimerRef = useRef<number | null>(null);
  const recognizerRef = useRef<any>(null);
  
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wasHoldRef = useRef(false);

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

  const handleApprenticeClick = (e: React.MouseEvent) => {
    if (wasHoldRef.current) {
      wasHoldRef.current = false;
      return;
    }
    setIsOpen(!isOpen);
  };

  const startListening = () => {
    const recognizer = createRecognizer({
      onResult: (transcript, isFinal) => {
        setLiveTranscript(transcript);
        if (isFinal) {
          onQuery(transcript);
          setLiveTranscript('');
          setIsOpen(false);
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

  // Close behaviors
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
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
    >
      {/* Tooltip hint */}
      <div className="apprentice-hint">
        Tap to chat · Hold to talk
      </div>

      {/* Speech bubble */}
      {bubbleText && (
        <div className={`apprentice-bubble ${bubbleVariant === 'micro' ? 'apprentice-bubble--micro' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div 
            className="apprentice-bubble-text"
            dangerouslySetInnerHTML={renderMarkdown(bubbleText)}
          />
          {bubbleVariant !== 'micro' && bubbleActions && (
            <div className="apprentice-bubble-actions">
              {bubbleActions.map((action, i) => (
                <button key={i} onClick={action.onClick}>
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Expanded Interaction Box */}
      {isOpen && (
        <VoiceOrb
          inputRef={inputRef}
          textInput={textInput}
          setTextInput={setTextInput}
          voiceOutputEnabled={voiceOutputEnabled}
          setVoiceOutput={handleVoiceOutputToggle}
          liveTranscript={liveTranscript}
          onSend={(text) => {
            onQuery(text);
            setIsOpen(false);
          }}
        />
      )}

      {/* Apprentice Clay Figurine */}
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
        onMouseLeave={handlePointerUp}
      >
        {/* GROUND SHADOW */}
        <div className="af-shadow" />

        {/* LEGS (render behind torso) */}
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

        {/* ARMS (render on top of torso edges) */}
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

          {/* Smile (SVG, only visible in speaking/greeting) */}
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
    </div>
  );
};

export default Apprentice;
