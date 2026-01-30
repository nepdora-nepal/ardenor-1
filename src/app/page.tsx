"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import NewsletterModal from "@/components/home/NewsletterModal";
import TestimonialSection from "@/components/home/TestimonialSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturedHighlight from "@/components/home/FeaturedHighlight";
import PopularProducts from "@/components/home/PopularProducts";
import FAQSection from "@/components/faq/FAQSection";
import ContactSection from "@/components/contact/ContactSection";
import ProductGridSkeleton from "@/components/product/ProductGridSkeleton";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Hero />
      <CategoryGrid />

      <Suspense fallback={<ProductGridSkeleton limit={4} />}>
        <FeaturedProducts />
      </Suspense>

      <FeaturedHighlight />

      <Suspense fallback={<ProductGridSkeleton limit={4} />}>
        <PopularProducts />
      </Suspense>

      <FAQSection />

      <section className="bg-white">
        <ContactSection />
      </section>

      <TestimonialSection />

      <NewsletterModal />
    </motion.div>
  );
}
