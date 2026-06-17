export const pieceJourneyGuideSteps = [
  {
    targetSelector: '#piece-journey',
    sectionId: 'piece-journey',
    apprenticePosition: 'top',
    text: "When someone buys a piece, it gets a permanent online page — like a little memory book just for that object."
  },
  {
    targetSelector: '.pj-card:first-child',
    apprenticePosition: 'right',
    text: "See this QR code? In real life, the owner scans this and it opens that piece's private page."
  },
  {
    targetSelector: '.pj-card:first-child .pj-view-link',
    apprenticePosition: 'bottom',
    text: "Curious what that page actually looks like? Click here and I'll show you — I'll wait for you on the other side.",
    pointerArrow: true,
    isLastStep: true
  }
];
