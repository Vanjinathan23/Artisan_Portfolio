export function computeBubblePosition(figureRect, bubbleRect, preferredSide = 'top') {
  const VIEWPORT_PADDING = 16; // never touch the screen edge
  const GAP = 12; // space between figure and bubble

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let side = preferredSide;
  let left, top;

  // ── STEP 1: Try preferred side, check if it fits ──────────────

  function tryPlacement(testSide) {
    switch (testSide) {
      case 'top':
        return {
          left: figureRect.left + figureRect.width / 2 - bubbleRect.width / 2,
          top: figureRect.top - bubbleRect.height - GAP,
          fits: figureRect.top - bubbleRect.height - GAP >= VIEWPORT_PADDING
        };
      case 'bottom':
        return {
          left: figureRect.left + figureRect.width / 2 - bubbleRect.width / 2,
          top: figureRect.bottom + GAP,
          fits: figureRect.bottom + GAP + bubbleRect.height <= vh - VIEWPORT_PADDING
        };
      case 'left':
        return {
          left: figureRect.left - bubbleRect.width - GAP,
          top: figureRect.top + figureRect.height / 2 - bubbleRect.height / 2,
          fits: figureRect.left - bubbleRect.width - GAP >= VIEWPORT_PADDING
        };
      case 'right':
        return {
          left: figureRect.right + GAP,
          top: figureRect.top + figureRect.height / 2 - bubbleRect.height / 2,
          fits: figureRect.right + GAP + bubbleRect.width <= vw - VIEWPORT_PADDING
        };
    }
  }

  // ── STEP 2: Try preferred, then fallback order ─────────────────

  const fallbackOrder = {
    top:    ['top', 'bottom', 'left', 'right'],
    bottom: ['bottom', 'top', 'left', 'right'],
    left:   ['left', 'right', 'top', 'bottom'],
    right:  ['right', 'left', 'top', 'bottom']
  };

  let placement = null;
  for (const trySide of fallbackOrder[preferredSide] || fallbackOrder.top) {
    const result = tryPlacement(trySide);
    if (result.fits) {
      placement = { ...result, side: trySide };
      break;
    }
  }

  // ── STEP 3: If NOTHING fits cleanly (very small viewport),
  //    force the BEST-EFFORT placement and then CLAMP to viewport ──
  if (!placement) {
    placement = { ...tryPlacement(preferredSide), side: preferredSide };
  }

  left = placement.left;
  top = placement.top;
  side = placement.side;

  // ── STEP 4: HARD CLAMP — never allow ANY part of the bubble
  //    to render outside the viewport, regardless of side chosen ──
  left = Math.max(VIEWPORT_PADDING, Math.min(left, vw - bubbleRect.width - VIEWPORT_PADDING));
  top = Math.max(VIEWPORT_PADDING, Math.min(top, vh - bubbleRect.height - VIEWPORT_PADDING));

  return { left, top, side };
}
