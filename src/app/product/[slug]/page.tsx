
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { useProduct } from '@/hooks/use-product';
import { Skeleton } from '@/components/ui/skeleton';
import ProductPage from '@/components/product/ProductPage';

const ProductDetailPage: React.FC = () => {
    const { slug } = useParams();
    const { data: product, isLoading, error } = useProduct(slug as string);

    if (isLoading) {
        return (
            <div className="pt-32 px-10 max-w-[1500px] mx-auto min-h-screen">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <Skeleton className="aspect-[4/5] w-full" />
                    <div className="space-y-8">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-40 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-neutral-500 font-serif">The sought-after piece could not be found.</p>
            </div>
        );
    }

    return <ProductPage product={product} />;
};

export default ProductDetailPage;
