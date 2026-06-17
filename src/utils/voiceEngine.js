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
        availableVoices.find(v => v.name.includes('Google UK English Female')) ||
        availableVoices.find(v => v.name.includes('Samantha')) ||
        availableVoices.find(v => v.name.includes('Microsoft Aria')) ||
        availableVoices.find(v => v.name.includes('Microsoft Jenny')) ||
        availableVoices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
        availableVoices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('robot')) ||
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

let activeUtterance = null;
let speakTimeout = null;
let activeUtterances = []; // Keep a list of active utterances to prevent garbage collection

export function speak(text, { onStart, onEnd, rate = 0.95, pitch = 1.0 } = {}) {
  if (!window.speechSynthesis) return;

  // Clear any pending speak timeouts
  if (speakTimeout) {
    clearTimeout(speakTimeout);
    speakTimeout = null;
  }

  // To prevent cancelled utterances from firing their callbacks and interfering
  // with new speech steps, neutralize their event handlers before cancelling.
  if (activeUtterance) {
    activeUtterance.onstart = null;
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
  }
  
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.warn("Failed to cancel speech synthesis:", e);
  }

  // Strip markdown for cleaner speech (remove **, *, #, links)
  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n+/g, '. ');

  // Introduce a 100ms delay to allow the browser speech engine to finish cancellation
  // cleanly before starting the new utterance. This avoids voice cracking/stuttering.
  speakTimeout = setTimeout(() => {
    const speakAction = (voice) => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      activeUtterance = utterance;
      
      // GC protection: keep a list of recent utterances
      activeUtterances.push(utterance);
      if (activeUtterances.length > 10) {
        activeUtterances.shift();
      }

      if (voice) {
        utterance.voice = voice;
      }
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = 0.7; // Slightly lower volume for a gentler, more premium sound

      utterance.onstart = () => onStart?.();
      utterance.onend = () => {
        if (activeUtterance === utterance) activeUtterance = null;
        onEnd?.();
      };
      utterance.onerror = () => {
        if (activeUtterance === utterance) activeUtterance = null;
        onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    };

    if (selectedVoice) {
      speakAction(selectedVoice);
    } else {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        availableVoices = voices;
        selectedVoice = 
          availableVoices.find(v => v.name.includes('Google UK English Female')) ||
          availableVoices.find(v => v.name.includes('Samantha')) ||
          availableVoices.find(v => v.name.includes('Microsoft Aria')) ||
          availableVoices.find(v => v.name.includes('Microsoft Jenny')) ||
          availableVoices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
          availableVoices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('robot')) ||
          availableVoices[0];
        speakAction(selectedVoice);
      } else {
        let hasSpoken = false;
        const safeSpeak = (voice) => {
          if (hasSpoken) return;
          hasSpoken = true;
          speakAction(voice);
        };

        const fallbackTimeout = setTimeout(() => {
          safeSpeak(null);
        }, 250);

        initVoices().then(voice => {
          clearTimeout(fallbackTimeout);
          safeSpeak(voice);
        }).catch(() => {
          clearTimeout(fallbackTimeout);
          safeSpeak(null);
        });
      }
    }
  }, 100);
}

export function stopSpeaking() {
  if (speakTimeout) {
    clearTimeout(speakTimeout);
    speakTimeout = null;
  }
  if (activeUtterance) {
    activeUtterance.onstart = null;
    activeUtterance.onend = null;
    activeUtterance.onerror = null;
    activeUtterance.volume = 0; // instantly mute if possible
    activeUtterance = null;
  }
  try {
    window.speechSynthesis?.cancel();
  } catch (e) {
    console.warn("Failed to cancel speech synthesis:", e);
  }
  activeUtterances = [];
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

// Automatically initialize voices on load
if (typeof window !== 'undefined' && window.speechSynthesis) {
  initVoices();
}
