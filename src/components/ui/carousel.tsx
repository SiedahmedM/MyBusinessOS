"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideData {
  title?: string;
  description?: string;
  button?: string;
  src: string;
  focalX?: string; // e.g. "50%" (default center)
  focalY?: string; // e.g. "30%"
  // Optional per-slide adjustments to better fill the card when the source has padding
  zoom?: number; // e.g. 1.0 (default), 1.2, 1.5
  offsetX?: string; // e.g. '0%', '-5%'
  offsetY?: string; // e.g. '0%', '10%'
  // Optional per-slide aspect ratio, e.g. '16/10', '4/3', '1/1'
  aspectRatio?: string;
}

interface CarouselProps {
  slides: SlideData[];
}

// Single source of truth for gap
const GAP_PX = 16; // Tailwind gap-4

export default function Carousel({ slides }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 due to clones
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [visible, setVisible] = useState(1);
  const [errored, setErrored] = useState<Record<number, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Swipe configuration and state
  const SWIPE = { thresholdPx: 0.15, minPx: 40, maxPx: 120 }; // 15% of card or 40–120px
  const dragRef = useRef({
    startX: 0,
    startY: 0,
    dx: 0,
    dragging: false,
    locked: false, // true when we decide horiz vs vert
  });
  // Track last swipe time to prevent ghost clicks immediately after swiping
  const lastSwipeTimeRef = useRef<number>(0);

  // Clone first and last slides for infinite loop
  const slidesWithClones = [
    slides[slides.length - 1], // Clone of last
    ...slides,
    slides[0], // Clone of first
  ];

  // Calculate slide width based on container and visible count
  useEffect(() => {
    const updateSlideWidth = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const v = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      setVisible(v);
      const gap = 16;
      const width = (containerWidth - gap * (v - 1)) / v;
      setSlideWidth(width);
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  // Use real transitionend listener for infinite loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      setIsTransitioning(false);
      
      if (currentIndex === 0) {
        // Jump to last real slide
        el.style.transition = 'none';
        setCurrentIndex(slides.length);
        // Force reflow
        void el.offsetHeight;
        el.style.removeProperty('transition');
      } else if (currentIndex === slides.length + 1) {
        // Jump to first real slide
        el.style.transition = 'none';
        setCurrentIndex(1);
        // Force reflow
        void el.offsetHeight;
        el.style.removeProperty('transition');
      }
    };

    if (isTransitioning) {
      el.addEventListener('transitionend', onTransitionEnd);
      return () => el.removeEventListener('transitionend', onTransitionEnd);
    }
  }, [currentIndex, isTransitioning, slides.length]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // Adjust for clone
  }, [isTransitioning]);

  // Helper to get numeric translate for both base position and drag
  const getTranslateX = () => -(currentIndex * (slideWidth + GAP_PX));

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning || !trackRef.current) return;
    const t = e.touches[0];
    dragRef.current = { startX: t.clientX, startY: t.clientY, dx: 0, dragging: true, locked: false };
    // kill transition during drag
    trackRef.current.style.transition = 'none';
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const d = dragRef.current;
    if (!d.dragging || !trackRef.current) return;

    const dx = t.clientX - d.startX;
    const dy = t.clientY - d.startY;

    if (!d.locked) {
      // decide if this is horizontal; if mostly vertical, abort drag
      if (Math.abs(dy) > Math.abs(dx)) return;
      d.locked = true;
    }

    d.dx = dx;
    // apply base translate + drag delta
    const base = getTranslateX();
    trackRef.current.style.transform = `translate3d(${base + dx}px,0,0)`;
  };

  const onTouchEnd = () => {
    const d = dragRef.current;
    if (!d.dragging || !trackRef.current) return;

    // restore transition
    trackRef.current.style.removeProperty('transition');

    const px = Math.abs(d.dx);
    const dynamicThreshold = Math.min(
      SWIPE.maxPx,
      Math.max(SWIPE.minPx, slideWidth * SWIPE.thresholdPx)
    );

    if (px > dynamicThreshold) {
      // commit swipe
      setIsTransitioning(true);
      if (d.dx > 0) {
        // swiped right -> previous
        setCurrentIndex((i) => i - 1);
      } else {
        // swiped left -> next
        setCurrentIndex((i) => i + 1);
      }
      // mark swipe to suppress immediate click
      lastSwipeTimeRef.current = Date.now();
    } else {
      // snap back
      setIsTransitioning(true);
      // just re-set currentIndex to trigger transform with transition
      setCurrentIndex((i) => i);
    }

    d.dragging = false;
    d.dx = 0;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Main carousel container with overflow hidden and touch handling */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-2xl"
        style={{ touchAction: 'pan-y' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Track with slides */}
        <div
          ref={trackRef}
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${getTranslateX()}px,0,0)` }}
        >
{slidesWithClones.map((slide, index) => (
  <div
    key={`${index}-${slide.src}`}
    className="shrink-0"
    style={{ width: slideWidth || '100%' }}
    aria-hidden={index === 0 || index === slidesWithClones.length - 1}
  >
    {/* Aspect box; height derives from width. Use per-slide aspect when provided. */}
    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl">
      {/** Use exact pixel width for crisp selection from srcset; fallback before layout */}
      <Image
        src={errored[index] ? '/images/placeholder-1600x1000.webp' : slide.src}
        alt={slide.title || `Slide ${index}`}
        fill
        className="object-cover"
        // Use viewport-based sizes for predictable sharpness across DPRs
        sizes={visible === 1 ? '(min-width:1024px) 960px, 100vw' : visible === 2 ? '50vw' : '33vw'}
        quality={100}
        priority={index === 1}
        loading={index === 1 ? 'eager' : 'lazy'}
        // prefer native clarity; disable blur placeholder to avoid perceived softness
        onError={() => setErrored(prev => ({ ...prev, [index]: true }))}
        style={{
          objectPosition: `${slide.focalX || '50%'} ${slide.focalY || '50%'}`,
          transform: `translate(${slide.offsetX || '0%'}, ${slide.offsetY || '0%'}) scale(${slide.zoom || 1})`,
          transformOrigin: 'center center',
        }}
      />

      {/* Optional featured badge on first real slide */}
      {index === 1 && (
        <div className="absolute top-3 right-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}
    </div>

    {/* Caption below the image */}
    {(slide.title || slide.description || slide.button) && (
      <div
        className="px-2 sm:px-3 mt-3 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => {
          // Ignore clicks that occur right after a swipe
          if (Date.now() - lastSwipeTimeRef.current < 200) return;
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        aria-label={slide.title ? `View details for ${slide.title}` : 'View details'}
      >
        {slide.title && (
          <h3 className="text-white text-sm sm:text-base font-semibold">{slide.title}</h3>
        )}
        {slide.description && (
          <p className="text-white/70 text-xs sm:text-sm mt-1 line-clamp-3 sm:line-clamp-2">
            {slide.description}
          </p>
        )}
        {slide.button && (
          <button
            className="mt-2 px-3 py-1.5 bg-white text-black text-xs sm:text-sm rounded-lg hover:bg-gray-100"
            onClick={(e) => {
              // prevent this click from triggering drag or other handlers
              e.stopPropagation();
              if (Date.now() - lastSwipeTimeRef.current < 200) return;
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {slide.button}
          </button>
        )}
      </div>
    )}
  </div>
))}
        </div>
      </div>

      {/* Navigation controls - desktop only */}
      <div className="hidden sm:flex justify-center gap-2 mt-6">
        <button
          onClick={goToPrevious}
          className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <IconArrowNarrowRight className="text-white w-5 h-5 rotate-180" />
        </button>
        
        <button
          onClick={goToNext}
          className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <IconArrowNarrowRight className="text-white w-5 h-5" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index + 1
                ? 'bg-accent-400 scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}