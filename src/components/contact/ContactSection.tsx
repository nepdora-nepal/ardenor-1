"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSubmitContactForm } from '@/hooks/use-contact';
import { Loader2 } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(7, "Phone number must be at least 7 characters").optional().or(z.literal('')),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactSection: React.FC = () => {
    const { mutate: submitForm, isPending } = useSubmitContactForm();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = (data: ContactFormValues) => {
        submitForm(data, {
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div className="pt-48 pb-32 px-10 max-w-2xl mx-auto min-h-screen">
            <h1 className="text-6xl font-serif mb-16 text-center tracking-tight">We&apos;re Here for You</h1>
            <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Name</label>
                        <input
                            {...register('name')}
                            type="text"
                            className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-sm placeholder:text-neutral-300"
                            placeholder="Your name"
                        />
                        {errors.name && <p className="text-red-500 text-[10px] uppercase tracking-wide">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-sm placeholder:text-neutral-300"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-[10px] uppercase tracking-wide">{errors.email.message}</p>}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Phone Number</label>
                    <input
                        {...register('phone_number')}
                        type="tel"
                        className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors bg-transparent text-sm placeholder:text-neutral-300"
                        placeholder="Your phone number (optional)"
                    />
                    {errors.phone_number && <p className="text-red-500 text-[10px] uppercase tracking-wide">{errors.phone_number.message}</p>}
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Message</label>
                    <textarea
                        {...register('message')}
                        rows={4}
                        className="w-full border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors bg-transparent resize-none text-sm placeholder:text-neutral-300"
                        placeholder="Additional notes"
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-[10px] uppercase tracking-wide">{errors.message.message}</p>}
                </div>
                <button
                    disabled={isPending}
                    className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-colors mt-8 flex items-center justify-center disabled:bg-neutral-400"
                >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {isPending ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Phone</h4>
                    <p className="text-sm text-[#1a1a1a] font-light tracking-wide">+44 20 1234 5678</p>
                </div>
                <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Support</h4>
                    <p className="text-sm text-[#1a1a1a] font-light tracking-wide">support@verin.com</p>
                </div>
                <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400">Location</h4>
                    <p className="text-sm text-[#1a1a1a] font-light tracking-wide">Verin Studio, London</p>
                </div>
            </div>
        </div>
    );
};
