// ─── src/pages/News/NewsPage.tsx ─────────────────────────────────────
import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── News Data ─────────────────────────────────────────────────────── */
const featuredNews = [
  {
    id: 1,
    title: 'Best Time to Visit Harer & Jegol',
    date: 'April 25, 2024',
    location: 'Harar & Jegol, Ethiopia',
    description:
      'Discover the optimal times to explore the walled city of Harer and Jegol for the best weather and fewer tourists. Learn the best travel tips for an unforgettable trip to this historic city.',
    image: '/news-1.jpg.png',
  },
  {
    id: 2,
    title: 'Explore the Danakil Depression',
    date: 'April 20, 2024',
    location: 'Afar Region, Ethiopia',
    description:
      'Journey to one of the most extreme places on Earth. The Danakil Depression offers surreal landscapes of lava lakes, salt flats, and colorful hydrothermal fields.',
    image: '/news-2.jpg.png',
  },
  {
    id: 3,
    title: 'Lalibela Rock Churches Festival',
    date: 'April 10, 2024',
    location: 'Lalibela, Ethiopia',
    description:
      'The ancient rock-hewn churches of Lalibela come alive during the festival season. Witness centuries-old traditions and spiritual celebrations in this holy city.',
    image: '/news-3.jpg.jpg',
  },
];

const sideNews = [
  {
    id: 4,
    title: 'New Flights to Gondar',
    date: 'April 22, 2024',
    location: 'Gondar, Ethiopia',
    description:
      'Ethiopian Airlines adds new direct flights to Gondar. Check out the schedule and make your trip easier.',
    image: '/news-4.jpg.png',
  },
  {
    id: 5,
    title: 'Top Festivals in Ethiopia',
    date: 'April 15, 2024',
    location: 'Ethiopia',
    description:
      "Experience Ethiopia's most vibrant festivals. From Timket to Meskel, discover the top cultural celebrations.",
    image: '/news-5.jpg.jpg',
  },
  {
    id: 6,
    title: 'Travel Safety Updates',
    date: 'April 15, 2024',
    location: 'Ethiopia',
    description:
      'Stay informed about the latest travel advisories, safety tips, and essential info for tourists visiting Ethiopia.',
    image: '/news-6.jpg.jpg',
  },
];

