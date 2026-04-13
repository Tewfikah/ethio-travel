// ─── src/data/destinations.ts ────────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// All destination data lives here
// We define the type HERE directly
// No imports needed = no errors!

// Define the shape of destination directly here
interface Destination {
  id: number;
  title: string;
  sub: string;
  rating: number;
  image: string;
}

export const destinations: Destination[] = [
  {
    id: 1,
    title: 'Lalibela Churches',
    sub: 'Lalibela, Ethiopia',
    rating: 5,
    image: '/dest-1.jpg',
  },
  {
    id: 2,
    title: 'Blue Nile Falls',
    sub: 'Tis Abay, Ethiopia',
    rating: 5,
    image: '/dest-2.jpg',
  },
  {
    id: 3,
    title: 'Fasil Ghebbi',
    sub: 'Gondar, Ethiopia',
    rating: 4,
    image: '/dest-3.jpg',
  },
  {
    id: 4,
    title: 'Erta Ale Volcano',
    sub: 'Afar Region, Ethiopia',
    rating: 5,
    image: '/dest-4.jpg',
  },
];

// Nav links
export const NAV_LINKS = ['News', 'Destinations', 'Blog', 'Contact'];

export const ACTIVE_LINK = 'Destinations';