export const waitingRoomGuideSteps = [
  {
    // Step 1: Explain the section first
    targetSelector: '#waiting-room',
    sectionId: 'waiting-room',
    apprenticePosition: 'top',
    text: "Let's reserve a slot together. First — see the cards marked 'Available'? Those are open commission spots."
  },
  {
    // Step 2: Point at an available slot, ask user to click it
    targetSelector: '.slot-card[data-slot="4"]',
    apprenticePosition: 'bottom',
    text: "Go ahead and click this open slot — it'll open a short reservation form.",
    pointerArrow: true,
    action: 'wait-for-click',
    waitForSelector: '.wr-modal-overlay.open'
  },
  {
    // Step 3: Name field
    targetSelector: '.wr-form input#wr-name, .wr-form .fg:nth-child(1) input',
    apprenticePosition: 'right',
    text: "Start with your name here — just whatever you'd like to be called.",
    pointerArrow: true,
    action: 'highlight-only'
  },
  {
    // Step 4: Email field
    targetSelector: '.wr-form input#wr-email, .wr-form .fg:nth-child(2) input',
    apprenticePosition: 'right',
    text: "Then your email — this is how I'll get back to you within 24 hours.",
    pointerArrow: true,
    action: 'highlight-only'
  },
  {
    // Step 5: Craft type select
    targetSelector: '.wr-form select#wr-craft-type, .wr-form .fg:nth-child(3) select',
    apprenticePosition: 'right',
    text: "Here, pick what kind of piece calls to you — pottery, jewelry, painting, or textile. Not sure? Pick the one you keep coming back to.",
    pointerArrow: true,
    action: 'highlight-only'
  },
  {
    // Step 6: Vision/description textarea
    targetSelector: '.wr-form textarea#wr-vision, .wr-form .fg:nth-child(4) textarea',
    apprenticePosition: 'right',
    text: "And here — just describe the feeling you're after. It doesn't need to be technical. 'Something calm for my morning coffee' is plenty.",
    pointerArrow: true,
    action: 'highlight-only'
  },
  {
    // Step 7: Timeline select
    targetSelector: '.wr-form select#wr-timeline, .wr-form .fg:nth-child(5) select',
    apprenticePosition: 'right',
    text: "Last field — roughly when you'd like it by. No pressure, this just helps me plan.",
    pointerArrow: true,
    action: 'highlight-only'
  },
  {
    // Step 8: Submit button
    targetSelector: '.wr-form button[type="submit"], .wr-submit-btn',
    apprenticePosition: 'top',
    text: "And that's it — once you're happy with everything, tap this to send it my way. I'll take it from here.",
    pointerArrow: true,
    action: 'highlight-only',
    isLastStep: true
  }
];
