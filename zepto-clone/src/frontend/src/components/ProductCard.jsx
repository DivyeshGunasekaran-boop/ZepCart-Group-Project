import { Minus, Plus, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

function formatReviewCount(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

export default function ProductCard({ product }) {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const qty = getItemQuantity(product.id);
  const savings = product.originalPrice - product.price;

  return (
    <article
      className="card-product w-[158px] md:w-[188px] flex flex-col group hover:scale-[1.02] hover:shadow-lg transition-smooth"
      aria-label={product.name}
      data-ocid={`product-card-${product.id}`}
    >
      {/* Image area */}
      <div className="relative bg-muted/20 flex items-center justify-center h-[140px] md:h-[165px] overflow-hidden">
        {product.discount > 0 && (
          <span
            className="absolute top-2 left-2 badge-discount z-10"
            aria-label={`${product.discount}% off`}
          >
            {product.discount}% Off
          </span>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
          width={188}
          height={165}
        />
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col flex-1 gap-0.5">
        {/* Weight */}
        <p className="text-[11px] text-muted-foreground font-medium truncate">
          {product.weight}
        </p>

        {/* Product name */}
        <h3 className="text-xs font-semibold text-foreground line-clamp-2 leading-snug min-h-[2.5em]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-0.5">
          <Star
            className="w-3 h-3 fill-current text-yellow-400"
            aria-hidden="true"
          />
          <span className="text-[11px] text-muted-foreground font-medium">
            {product.rating} ({formatReviewCount(product.reviewCount)})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-sm font-bold text-foreground">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[11px] text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Save badge */}
        {savings > 0 && (
          <div className="mt-0.5">
            <span className="inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-accent/15 text-accent">
              SAVE ₹{savings}
            </span>
          </div>
        )}

        {/* ADD / Quantity stepper */}
        <div className="mt-2" data-ocid={`product-qty-${product.id}`}>
          {qty === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="btn-add w-full justify-center"
              aria-label={`Add ${product.name} to cart`}
              data-ocid={`add-to-cart-${product.id}`}
            >
              <Plus className="w-3.5 h-3.5" />
              ADD
            </button>
          ) : (
            <div className="flex items-center justify-between gap-1 bg-accent rounded-lg px-1 py-0.5">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, qty - 1)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-accent-foreground font-bold hover:bg-white/20 active:scale-90 transition-smooth"
                aria-label="Decrease quantity"
                data-ocid={`decrease-qty-${product.id}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-bold text-accent-foreground min-w-[1.5rem] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-7 h-7 rounded-md flex items-center justify-center text-accent-foreground font-bold hover:bg-white/20 active:scale-90 transition-smooth"
                aria-label="Increase quantity"
                data-ocid={`increase-qty-${product.id}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
