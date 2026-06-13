import { useState, useEffect } from 'react';

export function useApprenticeState() {
  const [state, setState] = useState('idle');
  // idle | greeting | listening | thinking | speaking | walking | pointing

  const [position, setPosition] = useState({ x: null, y: null });
  // null = use default CSS fixed position (bottom-right)
  // set values when walking to a specific screen location

  const [bubbleText, setBubbleText] = useState(null);
  const [bubbleActions, setBubbleActions] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // isOpen = expanded interaction mode (voice orb visible)

  // On first page load: greeting sequence
  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('apprentice_greeted');
    if (!hasGreeted) {
      setTimeout(() => {
        setState('greeting');
        setBubbleText("Hi — I'm here if you'd like a guide through the studio.");
        setTimeout(() => {
          setState('idle');
          setBubbleText(null);
        }, 4000);
        sessionStorage.setItem('apprentice_greeted', 'true');
      }, 2000); // wait 2s after page load
    }
  }, []);

  return {
    state, setState,
    position, setPosition,
    bubbleText, setBubbleText,
    bubbleActions, setBubbleActions,
    isOpen, setIsOpen
  };
}

export function walkApprenticeTo(targetX, targetY, setState, setPosition, onArrive) {
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
