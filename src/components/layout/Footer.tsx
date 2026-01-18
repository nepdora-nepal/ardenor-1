
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCreateNewsletter } from '@/hooks/use-newsletter';
import { toast } from 'sonner';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const { mutate: createNewsletter, isPending } = useCreateNewsletter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createNewsletter(
            { email },
            {
                onSuccess: () => {
                    toast.success('Successfully subscribed to newsletter!');
                    setEmail('');
                },
                onError: (error: { message?: string }) => {
                    toast.error(error?.message || 'Failed to subscribe. Please try again.');
                }
            }
        );
    };

    return (
        <footer className="bg-[#0A0A0A] text-white pt-32 pb-16 px-10 relative overflow-hidden">
            <div className="max-w-[1800px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-40">
                    <div className="md:col-span-3 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Collections</h4>
                            <ul className="space-y-4 text-[13px] font-light text-neutral-400">
                                <li><Link href="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
                                <li><Link href="/collections" className="hover:text-white transition-colors">Lookbook</Link></li>
                                <li><Link href="/collections" className="hover:text-white transition-colors">Products</Link></li>
                                <li><Link href="/collections/men" className="hover:text-white transition-colors">Men</Link></li>
                                <li><Link href="/collections/women" className="hover:text-white transition-colors">Women</Link></li>
                                <li><Link href="/collections/teens" className="hover:text-white transition-colors">Teens</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Company</h4>
                            <ul className="space-y-4 text-[13px] font-light text-neutral-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-3 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Template</h4>
                            <ul className="space-y-4 text-[13px] font-light text-neutral-400">
                                <li><span className="hover:text-white cursor-pointer transition-colors">Style Guide</span></li>
                                <li><span className="hover:text-white cursor-pointer transition-colors">Licenses</span></li>
                                <li><span className="hover:text-white cursor-pointer transition-colors">Changelog</span></li>
                                <li><span className="hover:text-white cursor-pointer transition-colors font-medium text-neutral-200">More Templates</span></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Legal</h4>
                            <ul className="space-y-4 text-[13px] font-light text-neutral-400">
                                <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/" className="hover:text-white transition-colors">Terms of Use</Link></li>
                                <li><Link href="/" className="hover:text-white transition-colors">Sales Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-6 space-y-10">
                        <div>
                            <h4 className="text-[28px] font-serif mb-4 leading-tight">Stay in the loop</h4>
                            <p className="text-[13px] font-light text-neutral-400 max-w-sm mb-10 leading-relaxed">
                                Get the latest updates, tips, and releases — straight to your inbox.
                            </p>
                            <form className="flex group border border-white/10 p-1" onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="bg-transparent text-[13px] w-full px-4 focus:outline-none placeholder:text-neutral-700"
                                    required
                                    disabled={isPending}
                                />
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-white text-black px-10 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-colors disabled:bg-neutral-400"
                                >
                                    {isPending ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 mt-6 font-bold">
                                NO SPAM. JUST QUALITY CONTENT AND OCCASIONAL UPDATES.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/5 pt-16">
                    <div className="text-[11px] text-neutral-500 tracking-[0.2em] uppercase space-y-2">
                        <div>Verin<sup>®</sup>. All rights reserved. © 2026</div>
                    </div>

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 0.8, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-[30vw] font-serif leading-[0.8] tracking-[-0.05em] text-white pointer-events-none mt-32 text-center select-none"
                >
                    VERIN<sup>®</sup>
                </motion.div>
            </div>
        </footer>
    );
};
