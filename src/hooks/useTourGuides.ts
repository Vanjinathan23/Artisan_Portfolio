import { useState } from 'react';
import { runTour, runTourStep } from '../utils/tourEngine.js';
import { speak, isVoiceOutputEnabled } from '../utils/voiceEngine.js';

import { overviewTourSteps } from '../data/overviewTour';
import { waitingRoomGuideSteps } from '../data/waitingRoomGuide';
import { craftDNAGuideSteps } from '../data/craftDNAGuide';
import { pieceJourneyGuideSteps } from '../data/pieceJourneyGuide';

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useTourGuides({
  apprentice,
  setCutout,
  setTourActive,
  setCurrentStep,
  setHasPointerArrow
}: any) {
  const [returnAnchor, setReturnAnchor] = useState<number | null>(null);
  const [showReturnPill, setShowReturnPill] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const helpers = {
    setCutout,
    setState: apprentice.setState,
    setPosition: apprentice.setPosition,
    setBubbleText: apprentice.setBubbleText,
    setBubbleActions: apprentice.setBubbleActions,
    setTourActive,
    setCurrentStep,
    setHasPointerArrow,
    voiceEnabled: isVoiceOutputEnabled()
  };

  function saveScrollAnchor() {
    return window.scrollY;
  }

  function endTourEarly() {
    setTourActive(false);
    setCutout(null);
    apprentice.setState('idle');
    apprentice.setBubbleText(null);
    apprentice.setBubbleActions(null);
    apprentice.setBubbleVariant('full');
    setHasPointerArrow(false);
    apprentice.setPosition({ x: null, y: null });
  }

  // --- SYSTEM A: OVERVIEW TOUR ---
  async function startOverviewTour() {
    const savedAnchor = saveScrollAnchor();
    setReturnAnchor(savedAnchor);
    setShowReturnPill(true);
    setTourActive(true);
    apprentice.setBubbleVariant('overview');
    setStepIndex(0);

    await runOverviewStep(0);
  }

  async function runOverviewStep(index: number) {
    const step = overviewTourSteps[index];
    setStepIndex(index);

    // Clear old bubble text immediately during transition
    apprentice.setBubbleText(null);

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    let speechFinished = false;

    // Speak immediately to preserve user gesture context
    if (isVoiceOutputEnabled()) {
      apprentice.setState('speaking');
      speak(step.text, {
        onEnd: () => {
          speechFinished = true;
          apprentice.setState('pointing');
        }
      });
    }

    const el = document.getElementById(step.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    await wait(900);

    const targetEl = document.querySelector(step.targetSelector);
    let cutout = null;
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      cutout = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
    }
    if (cutout) setCutout(cutout);

    apprentice.setPosition({ x: null, y: null });
    await wait(200);

    if (!speechFinished) {
      apprentice.setBubbleText(step.text);
    }
    setCurrentStep(step);

    if (!isVoiceOutputEnabled()) {
      apprentice.setState('pointing');
      apprentice.setBubbleText(step.text);
    }
  }

  function goToNextStep() {
    if (stepIndex < overviewTourSteps.length - 1) {
      runOverviewStep(stepIndex + 1);
    }
  }

  function goToPreviousStep() {
    if (stepIndex > 0) {
      runOverviewStep(stepIndex - 1);
    }
  }

  function endOverviewTour() {
    setTourActive(false);
    setCutout(null);
    apprentice.setBubbleText(null);
    apprentice.setBubbleVariant('full');
    setCurrentStep(null);
    setHasPointerArrow(false);
    apprentice.setState('walking');
    apprentice.setPosition({ x: null, y: null });
    setTimeout(() => {
      apprentice.setState('idle');
    }, 1200);
  }

  // --- SYSTEM B, C, D: CONTEXTUAL GUIDES ---
  function openApprenticeGuide(guideKey: string) {
    const savedAnchor = saveScrollAnchor();
    setReturnAnchor(savedAnchor);
    setShowReturnPill(true);
    setTourActive(true);
    apprentice.setBubbleVariant('full');

    switch (guideKey) {
      case 'waiting-room-form':
        runWaitingRoomGuide();
        break;
      case 'craft-dna-mcq':
        runCraftDNAGuide();
        break;
      case 'piece-journey-explainer':
        runPieceJourneyGuide();
        break;
    }
  }

  async function runWaitingRoomGuide() {
    await runTour(waitingRoomGuideSteps, helpers);
    endTourEarly();
  }

  async function runPieceJourneyGuide() {
    await runTour(pieceJourneyGuideSteps, helpers);
    endTourEarly();
  }

  async function runCraftDNAGuide() {
    // Run steps 1 + 2 using the shared engine
    await runTourStep(craftDNAGuideSteps[0], helpers);

    // Wait for next
    await new Promise<void>((resolve) => {
      apprentice.setBubbleActions([
        { label: 'Next →', onClick: () => resolve() }
      ]);
    });

    await runTourStep(craftDNAGuideSteps[1], helpers); // wait-for-click

    let currentGuideQIndex = -1;

    function handleQuestionChange(e: any) {
      const qIndex = e.detail.questionIndex;
      const guideStep = craftDNAGuideSteps.find(s => s.questionIndex === qIndex);
      if (!guideStep || qIndex === currentGuideQIndex) return;
      currentGuideQIndex = qIndex;

      const targetEl = document.querySelector('.dna-question, .quiz-question');
      let cutout = null;
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        cutout = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
      }
      if (cutout) setCutout(cutout);

      apprentice.setPosition({ x: null, y: null });
      apprentice.setState('pointing');
      apprentice.setBubbleText(guideStep.text);
      apprentice.setBubbleVariant('guide-mcq');
      apprentice.setBubbleActions(null);

      if (isVoiceOutputEnabled()) {
        apprentice.setState('speaking');
        speak(guideStep.text, { onEnd: () => apprentice.setState('pointing') });
      }
    }

    window.addEventListener('artisana:dna-question-change', handleQuestionChange);

    function handleQuizComplete() {
      window.removeEventListener('artisana:dna-question-change', handleQuestionChange);
      window.removeEventListener('artisana:dna-complete', handleQuizComplete);
      runTourStep(craftDNAGuideSteps[craftDNAGuideSteps.length - 1], helpers);
    }
    window.addEventListener('artisana:dna-complete', handleQuizComplete);

    handleQuestionChange({ detail: { questionIndex: 0 } });
  }

  return {
    returnAnchor,
    setReturnAnchor,
    showReturnPill,
    setShowReturnPill,
    stepIndex,
    startOverviewTour,
    goToNextStep,
    goToPreviousStep,
    endOverviewTour,
    openApprenticeGuide,
    endTourEarly
  };
}
