
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const SOCIAL_IMAGES = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1520975954732-35dd2229969e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=400'
];

export const OnSocials: React.FC = () => {
    return (
        <section className="py-32 bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-[1800px] mx-auto px-10 mb-20 text-center"
            >
                <h2 className="text-5xl font-serif mb-6">On Socials</h2>
                <p className="text-neutral-400 font-light text-sm max-w-xl mx-auto tracking-wide">
                    A look inside our process, behind-the-scenes stories, material studies, and glimpses of what inspires us daily.
                </p>
            </motion.div>

            <div className="flex overflow-hidden relative group">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex space-x-6 whitespace-nowrap"
                >
                    {[...SOCIAL_IMAGES, ...SOCIAL_IMAGES].map((img, idx) => (
                        <div key={idx} className="w-[300px] aspect-[4/5] flex-shrink-0 bg-neutral-100 overflow-hidden relative group/img">
                            <img
                                src={img}
                                className="w-full h-full object-cover grayscale-[0.3] group-hover/img:grayscale-0 transition-all duration-700"
                                alt="Social"
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
