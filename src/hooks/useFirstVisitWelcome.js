import { useEffect, useRef } from 'react';

export function useFirstVisitWelcome(
  apprenticeReady,
  setBubbleText,
  setBubbleVariant,
  setBubbleActions,
  startOverviewTour
) {
  const hasShownThisMountRef = useRef(false);

  useEffect(() => {
    if (!apprenticeReady) return;
    if (hasShownThisMountRef.current) return;

    const timer = setTimeout(() => {
      hasShownThisMountRef.current = true;
      
      setBubbleVariant('micro');
      setBubbleText("I'm here to help!");
      setBubbleActions(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [apprenticeReady, setBubbleText, setBubbleVariant, setBubbleActions, startOverviewTour]);
}
