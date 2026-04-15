"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type SliderProps = {
  images?: string[];
};

export default function Slider({ images = [] }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const fallbackImages = [
      "/slider/1.png",
      "/slider/2.png",
      "/slider/3.png"
  ];

  const slides = images.length > 0 ? images : fallbackImages;

  const visibleSlides = slides.map((slide, index) =>
    imageErrors[index] ? fallbackImages[index % fallbackImages.length] : slide
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-screen h-[calc(100vh-80px)] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-10 overflow-hidden mb-20 bg-black z-0 group">
      {visibleSlides.map((imgSrc, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={`${imgSrc}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={imgSrc}
              alt={`Slider Image ${index + 1}`}
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              priority={index === 0}
              onError={() => setImageErrors((current) => ({ ...current, [index]: true }))}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

            {/* Content centered full screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 transform transition-transform duration-1000 translate-y-0">
              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white drop-shadow-2xl mb-6 tracking-tight">
                Canastas Verdes
              </h1>
              <p className="text-xl md:text-3xl lg:text-4xl text-green-300 font-medium tracking-[0.2em] uppercase drop-shadow-xl border-t border-b border-green-500 py-4">
                Del campo a tu mesa
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-8 pointer-events-none">
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
          }
          className="p-4 text-white transition-all bg-black/20 rounded-full hover:bg-black/60 pointer-events-auto backdrop-blur-md opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Previous slide"
        >
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          className="p-4 text-white transition-all bg-black/20 rounded-full hover:bg-black/60 pointer-events-auto backdrop-blur-md opacity-0 group-hover:opacity-100 hidden md:block"
          aria-label="Next slide"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
        {visibleSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentIndex
                ? "w-12 bg-green-400"
                : "w-3 bg-white/60 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
