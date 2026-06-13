import { speak } from './voiceEngine.js';

export function parseAIResponse(rawText) {
  const trimmed = rawText.trim();
  
  // Check if response looks like JSON
  if (trimmed.startsWith('{') && trimmed.includes('"type"')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed.type === 'tour' && Array.isArray(parsed.steps)) {
        // Validate each step has required fields
        const validSteps = parsed.steps.filter(s => 
          s.targetSelector && s.sectionId && s.text
        );
        if (validSteps.length > 0) {
          return { type: 'tour', steps: validSteps.slice(0, 4) };
        }
      }
    } catch (e) {
      // Not valid JSON — fall through to text
    }
  }
  
  // Default: plain text response
  return { type: 'text', content: rawText };
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToSection(sectionId, { delay = 0, offset = -100 } = {}) {
  if (sectionId === 'gallery') {
    window.dispatchEvent(new CustomEvent('artisana:reset-gallery-filter'));
  }

  const el = document.getElementById(sectionId);
  if (!el) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = el.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition + offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
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

async function runTourStep(step, { 
  setCutout, setState, setPosition, setBubbleText, 
  setBubbleActions, setTourActive, voiceEnabled 
}) {
  
  // 1. Scroll to section first
  setTourActive(true);
  scrollToSection(step.sectionId, { delay: 0, offset: -120 });

  // 2. Wait for scroll to settle
  await wait(900);

  // 3. Calculate cutout position
  const cutout = getCutoutRect(step.targetSelector);
  if (!cutout) {
    // Element not found — skip gracefully
    return false;
  }
  setCutout(cutout);

  // 4. Calculate apprentice walk-to position based on
  //    apprenticePosition ('left'/'right'/'top'/'bottom')
  const apprenticePos = calculateApprenticePosition(cutout, step.apprenticePosition);
  
  // 5. Walk apprentice to position
  setState('walking');
  setPosition(apprenticePos);
  await wait(1200);

  // 6. Apprentice arrives — point + show bubble
  setState('pointing');
  setBubbleText(step.text);
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
