"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/hooks/use-orders";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";

const OrderSuccessContent = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const { data: order, isLoading, error } = useOrder(orderId);
  const { clearCart } = useCart();

  useEffect(() => {
    if (order) {
      clearCart();
    }
  }, [order, clearCart]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-10">
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <Skeleton className="w-20 h-20 rounded-full" />
          <Skeleton className="h-10 w-64 md:w-96" />
          <div className="space-y-2 text-center w-full max-w-lg">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </div>
          <div className="pt-4 flex gap-4">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-[200px] w-full rounded-3xl" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-[150px] w-full rounded-3xl" />
            </div>
          </div>

          <div className="space-y-6">
            <Skeleton className="h-[300px] w-full rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
          <Package size={40} />
        </div>
        <h1 className="text-3xl ">Order Not Found</h1>
        <p className="text-muted-foreground font-medium">
          We couldn&apos;t find the order you&apos;re looking for.
        </p>
        <Button
          onClick={() => router.push("/")}
          size="lg"
          className="rounded-xl font-bold"
        >
          Go to Homepage
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-10">
      {/* Success Header */}
      <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl md:text-5xl tracking-tight">
          Order Successful!
        </h1>
        <p className="text-muted-foreground text-lg font-medium">
          Thank you for your purchase,{" "}
          <span className="text-foreground font-bold">
            {order.customer_name}
          </span>
          . Your order{" "}
          <span className="text-primary  ">#{order.order_number}</span> has been
          placed successfully.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="rounded-xl font-bold h-12 px-8"
          >
            <HomeIcon className="mr-2 h-4 w-4" /> Go Home
          </Button>
          <Button
            onClick={() => router.push("/collections")}
            className="rounded-xl font-bold h-12 px-8 shadow-lg shadow-primary/10"
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="md:col-span-2 space-y-8">
          <Card className="border-border/50 shadow-xl shadow-secondary/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-secondary/10 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-xl font-medium">
                <Package className="text-primary" size={20} /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {(order.items || order.order_items || []).map((item, index) => (
                  <div
                    key={index}
                    className="p-6 flex gap-4 hover:bg-secondary/5 transition-colors"
                  >
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden border border-border/50 flex-shrink-0 bg-secondary/20">
                      <Image
                        src={
                          item.product?.thumbnail_image ||
                          item.variant?.product?.thumbnail_image ||
                          "/placeholder-image.png"
                        }
                        alt={
                          item.product?.name ||
                          item.variant?.product?.name ||
                          "Product"
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-medium text-foreground ">
                          {item.product?.name || item.variant?.product?.name}
                        </h4>
                        {item.variant && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {item.variant.option_values?.map((ov, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20"
                              >
                                {ov.value}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between w-full gap-2">
                        <p className="text-primary">
                          RS.{parseFloat(item.price).toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-muted-foreground font-bold tracking-wider">
                          QTY: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-xl shadow-secondary/20 rounded-3xl overflow-hidden">
            <CardHeader className="bg-secondary/10 border-b border-border/50">
              <CardTitle className="flex items-center gap-2 text-xl font-medium">
                <Truck className="text-primary" size={20} /> Shipping & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs  text-muted-foreground  ">
                    Customer Phone
                  </p>
                  <p className="font-medium">{order.customer_phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs  text-muted-foreground ">Order Date</p>
                  <p className="font-medium">
                    {new Date(order.created_at).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <p className="text-xs  text-muted-foreground  ">
                    Shipping Address
                  </p>
                  <p className="font-medium capitalize">
                    {order.shipping_address}, {order.city}
                  </p>
                </div>
                {order.note && (
                  <div className="sm:col-span-2 space-y-1 pt-2 border-t border-border/50">
                    <p className="text-xs  text-muted-foreground  t">Note</p>
                    <p className="text-sm font-medium  text-muted-foreground">
                      &quot;{order.note}&quot;
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-xl shadow-secondary/20 rounded-3xl overflow-hidden sticky top-8">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-lg  ">ORDER SUMMARY</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">
                    Subtotal
                  </span>
                  <span className="font-bold">
                    RS.
                    {(
                      parseFloat(order.total_amount) -
                      parseFloat(order.delivery_charge || "0")
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">
                    Delivery Fee
                  </span>
                  <span className="font-bold">
                    RS.
                    {parseFloat(order.delivery_charge || "0").toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-xs   text-muted-foreground ">
                      Total Amount
                    </span>
                    <span className="text-2xl  text-primary">
                      RS.
                      {parseFloat(order.total_amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <div className="p-3 bg-secondary/20 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px]   text-muted-foreground">
                      Payment Method
                    </span>
                    <span className="text-xs font-bold ">
                      {order.payment_type || "Cash on Delivery"}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-secondary/20 rounded-2xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px]   text-muted-foreground">
                      Order Status
                    </span>
                    <span className="text-xs font-bold  text-green-600">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export default OrderSuccessContent;
