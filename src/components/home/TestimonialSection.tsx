"use client";

import React from "react";
import { useTestimonials } from "@/hooks/use-testimonials";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function TestimonialSection() {
  const { data: testimonials, isLoading } = useTestimonials();

  if (isLoading || !testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-32 px-10 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h4 className="text-[10px]  tracking-[0.4em] font-bold text-neutral-400 mb-6">
            Testimonials
          </h4>
          <h2 className="text-5xl md:text-6xl  tracking-tight">
            Voices of Distinction
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col items-center text-center space-y-8 p-8 bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-500"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ring-2 ring-neutral-100 ring-offset-4">
                <Image
                  src={testimonial.image || "/placeholder-avatar.jpg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative">
                <Quote className="w-10 h-10 text-neutral-100 absolute -top-4 -left-4 -z-0" />
                <p className="text-lg  italic text-neutral-800 leading-relaxed relative z-10 px-4">
                  &quot;{testimonial.comment}&quot;
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs   font-bold">{testimonial.name}</h3>
                <p className="text-[10px]   text-neutral-400">
                  {testimonial.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
