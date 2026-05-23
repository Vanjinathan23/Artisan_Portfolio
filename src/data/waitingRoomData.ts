export interface CommissionSlot {
  id: number;
  label: string;
  type: string | null;
  city: string | null;
  status: 'in-progress' | 'available';
  startedWeeksAgo: number | null;
  piece: string | null;
}

export interface SlotsConfig {
  total: number;
  taken: number;
  available: number;
  weeksToStart: number;
  currentMonth: string;
}

export const slots: SlotsConfig = {
  total: 5,
  taken: 3,
  available: 2,
  weeksToStart: 3,
  currentMonth: 'June 2024',
};

export const queue: CommissionSlot[] = [
  {
    id: 1,
    label: 'Commission 001',
    type: 'Pottery',
    city: 'Mumbai',
    status: 'in-progress',
    startedWeeksAgo: 2,
    piece: 'Custom Tea Set',
  },
  {
    id: 2,
    label: 'Commission 002',
    type: 'Jewelry',
    city: 'Delhi',
    status: 'in-progress',
    startedWeeksAgo: 1,
    piece: 'Wedding Ring Pair',
  },
  {
    id: 3,
    label: 'Commission 003',
    type: 'Painting',
    city: 'Bangalore',
    status: 'in-progress',
    startedWeeksAgo: 0,
    piece: 'Abstract Study',
  },
  {
    id: 4,
    label: 'Slot 004',
    type: null,
    city: null,
    status: 'available',
    startedWeeksAgo: null,
    piece: null,
  },
  {
    id: 5,
    label: 'Slot 005',
    type: null,
    city: null,
    status: 'available',
    startedWeeksAgo: null,
    piece: null,
  },
];
