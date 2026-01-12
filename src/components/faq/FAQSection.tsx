"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useFAQs } from '@/hooks/use-faq';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from '@/components/ui/skeleton';
import { FAQ } from '@/types/faq';

export const FAQSection: React.FC = () => {
    const { data: faqs, isLoading } = useFAQs();

    if (isLoading) {
        return (
            <section className="py-32 px-10 max-w-4xl mx-auto">
                <Skeleton className="h-12 w-48 mx-auto mb-20" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} className="h-16 w-full" />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="py-32 px-10 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-5xl font-serif">Frequently Asked</h2>
            </motion.div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs?.map((faq: FAQ, idx: number) => (
                    <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-black/10">
                        <AccordionTrigger className="text-left py-6 text-sm uppercase tracking-[0.2em] font-medium hover:no-underline hover:opacity-50 transition-all">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-neutral-500 font-light leading-relaxed tracking-wide text-sm pb-8">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
};
