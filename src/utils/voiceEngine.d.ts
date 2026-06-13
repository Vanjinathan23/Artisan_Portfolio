/** Type declarations for voiceEngine utilities. */

export type VoiceCallback = () => void;

export interface SpeakOptions {
  /** Called when speech starts */
  onStart?: VoiceCallback;
  /** Called when speech ends */
  onEnd?: VoiceCallback;
  /** Speech rate (default 0.95) */
  rate?: number;
  /** Speech pitch (default 1.05) */
  pitch?: number;
}

/** Create recognizer for speech-to-text */
export function createRecognizer(params: {
  onResult: (transcript: string, isFinal: boolean) => void;
  onEnd?: VoiceCallback;
  onError?: (error: string) => void;
}): SpeechRecognition | null;

/** Initialize voice list */
export function initVoices(): Promise<SpeechSynthesisVoice>;

/** Speak the given text using Web Speech API */
export function speak(text: string, options?: SpeakOptions): void;

/** Stop any ongoing speech */
export function stopSpeaking(): void;

/** Check if voice output is enabled */
export function isVoiceOutputEnabled(): boolean;

/** Enable/disable voice output */
export function setVoiceOutputEnabled(enabled: boolean): void;

/** Check if Speech Recognition is supported */
export function isSpeechSupported(): boolean;
