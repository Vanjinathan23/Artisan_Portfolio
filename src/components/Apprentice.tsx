import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { createRecognizer, isVoiceOutputEnabled, setVoiceOutputEnabled } from '../utils/voiceEngine.js';
import { VoiceOrb } from './VoiceOrb';

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
  onQuery
}: ApprenticeProps) => {
  const [textInput, setTextInput] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [voiceOutputEnabled, setVoiceOutput] = useState(isVoiceOutputEnabled());

  const holdTimerRef = useRef<number | null>(null);
  const recognizerRef = useRef<any>(null);

  const handleVoiceOutputToggle = (enabled: boolean) => {
    setVoiceOutput(enabled);
    setVoiceOutputEnabled(enabled);
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Avoid double triggering
    if (holdTimerRef.current) return;
    
    holdTimerRef.current = window.setTimeout(() => {
      startListening();
    }, 400); // 400ms hold threshold
  };

  const handlePointerUp = (e: React.MouseEvent | React.TouchEvent | React.SyntheticEvent) => {
    if (holdTimerRef.current) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    
    if (state === 'listening') {
      stopListening();
    } else if (state === 'idle' || state === 'pointing') {
      // Short tap — toggle text panel
      setIsOpen(!isOpen);
    }
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
      onEnd: () => {
        // Do not force thinking immediately, we let stopListening or isFinal do it
      },
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
      
      // Send whatever is gathered if recognizer didn't emit isFinal yet
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

  return (
    <div 
      className={`apprentice apprentice--${state}`}
      style={{ 
        left: position.x !== null ? `${position.x}px` : undefined,
        top: position.y !== null ? `${position.y}px` : undefined 
      }}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onMouseLeave={handlePointerUp}
    >
      {/* Ground shadow */}
      <div className="apprentice-shadow" />

      {/* Body */}
      <div className="apprentice-body">
        {/* Grain texture overlay */}
        <div className="apprentice-grain" />
        
        {/* Eyes */}
        <div className="apprentice-eyes">
          <span className="apprentice-eye apprentice-eye-l" />
          <span className="apprentice-eye apprentice-eye-r" />
        </div>

        {/* Arms */}
        <div className="apprentice-arm apprentice-arm-l" />
        <div className="apprentice-arm apprentice-arm-r" />

        {/* Listening pulse ring */}
        {state === 'listening' && <div className="apprentice-pulse-ring" />}

        {/* Thinking dots */}
        {state === 'thinking' && (
          <div className="apprentice-thinking">
            <span/><span/><span/>
          </div>
        )}

        {/* Speaking glow */}
        {state === 'speaking' && <div className="apprentice-speak-glow" />}
      </div>

      {/* Speech bubble (appears above character) */}
      {bubbleText && (
        <div className="apprentice-bubble" onClick={(e) => e.stopPropagation()}>
          <div 
            className="apprentice-bubble-text"
            dangerouslySetInnerHTML={renderMarkdown(bubbleText)}
          />
          {bubbleActions && (
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
    </div>
  );
};

export default Apprentice;
