"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { images } from '@/services/image-loader';

const timeline = [
    { year: '1997', title: 'Where It Began', desc: 'What started as a small design studio grew from a shared fascination with form, material, and balance. Every early piece carried the idea that simplicity could feel profound.' },
    { year: '2004', title: 'Defining a Vision', desc: 'Our approach evolved into more than aesthetics; it became a mindset. Precision, restraint, and purpose began to shape not just our designs, but our way of working.' },
    { year: '2012', title: 'Craft Refined', desc: 'We built deeper partnerships with artisans and ateliers across Europe, sourcing natural fabrics and developing collections that reflect timeless quality and human touch.' },
    { year: '2023', title: 'Design That Endures', desc: 'Today, we continue to create for longevity, collections defined by quiet confidence, modern craftsmanship, and a respect for tradition.' }
];

export const AboutSection: React.FC = () => {
    return (
        <div className="pt-48 pb-32">
            <section className="max-w-[1800px] mx-auto px-10 text-center mb-40" id="about-hero">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-[6rem] md:text-[9rem] font-serif mb-16 leading-[1] tracking-tight"
                >
                    Simplicity is <br /> <span className="italic font-normal">our statement.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="w-full max-w-5xl mx-auto aspect-[16/8] bg-neutral-200 mb-20 overflow-hidden"
                >
                    <ImageWithFallback
                        id="about_atelier"
                        src={images.about}
                        fallbackSrc={images.about}
                        alt="Atelier Detail"
                        className="w-full h-full object-cover grayscale"
                        fill
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[11px] font-medium text-neutral-400 leading-relaxed uppercase tracking-[0.4em] max-w-3xl mx-auto"
                >
                    Inspired by classic tailoring and contemporary culture, we create pieces defined by quiet complexity, with a sense of understated sophistication.
                </motion.p>
            </section>

            <section className="max-w-5xl mx-auto px-10 mb-40" id="about-journey">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl font-serif mb-32 text-center"
                >
                    Our Journey in Craft
                </motion.h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute left-1/2 top-0 w-px bg-neutral-200 -translate-x-1/2 hidden md:block"
                    />

                    <div className="space-y-40">
                        {timeline.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                <div className={`md:w-5/12 ${idx % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                                    <span className="text-[11px] font-bold tracking-[0.4em] mb-4 block text-neutral-300">{item.year}</span>
                                    <h3 className="text-2xl font-serif mb-6">{item.title}</h3>
                                    <p className="text-sm text-neutral-500 font-light leading-relaxed tracking-wide">
                                        {item.desc}
                                    </p>
                                </div>
                                {/* Dot */}
                                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-2 h-2 rounded-full bg-black hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
