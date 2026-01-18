"use client";

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShoppingBag } from 'lucide-react';

export const SuccessSection: React.FC = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const router = useRouter();

    useEffect(() => {
        if (!orderId) {
            router.push('/');
        }
    }, [orderId, router]);

    return (
        <div className="pt-40 pb-20 px-8 text-center max-w-2xl mx-auto min-h-screen">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl"
            >
                <Check className="w-10 h-10" />
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
            >
                <h1 className="text-4xl md:text-5xl font-serif">Thank you for your order</h1>
                <p className="text-neutral-500 leading-relaxed max-w-md mx-auto">
                    Your order <span className="text-black font-medium">#{orderId}</span> has been successfully placed.
                    We&apos;ve sent a confirmation email with all the details of your purchase.
                </p>

                <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/collections"
                        className="w-full sm:w-auto bg-black text-white px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
                    >
                        Continue Shopping
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto border border-black text-black px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        View Collections
                    </Link>
                </div>
            </motion.div>

            {/* Decorative element */}
            <div className="mt-32 pt-12 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Email Support</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">Our concierge team is available 24/7 to assist with any inquiries.</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Shipping</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">Orders are processed within 24 hours and shipped via express courier.</p>
                </div>
                <div className="space-y-3">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold">Returns</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">Enjoy complimentary returns on all orders within 14 days.</p>
                </div>
            </div>
        </div>
    );
};
