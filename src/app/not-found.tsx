
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-[#F8F8F6] px-6">
            <div className="text-center max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-8 block font-bold">Error 404</span>
                    <h1 className="text-6xl md:text-8xl font-serif mb-10 leading-tight">
                        Lost in <br /> <span className="italic font-normal">Silence</span>
                    </h1>
                    <p className="text-neutral-500 mb-12 font-light leading-relaxed tracking-wide">
                        The collection or page you are looking for has been moved or doesn't exist.
                        Let's guide you back to our timeless essentials.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/">
                            <button className="bg-black text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all duration-500 w-full md:w-auto">
                                Return to Home
                            </button>
                        </Link>
                        <Link href="/collections">
                            <button className="border border-black/10 text-black px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all duration-500 w-full md:w-auto">
                                Explore Collections
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Background elements for premium feel */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-[-1]">
                <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-black blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-black blur-[100px]" />
            </div>
        </div>
    );
};

export default NotFound;
