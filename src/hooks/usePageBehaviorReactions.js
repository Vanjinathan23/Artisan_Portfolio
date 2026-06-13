import { useEffect } from 'react';

export function usePageBehaviorReactions({
  setState, setPoseName, setBubbleText, setBubbleVariant, currentState, isOpen, tourActive
}) {

  // ── REACTION 1: CURIOUS — user lingers on a gallery piece ──────
  useEffect(() => {
    if (isOpen || tourActive) return;

    let lingerTimer = null;
    let lastHoveredItem = null;

    function handleMouseOver(e) {
      const galleryItem = e.target.closest('.gi');
      if (!galleryItem) {
        clearTimeout(lingerTimer);
        return;
      }
      if (galleryItem === lastHoveredItem) return;
      lastHoveredItem = galleryItem;

      clearTimeout(lingerTimer);
      lingerTimer = setTimeout(() => {
        // Only react if Apprentice is currently idle
        if (currentState === 'idle') {
          const pieceName = galleryItem.dataset.title || 'this piece';
          setBubbleVariant('micro');
          setPoseName('curious');
          setState('curious-reacting'); // temporary micro-state
          setBubbleText(`*looks over* — ${pieceName} is one worth pausing on.`);

          setTimeout(() => {
            setBubbleText(null);
            setBubbleVariant('full');
            setState('idle');
            setPoseName('idle-default');
          }, 3000);
        }
      }, 4000); // 4 second linger threshold
    }

    function handleMouseOut(e) {
      if (e.target.closest('.gi') === lastHoveredItem) {
        clearTimeout(lingerTimer);
        lastHoveredItem = null;
      }
    }

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      clearTimeout(lingerTimer);
    };
  }, [currentState, isOpen, tourActive, setState, setPoseName, setBubbleText, setBubbleVariant]);


  // ── REACTION 2: QUIET PRIDE — Craft DNA quiz completed ──────────
  useEffect(() => {
    function handleQuizComplete() {
      if (isOpen || tourActive) return;
      
      setBubbleVariant('micro');
      setPoseName('quiet-pride');
      setState('reacting');
      setBubbleText("That suits you — I think you found the right piece.");

      setTimeout(() => {
        setBubbleText(null);
        setBubbleVariant('full');
        setState('idle');
        setPoseName('idle-default');
      }, 3500);
    }

    window.addEventListener('artisana:dna-complete', handleQuizComplete);
    return () => window.removeEventListener('artisana:dna-complete', handleQuizComplete);
  }, [isOpen, tourActive, setState, setPoseName, setBubbleText, setBubbleVariant]);


  // ── REACTION 3: HUSHED — user discovers Unseen Hours journal ────
  useEffect(() => {
    function handleJournalEnter() {
      if (isOpen || tourActive) return;

      setBubbleVariant('micro');
      setPoseName('hushed');
      setState('reacting');
      setBubbleText("These pages are usually just for me. I'm glad you're here.");

      setTimeout(() => {
        setBubbleText(null);
        setBubbleVariant('full');
        setState('idle');
        setPoseName('idle-default');
      }, 4000);
    }

    window.addEventListener('artisana:journal-enter', handleJournalEnter);
    return () => window.removeEventListener('artisana:journal-enter', handleJournalEnter);
  }, [isOpen, tourActive, setState, setPoseName, setBubbleText, setBubbleVariant]);

}
