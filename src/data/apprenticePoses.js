export const apprenticePoses = {

  // ── RESTING POSES (idle variations) ──────────────────────────
  'idle-default': {
    armL: 'rest',        // arm at gentle resting angle
    armR: 'rest',
    legs: 'standing',
    eyes: 'normal',
    smile: 'hidden',
    headTilt: 0,         // degrees
    bodyLean: 0
  },
  'idle-glance-gallery': {
    // Apprentice slowly turns head toward gallery direction
    armL: 'rest',
    armR: 'rest',
    legs: 'standing',
    eyes: 'normal',
    smile: 'hidden',
    headTilt: -8,         // turns slightly left (toward page content)
    bodyLean: 0
  },
  'idle-examine-hands': {
    // Apprentice looks down at its own hands briefly
    armL: 'rest-raised',  // arms lift very slightly
    armR: 'rest-raised',
    legs: 'standing',
    eyes: 'down',
    smile: 'hidden',
    headTilt: 5,
    bodyLean: 0
  },

  // ── INTERACTION POSES ─────────────────────────────────────────
  'greeting': {
    armL: 'rest',
    armR: 'wave',
    legs: 'standing',
    eyes: 'normal',
    smile: 'shown',
    headTilt: -4,
    bodyLean: 0
  },
  'listening': {
    armL: 'rest',
    armR: 'rest',
    legs: 'standing',
    eyes: 'wide',
    smile: 'hidden',
    headTilt: 0,
    bodyLean: -2  // leans slightly forward toward "speaker"
  },
  'thinking': {
    armL: 'rest',
    armR: 'chin',        // arm raises toward head, thinking pose
    legs: 'standing',
    eyes: 'focused',
    smile: 'hidden',
    headTilt: 6,
    bodyLean: 0
  },
  'speaking': {
    armL: 'rest',
    armR: 'rest',
    legs: 'standing',
    eyes: 'normal',
    smile: 'shown',
    headTilt: 0,
    bodyLean: 0
  },
  'walking': {
    armL: 'swing',
    armR: 'swing',
    legs: 'walking',
    eyes: 'normal',
    smile: 'hidden',
    headTilt: 0,
    bodyLean: 0
  },
  'pointing': {
    armL: 'point',
    armR: 'rest',
    legs: 'standing',
    eyes: 'normal',
    smile: 'shown',
    headTilt: -3,         // tilts toward what it's pointing at
    bodyLean: 0
  },

  // ── CRAFT-APPROPRIATE MICRO-REACTION POSES (new) ────────────────
  'curious': {
    // Triggered when user lingers on a gallery piece 4s+
    armL: 'rest',
    armR: 'rest',
    legs: 'standing',
    eyes: 'wide',
    smile: 'hidden',
    headTilt: -10,        // head tilts toward the lingered section
    bodyLean: 0
  },
  'quiet-pride': {
    // Triggered when user completes Craft DNA quiz
    armL: 'rest-raised',
    armR: 'rest-raised',
    legs: 'standing',
    eyes: 'normal',
    smile: 'shown',
    headTilt: 4,
    bodyLean: -1  // very slight forward "bow"
  },
  'hushed': {
    // Triggered when user discovers Unseen Hours journal
    armL: 'rest-low',     // arms drop slightly lower
    armR: 'rest-low',
    legs: 'standing',
    eyes: 'soft',         // narrower, gentler
    smile: 'hidden',
    headTilt: 8,
    bodyLean: 1   // leans back very slightly — giving space
  }

};

// Helper: get pose object with fallback to idle-default
export function getPose(name) {
  return apprenticePoses[name] || apprenticePoses['idle-default'];
}
