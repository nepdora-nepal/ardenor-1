"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export const Hero: React.FC = () => {

    // Find a banner of type 'hero' or just use the first one if available





    return (
        <div className="relative h-screen w-full overflow-hidden bg-neutral-100">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src="/hero-image.png"
                    fill
                    className="object-cover"
                    alt="Luxury Fashion"
                    priority
                />
            </motion.div>
            <div className="absolute inset-0 bg-black/10"></div>

            <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 max-w-[1800px] mx-auto">
                <div className="max-w-3xl text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-6xl md:text-9xl font-serif mb-8 leading-[1.1] tracking-tight"
                    >
                        Dressed in Time, <br /> <span className="italic font-normal text-[0.8em]">Not Trends</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-base md:text-lg font-light mb-12 opacity-80 leading-relaxed max-w-md"
                    >
                        Crafted with intention and quiet strength — a collection built to move through seasons with poise and permanence.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.9 }}
                        className="flex space-x-6"
                    >
                        <Button
                            variant="default"
                            size="lg"
                            className="uppercase tracking-[0.3em] text-[10px] font-bold "
                        >
                            Explore Collection
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="text-primary hover:bg-none! hover:text-primary"
                        >
                            Contact Us
                        </Button>

                    </motion.div>
                </div>
            </div>


        </div>
    );
};
