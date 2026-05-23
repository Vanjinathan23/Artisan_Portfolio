export interface QuizOption {
  label: string;
  value: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface CraftResult {
  craftType: string;
  piece: string;
  image: string;
  headline: string;
  description: string;
  archetype: string;
  archetypeDesc: string;
}

type CraftKey = 'pottery' | 'jewelry' | 'painting' | 'textile';

interface ScoreWeights {
  pottery: number;
  jewelry: number;
  painting: number;
  textile: number;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What time of day do you feel most like yourself?',
    options: [
      { label: 'Before the world wakes up', value: 'dawn', icon: '◐' },
      { label: 'When light is brightest and direct', value: 'noon', icon: '○' },
      { label: 'The golden hour before dark', value: 'dusk', icon: '◑' },
      { label: 'Deep into the night, alone', value: 'night', icon: '●' },
    ],
  },
  {
    id: 2,
    question: 'How do you prefer your tea?',
    options: [
      { label: 'Strong, dark, no additions', value: 'strong', icon: '▪' },
      { label: 'Milky and soft, sweetened', value: 'milky', icon: '□' },
      { label: 'Green and clean, ceremonial', value: 'green', icon: '◇' },
      { label: "I don't drink tea. I prefer silence.", value: 'none', icon: '—' },
    ],
  },
  {
    id: 3,
    question: "What does your home feel like when you're happiest in it?",
    options: [
      { label: 'Warm, layered, rich in texture', value: 'warm', icon: '⬡' },
      { label: 'Minimal, each object chosen', value: 'minimal', icon: '◻' },
      { label: 'Full of books and quiet corners', value: 'cozy', icon: '▣' },
      { label: 'Changing constantly, no fixed form', value: 'fluid', icon: '◈' },
    ],
  },
  {
    id: 4,
    question: 'When you hold something beautiful, what do you notice first?',
    options: [
      { label: 'Its weight — how it settles in the hand', value: 'weight', icon: '↓' },
      { label: 'Its surface — smooth or rough against skin', value: 'texture', icon: '≈' },
      { label: 'Its color — the feeling the shade carries', value: 'color', icon: '◉' },
      { label: 'Its story — who made it and why', value: 'story', icon: '◎' },
    ],
  },
  {
    id: 5,
    question: 'What do you want an object to do for you?',
    options: [
      { label: 'Hold a ritual — make every morning deliberate', value: 'ritual', icon: '✦' },
      { label: 'Mark a moment — keep a memory physical', value: 'memory', icon: '◆' },
      { label: 'Simply exist — remind you that beauty is enough', value: 'beauty', icon: '✧' },
      { label: 'Be given — carry a feeling to someone else', value: 'gift', icon: '◇' },
    ],
  },
];

const scoring: Record<string, ScoreWeights> = {
  dawn:    { pottery: 3, jewelry: 1, painting: 2, textile: 1 },
  noon:    { pottery: 1, jewelry: 2, painting: 3, textile: 1 },
  dusk:    { pottery: 2, jewelry: 2, painting: 2, textile: 2 },
  night:   { pottery: 2, jewelry: 3, painting: 1, textile: 1 },
  strong:  { pottery: 3, jewelry: 1, painting: 1, textile: 2 },
  milky:   { pottery: 2, jewelry: 1, painting: 1, textile: 3 },
  green:   { pottery: 2, jewelry: 2, painting: 2, textile: 1 },
  none:    { pottery: 1, jewelry: 3, painting: 2, textile: 1 },
  warm:    { pottery: 2, jewelry: 1, painting: 1, textile: 3 },
  minimal: { pottery: 3, jewelry: 2, painting: 1, textile: 1 },
  cozy:    { pottery: 2, jewelry: 1, painting: 2, textile: 3 },
  fluid:   { pottery: 1, jewelry: 2, painting: 3, textile: 1 },
  weight:  { pottery: 3, jewelry: 2, painting: 1, textile: 1 },
  texture: { pottery: 2, jewelry: 1, painting: 1, textile: 3 },
  color:   { pottery: 1, jewelry: 2, painting: 3, textile: 2 },
  story:   { pottery: 2, jewelry: 3, painting: 2, textile: 1 },
  ritual:  { pottery: 3, jewelry: 1, painting: 1, textile: 2 },
  memory:  { pottery: 1, jewelry: 3, painting: 2, textile: 1 },
  beauty:  { pottery: 2, jewelry: 1, painting: 3, textile: 2 },
  gift:    { pottery: 1, jewelry: 3, painting: 1, textile: 3 },
};

export const craftResults: Record<CraftKey, CraftResult> = {
  pottery: {
    craftType: 'Pottery',
    piece: 'Morning Calm',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
    headline: 'You were made for still mornings.',
    description:
      'The Morning Calm vessel was thrown before dawn — in the same silence you seek. Functional, meditative, built to hold the beginning of every day. Someone who notices weight and prefers ritual over occasion will find in this piece a quiet companion that never asks for attention.',
    archetype: 'The Ritualist',
    archetypeDesc:
      'You find meaning in repetition. For you, beauty lives in the ordinary, returned to deliberately.',
  },
  jewelry: {
    craftType: 'Jewelry',
    piece: 'Ember Ring',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    headline: 'You carry fire quietly.',
    description:
      'The Ember Ring was forged for someone who notices what others miss — the asymmetry in something handmade, the warmth of copper against skin. You are the person who gives objects away before keeping them for yourself. This piece was made to be found by you.',
    archetype: 'The Bearer',
    archetypeDesc:
      'You carry meaning for others. The pieces you choose are never just yours — they are vessels for what you feel toward someone.',
  },
  painting: {
    craftType: 'Painting',
    piece: 'Rainy Season',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80',
    headline: 'You think in colours before words.',
    description:
      'Rainy Season was painted at noon, in the same harsh light that makes you feel most alive. You do not want an object to function — you want it to feel. You notice colour before anything else. The brushstroke matters. The weight of the pigment matters. This painting was made for a wall that already knows your name.',
    archetype: 'The Feeler',
    archetypeDesc:
      'You experience before you analyse. Colour is a language you were born reading.',
  },
  textile: {
    craftType: 'Textile',
    piece: 'Woven Dusk',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    headline: 'You are drawn to what was made slowly.',
    description:
      'Woven Dusk was made over three weeks on an inherited loom, at the hour the light turns amber. The texture is the first thing you would notice — the way thread sits against thread, each row a deliberate choice. Your home is layered. Your warmth is physical. This textile was woven for someone exactly like you.',
    archetype: 'The Keeper',
    archetypeDesc:
      'You surround yourself with things that hold memory. Your objects are not decorative — they are emotional anchors.',
  },
};

export function calculateResult(answers: Record<number, string>): CraftKey {
  const scores: Record<CraftKey, number> = { pottery: 0, jewelry: 0, painting: 0, textile: 0 };
  Object.values(answers).forEach((answerValue) => {
    const s = scoring[answerValue];
    if (s) {
      scores.pottery  += s.pottery;
      scores.jewelry  += s.jewelry;
      scores.painting += s.painting;
      scores.textile  += s.textile;
    }
  });
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as CraftKey;
}
