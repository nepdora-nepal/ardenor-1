import React, { Suspense } from 'react';
import OrderSuccessContent from '@/components/checkout/SuccessSection';

 export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <div className="animate-pulse text-lg ">Confirming Order...</div>
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    );
};

