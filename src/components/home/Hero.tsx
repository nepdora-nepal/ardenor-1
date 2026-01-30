"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { images } from "@/services/image-loader";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-neutral-950">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <ImageWithFallback
          src={images.hero}
          fallbackSrc={images.hero}
          fill
          className="object-cover object-center"
          alt="Luxury Fashion Collection"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </motion.div>

      {/* Content - Centered */}
      <div className="relative z-10 flex min-h-screen items-center justify-center text-center text-white px-6">
        <div className="max-w-4xl pt-20">
          {/* Subtitle / Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6"
          >
            <span className="text-[10px] md:text-xs tracking-[0.4em]  text-white font-medium bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm">
              Timeless Elegance Since 1985
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl  mb-8 leading-[1.1] tracking-tight">
              Dressed in <span className="text-primary ">Time</span>, <br />
              <span className=" font-light">Not Trends</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-sm md:text-lg font-light mb-12 opacity-80 leading-relaxed max-w-2xl mx-auto"
          >
            Crafted with intention and quiet strength — a collection built to
            move through seasons with poise and permanence. Where every stitch
            tells a story of timeless elegance.
          </motion.p>

          {/* Buttons - Rounded Full style from Template */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center"
          >
            <Link href="/collections">
              <Button
                variant="default"
                size="lg"
                className="  text-[10px] font-bold  px-10 py-7 h-auto rounded-full group transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
              >
                Explore Collection
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="  text-[10px] font-bold  px-10 py-7 h-auto rounded-full transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
