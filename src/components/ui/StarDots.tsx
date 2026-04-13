// ─── src/components/ui/StarDots.tsx ─────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// This is a small REUSABLE component
// It shows rating as dots instead of stars
// Filled dot = good rating
// Empty dot = not rated
//
// HOW TO USE IT anywhere in the app:
// import StarDots from '../components/ui/StarDots'
// <StarDots rating={5} />     ← shows 5 filled dots
// <StarDots rating={3} />     ← shows 3 filled, 2 empty
// <StarDots rating={4} max={6} /> ← shows 4 filled out of 6

// Props = inputs we pass into this component
interface StarDotsProps {
  rating: number; // how many dots are filled
  max?: number;   // total dots — ? means optional, default is 5
}

export default function StarDots({ rating, max = 5 }: StarDotsProps) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating: ${rating} out of ${max}`}
    >
      {/* Create an array of "max" length and loop through it */}
      {/* Example: max=5 creates [0,1,2,3,4] */}
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-all duration-300 ${
            i < rating
              ? // Filled dot — index is less than rating
                'w-2 h-2 bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]'
              : // Empty dot — index is more than rating
                'w-1.5 h-1.5 bg-white/25'
          }`}
        />
      ))}
    </div>
  );
}