import { useRef } from "react";

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  const scrollRef = useRef(null);

  return (
    <nav
      className="sticky top-16 z-30 bg-background border-b border-border shadow-sm"
      aria-label="Product categories"
      data-ocid="category-tabs"
    >
      <div className="max-w-[1400px] mx-auto px-3 md:px-5">
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto py-2.5 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => onCategoryChange(cat)}
                className={`
                  flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer
                  flex-shrink-0 transition-all duration-200 select-none
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border"
                  }
                `}
                aria-pressed={isActive}
                aria-label={cat.label}
                data-ocid={`category-tab-${cat.id}`}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {cat.icon}
                </span>
                <span className="leading-none">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
