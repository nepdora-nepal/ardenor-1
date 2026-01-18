import React, { Suspense } from 'react';
import { SuccessSection } from '@/components/checkout/SuccessSection';

const SuccessPage = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-pulse text-lg font-serif">Confirming Order...</div>
            </div>
        }>
            <SuccessSection />
        </Suspense>
    );
};

export default SuccessPage;
