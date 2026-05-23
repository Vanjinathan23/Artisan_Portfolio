export interface GalleryItem {
  id: string;
  cat: string;
  title: string;
  desc: string;
  full: string;
  thumb: string;
  className: string;
}

export const galleryItems: GalleryItem[] = [
  { id: '1', cat: 'pottery', title: 'Morning Calm', desc: 'Inspired by the stillness of dawn mist over still water. This vessel was thrown on a cold January morning.', thumb: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=900&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1400&auto=format&fit=crop', className: 'g-big' },
  { id: '2', cat: 'jewelry', title: 'Ember Ring', desc: 'Forged from the memory of a campfire. Hammered over three days from Rajasthan copper.', thumb: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1400&auto=format&fit=crop', className: 'g-med' },
  { id: '4', cat: 'textile', title: 'Woven Dusk', desc: 'Each thread woven at the hour when light turns amber. Passed down four generations.', thumb: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1400&auto=format&fit=crop', className: 'g-tall' },
  { id: '3', cat: 'painting', title: 'Rainy Season', desc: 'Every brushstroke carried the weight of a monsoon afternoon. Painted on unprimed linen.', thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1400&auto=format&fit=crop', className: 'g-med' },
  { id: '5', cat: 'pottery', title: 'Earth Vessel', desc: 'Shapened by hands that remember the patience of the soil. Unglazed exterior.', thumb: '/src/assets/images/collection_pottery_vessel_1779208861961.png', full: '/src/assets/images/collection_pottery_vessel_1779208861961.png', className: 'g-wide' },
  { id: '6', cat: 'jewelry', title: 'Silver Drift', desc: 'A sculptural piece that moves like a thought. Hand-forged sterling silver with an organic finish.', thumb: '/src/assets/images/collection_jewelry_silver_1779208879078.png', full: '/src/assets/images/collection_jewelry_silver_1779208879078.png', className: 'g-med' },
  { id: '7', cat: 'painting', title: 'Ochre Mind', desc: 'Abstract explorations of landscape and memory using raw pigments on linen.', thumb: '/src/assets/images/collection_painting_ochre_1779208919121.png', full: '/src/assets/images/collection_painting_ochre_1779208919121.png', className: 'g-med' },
  { id: '8', cat: 'textile', title: 'Indigo Throw', desc: 'Hand-woven using traditional techniques and natural indigo dye. A piece of living heritage.', thumb: '/src/assets/images/collection_textile_thow_1779208900443.png', full: '/src/assets/images/collection_textile_thow_1779208900443.png', className: 'g-med' },
  { id: '9', cat: 'pottery', title: 'Midnight Cup', desc: 'Crafted for the tea ritual of solitude. Dark glaze that holds the color of 3am.', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&auto=format&fit=crop', className: 'g-sm' },
  { id: '10', cat: 'jewelry', title: 'Copper Echo', desc: 'Minimalist statement piece that echoes the curves of the landscape.', thumb: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&auto=format&fit=crop', className: 'g-sm' },
  { id: '11', cat: 'painting', title: 'Azure Hour', desc: 'Capturing the brief moment when the sky is neither day nor night.', thumb: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=80', full: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1400&auto=format&fit=crop', className: 'g-sm' },
  { id: '12', cat: 'pottery', title: 'Stone Jar', desc: 'Heavy, grounded, and permanent. A sentinel for the domestic space.', thumb: '/src/assets/images/collection_stone_jar_1779209073362.png', full: '/src/assets/images/collection_stone_jar_1779209073362.png', className: 'g-med' },
];
