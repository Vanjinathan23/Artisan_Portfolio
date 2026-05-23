export interface Testimonial {
  stars: string;
  text: string;
  name: string;
  piece: string;
}

export const testimonials: Testimonial[] = [
  { stars: '★★★★★', text: '"I placed it by my window and it changed how I start my day. It is not just an object — it breathes."', name: 'Priya Mehta', piece: 'Morning Calm Vase' },
  { stars: '★★★★★', text: '"My wife cried when she saw it. Not because it was expensive. Because it looked like it understood her."', name: 'James Holloway', piece: 'Ember Ring' },
  { stars: '★★★★★', text: '"The craftsmanship is unlike anything I found in galleries twice the price. This is the real thing."', name: 'Aiko Tanaka', piece: 'Woven Dusk Scarf' },
  { stars: '★★★★★', text: '"Tea tastes different in these cups. Whoever made them put something invisible in the clay."', name: 'Leila Rostami', piece: 'Midnight Cup Set' },
  { stars: '★★★★★', text: '"Three people asked if it was vintage. No — it is brand new and already timeless."', name: 'Marcus Wren', piece: 'Forest Clasp' },
];
