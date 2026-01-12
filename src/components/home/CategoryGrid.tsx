
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useCategories } from '@/hooks/use-category';
import { getImageUrl } from '@/config/site';

export const CategoryGrid: React.FC = () => {
    const { data: categoriesData, isLoading } = useCategories({ page_size: 3 });
    const categories = categoriesData?.results || [];

    if (isLoading) {
        return (
            <section className="py-32 px-10 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-4">
                            <div className="aspect-[3/4.2] bg-neutral-100 animate-pulse" />
                            <div className="h-8 bg-neutral-100 animate-pulse w-1/2" />
                            <div className="h-4 bg-neutral-100 animate-pulse w-1/4" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (categories.length === 0) return null;

    return (
        <section className="py-32 px-10 max-w-[1800px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-20"
            >
                <h2 className="text-4xl font-serif tracking-tight">Explore Collections</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.2 }}
                        className="group"
                    >
                        <Link href={`/collections/${cat.slug}`} className="block">

                            <div className="aspect-[3/4.2] overflow-hidden bg-neutral-100 mb-8 relative">
                                <img
                                    src={getImageUrl(cat.image || '')}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                                />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-serif">{cat.name}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 group-hover:text-black transition-colors duration-500">
                                    Discover Collection
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

