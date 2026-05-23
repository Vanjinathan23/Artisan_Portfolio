export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export const processSteps: ProcessStep[] = [
  { num: '01 / 07', title: 'Material Selection', desc: 'Only sustainably sourced earth clays. Each batch tested by hand for texture and elasticity.', img: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&auto=format&fit=crop&q=80' },
  { num: '02 / 07', title: 'The Shaping', desc: 'Hands meet clay on the wheel. No templates, no molds. Every form emerges through conversation.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80' },
  { num: '03 / 07', title: 'Refinement', desc: 'Days of drying, trimming, and texturing. The piece is touched hundreds of times.', img: '/src/assets/images/refinement_process_1779208669292.png' },
  { num: '04 / 07', title: 'Slow Drying', desc: 'Patience is a material. We allow moisture to leave the clay naturally over weeks to prevent internal stress.', img: '/src/assets/images/slow_drying_process_1779208490709.png' },
  { num: '05 / 07', title: 'The Bisque Fire', desc: 'Transformative heat at 900°C changes Earth into Stone. A permanent chemical change that prepares the piece.', img: '/src/assets/images/bisque_fire_process_1779208509777.png' },
  { num: '06 / 07', title: 'Glazing Ritual', desc: 'Applied by hand using minerals gathered from the landscape. Each brushstroke creates a unique landscape on the surface.', img: '/src/assets/images/glazing_ritual_process_1779208531913.png' },
  { num: '07 / 07', title: 'The Final Piece', desc: 'Fired at 1280°C. What emerges belongs to both the maker and the flame — a finished piece of soul.', img: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&auto=format&fit=crop&q=80' },
];
