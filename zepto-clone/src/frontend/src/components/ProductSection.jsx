import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  products,
  layout,
  onViewAll,
}) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (products.length === 0) return null;

  const SCROLL_AMOUNT = 600;

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  return (
    <section className="mt-7" aria-label={title} data-ocid="product-section">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-base md:text-[1.15rem] font-extrabold text-foreground tracking-tight">
          {title}
        </h2>
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="flex items-center gap-0.5 text-primary text-sm font-bold hover:underline"
            aria-label={`View all in ${title}`}
            data-ocid="view-all-btn"
          >
            See all <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Scroll row with arrow overlays */}
      {layout === "scroll" ? (
        <div className="relative group/section">
          {/* Left arrow */}
          {showLeftArrow && (
            <button
              type="button"
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-smooth opacity-0 group-hover/section:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Right arrow */}
          {showRightArrow && products.length > 4 && (
            <button
              type="button"
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center hover:bg-muted transition-smooth opacity-0 group-hover/section:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          )}

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scroll-section hide-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
          data-ocid="product-grid"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
