
"use client";

import React from 'react';
import { ProductGrid } from '@/components/product/ProductGrid';

const CollectionsPage: React.FC = () => {
    return (
        <div className="pt-32">
            <ProductGrid
                title="All Collections"
                subtitle="Browse our complete range of refined essentials and accessories."
                limit={20}
            />
        </div>
    );
};

export default CollectionsPage;
