export const overviewTourSteps = [
  // PANEL 1 — Hero / Welcome
  {
    id: 'overview-1',
    targetSelector: '#hero',
    sectionId: 'hero',
    apprenticePosition: 'bottom',
    panelTitle: "Welcome to Artisana",
    text: "This is the studio's front door — every visit starts here. Everything below tells the story of how each piece comes to life. Shall I show you the next part?",
  },
  // PANEL 2 — About / Artisan's Story
  {
    id: 'overview-2',
    targetSelector: '#about',
    sectionId: 'about',
    apprenticePosition: 'left',
    panelTitle: "The Artisan's Story",
    text: "Here you'll meet the maker — how this studio started, and the journey behind it. A little context goes a long way. Shall we walk over to the craft section?",
  },
  // PANEL 3 — Process / Behind the Craft
  {
    id: 'overview-3',
    targetSelector: '#process',
    sectionId: 'process',
    apprenticePosition: 'right',
    panelTitle: "Behind the Craft",
    text: "Curious how a piece actually gets made? This section breaks the whole process into four honest steps — drag sideways to explore each one. Would you like to check out the Waiting Room next?",
  },
  // PANEL 4 — Waiting Room (mentions the Get Help button)
  {
    id: 'overview-4',
    targetSelector: '#waiting-room',
    sectionId: 'waiting-room',
    apprenticePosition: 'top',
    panelTitle: "The Waiting Room",
    text: "This is where commissions happen — only a few slots open each month. If you ever want to reserve one, look for the 'Walk Me Through It' button — I'll help you fill it out. Shall we move to the collection?",
  },
  // PANEL 5 — Gallery / Collection
  {
    id: 'overview-5',
    targetSelector: '#gallery',
    sectionId: 'gallery',
    apprenticePosition: 'left',
    panelTitle: "The Collection",
    text: "Every piece here is one of a kind — tap any image to see it up close, with its own story underneath. Would you like to see how we match you to a piece?",
  },
  // PANEL 6 — Craft DNA Scanner (mentions the Get Help button)
  {
    id: 'overview-6',
    targetSelector: '#craft-dna',
    sectionId: 'craft-dna',
    apprenticePosition: 'right',
    panelTitle: "Which Piece Was Made for You?",
    text: "Not sure where to start? This little quiz matches you to a piece based on how you answer a few questions. If you'd like help with it, there's a button for that too. Shall I show you how we record each piece's provenance next?",
  },
  // PANEL 7 — Piece's Journey (mentions the Get Help button)
  {
    id: 'overview-7',
    targetSelector: '#piece-journey',
    sectionId: 'piece-journey',
    apprenticePosition: 'top',
    panelTitle: "Every Piece Carries Its Own Memory",
    text: "When a piece is sold, it doesn't just disappear — it gets its own little digital record. I can show you what that looks like, if you're curious. Shall we finish the tour?",
  },
  // PANEL 8 — Closing / Return to corner
  {
    id: 'overview-8',
    targetSelector: '#hero',
    sectionId: 'hero',
    apprenticePosition: 'bottom',
    panelTitle: "That's the studio",
    text: "That's everything, in short. I'll be nearby if you need me — just tap me anytime, or hold to talk. Enjoy looking around.",
    isLastStep: true
  }
];
