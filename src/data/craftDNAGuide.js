export const craftDNAGuideSteps = [
  {
    // Step 1: Explain the scanner itself
    targetSelector: '#craft-dna',
    sectionId: 'craft-dna',
    apprenticePosition: 'right',
    text: "This little quiz asks five quick questions and matches you to a piece — pottery, jewelry, painting, or textile — that fits how you naturally think and feel."
  },
  {
    // Step 2: Point at the start button, wait for click
    targetSelector: '#craft-dna .btn-fill',
    apprenticePosition: 'right',
    text: "Go ahead and click 'Discover Your Piece' — I'll walk through each question with you as it comes up.",
    pointerArrow: true,
    action: 'wait-for-click',
    waitForSelector: '.dna-question, .quiz-question'
  },
  // Steps 3-7: ONE per quiz question
  {
    questionIndex: 0,
    apprenticePosition: 'left',
    text: "This first question is about timing — think about how you naturally approach your morning. Are you the type to rush through breakfast, or do you take your time with that first cup of something warm? There's no right answer — just go with what feels true."
  },
  {
    questionIndex: 1,
    apprenticePosition: 'left',
    text: "This one's about how you make decisions. Picture choosing a restaurant — do you research everything first, or pick based on a feeling and figure it out as you go? Same idea here."
  },
  {
    questionIndex: 2,
    apprenticePosition: 'left',
    text: "Think about your favorite room in your home. What makes it feel like 'you'? Is it the colors, the objects in it, how tidy or lived-in it feels? That's the spirit of this question."
  },
  {
    questionIndex: 3,
    apprenticePosition: 'left',
    text: "Imagine receiving a handmade gift versus a store-bought one — what matters more to you in that moment? This question is getting at that same instinct."
  },
  {
    questionIndex: 4,
    apprenticePosition: 'left',
    text: "Last one — think about something you own that you genuinely love. What is it about that object that makes it special to you? Answer from that feeling."
  },
  {
    // Final step: results explanation
    targetSelector: '.dna-result, .quiz-result',
    apprenticePosition: 'right',
    text: "And that's it — your result will show the piece that matches your answers, along with why it fits. Take your time with it.",
    isLastStep: true
  }
];
