import React from 'react';
import { isSpeechSupported } from '../utils/voiceEngine.js';

interface VoiceOrbProps {
  textInput: string;
  setTextInput: (val: string) => void;
  voiceOutputEnabled: boolean;
  setVoiceOutput: (val: boolean) => void;
  liveTranscript: string;
  onSend: (text: string) => void;
}

export const VoiceOrb = ({
  textInput,
  setTextInput,
  voiceOutputEnabled,
  setVoiceOutput,
  liveTranscript,
  onSend
}: VoiceOrbProps) => {
  const handleSend = () => {
    if (textInput.trim()) {
      onSend(textInput.trim());
      setTextInput('');
    }
  };

  return (
    <div className="voice-orb-panel" onClick={(e) => e.stopPropagation()}>
      <div className="vop-transcript-preview">
        {liveTranscript && (
          <p className="vop-interim">{liveTranscript}</p>
        )}
      </div>
      
      <div className="vop-input-row">
        <input
          type="text"
          placeholder="Ask me anything about the studio..."
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
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
