import React, { useState, useEffect } from "react";
import Button from "../general/Button";

interface Slide {
  id: number;
  imageUrl: string;
  altText: string;
  title?: string;
  subtitle?: string;
}

const HeroSlider: React.FC = () => {
  // Sample slides data
  const slides: Slide[] = [
    {
      id: 1,
      imageUrl: "/image.jpg",

      altText: "Slide 1",
      title: "Summer Collection",
      subtitle: "Discover our new arrivals",
    },
    {
      id: 2,
      imageUrl: "/image.jpg",
      altText: "Slide 2",
      title: "Electronics Sale",
      subtitle: "Up to 30% off",
    },
    {
      id: 3,
      imageUrl: "/image.jpg",
      altText: "Slide 3",
      title: "New Arrivals",
      subtitle: "Shop the latest trends",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.imageUrl}
              alt={slide.altText}
              className="w-full h-full object-cover"
            />
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 flex items-center justify-start bg-black/30 bg-opacity-30 text-white p-8">
                <div className="w-[265px] max-w-[270px]">
                  {slide.title && (
                    <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                  )}
                  {slide.subtitle && (
                    <p className="text-xl mb-4">{slide.subtitle}</p>
                  )}
                  <Button label="Shop Now" className="bg-white !text-black" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 cursor-pointer bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 cursor-pointer bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition cursor-pointer ${
              index === currentSlide ? "bg-white" : "bg-white/20 bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
