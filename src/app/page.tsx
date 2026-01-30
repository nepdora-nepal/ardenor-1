
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '@/components/home/Hero';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductGrid } from '@/components/product/ProductGrid';
import { NewsletterModal } from '@/components/home/NewsletterModal';
import { TestimonialSection } from '@/components/home/TestimonialSection';
import Link from 'next/link';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { images } from '@/services/image-loader';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Hero />
      <CategoryGrid />

      <React.Suspense fallback={<div className="h-96" />}>
        <ProductGrid
          title="Carried with Intention"
          subtitle="Soft structures, precise form — bags designed to hold more than what you carry."
          limit={4}
        />
      </React.Suspense>

      {/* Featured Collection Highlight */}
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            id="featured_about"
            src={images.about}
            fallbackSrc={images.about}
            className="w-full h-full object-cover grayscale-[0.5]"
            alt="Featured Section"
            fill
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <h2 className="text-6xl md:text-8xl font-serif mb-10 leading-[1.1]">
            Dressed in Time, <br /> <span className="italic font-normal">Not Trends</span>
          </h2>
          <div className="flex justify-center space-x-6">
            <Link href="/collections">
              <button className="bg-white text-black px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors">
                Explore Collection
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
      <TestimonialSection />

      <NewsletterModal />
    </motion.div>
  );
};

export default HomePage;
