export interface Story {
  id: string;
  title: string;
  text: string;
  img: string;
  cat: string;
  flip: boolean;
}

export const stories: Story[] = [
  { id: '01', title: 'Morning Calm', text: 'Inspired by the calmness of rainy mornings. This vessel was thrown before dawn — when the studio held the same silence as the world outside.', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80', cat: 'Pottery · 2024', flip: false },
  { id: '02', title: 'Ember Ring', text: 'Forged from the memory of a campfire that burned through the night. The copper was sourced from a single mine in Rajasthan. No molds. No casting.', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&auto=format&fit=crop&q=80', cat: 'Jewelry · 2023', flip: true },
  { id: '03', title: 'Rainy Season', text: 'Painted on unprimed linen with hand-ground mineral pigments — the same materials used by painters four centuries ago.', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&auto=format&fit=crop&q=80', cat: 'Painting · 2023', flip: false },
];
