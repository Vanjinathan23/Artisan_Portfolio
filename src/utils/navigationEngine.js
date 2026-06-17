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

export function scrollToSection(sectionId, options = {}) {
  const { delay = 400, offset = -80 } = options;

  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (!el) {
      console.warn(`[Apprentice] scrollToSection: no element with id="${sectionId}"`);
      return;
    }

    const top = el.getBoundingClientRect().top
      + window.pageYOffset
      + offset;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: 'smooth'   // ← MUST remain 'smooth', never 'auto'/'instant'
    });
  }, delay);
}

export function scrollToSectionSmooth(sectionId, options = {}) {
  const { delay = 400, offset = -80, minDuration = 900, maxDuration = 1800 } = options;

  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const startY = window.pageYOffset;
    const targetY = Math.max(0,
      el.getBoundingClientRect().top + startY + offset
    );
    const distance = targetY - startY;
    const duration = Math.min(
      maxDuration,
      Math.max(minDuration, Math.abs(distance) / 1.5)
    );

    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeInOutCubic
      const eased = progress < 0.5
        ? 4 * Math.pow(progress, 3)
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, delay);
}
