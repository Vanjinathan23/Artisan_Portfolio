// ── SPEECH RECOGNITION (Voice → Text) ────────────────────────────────

export function createRecognizer({ onResult, onEnd, onError }) {
  // @ts-ignore
  const SpeechRecognition = 
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    return null; // Browser doesn't support it — fallback to text
  }

  const recognizer = new SpeechRecognition();
  recognizer.continuous = false;
  recognizer.interimResults = true;
  recognizer.lang = 'en-US';
  recognizer.maxAlternatives = 1;

  recognizer.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(r => r[0].transcript)
      .join('');
    onResult(transcript, event.results[0].isFinal);
  };

  recognizer.onerror = (event) => {
    onError?.(event.error);
  };

  recognizer.onend = () => {
    onEnd?.();
  };

  return recognizer;
}

// ── SPEECH SYNTHESIS (Text → Voice) ──────────────────────────────────

let availableVoices = [];
let selectedVoice = null;

export function initVoices() {
  return new Promise((resolve) => {
    const load = () => {
      availableVoices = window.speechSynthesis.getVoices();
      // Prefer a warm, natural-sounding voice
      selectedVoice = 
        availableVoices.find(v => 
          v.name.includes('Google UK English Female') ||
          v.name.includes('Samantha') ||
          v.name.includes('Microsoft Aria')
        ) || 
        availableVoices.find(v => v.lang === 'en-US' && v.name.includes('Female')) ||
        availableVoices.find(v => v.lang.startsWith('en')) ||
        availableVoices[0];
      resolve(selectedVoice);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      load();
    } else {
      window.speechSynthesis.onvoiceschanged = load;
    }
  });
}

export function speak(text, { onStart, onEnd, rate = 0.95, pitch = 1.05 } = {}) {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown for cleaner speech (remove **, *, #, links)
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n+/g, '. ');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  } else {
    // If voices aren't loaded yet, try initializing
    initVoices().then(voice => {
      if (voice) utterance.voice = voice;
    });
  }
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = 1;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel();
}

export function isVoiceOutputEnabled() {
  const stored = localStorage.getItem('apprentice_voice_output');
  return stored === null ? true : stored === 'true'; // default ON
}

export function setVoiceOutputEnabled(enabled) {
  localStorage.setItem('apprentice_voice_output', enabled ? 'true' : 'false');
}

export function isSpeechSupported() {
  // @ts-ignore
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}
