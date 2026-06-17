import { useState } from 'react';

export type ApprenticeStateName =
  | 'idle'
  | 'greeting'
  | 'hover-greeting'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'walking'
  | 'pointing'
  | 'curious-reacting'
  | 'reacting';

export type BubbleVariant = 'full' | 'micro' | 'overview' | 'guide' | 'guide-mcq' | 'welcome';
export type DisplayMode = 'minimized' | 'full-body';

export interface ApprenticePosition {
  x: number | null;
  y: number | null;
}

export interface BubbleAction {
  label: string;
  onClick: () => void;
}

export function useApprenticeState() {
  const [state, setState] = useState<ApprenticeStateName>('idle');
  // idle | greeting | listening | thinking | speaking | walking | pointing

  const [position, setPosition] = useState<ApprenticePosition>({ x: null, y: null });
  // null = use default CSS fixed position (bottom-right)
  // set values when walking to a specific screen location

  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [bubbleActions, setBubbleActions] = useState<BubbleAction[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // isOpen = expanded interaction mode (voice orb visible)

  const [bubbleVariant, setBubbleVariant] = useState<BubbleVariant>('full');

  const [hintVisible, setHintVisible] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('full-body');

  // On first page load: greeting sequence logic has been moved to useFirstVisitWelcome hook.

  return {
    state, setState,
    position, setPosition,
    bubbleText, setBubbleText,
    bubbleActions, setBubbleActions,
    isOpen, setIsOpen,
    bubbleVariant, setBubbleVariant,
    hintVisible, setHintVisible,
    displayMode, setDisplayMode
  };
}

export function walkApprenticeTo(
  targetX: number,
  targetY: number,
  setState: (s: ApprenticeStateName) => void,
  setPosition: (p: ApprenticePosition) => void,
  onArrive?: () => void
) {
  setState('walking');

  // Get current position (default bottom-right if null)
  const startX = window.innerWidth - 100;
  const startY = window.innerHeight - 100;

  setPosition({ x: startX, y: startY });

  // Trigger CSS transition by setting new position after 1 frame
  requestAnimationFrame(() => {
    setPosition({ x: targetX, y: targetY });
  });

  // After walk transition completes (1.2s), settle into pointing
  setTimeout(() => {
    setState('pointing');
    onArrive?.();
  }, 1200);
}
