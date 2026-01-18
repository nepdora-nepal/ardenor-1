"use client";

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useCreateOrder } from '@/hooks/use-orders';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { images } from '@/services/image-loader';
import { ArrowLeft, Loader2, ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const CheckoutSection: React.FC = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const { mutate: createOrder, isPending } = useCreateOrder();
    const router = useRouter();

    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
        shipping_address: '',
        city: '',
        note: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const orderData = {
            ...formData,
            shipping_address: formData.shipping_address || formData.customer_address,
            total_amount: totalPrice.toString(),
            delivery_charge: "0",
            items: cartItems.map(item => ({
                product_id: item.product.id,
                variant_id: item.selectedVariant?.id || null,
                quantity: item.quantity,
                price: item.selectedVariant?.price || item.product.price
            }))
        };

        createOrder({ orderData }, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess: (data: any) => {
                toast.success("Order placed successfully");
                clearCart();
                router.push(`/checkout/success?orderId=${data.id}`);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error("Failed to place order. Please try again.");
                console.error(error);
            }
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 pb-20 px-8 text-center max-w-lg mx-auto min-h-screen">
                <h1 className="text-3xl font-serif mb-6">Your bag is empty</h1>
                <p className="text-neutral-500 mb-10 leading-relaxed">
                    It seems you haven&apos;t added any luxury pieces to your collection yet.
                </p>
                <Link
                    href="/collections"
                    className="inline-block bg-black text-white px-10 py-4 text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-neutral-800 transition-all"
                >
                    Discover Collections
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-4 md:px-10 max-w-[1400px] mx-auto min-h-screen">
            <div className="flex flex-col lg:flex-row gap-16">

                {/* Left: Checkout Form */}
                <div className="flex-1 space-y-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
                            <ArrowLeft className="w-3 h-3" /> Back to store
                        </Link>
                        <h1 className="text-4xl font-serif">Secure Checkout</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* Contact Information */}
                        <section className="space-y-6">
                            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-900 border-b border-neutral-100 pb-4">
                                Contact Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Full Name</label>
                                    <input
                                        required
                                        name="customer_name"
                                        value={formData.customer_name}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50"
                                        placeholder="Grace Kelly"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="customer_email"
                                        value={formData.customer_email}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50"
                                        placeholder="grace@example.com"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Phone Number</label>
                                    <input
                                        required
                                        name="customer_phone"
                                        value={formData.customer_phone}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Shipping Information */}
                        <section className="space-y-6">
                            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-900 border-b border-neutral-100 pb-4">
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Shipping Address</label>
                                    <input
                                        required
                                        name="customer_address"
                                        value={formData.customer_address}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50"
                                        placeholder="742 Evergreen Terrace"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">City</label>
                                    <input
                                        required
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50"
                                        placeholder="Springfield"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-neutral-500">Order Note (Optional)</label>
                                    <textarea
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        rows={3}
                                        className="w-full border border-neutral-200 p-4 text-sm focus:outline-none focus:border-black transition-colors bg-neutral-50/50 resize-none"
                                        placeholder="Special instructions for delivery..."
                                    />
                                </div>
                            </div>
                        </section>

                        <button
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-black text-white py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 disabled:bg-neutral-400"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing Order...
                                </>
                            ) : (
                                <>
                                    Complete Purchase
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-2 text-neutral-400 text-[10px] uppercase tracking-widest">
                            <ShieldCheck className="w-4 h-4" />
                            Your data is encrypted and secure
                        </div>
                    </form>
                </div>

                {/* Right: Order Summary */}
                <div className="lg:w-[450px]">
                    <div className="sticky top-32 bg-[#FAFAFA] border border-neutral-100 p-8 rounded-sm space-y-8">
                        <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-neutral-900">
                            Order Summary
                        </h2>

                        {/* Items */}
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                            {cartItems.map((item) => (
                                <div key={`${item.product.id}-${item.selectedVariant?.id || 'none'}`} className="flex gap-4">
                                    <div className="relative w-16 h-20 bg-white rounded-sm overflow-hidden flex-shrink-0 border border-neutral-100">
                                        <ImageWithFallback
                                            id={`checkout-item-${item.product.id}`}
                                            src={item.product.thumbnail_image || images.category1}
                                            fallbackSrc={images.category1}
                                            alt={item.product.name}
                                            fill
                                            className="object-contain p-2 mix-blend-multiply"
                                        />
                                        <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                            {item.quantity}
                                        </span>
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-[13px] font-medium text-neutral-900 leading-tight">
                                            {item.product.name}
                                        </h3>
                                        {item.selectedVariant && (
                                            <p className="text-[10px] text-neutral-400 uppercase tracking-widest">
                                                {Object.values(item.selectedVariant.option_values).join(' / ')}
                                            </p>
                                        )}
                                        <p className="text-[13px] font-serif">
                                            $ {parseFloat(item.selectedVariant?.price || item.product.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-neutral-200" />

                        {/* Totals */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Subtotal</span>
                                <span className="font-serif">$ {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-neutral-500">Shipping</span>
                                <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold">Complimentary</span>
                            </div>
                            <div className="h-px bg-neutral-200 pt-4" />
                            <div className="flex justify-between items-baseline pt-2">
                                <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Total</span>
                                <div className="text-right">
                                    <p className="text-2xl font-serif">$ {totalPrice.toFixed(2)} USD</p>
                                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest mt-1">Including duties & taxes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
