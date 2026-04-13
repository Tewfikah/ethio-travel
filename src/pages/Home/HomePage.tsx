import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  ArrowRight,
} from 'lucide-react';
import StarDots from '../../components/ui/StarDots';
import { useSlider } from '../../hooks/useSlider';
import { destinations } from '../../data/destinations';

export default function HomePage() {

  const total = destinations.length;

  const {
    currentSlide,
    progressPct,
    goTo,
    handlePrev,
    handleNext,
  } = useSlider(total);

  return (
    <>
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r
        from-[#060c1e]/95 via-[#060c1e]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t
        from-[#060c1e]/90 via-transparent to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center
      lg:items-stretch mt-8 sm:mt-10 lg:mt-0 gap-10 lg:gap-0
      pb-16 lg:pb-10">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[48%] flex items-center
        lg:items-stretch relative z-10">

          {/* Vertical Progress Bar */}
          <aside className="hidden md:flex flex-col items-center
          justify-between py-8 mr-8 xl:mr-12 shrink-0 self-center
          h-[360px] lg:h-[420px]">
            <div className="flex flex-col items-center gap-5">
              <div className="w-8 h-8 rounded-full border border-white/40
              flex items-center justify-center text-[10px] font-semibold
              text-white/70 tracking-widest">
                {String(currentSlide + 1).padStart(2, '0')}
              </div>
              <div className="flex flex-col gap-2.5">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`rounded-full transition-all duration-400 ${
                      i === currentSlide
                        ? 'w-2 h-2 bg-white shadow-[0_0_6px_white]'
                        : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-24 bg-white/15 relative
              overflow-hidden rounded-full">
                <div
                  className="absolute bottom-0 w-full bg-white
                  transition-all duration-700 ease-out"
                  style={{ height: `${progressPct}%` }}
                />
              </div>
              <span
                className="text-[9px] font-mono tracking-[0.3em] text-white/40"
                style={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                {String(currentSlide + 1).padStart(2, '0')}/
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </aside>

          {/* Text Content */}
          <div className="flex flex-col justify-center max-w-lg relative z-10">
            <span
              aria-hidden="true"
              className="absolute -top-6 sm:-top-10 -left-2
              text-[5rem] sm:text-[7rem] md:text-[8rem] xl:text-[10rem]
              font-black text-white/[0.03] pointer-events-none
              leading-none tracking-tighter uppercase select-none"
            >
              Ethiopia
            </span>

            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-6 h-px bg-white/40" />
              <span className="text-[11px] font-semibold tracking-[0.25em]
              text-white/60 uppercase">
                Discover Africa
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem]
            font-extrabold tracking-tighter leading-[1.05] mb-5 sm:mb-6
            drop-shadow-2xl">
              ETHIOPIA
            </h1>

            <p className="text-[13px] sm:text-[14px] leading-relaxed
            text-gray-300/90 mb-8 sm:mb-10 max-w-sm md:max-w-md font-light">
              As the oldest independent country in Africa, Ethiopia is blessed
              with so many different people, cultures, customs, traditions,
              artworks, food, animals, plants, landscapes — almost like 200
              countries beautifully melted into one.
            </p>

            <div>
              <button className="group inline-flex items-center gap-3
              bg-[#2A4B8C] hover:bg-[#1E3A8A] active:scale-95
              transition-all duration-300 px-7 sm:px-8 py-3.5 rounded-xl
              text-[13px] sm:text-sm font-semibold
              shadow-[0_8px_32px_rgba(42,75,140,0.45)] backdrop-blur-sm">
                Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5
                transition-transform duration-300" />
              </button>
            </div>

            {/* Mobile dots */}
            <div className="flex items-center gap-2.5 mt-8 md:hidden">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? 'w-5 h-2 bg-white rounded-full'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — SLIDER */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center
        relative z-10 lg:pl-6 xl:pl-10">

          <div
            className="relative overflow-hidden w-full"
            style={{
              maskImage:
                'linear-gradient(to right, black 55%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 55%, transparent 100%)',
            }}
          >
            {/* Mobile single card */}
            <div className="lg:hidden relative h-[320px] sm:h-[380px]
            w-full overflow-hidden rounded-3xl">
              {destinations.map((dest, idx) => (
                <div
                  key={dest.id}
                  className={`absolute inset-0 transition-all duration-700
                  ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    idx === currentSlide
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t
                  from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5
                  flex items-end justify-between">
                    <div>
                      <p className="font-semibold text-base mb-1">
                        {dest.title}
                      </p>
                      <StarDots rating={dest.rating} />
                    </div>
                    <div className="w-9 h-9 bg-white/95 rounded-full
                    flex items-center justify-center shadow-lg shrink-0">
                      <Bookmark className="w-4 h-4 text-amber-600
                      fill-amber-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop multi card */}
            <div className="hidden lg:block h-[400px] xl:h-[440px]
            overflow-hidden">
              <div
                className="flex gap-5 xl:gap-6 transition-transform
                duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                h-full items-center absolute"
                style={{
                  transform: `translateX(calc(-${
                    currentSlide * (260 + 20)
                  }px))`,
                }}
              >
                {destinations.map((dest, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <article
                      key={dest.id}
                      onClick={() => goTo(idx)}
                      className={`flex flex-col w-[260px] xl:w-[280px]
                      shrink-0 group transition-all duration-700
                      cursor-pointer ${
                        isActive
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-50 translate-y-3 hover:opacity-75'
                      }`}
                    >
                      <div className="mb-3 px-1">
                        <h3 className="font-semibold text-[14px]
                        text-white/90 leading-tight mb-1.5 truncate">
                          {dest.title}
                        </h3>
                        <StarDots rating={dest.rating} />
                      </div>

                      <div
                        className={`relative rounded-[1.5rem] overflow-hidden
                        shadow-2xl transition-all duration-700 ${
                          isActive
                            ? 'h-[320px] xl:h-[350px] shadow-black/60'
                            : 'h-[280px] xl:h-[310px] shadow-black/20'
                        }`}
                      >
                        <img
                          src={dest.image}
                          alt={dest.title}
                          className="absolute inset-0 w-full h-full
                          object-cover transition-transform duration-[2s]
                          ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t
                        from-black/40 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-500" />
                        <div
                          className={`absolute top-4 right-4 w-9 h-9
                          bg-white/95 rounded-full flex items-center
                          justify-center shadow-lg transition-all
                          duration-300 z-10 ${
                            isActive
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 text-amber-600
                          fill-amber-500" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8
          pr-4 sm:pr-8 lg:pr-[20%]">
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous"
                className="w-10 h-10 rounded-full border border-white/20
                bg-white/5 backdrop-blur-sm flex items-center
                justify-center hover:bg-white/15 active:scale-90
                transition-all duration-200 group"
              >
                <ChevronLeft className="w-4 h-4 text-white/70
                group-hover:text-white group-hover:-translate-x-0.5
                transition-all" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next"
                className="w-10 h-10 rounded-full border border-white/20
                bg-white/5 backdrop-blur-sm flex items-center
                justify-center hover:bg-white/15 active:scale-90
                transition-all duration-200 group"
              >
                <ChevronRight className="w-4 h-4 text-white/70
                group-hover:text-white group-hover:translate-x-0.5
                transition-all" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px]
            font-mono tracking-widest text-white/35">
              <span className={
                currentSlide === 0 ? 'text-white font-semibold' : ''
              }>
                01
              </span>
              <div className="w-24 sm:w-32 h-[2px] bg-white/10
              rounded-full overflow-hidden relative">
                <div
                  className="absolute top-0 left-0 h-full bg-white
                  rounded-full transition-all duration-700
                  ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{
                    width: `${100 / total}%`,
                    transform: `translateX(${currentSlide * 100}%)`,
                  }}
                />
              </div>
              <span className={
                currentSlide === total - 1
                  ? 'text-white font-semibold'
                  : ''
              }>
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}