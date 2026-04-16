import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    id: "slide-purple",
    title: "Groceries in 10 Minutes",
    subtitle: "Fresh fruits, veggies & daily essentials at your doorstep",
    cta: "Shop Now",
    bgFrom: "#7B2FF7",
    bgTo: "#5b1cbf",
    accent: "#FFD600",
    emoji: "🛒",
    badge: "⚡ 10 MIN DELIVERY",
    highlight: "Free delivery on first order!",
    discount: null,
  },
  {
    id: "slide-orange",
    title: "Up to 40% OFF on Dairy",
    subtitle: "Amul, Mother Dairy, Epigamia & more top brands",
    cta: "Explore Deals",
    bgFrom: "#FF6B00",
    bgTo: "#e84c00",
    accent: "#FFD600",
    emoji: "🥛",
    badge: "🔥 LIMITED TIME",
    highlight: "Best prices guaranteed",
    discount: "40%",
  },
  {
    id: "slide-green",
    title: "Farm-Fresh Fruits & Veggies",
    subtitle: "Handpicked produce delivered within hours of harvest",
    cta: "Order Fresh",
    bgFrom: "#0C831F",
    bgTo: "#077015",
    accent: "#FFD600",
    emoji: "🍎",
    badge: "🌱 FRESHNESS GUARANTEE",
    highlight: "100% quality assured",
    discount: null,
  },
  {
    id: "slide-blue",
    title: "Snacks & Beverages Fest",
    subtitle: "Kurkure, Lay's, Maggi, Red Bull & 500+ brands",
    cta: "Browse Snacks",
    bgFrom: "#0052CC",
    bgTo: "#003d99",
    accent: "#FFD600",
    emoji: "🍿",
    badge: "🏆 BESTSELLERS",
    highlight: "New arrivals every day",
    discount: "25%",
  },
  {
    id: "slide-teal",
    title: "Personal Care Essentials",
    subtitle: "Dettol, Gillette, Dove, Pantene & top hygiene brands",
    cta: "Shop Personal Care",
    bgFrom: "#00897B",
    bgTo: "#00695C",
    accent: "#FFD600",
    emoji: "🧴",
    badge: "✨ TOP RATED",
    highlight: "Trusted by 1Cr+ customers",
    discount: "30%",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, startTimer]);

  const goTo = (idx) => {
    setCurrent(idx);
    startTimer();
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  const slide = SLIDES[current];

  return (
    <section
      className="relative mt-4 rounded-2xl overflow-hidden shadow-lg select-none"
      aria-label="Promotional banners"
      data-ocid="hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide content */}
      <div
        className="relative h-44 md:h-64 flex items-center px-8 md:px-16 transition-colors duration-500"
        style={{
          background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-10 translate-x-1/3 -translate-y-1/3"
          style={{ background: slide.accent }}
          aria-hidden="true"
        />
        <div
          className="absolute right-16 bottom-0 w-32 h-32 rounded-full opacity-10 translate-y-1/2"
          style={{ background: "#ffffff" }}
          aria-hidden="true"
        />

        {/* Left: text content */}
        <div className="flex-1 text-white z-10">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-[10px] font-extrabold px-3 py-1 rounded-full mb-2 tracking-widest uppercase">
            {slide.badge}
          </span>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl md:text-4xl font-extrabold leading-tight">
              {slide.title}
            </h1>
            {slide.discount && (
              <span
                className="hidden md:flex items-center justify-center w-16 h-16 rounded-full text-lg font-black text-center leading-tight flex-shrink-0"
                style={{ background: slide.accent, color: "#111" }}
              >
                {slide.discount}
                <br />
                OFF
              </span>
            )}
          </div>
          <p className="text-white/80 text-xs md:text-sm mb-3 max-w-md">
            {slide.subtitle}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="bg-white font-bold text-xs md:text-sm px-5 py-2 rounded-full hover:opacity-90 active:scale-95 transition-smooth"
              style={{ color: slide.bgFrom }}
            >
              {slide.cta} →
            </button>
            <span className="hidden md:block text-white/70 text-xs">
              {slide.highlight}
            </span>
          </div>
        </div>

        {/* Right: emoji */}
        <div
          className="hidden md:flex text-8xl lg:text-9xl z-10 flex-shrink-0 ml-4 drop-shadow-xl"
          aria-hidden="true"
          style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.3))" }}
        >
          {slide.emoji}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/55 transition-smooth z-20"
        aria-label="Previous slide"
        data-ocid="carousel-prev"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/55 transition-smooth z-20"
        aria-label="Next slide"
        data-ocid="carousel-next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((s, i) => (
          <button
            type="button"
            key={s.id}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/45 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
