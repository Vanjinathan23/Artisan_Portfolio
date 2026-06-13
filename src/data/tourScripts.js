// Pre-built fallback guided tours when API is unavailable or for offline use

export const fallbackTours = {
  best_pieces: {
    type: "tour",
    steps: [
      {
        targetSelector: ".gi[data-idx=\"0\"]",
        sectionId: "gallery",
        text: "This is Morning Calm — thrown before dawn on a January morning when the studio was as still as the world outside.",
        apprenticePosition: "right"
      },
      {
        targetSelector: ".s-item[data-piece=\"0\"]",
        sectionId: "stories",
        text: "It found its home in Mumbai. The person who owns it told us it's become part of how she starts every morning.",
        apprenticePosition: "left"
      }
    ]
  },
  commission: {
    type: "tour",
    steps: [
      {
        targetSelector: "#waiting-room",
        sectionId: "waiting-room",
        text: "We only take 5 commissions a month — right now there are 2 open slots.",
        apprenticePosition: "top"
      },
      {
        targetSelector: ".slot-card[data-slot=\"4\"]",
        sectionId: "waiting-room",
        text: "Tap an open slot like this one to start a reservation.",
        apprenticePosition: "bottom"
      },
      {
        targetSelector: ".contact-form",
        sectionId: "contact",
        text: "Or just tell me here what you're imagining — I'll pass it along.",
        apprenticePosition: "left"
      }
    ]
  },
  process: {
    type: "tour",
    steps: [
      {
        targetSelector: ".pc[data-step=\"1\"]",
        sectionId: "craft",
        text: "Every piece starts with material selection. We test the clay by hand for texture and memory.",
        apprenticePosition: "right"
      },
      {
        targetSelector: ".pc[data-step=\"2\"]",
        sectionId: "craft",
        text: "Next is the shaping stage. All vessels are thrown on the wheel without templates or molds.",
        apprenticePosition: "bottom"
      },
      {
        targetSelector: ".pc[data-step=\"4\"]",
        sectionId: "craft",
        text: "After weeks of slow drying, pieces are fired twice. The second firing reaches 1280°C to vitrify the stone.",
        apprenticePosition: "left"
      }
    ]
  }
};
