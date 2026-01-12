
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '@/hooks/use-product';
import { getImageUrl } from '@/config/site';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

interface ProductGridProps {
    title?: string;
    subtitle?: string;
    category?: string;
    limit?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, category, limit }) => {
    const { data: productsData, isLoading } = useProducts({
        category: category,
        page_size: limit || 10,
    });

    const products = productsData?.results || [];

    if (isLoading) {
        return (
            <section className="py-32 px-10 overflow-hidden ">
                <div className="max-w-[1800px] mx-auto">
                    <div className="text-center mb-24 space-y-4">
                        <Skeleton className="h-12 w-64 mx-auto" />
                        <Skeleton className="h-4 w-96 mx-auto" />
                    </div>
                    <div className="flex space-x-12 overflow-x-auto hide-scrollbar pb-10">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex-shrink-0 w-[320px] md:w-[400px]">
                                <Skeleton className="aspect-[4/5] w-full mb-8" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4 mx-auto" />
                                    <Skeleton className="h-3 w-1/4 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-32 px-10 overflow-hidden ">
            <div className="max-w-[1800px] mx-auto">
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-24"
                    >
                        {title && <h2 className="text-5xl font-serif mb-6">{title}</h2>}
                        {subtitle && <p className="text-neutral-500 max-w-lg mx-auto font-light leading-relaxed text-sm tracking-wide">{subtitle}</p>}
                    </motion.div>
                )}

                <div className="flex space-x-12 overflow-x-auto hide-scrollbar pb-10 -mx-10 px-10 snap-x">
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="flex-shrink-0 w-[320px] md:w-[400px] group snap-start"
                        >
                            <Link href={`/product/${product.slug}`} className="block">
                                <div className="relative aspect-[4/5] overflow-hidden  mb-8">
                                    <img
                                        src={getImageUrl(product.thumbnail_image || '')}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-sm font-medium tracking-wide uppercase">{product.name}</h3>
                                    <p className="text-xs text-neutral-400 tracking-[0.1em] font-light">
                                        Rs. {parseFloat(product.price).toLocaleString()}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-20">
                    <Link
                        href="/collections"
                        className="text-[10px] uppercase tracking-[0.4em] font-medium border-b border-black/20 pb-1 hover:border-black transition-all"
                    >
                        Explore All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
};
