import React from 'react';
import { isSpeechSupported } from '../utils/voiceEngine.js';

interface VoiceOrbProps {
  textInput: string;
  setTextInput: (val: string) => void;
  voiceOutputEnabled: boolean;
  setVoiceOutput: (val: boolean) => void;
  liveTranscript: string;
  onSend: (text: string) => void;
  onYes: () => void;
  onNo: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  messages?: Array<{ id?: string; role: string; content: string; typing?: boolean }>;
  loading?: boolean;
}

export const VoiceOrb = ({
  textInput,
  setTextInput,
  voiceOutputEnabled,
  setVoiceOutput,
  liveTranscript,
  onSend,
  onYes,
  onNo,
  inputRef,
  messages = [],
  loading = false
}: VoiceOrbProps) => {
  const historyEndRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll to bottom whenever messages list or active live transcript changes
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, liveTranscript, loading]);

  const handleSend = () => {
    if (textInput.trim()) {
      onSend(textInput.trim());
      setTextInput('');
      // Refocus input immediately after sending to maintain smooth typing flow
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 30);
    }
  };

  return (
    <div className="voice-orb-panel" onClick={(e) => e.stopPropagation()}>
      <div className="vop-transcript-preview">
        <div className="vop-chat-history">
          {/* Welcome message bubble is permanently fixed at the top of the chat history */}
          <div className="vop-msg vop-msg-assistant">
            <div className="vop-msg-bubble">
              <p>Welcome to the studio — I'm the Apprentice. Would you like a quick walk-through of everything here?</p>
              {messages.length === 0 && (
                <div className="vop-welcome-buttons" style={{ marginTop: '12px' }}>
                  <button 
                    className="vop-btn vop-btn-yes" 
                    onClick={onYes}
                  >
                    Yes, show me around
                  </button>
                  <button 
                    className="vop-btn vop-btn-no" 
                    onClick={onNo}
                  >
                    No, I'll explore myself
                  </button>
                </div>
              )}
            </div>
          </div>

          {messages.map((msg, idx) => (
            <div key={msg.id || idx} className={`vop-msg vop-msg-${msg.role} ${msg.typing ? 'vop-msg-loading' : ''}`}>
              <div className="vop-msg-bubble">
                {msg.typing ? (
                  <>
                    <span className="vop-dot">.</span>
                    <span className="vop-dot">.</span>
                    <span className="vop-dot">.</span>
                  </>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {liveTranscript && <p className="vop-interim">{liveTranscript}</p>}
          <div ref={historyEndRef} />
        </div>
      </div>
      
      <div className="vop-input-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask me anything about the studio..."
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        {textInput.trim() !== '' ? (
          <button 
            className="vop-send-btn"
            onClick={handleSend}
            aria-label="Send message"
            type="button"
          >
            ➤
          </button>
        ) : (
          <button 
            className="vop-voice-toggle"
            onClick={() => {
              const newVal = !voiceOutputEnabled;
              setVoiceOutput(newVal);
            }}
            aria-label="Toggle voice responses"
            type="button"
          >
            {voiceOutputEnabled ? '🔊' : '🔇'}
          </button>
        )}
      </div>

      <p className="vop-hint">
        {isSpeechSupported() 
          ? "Press and hold me to talk →" 
          : "Type your question above"}
      </p>
    </div>
  );
};

export default VoiceOrb;
