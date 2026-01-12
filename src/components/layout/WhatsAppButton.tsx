"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useWhatsApps } from "@/hooks/use-whatsapp";
import { motion, AnimatePresence } from "framer-motion";

export const WhatsAppButton: React.FC = () => {
    const { data: whatsapps, isLoading } = useWhatsApps();

    // Find the first active WhatsApp config
    const activeWhatsApp = whatsapps?.find((wa) => wa.is_enabled);

    if (isLoading || !activeWhatsApp) return null;

    const handleClick = () => {
        const phoneNumber = activeWhatsApp.phone_number.replace(/\D/g, "");
        const url = `https://wa.me/${phoneNumber}`;
        window.open(url, "_blank");
    };

    return (
        <AnimatePresence>
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl transition-transform hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center group"
                aria-label="Contact us on WhatsApp"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out group-hover:ml-2 text-sm font-medium">
                    Chat with us
                </span>
            </motion.button>
        </AnimatePresence>
    );
};