/* ─── News Page ─────────────────────────────────────────────────────── */
export default function NewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = featuredNews.length;

  /* ── Auto play ── */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrentSlide((idx + total) % total);
      startTimer();
      setTimeout(() => setAnimating(false), 600);
    },
    [animating, total, startTimer]
  );

  const current = featuredNews[currentSlide];

  return (
    <div className="flex-1 flex flex-col relative z-10 mt-4">

      {/* ── Page Title ── */}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          NEWS
        </h1>
        <div className="w-px h-8 bg-white/30" />
        <p className="text-white/60 text-sm sm:text-base font-light">
          Travel Updates & Stories
        </p>
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]
      gap-5 flex-1">

        {/* ══ LEFT — Featured Slider ══════════════════════════════ */}
        <div className="relative rounded-3xl overflow-hidden
        min-h-[420px] sm:min-h-[500px] group">

          {/* Slides */}
          {featuredNews.map((news, idx) => (
            <div
              key={news.id}
              className={`absolute inset-0 transition-all duration-700
              ease-[cubic-bezier(0.25,1,0.5,1)] ${
                idx === currentSlide
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }`}
            >
              {/* Background image */}
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t
              from-black/85 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0
              p-6 sm:p-8">

                {/* Location */}
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400
                  fill-amber-400/30 shrink-0" />
                  <span className="text-[12px] text-white/70">
                    {news.date} • {news.location}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold
                leading-tight mb-3 drop-shadow-lg">
                  {news.title}
                </h2>

                {/* Description */}
                <p className="text-[13px] text-white/75 leading-relaxed
                mb-5 max-w-lg">
                  {news.description}
                </p>

                {/* Read More */}
                <button className="flex items-center gap-2 bg-white/10
                hover:bg-white/20 backdrop-blur-sm border border-white/20
                text-white text-sm font-semibold px-5 py-2.5 rounded-xl
                transition-all duration-200 active:scale-95 group/btn">
                  Read More
                  <ArrowRight className="w-4 h-4
                  group-hover/btn:translate-x-1
                  transition-transform" />
                </button>
              </div>
            </div>
          ))}

          {/* Prev button */}
          <button
            onClick={() => goTo(currentSlide - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 rounded-full bg-black/30 border border-white/20
            flex items-center justify-center hover:bg-black/50
            transition-all duration-200 opacity-0
            group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={() => goTo(currentSlide + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 rounded-full bg-black/30 border border-white/20
            flex items-center justify-center hover:bg-black/50
            transition-all duration-200 opacity-0
            group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2
          z-20 flex items-center gap-2">
            {featuredNews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-5 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ══ RIGHT — Side News ═══════════════════════════════════ */}
        <div className="flex flex-col gap-4">

          {/* Top card — wide with image on right */}
          <div className="relative rounded-2xl overflow-hidden
          bg-white/5 border border-white/10 backdrop-blur-sm
          flex gap-3 p-4 hover:bg-white/10 transition-all
          duration-200 cursor-pointer group flex-1">

            {/* Text */}
            <div className="flex-1 flex flex-col justify-between
            min-w-0">
              <div>
                {/* Location */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MapPin className="w-3 h-3 text-amber-400
                  fill-amber-400/30 shrink-0" />
                  <span className="text-[11px] text-white/60">
                    {sideNews[0].date} • {sideNews[0].location}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-[15px] leading-tight
                mb-2 text-white group-hover:text-amber-300
                transition-colors">
                  {sideNews[0].title}
                </h3>

                {/* Description */}
                <p className="text-[12px] text-white/60 leading-relaxed
                line-clamp-3">
                  {sideNews[0].description}
                </p>
              </div>

              {/* Read More */}
              <button className="flex items-center gap-1.5
              text-amber-400 text-[12px] font-semibold
              hover:text-amber-300 transition-colors mt-3 group/btn">
                Read More
                <ArrowRight className="w-3.5 h-3.5
                group-hover/btn:translate-x-0.5
                transition-transform" />
              </button>
            </div>

            {/* Image on right */}
            <div className="w-24 h-full min-h-[120px] rounded-xl
            overflow-hidden shrink-0">
              <img
                src={sideNews[0].image}
                alt={sideNews[0].title}
                className="w-full h-full object-cover
                group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Bottom two cards */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            {sideNews.slice(1).map((news) => (
              <div
                key={news.id}
                className="relative rounded-2xl overflow-hidden
                bg-white/5 border border-white/10 backdrop-blur-sm
                flex flex-col hover:bg-white/10 transition-all
                duration-200 cursor-pointer group"
              >
                {/* Text content */}
                <div className="p-4 flex flex-col flex-1">

                  {/* Location */}
                  <div className="flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3 h-3 text-amber-400
                    fill-amber-400/30 shrink-0" />
                    <span className="text-[10px] text-white/60">
                      {news.date} • {news.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[13px] leading-tight
                  mb-2 text-white group-hover:text-amber-300
                  transition-colors">
                    {news.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-white/55 leading-relaxed
                  line-clamp-4 flex-1">
                    {news.description}
                  </p>
                </div>

                {/* Bottom image */}
                <div className="h-24 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover
                    group-hover:scale-105 transition-transform
                    duration-500"
                  />
                </div>

                {/* Read More */}
                <div className="px-4 py-3 border-t border-white/10">
                  <button className="flex items-center gap-1.5
                  text-white/70 hover:text-white text-[11px]
                  font-semibold transition-colors group/btn">
                    Read More
                    <ArrowRight className="w-3 h-3
                    group-hover/btn:translate-x-0.5
                    transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom dots — mobile */}
      <div className="flex items-center justify-center gap-2 mt-5
      lg:hidden">
        {featuredNews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide
                ? 'w-5 h-2 bg-white'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}