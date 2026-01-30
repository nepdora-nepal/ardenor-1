"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCreateNewsletter } from "@/hooks/use-newsletter";
import { toast } from "sonner";
import { ArrowRight, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { mutate: createNewsletter, isPending } = useCreateNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewsletter(
      { email },
      {
        onSuccess: () => {
          toast.success("Successfully subscribed to newsletter!");
          setEmail("");
        },
        onError: (error: { message?: string }) => {
          toast.error(
            error?.message || "Failed to subscribe. Please try again.",
          );
        },
      },
    );
  };

  const footerLinks = {
    shop: [
      { label: "All Collections", href: "/collections" },
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Men", href: "/collections/men" },
      { label: "Women", href: "/collections/women" },
      { label: "Accessories", href: "/collections/accessories" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/story" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Track Order", href: "/track-order" },
    ],
    legal: [
      {
        label: "Privacy Policy",
        href: "/privacy",
        icon: <Shield className="w-3 h-3" />,
      },
      {
        label: "Terms of Service",
        href: "/terms",
        icon: <FileText className="w-3 h-3" />,
      },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  };

  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-4 md:px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-tight">
                Stay Updated
              </h2>
              <p className="text-neutral-300 text-lg max-w-md leading-relaxed">
                Join our community for exclusive content, early access to new
                collections, and special offers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="group relative max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-4 text-base placeholder:text-neutral-500 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                    required
                    disabled={isPending}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-white text-black px-8 py-4 rounded-lg text-sm font-semibold tracking-wider hover:bg-neutral-100 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                >
                  {isPending ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-500 mt-4 tracking-wide">
                By subscribing, you agree to our Privacy Policy. Unsubscribe at
                any time.
              </p>
            </form>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {/* Shop */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold  text-neutral-400 uppercase mb-4">
                  Shop
                </h3>
                <ul className="space-y-3">
                  {footerLinks.shop.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white text-sm transition-colors duration-200 hover:pl-2 block py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold  text-neutral-400 uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white text-sm transition-colors duration-200 hover:pl-2 block py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold  text-neutral-400 uppercase mb-4">
                  Support
                </h3>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white text-sm transition-colors duration-200 hover:pl-2 block py-1"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-6">
                <h3 className="text-xs font-semibold  text-neutral-400 uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-neutral-300 hover:text-white text-sm transition-colors duration-200 hover:pl-2 block py-1 flex items-center gap-2"
                      >
                        {link.icon && link.icon}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-neutral-400 text-sm mb-2">
                VERIN<sup>®</sup>
              </div>
              <div className="text-xs text-neutral-500 tracking-wide">
                © {new Date().getFullYear()} Verin. All rights reserved.
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm text-neutral-400">
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <Link
                href="/affiliates"
                className="hover:text-white transition-colors"
              >
                Affiliates
              </Link>
              <Link
                href="/wholesale"
                className="hover:text-white transition-colors"
              >
                Wholesale
              </Link>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[30vw]  leading-[0.8] tracking-[-0.05em] text-white pointer-events-none mt-32 text-center select-none"
        >
          VERIN<sup>®</sup>
        </motion.div>
      </div>
    </footer>
  );
}
