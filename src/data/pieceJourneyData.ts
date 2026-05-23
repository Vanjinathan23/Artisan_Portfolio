export interface SoldPiece {
  id: string;
  name: string;
  type: string;
  image: string;
  dateMade: string;
  timeStarted: string;
  weather: string;
  material: string;
  firingTemp: string;
  glaze: string;
  givenTo: string;
  givenDate: string;
  processImage: string;
  artisanNote: string;
  status: string;
}

export const soldPieces: SoldPiece[] = [
  {
    id: 'AM-001',
    name: 'Morning Calm',
    type: 'Pottery',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
    dateMade: 'January 14, 2024',
    timeStarted: '5:47 AM',
    weather: 'Cold and overcast. 18°C. No wind.',
    material: 'Stoneware clay · Batch #C-2401 · Sourced: Rajasthan',
    firingTemp: '1280°C · Reduction atmosphere · 9 hours',
    glaze: 'Hand-mixed iron oxide with wood ash · Single dip',
    givenTo: 'Mumbai',
    givenDate: 'February 3, 2024',
    processImage: 'https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&auto=format&fit=crop&q=80',
    artisanNote:
      'This vessel broke once during trimming and was remade. The second version was better. It always is. I hope it holds your mornings as carefully as it held mine.',
    status: 'With its owner',
  },
  {
    id: 'AM-002',
    name: 'Ember Ring',
    type: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80',
    dateMade: 'October 22, 2023',
    timeStarted: '8:30 PM',
    weather: 'Clear night. 24°C. The kind of evening that feels like a memory.',
    material: 'Copper · Single ingot · Rajasthan origin',
    firingTemp: 'Hammered cold. 3 sessions over 3 days.',
    glaze: 'Natural patina. No coating. Will age with the wearer.',
    givenTo: 'Delhi',
    givenDate: 'November 18, 2023',
    processImage: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&auto=format&fit=crop&q=80',
    artisanNote:
      'I made this for someone I had not met yet. You were the right person. The slight curve in the band is not a flaw — it is where I stopped and sat with it for a long time before continuing.',
    status: 'With its owner',
  },
  {
    id: 'AM-003',
    name: 'Rainy Season',
    type: 'Painting',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80',
    dateMade: 'July 8, 2023',
    timeStarted: '11:15 AM',
    weather: 'Heavy monsoon rain. 29°C. The smell of wet earth came through the studio windows.',
    material: 'Unprimed linen canvas · Hand-ground ochre, umber, carbon black',
    firingTemp: 'N/A — Air dried. 6 weeks before varnishing.',
    glaze: 'Damar resin varnish · One coat · Applied by hand',
    givenTo: 'Bangalore',
    givenDate: 'August 30, 2023',
    processImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&auto=format&fit=crop&q=80',
    artisanNote:
      'I did not plan to make this painting. The rain made me. I sat down and started working and four hours passed without my noticing. It does not depict rain. It is the feeling of it.',
    status: 'With its owner',
  },
];
