"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { getImageUrl } from "@/config/site";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductPageProps {
  product: Product;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    "description",
  );
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
    toast.success(`${product.name} added to cart`, {
      closeButton: true,
    });
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-white">
      <div className="pt-20 md:pt-28 px-3 md:px-6 lg:px-10 max-w-[1400px] mx-auto min-h-screen pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-[1px] border-neutr al-200 shadow-sm rounded-sm overflow-hidden">
          {/* Left: Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-square md:aspect-[4/5] bg-[#F9F9F9] overflow-hidden lg:border-r-[1px] border-neutral-200"
          >
            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-10">
              <Image
                src={getImageUrl(product.thumbnail_image || "")}
                alt={product.name}
                fill
                className="object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700 ease-in-out p-6 md:p-10"
                priority
              />
            </div>
            {product.is_popular && (
              <div className="absolute top-4 left-4 md:top-5 md:left-5 bg-black text-white px-2.5 py-1 text-[9px]  tracking-widest font-medium">
                Popular Choice
              </div>
            )}
          </motion.div>

          {/* Right: Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col bg-white p-6 md:p-10 lg:p-14 justify-center"
          >
            <div className="space-y-1.5 mb-6 md:mb-8">
              <span className="text-[9px]   text-neutral-400 font-medium">
                {product.category?.name || "Exclusive Collection"}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl  text-neutral-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 pt-3">
                <p className="text-xl md:text-2xl text-neutral-900 font-light ">
                  $ {parseFloat(product.price).toFixed(2)} USD
                </p>
                {product.market_price && (
                  <p className="text-base md:text-lg text-neutral-400 line-through font-light">
                    $ {parseFloat(product.market_price).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full h-px bg-neutral-100 mb-6 md:mb-8" />

            {/* Quantity Selector */}
            <div className="mb-8 md:mb-10">
              <label className="text-[9px]   font-bold text-neutral-900 mb-4 block">
                SELECT QUANTITY
              </label>
              <div className="flex items-center border border-neutral-200 bg-white px-4 py-3 w-32 justify-between rounded-sm shadow-sm">
                <span className="text-sm font-medium">{quantity}</span>
                <div className="flex flex-col border-l border-neutral-100 pl-3 ml-3">
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="hover:text-black text-neutral-400 p-0.5 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:text-black text-neutral-400 p-0.5 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-12">
              <button
                onClick={handleAddToCart}
                className="group flex-1 bg-black text-white px-6 md:px-8 py-3.5 md:py-4 text-[10px]  tracking-[0.25em] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] rounded-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                ADD TO BAG
              </button>
              <button className="flex-1 bg-transparent text-black border border-black px-6 md:px-8 py-3.5 md:py-4 text-[10px]  tracking-[0.25em] font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2.5 rounded-sm">
                BUY NOW
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-neutral-100">
              {[
                {
                  id: "description",
                  title: "PRODUCT DESCRIPTION",
                  content: product.description,
                  isRichText: true,
                },
                {
                  id: "composition",
                  title: "CRAFTMANSHIP & CARE",
                  content:
                    "Each piece is hand-finished in our atelier. We recommend professional dry cleaning or careful hand washing to preserve the life of your garment.",
                  isRichText: false,
                },
                {
                  id: "shipping",
                  title: "SHIPPING & RETURNS",
                  content:
                    "Complimentary worldwide express shipping on orders over $500. Returns accepted within 14 days of delivery.",
                  isRichText: false,
                },
              ].map((item) => (
                <div key={item.id} className="border-b border-neutral-100">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between py-4 md:py-5 text-left group"
                  >
                    <span className="text-[10px] text-neutral-900 font-bold tracking-widest  transition-colors group-hover:text-neutral-500">
                      {item.title}
                    </span>
                    <Plus
                      className={`w-3 h-3 transition-transform duration-500 text-neutral-400 ${openAccordion === item.id ? "rotate-45 text-black" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 md:pb-7 text-neutral-600 text-sm md:text-[15px] font-light leading-[1.7]  prose prose-neutral max-w-none">
                          {item.isRichText && item.content ? (
                            <div
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                          ) : (
                            <p>
                              {item.content ||
                                "Product details are being updated."}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Meta Tags / Attributes */}
            {(product.fast_shipping || product.warranty) && (
              <div className="mt-8 md:mt-10 flex flex-wrap gap-2.5">
                {product.fast_shipping && (
                  <span className="px-2.5 py-1 bg-neutral-50 text-[9px] text-neutral-500  tracking-widest border border-neutral-100">
                    Fast Shipping
                  </span>
                )}
                {product.warranty && (
                  <span className="px-2.5 py-1 bg-neutral-50 text-[9px] text-neutral-500  tracking-widest border border-neutral-100">
                    {product.warranty}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
