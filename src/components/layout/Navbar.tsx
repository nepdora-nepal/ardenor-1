"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const { setIsCartOpen, itemCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine styles based on homepage and scroll state
    const isTransparent = isHomePage && !isScrolled;
    const navTextColor = isTransparent ? "text-white" : "text-black";
    const navBg = isTransparent ? "bg-transparent py-8" : "bg-white/80 backdrop-blur-xl py-4 shadow-sm";
    const indicatorColor = isTransparent ? "bg-white" : "bg-black";
    const badgeBg = isTransparent ? "bg-white text-black" : "bg-black text-white";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${navBg} ${navTextColor}`}
        >
            <div className="max-w-7xl mx-auto  flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-2xl  tracking-[0.1em] font-medium transition-opacity hover:opacity-70"
                >
                    VERIN<sup>®</sup>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-12 text-lg   font-medium">
                    {["Home", "About", "Collections", "News", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="relative group py-1"
                        >
                            <span>{item}</span>

                            {/* underline */}
                            <span
                                className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${indicatorColor}`}
                            />
                        </Link>
                    ))}
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-8">
                    <button className="hover:opacity-50 transition-opacity">
                        <Search className="w-5 h-5 stroke-[1.2]" />
                    </button>

                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:opacity-50 transition-opacity relative group"
                    >
                        <ShoppingBag className="w-5 h-5 stroke-[1.2]" />

                        {/* cart badge */}
                        {itemCount > 0 && (
                            <span
                                className={`absolute -top-1.5 -right-1.5 text-[8px] w-4 h-4 flex items-center justify-center rounded-full 
                  group-hover:scale-110 transition-transform font-bold
                  ${badgeBg}`}
                            >
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};
