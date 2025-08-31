"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import Image from "next/image";

interface SlideData {
  title?: string;
  description?: string;
  button?: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { src, button, title, description } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] max-w-[400px] max-h-[400px] mx-2 sm:mx-[4vmin] z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.95) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-150 ease-out border border-white/10"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <div className="relative w-full h-full">
            <Image
              className="object-cover w-full h-full"
              style={{
                opacity: current === index ? 1 : 0.7,
                transition: "opacity 0.6s ease-in-out",
              }}
              alt={title || `Project ${index + 1}`}
              src={src}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 400px"
              onError={(e) => {
                // Fallback to placeholder on error
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/600/400';
              }}
            />
            {current === index && (
              <div className="absolute inset-0 bg-black/40 transition-all duration-500" />
            )}
          </div>
        </div>

        {(title || description || button) && (
          <article
            className={`absolute inset-0 flex flex-col justify-end p-4 sm:p-6 transition-opacity duration-500 ease-in-out ${
              current === index ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            {title && (
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white drop-shadow-lg">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-neutral-200 mb-4 drop-shadow-lg line-clamp-3">
                {description}
              </p>
            )}
            {button && (
              <div className="flex justify-center">
                <button className="px-3 py-2 sm:px-4 sm:py-2 bg-white text-black text-xs sm:text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                  {button}
                </button>
              </div>
            )}
          </article>
        )}
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center mx-1 sm:mx-2 justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full focus:border-accent-500 focus:outline-none hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-white w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-full max-w-[400px] h-[70vmin] max-h-[400px] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+0.5rem)] sm:top-[calc(100%+1rem)]">
        <CarouselControl
          type="previous"
          title="Go to previous slide"
          handleClick={handlePreviousClick}
        />

        <CarouselControl
          type="next"
          title="Go to next slide"
          handleClick={handleNextClick}
        />
      </div>

      {/* Slide indicators */}
      <div className="absolute flex justify-center w-full top-[calc(100%+2.5rem)] sm:top-[calc(100%+3.5rem)]">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                current === index 
                  ? 'bg-accent-400 scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}