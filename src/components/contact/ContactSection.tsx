"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSubmitContactForm } from "@/hooks/use-contact";
import { ContactFormData } from "@/types/contact";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
export default function ContactSection() {
  const { mutate: submitContact, isPending } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const submissionData: ContactFormData = {
      name: `${firstName} ${lastName}`.trim(),
      email: email,
      phone_number: phone,
      message: message,
    };

    submitContact(submissionData, {
      onSuccess: () => {
        toast.success("Message sent successfully");
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send message");
      },
    });
  };

  return (
    <motion.section
      className="bg-background px-6 py-16 md:py-32 space-y-12 relative overflow-hidden min-h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      {/* Subtle Decorative Elements */}
      <div className="hidden md:block pointer-events-none absolute top-40 -left-20 z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="hidden md:block pointer-events-none absolute bottom-40 -right-20 z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="max-w-2xl mx-auto text-center relative z-20 space-y-8">
        <div className="inline-block">
          <span className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-neutral-900 leading-tight">
            Connect with VERIN
          </h1>
        </div>

      </div>

      <div className="max-w-xl mx-auto relative z-20">
        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
          {/* NAME FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            <Input
              type="text"
              name="firstName"
              required
              placeholder=" "
              label="First Name *"
              className="focus:border-primary"
            />
            <Input
              type="text"
              name="lastName"
              required
              placeholder=" "
              label="Last Name *"
              className="focus:border-primary"
            />
          </div>

          {/* EMAIL & PHONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            <Input
              type="email"
              name="email"
              required
              placeholder=" "
              label="Email Address *"
              className="focus:border-primary"
            />
            <Input
              type="tel"
              name="phone"
              required
              label="Phone Number *"
              placeholder=" "
              className="focus:border-primary"
            />
          </div>

          {/* MESSAGE */}
          <div className="relative group">
            <textarea
              name="message"
              rows={4}
              placeholder=" "
              className="peer w-full px-4 pt-8 pb-3 text-sm border-2 border-gray-100 rounded-lg bg-white/80 focus:border-primary outline-none transition-all duration-300 resize-none"
              required
            />
            <label className="text-muted-foreground pointer-events-none absolute left-4 transition-all duration-200 top-2 text-[10px] font-medium peer-placeholder-shown:top-6 peer-placeholder-shown:text-xs">
              Tell us about your inquiry *
            </label>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-16 bg-black text-white hover:bg-neutral-800 rounded-none uppercase  text-[10px] font-bold transition-all duration-500 flex items-center justify-center group"
          >
            {isPending ? (
              "Sending..."
            ) : (
              <>
                Send Message{" "}
                <Send className="ml-3 w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </Button>
        </form>
      </div>
    </motion.section>
  );
}
