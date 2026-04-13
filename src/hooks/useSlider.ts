// ─── src/hooks/useSlider.ts ──────────────────────────────────────────
//
// 🧠 SIMPLE EXPLANATION:
// A hook is just a REUSABLE function that holds logic
// We moved ALL slider logic here so HomePage stays clean
// Any page that needs a slider just calls useSlider()!
//
// HOW IT WORKS:
// 1 → keeps track of which slide we are on (currentSlide)
// 2 → auto plays every 4 seconds (startTimer)
// 3 → lets you go next / prev / go to any slide (goTo)
// 4 → gives back progress % for the progress bar

import { useState, useEffect, useRef, useCallback } from 'react';

// How long each slide stays before auto moving
const AUTO_PLAY_INTERVAL = 4000; // 4 seconds

export function useSlider(total: number) {

  // Which slide are we on right now?
  // Starts at 0 = first slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Are we in the middle of animating?
  // We use this to stop double clicking
  const [animating, setAnimating] = useState(false);

  // useRef keeps the timer without causing re-renders
  // Think of it like a sticky note that remembers the timer
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Start the auto play timer ─────────────────────────────────────
  // useCallback means this function is only recreated
  // when "total" changes — saves performance
  const startTimer = useCallback(() => {
    // Clear old timer first so we don't have two timers running
    if (timerRef.current) clearInterval(timerRef.current);

    // Start new timer — moves to next slide every 4 seconds
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % total);
      // % total makes it loop back to 0 after last slide
      // Example: if total=4, slides go 0→1→2→3→0→1→2→3...
    }, AUTO_PLAY_INTERVAL);
  }, [total]);

  // ── Run timer when component first loads ─────────────────────────
  useEffect(() => {
    startTimer();

    // Cleanup: stop timer when component is removed from screen
    // This prevents memory leaks!
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  // ── Go to a specific slide ────────────────────────────────────────
  const goTo = useCallback(
    (idx: number) => {
      // Don't do anything if already animating
      if (animating) return;

      setAnimating(true);

      // % total makes sure we never go below 0 or above total
      // Example: if on slide 0 and go prev → goes to slide 3
      setCurrentSlide((idx + total) % total);

      // Reset the timer so auto play starts fresh
      startTimer();

      // After animation is done, allow next click
      setTimeout(() => setAnimating(false), 700);
    },
    [animating, total, startTimer]
  );

  // Simple prev and next buttons
  const handlePrev = () => goTo(currentSlide - 1);
  const handleNext = () => goTo(currentSlide + 1);

  // Progress % for the progress bar
  // Example: slide 2 of 4 = 50%
  const progressPct = ((currentSlide + 1) / total) * 100;

  // ── Give back everything the component needs ──────────────────────
  return {
    currentSlide,  // which slide we are on
    progressPct,   // how far through the slides we are
    goTo,          // go to any slide
    handlePrev,    // go to previous slide
    handleNext,    // go to next slide
  };
}