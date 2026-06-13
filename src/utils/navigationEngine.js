// src/utils/navigationEngine.js
/**
 * Maps user intents or keywords to section IDs for navigation.
 * Returns the matching id string (without leading '#') or null.
 */
export function getSectionIdForIntent(intent) {
  const map = {
    story: 'story', // About section
    about: 'story',
    craft: 'craft',
    process: 'craft',
    gallery: 'gallery',
    philosophy: 'philosophy',
    contact: 'contact',
    testimonials: 'testimonials',
    testimonial: 'testi',
    waiting: 'waiting-room',
    "waiting-room": 'waiting-room',
    stories: 'stories',
    "story": 'story',
    "process": 'craft',
  };

  // direct lookup
  if (map[intent]) return map[intent];

  // fallback: try partial match
  const key = Object.keys(map).find(k => intent.includes(k));
  return key ? map[key] : null;
}

/**
 * Simple intent detection based on keywords. Mirrors logic in chatPersona.
 */
export function detectNavigationIntent(query) {
  const q = query.toLowerCase();
  if (/story|about/.test(q)) return 'story';
  if (/craft|process/.test(q)) return 'craft';
  if (/gallery/.test(q)) return 'gallery';
  if (/philosophy/.test(q)) return 'philosophy';
  if (/contact/.test(q)) return 'contact';
  if (/testimonial|testimonials/.test(q)) return 'testimonials';
  if (/waiting/.test(q)) return 'waiting';
  if (/story|stories/.test(q)) return 'stories';
  return null;
}
