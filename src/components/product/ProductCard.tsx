"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, ShoppingBag } from "lucide-react";
import { getImageUrl } from "@/config/site";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (e: React.MouseEvent, product: Product) => void;
}

const calculateDiscount = (price: string, marketPrice: string): number => {
  const priceNum = parseFloat(price);
  const marketPriceNum = parseFloat(marketPrice);
  if (marketPriceNum <= priceNum) return 0;
  return Math.round(((marketPriceNum - priceNum) / marketPriceNum) * 100);
};

const formatPrice = (price: string): string => {
  return `Rs. ${parseFloat(price).toLocaleString("en-IN")}`;
};

export default function ProductCard({
  product,
  index,
  onAddToCart,
}: ProductCardProps) {
  const discount = calculateDiscount(
    product.price,
    product.market_price || product.price,
  );
  const hasDiscount = discount > 0;
  const isLowStock = product.stock < 50;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4 cursor-pointer">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={getImageUrl(
              product.thumbnail_image ?? "/placeholder-product.jpg",
            )}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.is_popular && (
              <Badge
                variant="default"
                className="bg-amber-500 hover:bg-amber-600"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
            {product.is_featured && (
              <Badge
                variant="default"
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Zap className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          {hasDiscount && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              {discount}% OFF
            </Badge>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                Out of Stock
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </Link>

        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <button
              type="button"
              onClick={(e) => onAddToCart(e, product)}
              className="w-full bg-white text-black py-3 text-[10px]  font-bold flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors shadow-lg pointer-events-auto"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <Link href={`/product/${product.slug}`} className="block space-y-2">
        {product.category && (
          <p className="text-xs text-gray-500 tracking-wider">
            {product.category.name}
          </p>
        )}

        <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 h-10">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.market_price || product.price)}
            </span>
          )}
        </div>

        {isLowStock && !isOutOfStock && (
          <p className="text-xs text-amber-600 font-medium">
            Only {product.stock} left in stock
          </p>
        )}

        {product.fast_shipping && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <Zap className="w-3 h-3" />
            Fast shipping available
          </div>
        )}
      </Link>
    </motion.div>
  );
}
