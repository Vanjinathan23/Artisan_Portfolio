import { speak } from './voiceEngine.js';
import { scrollToSectionSmooth } from './navigationEngine.js';

export function parseAIResponse(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return { type: 'text', content: "I'm not sure how to answer that — could you try rephrasing?" };
  }

  const trimmed = rawText.trim();

  // ── STEP 1: Try to extract JSON from common wrapping patterns ──

  let candidate = trimmed;

  // Pattern A: ```json { ... } ```
  const fencedJsonMatch = trimmed.match(/```json\s*([\s\S]*?)```/i);
  if (fencedJsonMatch) {
    candidate = fencedJsonMatch[1].trim();
  } else {
    // Pattern B: ``` { ... } ``` (no language tag)
    const fencedMatch = trimmed.match(/```\s*([\s\S]*?)```/);
    if (fencedMatch && fencedMatch[1].trim().startsWith('{')) {
      candidate = fencedMatch[1].trim();
    } else {
      // Pattern C: JSON object embedded anywhere in the text —
      // find the first '{' and the LAST matching '}' that
      // produces valid JSON. Use a greedy brace match.
      const firstBrace = trimmed.indexOf('{');
      const lastBrace = trimmed.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        candidate = trimmed.slice(firstBrace, lastBrace + 1);
      }
    }
  }

  // ── STEP 2: Attempt to parse the candidate as JSON ──────────────

  if (candidate.startsWith('{')) {
    try {
      const parsed = JSON.parse(candidate);

      if (parsed.type === 'tour' && Array.isArray(parsed.steps)) {
        const validSteps = parsed.steps.filter(s =>
          s && typeof s === 'object' &&
          s.targetSelector && s.sectionId && s.text
        );

        if (validSteps.length > 0) {
          return { type: 'tour', steps: validSteps.slice(0, 4) };
        }
      }
      // Parsed JSON but not a valid tour shape — fall through to text
    } catch (e) {
      // Not valid JSON — fall through to text
      console.warn('[Apprentice] Failed to parse tour JSON:', e.message);
    }
  }

  // ── STEP 3: Plain text fallback ─────────────────────────────────
  // Strip any leftover code fences so they never render as raw text
  const cleaned = trimmed
    .replace(/```json\s*[\s\S]*?```/gi, '')
    .replace(/```\s*[\s\S]*?```/g, '')
    .trim();

  return {
    type: 'text',
    content: cleaned.length > 0
      ? cleaned
      : "Let me find that for you — one moment."
  };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



function getCutoutRect(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  };
}

function calculateApprenticePosition(cutout, side) {
  const APPRENTICE_W = 64, APPRENTICE_H = 76, GAP = 20;
  let pos = { x: 0, y: 0 };
  
  switch (side) {
    case 'left':
      pos = { 
        x: cutout.x - APPRENTICE_W - GAP, 
        y: cutout.y + cutout.height/2 - APPRENTICE_H/2 
      };
      break;
    case 'right':
      pos = { 
        x: cutout.x + cutout.width + GAP, 
        y: cutout.y + cutout.height/2 - APPRENTICE_H/2 
      };
      break;
    case 'top':
      pos = { 
        x: cutout.x + cutout.width/2 - APPRENTICE_W/2, 
        y: cutout.y - APPRENTICE_H - GAP 
      };
      break;
    case 'bottom':
    default:
      pos = { 
        x: cutout.x + cutout.width/2 - APPRENTICE_W/2, 
        y: cutout.y + cutout.height + GAP 
      };
      break;
  }

  // Constrain to prevent characters going off-screen
  const margin = 20;
  const boundedX = Math.max(margin, Math.min(pos.x, window.innerWidth - APPRENTICE_W - margin));
  const boundedY = Math.max(margin, Math.min(pos.y, window.innerHeight - APPRENTICE_H - margin));

  return { x: boundedX, y: boundedY };
}

