import { Minus, Plus, ShoppingCart, Tag, Trash2, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const FREE_DELIVERY_THRESHOLD = 199;
const PLATFORM_FEE = 5;
const DELIVERY_FEE = 30;

export default function CartSidebar() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const isFreeDelivery = totalPrice >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;
  const discount = items.reduce(
    (sum, i) => sum + (i.product.originalPrice - i.product.price) * i.quantity,
    0,
  );
  const couponDiscount = couponApplied ? Math.round(totalPrice * 0.05) : 0;
  const grandTotal = totalPrice + deliveryFee + PLATFORM_FEE - couponDiscount;

  const handleOverlayKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Enter" || e.key === " ") closeCart();
  };

  const handleRemoveCoupon = () => {
    setCoupon("");
    setCouponApplied(false);
    setCouponError("");
  };

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === "ZEPTO5") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        role="button"
        tabIndex={0}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        onKeyDown={handleOverlayKeyDown}
        aria-label="Close cart"
        data-ocid="cart-overlay"
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-[340px] sm:w-[380px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        data-ocid="cart-sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-purple-600" />
            <div>
              <h2 className="text-base font-extrabold text-gray-900">
                My Cart
              </h2>
              {items.length > 0 && (
                <p className="text-xs text-gray-500">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
            data-ocid="cart-close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Delivery badge */}
        {items.length > 0 && (
          <div className="mx-4 mt-3 px-3 py-2 rounded-xl flex items-center gap-2 bg-green-50 border border-green-200">
            <Zap className="w-4 h-4 flex-shrink-0 text-green-600" />
            <p className="text-xs font-bold text-green-600">
              ⚡ Delivery in <span className="font-extrabold">10 minutes</span>
            </p>
          </div>
        )}

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {items.length === 0 ? (
            /* ─── Empty State ─── */
            <div
              className="flex flex-col items-center justify-center h-full gap-5 py-16"
              data-ocid="cart-empty"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl bg-purple-50">
                🛒
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-gray-900">
                  Your cart is empty
                </p>
                <p className="text-sm mt-1.5 text-gray-500">
                  Add items to get started
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="px-8 py-2.5 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90 bg-purple-600"
                data-ocid="cart-start-shopping"
              >
                Shop Now
              </button>
            </div>
          ) : (
            /* ─── Items ─── */
            <div className="space-y-0">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start gap-3 py-3.5 border-b last:border-0 border-gray-100"
                  data-ocid={`cart-item-${item.product.id}`}
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-200">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-2 leading-snug text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs mt-0.5 text-gray-400">
                      {item.product.weight}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-extrabold text-gray-900">
                        ₹{item.product.price}
                      </p>
                      {item.product.originalPrice > item.product.price && (
                        <p className="text-xs line-through text-gray-400">
                          ₹{item.product.originalPrice}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-50 transition-colors"
                      aria-label={`Remove ${item.product.name}`}
                      data-ocid={`cart-remove-${item.product.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                    <div className="flex items-center rounded-xl overflow-hidden border-2 border-purple-600">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center font-bold text-white transition-opacity hover:opacity-90 bg-purple-600"
                        aria-label="Decrease quantity"
                        data-ocid={`cart-decrease-${item.product.id}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-extrabold text-purple-600">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center font-bold text-white transition-opacity hover:opacity-90 bg-purple-600"
                        aria-label="Increase quantity"
                        data-ocid={`cart-increase-${item.product.id}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only when items exist */}
        {items.length > 0 && (
          <div
            className="border-t flex flex-col gap-0"
            style={{ borderColor: "#e5e7eb" }}
          >
            {/* Coupon section */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 flex-shrink-0 text-purple-600" />
                {couponApplied ? (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">
                      ZEPTO5 applied — 5% off!
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-xs font-bold text-red-500"
                      data-ocid="cart-coupon-remove"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder="Apply coupon code"
                      className="flex-1 text-sm bg-transparent outline-none placeholder:text-gray-400 text-gray-900"
                      data-ocid="cart-coupon-input"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="text-sm font-bold transition-opacity hover:opacity-80 text-purple-600"
                      data-ocid="cart-coupon-apply"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
              {couponError && (
                <p className="text-xs mt-1 ml-6 text-red-500">{couponError}</p>
              )}
            </div>

            {/* Bill details */}
            <div className="px-4 pt-3 pb-2 space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wide text-gray-500">
                Bill Details
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Item Total</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Fee</span>
                  {isFreeDelivery ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs line-through text-gray-400">
                        ₹{DELIVERY_FEE}
                      </span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                  ) : (
                    <span className="font-semibold text-gray-900">
                      ₹{DELIVERY_FEE}
                    </span>
                  )}
                </div>
                {!isFreeDelivery && (
                  <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs bg-yellow-50 text-amber-800">
                    <span>🚀</span>
                    <span className="font-medium">
                      Add ₹{FREE_DELIVERY_THRESHOLD - totalPrice} more for FREE
                      delivery
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-700">Platform Fee</span>
                  <span className="font-semibold text-gray-900">
                    ₹{PLATFORM_FEE}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between">
                    <span className="text-green-600">Coupon Discount</span>
                    <span className="font-bold text-green-600">
                      −₹{couponDiscount}
                    </span>
                  </div>
                )}
              </div>

              {/* Grand total */}
              <div className="flex justify-between pt-2 mt-1 border-t border-gray-200 font-extrabold text-base text-gray-900">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* Savings badge */}
              {(discount > 0 || couponApplied) && (
                <div
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold bg-green-50 text-green-600"
                  data-ocid="cart-savings"
                >
                  <span>🎉</span>
                  <span>
                    You saved ₹{discount + couponDiscount} on this order
                  </span>
                </div>
              )}
            </div>

            {/* Checkout button */}
            <div className="px-4 pb-4 pt-1 flex flex-col gap-2">
              <button
                type="button"
                className="w-full py-3.5 rounded-xl font-extrabold text-sm text-white flex items-center justify-between px-5 transition-opacity hover:opacity-90 active:scale-[0.98] bg-purple-600"
                aria-label="Proceed to checkout"
                data-ocid="cart-checkout"
              >
                <span>Proceed to Checkout</span>
                <span className="text-base">₹{grandTotal} →</span>
              </button>
              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center text-xs py-1 hover:opacity-70 transition-opacity text-gray-400"
                aria-label="Clear cart"
                data-ocid="cart-clear"
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
