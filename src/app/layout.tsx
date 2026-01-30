
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import  WhatsAppButton  from "@/components/layout/WhatsAppButton";
import  {CustomerPublishAuthProvider}  from "@/contexts/AuthContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "VERIN | Timeless Luxury",
  description: "Discover the world of VERIN - Timeless luxury essentials and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen antialiased font-sans",
        dmSans.variable
      )}>
        <CustomerPublishAuthProvider>
        <QueryProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <CartDrawer />
            <WhatsAppButton />
            <Toaster />
          </CartProvider>
        </QueryProvider>
        </CustomerPublishAuthProvider>
      </body>
    </html>
  );
}
