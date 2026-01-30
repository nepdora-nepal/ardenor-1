"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/use-category";
import ProductGrid from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";
import { ChevronRight, Filter, X, Menu } from "lucide-react";

export default function CollectionFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCategory = searchParams.get("category") || "";
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories({ page_size: 100 });
  const categories = categoriesData?.results || [];

  const handleCategoryClick = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    setMobileFilterOpen(false);
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
    setMobileFilterOpen(false);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Categories
          </h2>
          {currentCategory && (
            <button
              onClick={clearFilters}
              className="text-[10px] font-medium tracking-widest text-neutral-400 hover:text-black transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              CLEAR
            </button>
          )}
        </div>

        <div className="space-y-1">
          <button
            onClick={() => handleCategoryClick("")}
            className={cn(
              "w-full text-left py-2.5 px-3 text-sm transition-all duration-300 flex items-center justify-between group rounded-md",
              currentCategory === ""
                ? "bg-neutral-900 text-white font-medium"
                : "hover:bg-neutral-100 text-neutral-600 hover:text-black",
            )}
          >
            All Collections
            <ChevronRight
              className={cn(
                "w-3 h-3 transition-transform duration-300",
                currentCategory === ""
                  ? "translate-x-0"
                  : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
              )}
            />
          </button>

          {isCategoriesLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 w-full bg-neutral-100 animate-pulse rounded-md"
                />
              ))
            : categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={cn(
                    "w-full text-left py-2.5 px-3 text-sm transition-all duration-300 flex items-center justify-between group rounded-md",
                    currentCategory === cat.slug
                      ? "bg-neutral-900 text-white font-medium"
                      : "hover:bg-neutral-100 text-neutral-600 hover:text-black",
                  )}
                >
                  {cat.name}
                  <ChevronRight
                    className={cn(
                      "w-3 h-3 transition-transform duration-300",
                      currentCategory === cat.slug
                        ? "translate-x-0"
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                    )}
                  />
                </button>
              ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white rounded-md text-sm font-medium w-full justify-center sm:w-auto"
          >
            <Menu className="w-4 h-4" />
            {mobileFilterOpen ? "Hide Filters" : "Show Filters"}
            {currentCategory && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded text-xs">
                1
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <>
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileFilterOpen(false)}
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                />

                {/* Drawer */}
                <motion.aside
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="lg:hidden fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-white z-50 overflow-y-auto shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold">Filters</h2>
                      <button
                        onClick={() => setMobileFilterOpen(false)}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FilterContent />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProductGrid
                  category={currentCategory}
                  title={
                    currentCategory
                      ? categories.find((c) => c.slug === currentCategory)?.name
                      : "All Collections"
                  }
                  subtitle={
                    currentCategory
                      ? `Explore our ${categories.find((c) => c.slug === currentCategory)?.name?.toLowerCase()} collection.`
                      : "Browse our complete range of refined essentials."
                  }
                  limit={20}
                />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
