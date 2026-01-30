"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateNewsletter } from "@/hooks/use-newsletter";
import { toast } from "sonner";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { images } from "@/services/image-loader";

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { mutate: createNewsletter, isPending } = useCreateNewsletter();

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewsletter(
      { email },
      {
        onSuccess: () => {
          toast.success("Successfully subscribed to newsletter!");
          setEmail("");
          setIsOpen(false);
        },
        onError: (error: { message?: string }) => {
          toast.error(
            error?.message || "Failed to subscribe. Please try again.",
          );
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white max-w-4xl w-full flex flex-col md:flex-row shadow-2xl relative overflow-hidden"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-neutral-400 hover:text-black z-10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full md:w-1/2 aspect-[4/5] bg-neutral-200">
            <ImageWithFallback
              id="newsletter"
              src={images.newsletter}
              fallbackSrc={images.newsletter}
              fill
              className="w-full h-full object-cover"
              alt="Welcome offer"
            />
          </div>

          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center text-center">
            <span className="text-[10px]   text-neutral-400 mb-6 block font-bold">
              Welcome Offer
            </span>
            <h2 className="text-4xl  mb-6 leading-tight">
              Sign up and get 20% off your first order
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                className="w-full border-b border-black py-3 text-sm focus:outline-none placeholder:text-neutral-300 transition-colors focus:border-neutral-400"
                required
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-black text-white py-4 text-[10px]   font-bold hover:bg-neutral-800 transition-colors disabled:bg-neutral-400"
              >
                {isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <p className="text-[9px]   text-neutral-400 mt-8">
              By subscribing you agree to our Terms & Conditions
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
