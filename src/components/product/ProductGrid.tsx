"use client";

import React from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-product";
import ProductCard from "@/components/product/ProductCard";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  category?: string;
  limit?: number;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export default function ProductGrid({
  title = "Featured Products",
  subtitle,
  category,
  limit = 4,
  isFeatured,
  isPopular,
}: ProductGridProps) {
  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts({
    category: category,
    page_size: limit,
    is_featured: isFeatured,
    is_popular: isPopular,
  });

  const { addToCart, setIsCartOpen } = useCart();

  const products: Product[] = productsData?.results || [];

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product || !product.id) return;

    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    addToCart(product as any, 1);
    setIsCartOpen(true);
    toast.success(`${product.name} added to cart`);
  };

  if (isLoading) return <ProductGridSkeleton limit={limit} />;

  if (error || !products.length) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No Products Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error
              ? "Failed to load products. Please try again."
              : "No products available in this category."}
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            Browse All Collections
            <span>→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl  md:text-4xl  text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* View All Link */}
        {products.length >= (limit || 10) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 pt-8 border-t border-gray-200"
          >
            <Link
              href={category ? `/collections/${category}` : "/collections"}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors group"
            >
              View All Products
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