export async function runTourStep(step, { 
  setCutout, setState, setPosition, setBubbleText, 
  setBubbleActions, setTourActive, voiceEnabled,
  setCurrentStep, setHasPointerArrow
}) {
  
  // Update step tracking for PointerArrow
  if (setCurrentStep) setCurrentStep(step);
  if (setHasPointerArrow) setHasPointerArrow(!!step.pointerArrow);

  // 1. Scroll to section first (if sectionId is present)
  setTourActive(true);
  if (step.sectionId) {
    if (step.sectionId === 'gallery') {
      window.dispatchEvent(new CustomEvent('artisana:reset-gallery-filter'));
    }
    scrollToSectionSmooth(step.sectionId, { delay: 0, offset: -120 });
  }

  // 2. Wait for scroll to settle
  await wait(900);

  // 3. Calculate cutout position
  const cutout = getCutoutRect(step.targetSelector);
  if (!cutout && step.targetSelector) {
    // If target selector is present but not found, check if it's wait-for-click
    if (step.action === 'wait-for-click' && document.querySelector(step.waitForSelector)) {
       // Target missing but the result is already here? (edge case)
    } else {
       // Element not found — skip gracefully
       return false;
    }
  }
  setCutout(cutout);

  // Keep the Apprentice fixed at the bottom-right corner
  setPosition({ x: null, y: null });
  await wait(200);

  // 6. Apprentice arrives — point + show bubble
  setState('pointing');
  setBubbleText(step.text);
  
  // 6b. Wait for Click action
  if (step.action === 'wait-for-click') {
    // No Next button until they click
    setBubbleActions(null); 
    if (voiceEnabled) {
      setState('speaking');
      speak(step.text, { onEnd: () => setState('pointing') });
    }
    return new Promise((resolve) => {
      const target = document.querySelector(step.targetSelector);
      if (!target) { resolve(true); return; }

      function onUserClick() {
        target.removeEventListener('click', onUserClick);

        if (step.waitForSelector) {
          // Wait for the resulting element (e.g. modal) to appear
          const observer = new MutationObserver(() => {
            if (document.querySelector(step.waitForSelector)) {
              observer.disconnect();
              resolve(true);
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
          // Safety timeout
          setTimeout(() => { observer.disconnect(); resolve(true); }, 3000);
        } else {
          resolve(true);
        }
      }

      target.addEventListener('click', onUserClick);
    });
  }

  setBubbleActions(step.actions);

  // 7. Speak if voice enabled
  if (voiceEnabled) {
    setState('speaking');
    speak(step.text, {
      onEnd: () => setState('pointing')
    });
  }

  return true;
}

function waitForUserAction(actions, helpers) {
  return new Promise(resolve => {
    helpers.setBubbleActions(
      actions.map(a => ({
        ...a,
        onClick: () => resolve(a.type)
      }))
    );
  });
}

export async function runTour(steps, helpers) {
  let currentStepIdx = 0;

  while (currentStepIdx >= 0 && currentStepIdx < steps.length) {
    const step = steps[currentStepIdx];
    const isLast = currentStepIdx === steps.length - 1;

    // Inject back and next buttons
    const actions = [];
    
    // Back button (if not first step)
    if (currentStepIdx > 0) {
      actions.push({ label: '← Back', type: 'back' });
    }
    
    // Next/Got it button
    if (isLast) {
      actions.push({ label: 'Got it', type: 'close' });
    } else {
      actions.push({ label: 'Next →', type: 'next' });
    }

    const stepWithNav = {
      ...step,
      actions: step.actions || actions
    };

    const success = await runTourStep(stepWithNav, helpers);
    if (!success) {
      // If element not found, skip gracefully
      currentStepIdx++;
      continue;
    }

    // Wait for user to click a navigation action
    const actionType = await waitForUserAction(stepWithNav.actions, helpers);
    
    if (actionType === 'back') {
      currentStepIdx--;
    } else if (actionType === 'next') {
      currentStepIdx++;
    } else {
      // Close
      break;
    }
  }

  // Tour complete — exit
  helpers.setTourActive(false);
  helpers.setCutout(null);
  helpers.setState('idle');
  helpers.setBubbleText(null);
  helpers.setBubbleActions(null);
  helpers.setPosition({ x: null, y: null }); // return to default corner
}
