import {
  ChevronDown,
  MapPin,
  Search,
  ShoppingCart,
  X,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import LoginModal from "./LoginModal";

const SEARCH_PLACEHOLDERS = [
  "Search for 'kurkure'",
  "Search for 'apple juice'",
  "Search for 'cheese slices'",
  "Search for 'chocolate box'",
  "Search for 'amul butter'",
  "Search for 'banana'",
];

const PRESET_LOCATIONS = [
  "Koramangala, Bengaluru",
  "Andheri, Mumbai",
  "Connaught Place, Delhi",
  "Salt Lake, Kolkata",
];

export default function Header({ searchQuery, onSearchChange }) {
  const { totalItems, toggleCart } = useCart();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholderVisible, setPlaceholderVisible] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    "Mumbai, Maharashtra",
  );
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [loginOpen, setLoginOpen] = useState(false);

  const searchRef = useRef(null);
  const locationRef = useRef(null);

  // Animate placeholder cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderVisible(false);
      setTimeout(() => {
        setPlaceholderIndex((i) => (i + 1) % SEARCH_PLACEHOLDERS.length);
        setPlaceholderVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Filter search results
  useEffect(() => {
    if (searchQuery.trim().length >= 1) {
      const q = searchQuery.toLowerCase();
      const results = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q),
        )
        .slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Close dropdowns on outside click
  const handleOutsideClick = useCallback((e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchFocused(false);
    }
    if (
      locationRef.current &&
      !locationRef.current.contains(e.target)
    ) {
      setLocationOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [handleOutsideClick]);

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setLocationOpen(false);
    setLocationInput("");
  };

  const filteredLocations = locationInput.trim()
    ? PRESET_LOCATIONS.filter((l) =>
        l.toLowerCase().includes(locationInput.toLowerCase()),
      )
    : PRESET_LOCATIONS;

  const showDropdown =
    searchFocused &&
    (searchQuery.trim().length > 0 ? searchResults.length > 0 : false);

  return (
    <>
      <header
        className="sticky top-0 z-40 bg-primary shadow-md"
        data-ocid="header"
      >
        <div className="max-w-[1400px] mx-auto px-3 md:px-5 h-16 flex items-center gap-3 md:gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 flex flex-col items-start leading-none"
            aria-label="Zepto home"
          >
            <div className="flex items-center gap-0.5">
              <span className="text-primary-foreground font-extrabold text-2xl tracking-tighter">
                zepto
              </span>
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300 -mt-1" />
            </div>
            <span className="text-primary-foreground/70 text-[10px] font-medium tracking-wide leading-none">
              10 min delivery
            </span>
          </a>

          {/* Location Selector */}
          <div
            ref={locationRef}
            className="hidden md:flex relative flex-shrink-0"
          >
            <button
              type="button"
              onClick={() => setLocationOpen((v) => !v)}
              className="flex items-center gap-1.5 text-primary-foreground/90 hover:text-primary-foreground text-sm font-medium transition-colors max-w-[180px] group"
              aria-label="Select delivery location"
              data-ocid="location-btn"
            >
              <MapPin className="w-4 h-4 flex-shrink-0 text-yellow-300" />
              <span className="truncate max-w-[140px]">{selectedLocation}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${locationOpen ? "rotate-180" : ""}`}
              />
            </button>

            {locationOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden">
                <div className="p-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Select Delivery Location
                  </p>
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Type to search address..."
                    className="w-full h-8 px-3 rounded-lg bg-input text-foreground text-sm placeholder:text-muted-foreground border border-border outline-none focus:ring-2 focus:ring-primary/30"
                    data-ocid="location-input"
                  />
                </div>
                <ul className="py-1">
                  {filteredLocations.map((loc) => (
                    <li key={loc}>
                      <button
                        type="button"
                        onClick={() => handleSelectLocation(loc)}
                        className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                          selectedLocation === loc
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-foreground"
                        }`}
                        data-ocid={`location-option-${loc.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <span>{loc}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div
            ref={searchRef}
            className="flex-1 relative"
            data-ocid="search-bar"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full h-10 pl-10 pr-10 rounded-full bg-background text-foreground text-sm border-0 outline-none focus:ring-2 focus:ring-primary-foreground/30 placeholder:transition-opacity"
                placeholder={searchFocused ? "Search for products..." : ""}
                aria-label="Search products"
                data-ocid="search-input"
              />
              {/* Animated placeholder overlay (only shown when not focused and no value) */}
              {!searchFocused && !searchQuery && (
                <span
                  className={`absolute left-10 text-sm text-muted-foreground pointer-events-none select-none transition-opacity duration-300 ${
                    placeholderVisible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {SEARCH_PLACEHOLDERS[placeholderIndex]}
                </span>
              )}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                  data-ocid="search-clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search results dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden max-h-[420px] overflow-y-auto">
                <p className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Search Results
                </p>
                <ul>
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSearchChange(product.name);
                          setSearchFocused(false);
                        }}
                        className="w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-muted transition-colors"
                        data-ocid={`search-result-${product.id}`}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.weight}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-bold text-foreground">
                            ₹{product.price}
                          </p>
                          {product.discount > 0 && (
                            <span className="badge-discount">
                              {product.discountLabel}
                            </span>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* Login button */}
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="hidden md:inline-flex items-center h-9 px-4 rounded-full border-2 border-primary-foreground/80 text-primary-foreground text-sm font-semibold hover:bg-primary-foreground/10 transition-smooth"
              aria-label="Login to your account"
              data-ocid="login-btn"
            >
              Login
            </button>

            {/* Cart button */}
            <button
              type="button"
              onClick={toggleCart}
              className="relative flex-shrink-0"
              aria-label={`Cart (${totalItems} items)`}
              data-ocid="cart-btn"
            >
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
