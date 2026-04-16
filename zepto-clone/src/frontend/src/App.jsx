import { useState } from "react";
import CartSidebar from "./components/CartSidebar";
import CategoryTabs from "./components/CategoryTabs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import ProductSection from "./components/ProductSection";
import { CartProvider } from "./context/CartContext";
import {
  bestsellers,
  categories,
  featuredProducts,
  productsByCategory,
} from "./data/products";

const SHOP_BY_CATEGORY = [
  { id: "rice-dal", icon: "🌾", label: "Dal & Pulses" },
  { id: "snacks", icon: "🍿", label: "Snacks" },
  { id: "dairy", icon: "🥛", label: "Dairy" },
  { id: "rice-dal", icon: "🍚", label: "Rice & Atta" },
  { id: "cleaning", icon: "🧹", label: "Household" },
  { id: "beverages", icon: "🥤", label: "Beverages" },
  { id: "personal-hygiene", icon: "🧴", label: "Personal Hygiene" },
  { id: "hair-care", icon: "💆", label: "Hair Care" },
  { id: "fruits", icon: "🍎", label: "Fresh Fruits" },
  { id: "laundry", icon: "👕", label: "Laundry Care" },
];

function ShopByCategory({ onCategorySelect }) {
  return (
    <section
      className="mt-7"
      aria-label="Shop by category"
      data-ocid="shop-by-category"
    >
      <div className="flex items-center justify-between mb-4 px-0.5">
        <h2 className="text-base md:text-[1.15rem] font-extrabold text-foreground tracking-tight">
          Shop By Category
        </h2>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3">
        {SHOP_BY_CATEGORY.map((cat) => (
          <button
            type="button"
            key={`${cat.id}-${cat.label}`}
            onClick={() => onCategorySelect(cat.id)}
            className="flex flex-col items-center gap-2 p-2 md:p-3 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-smooth group cursor-pointer"
            data-ocid={`category-icon-${cat.id}`}
          >
            <span
              className="text-2xl md:text-3xl group-hover:scale-110 transition-smooth"
              aria-hidden="true"
            >
              {cat.icon}
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-foreground text-center leading-tight line-clamp-2">
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AppContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentProducts = searchQuery.trim()
    ? productsByCategory("all").filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : productsByCategory(activeCategory);

  const featured = featuredProducts();
  const topSellers = bestsellers();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat.id);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (id) => {
    setActiveCategory(id);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHome = !searchQuery && activeCategory === "all";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-3 md:px-6 pb-10">
        {searchQuery ? (
          <ProductSection
            title={`Results for "${searchQuery}"`}
            products={currentProducts}
            layout="grid"
          />
        ) : activeCategory !== "all" ? (
          <ProductSection
            title={
              categories.find((c) => c.id === activeCategory)?.label ??
              "Products"
            }
            products={currentProducts}
            layout="grid"
          />
        ) : (
          <>
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Shop By Category icons grid */}
            <ShopByCategory onCategorySelect={handleCategorySelect} />

            {/* Top Picks / Featured */}
            <ProductSection
              title="⚡ Top Picks For You"
              products={featured}
              layout="scroll"
              onViewAll={() => handleCategorySelect("all")}
            />

            {/* Bestsellers */}
            <ProductSection
              title="🔥 Bestsellers"
              products={topSellers}
              layout="scroll"
              onViewAll={() => handleCategorySelect("all")}
            />

            {/* Laundry Care */}
            <ProductSection
              title="👕 Laundry Care"
              products={productsByCategory("laundry").slice(0, 12)}
              layout="scroll"
              categoryId="laundry"
              onViewAll={() => handleCategorySelect("laundry")}
            />

            {/* Household Cleaning */}
            <ProductSection
              title="🧹 Household Cleaning"
              products={productsByCategory("cleaning").slice(0, 12)}
              layout="scroll"
              categoryId="cleaning"
              onViewAll={() => handleCategorySelect("cleaning")}
            />

            {/* Rice, Dal & Pulses */}
            <ProductSection
              title="🌾 Rice, Dal & Pulses"
              products={productsByCategory("rice-dal").slice(0, 12)}
              layout="scroll"
              categoryId="rice-dal"
              onViewAll={() => handleCategorySelect("rice-dal")}
            />

            {/* Snacks */}
            {isHome && (
              <ProductSection
                title="🍿 Snacks & Munchies"
                products={productsByCategory("snacks").slice(0, 12)}
                layout="scroll"
                categoryId="snacks"
                onViewAll={() => handleCategorySelect("snacks")}
              />
            )}

            {/* Dairy */}
            <ProductSection
              title="🥛 Dairy & Eggs"
              products={productsByCategory("dairy").slice(0, 12)}
              layout="scroll"
              categoryId="dairy"
              onViewAll={() => handleCategorySelect("dairy")}
            />

            {/* Personal Hygiene */}
            <ProductSection
              title="🧴 Personal Hygiene"
              products={productsByCategory("personal-hygiene").slice(0, 12)}
              layout="scroll"
              categoryId="personal-hygiene"
              onViewAll={() => handleCategorySelect("personal-hygiene")}
            />

            {/* Hair Care */}
            <ProductSection
              title="💆 Hair Care"
              products={productsByCategory("hair-care").slice(0, 12)}
              layout="scroll"
              categoryId="hair-care"
              onViewAll={() => handleCategorySelect("hair-care")}
            />

            {/* Beverages */}
            <ProductSection
              title="🥤 Beverages"
              products={productsByCategory("beverages").slice(0, 12)}
              layout="scroll"
              categoryId="beverages"
              onViewAll={() => handleCategorySelect("beverages")}
            />
          </>
        )}
      </main>

      <CartSidebar />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
