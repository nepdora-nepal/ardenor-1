"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { getImageUrl } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

const CartDrawer: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-neutral-900" />
                <h2 className="text-lg  tracking-tight">Shopping Bag</h2>
                <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-full font-medium">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-neutral-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-neutral-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-neutral-900 font-medium">
                      Your bag is empty
                    </p>
                    <p className="text-sm text-neutral-400">
                      Discover our latest collections
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[11px]   font-bold border-b border-black pb-1 hover:opacity-50 transition-opacity pt-4"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedVariant?.id || "none"}`}
                    className="flex gap-6 group"
                  >
                    <div className="relative w-24 aspect-[3/4] bg-[#F9F9F9] rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={getImageUrl(item.product.thumbnail_image || "")}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2 mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-medium text-neutral-900 leading-snug">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedVariant?.id,
                              )
                            }
                            className="text-[10px] text-neutral-400 hover:text-black  tracking-tighter"
                          >
                            Remove
                          </button>
                        </div>
                        {item.selectedVariant && (
                          <p className="text-[11px] text-neutral-400">
                            {Object.values(
                              item.selectedVariant.option_values,
                            ).join(" / ")}
                          </p>
                        )}
                        <p className="text-sm ">
                          Rs.{" "}
                          {parseFloat(
                            item.selectedVariant?.price || item.product.price,
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-200 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1,
                                item.selectedVariant?.id,
                              )
                            }
                            className="p-1 px-2 hover:bg-neutral-50 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-neutral-400" />
                          </button>
                          <span className="text-[11px] font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedVariant?.id,
                              )
                            }
                            className="p-1 px-2 hover:bg-neutral-50 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-neutral-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-[#FAFAFA] space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px]   text-neutral-400 font-bold">
                      Subtotal
                    </span>
                    <span className="text-xl ">
                      Rs. {totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-400  tracking-widest leading-relaxed">
                    Shipping & taxes calculated at checkout
                  </p>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-primary text-white py-5 px-8 text-[11px]   font-bold flex items-center justify-between group hover:bg-neutral-800 transition-all shadow-lg shadow-black/5"
                >
                  <span>Proceed to Checkout</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
