"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { CreateOrderRequest, OrderItem } from "@/types/orders";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { checkoutFormSchema, CheckoutFormValues } from "@/schemas/chekout.form";
import { PromoCodeInput } from "@/components/product/PromoCodeInput";
import { PromoCode } from "@/types/promo-code-validate";
import { useDeliveryChargeCalculator } from "@/hooks/use-delivery-charge-calculator";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutSuccessSkeleton = () => (
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

const CheckoutContent = () => {
    const router = useRouter();
    const { cartItems, totalPrice, clearCart } = useCart();
    const createOrderMutation = useCreateOrder();
    const { user, isAuthenticated } = useAuth();
    const [appliedPromoCode, setAppliedPromoCode] = useState<PromoCode | null>(
        null,
    );
    const [openBillingCity, setOpenBillingCity] = useState(false);
    const [openShippingCity, setOpenShippingCity] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            customer_name: user?.first_name
                ? `${user.first_name} ${user.last_name || ""}`.trim()
                : "",
            customer_email: user?.email || "",
            customer_phone: user?.phone || "",
            customer_address: user?.address || "",
            city: "",
            shipping_address: "",
            shipping_city: "",
            same_as_customer_address: true,
            note: "",
        },
        mode: "onChange",
    });

    const sameAsCustomerAddress = watch("same_as_customer_address");
    const cityDistrict = watch("city");
    const shippingCityDistrict = watch("shipping_city");

    // Calculate total weight from cart items
    const totalWeight = cartItems.reduce((total, item) => {
        const itemWeight = parseFloat(item.product.weight || "0");
        return total + itemWeight * item.quantity;
    }, 0);

    // Use delivery charge calculator
    const {
        deliveryCharge,
        citiesDistricts,
        isLoading: isLoadingDeliveryCharges,
        searchQuery,
        setSearchQuery,
    } = useDeliveryChargeCalculator({
        selectedCityDistrict: sameAsCustomerAddress
            ? cityDistrict
            : shippingCityDistrict || cityDistrict,
        totalWeight,
    });

    // Calculate subtotal
    const subtotalAmount = totalPrice;

    // Calculate discount
    const discountAmount = appliedPromoCode
        ? (subtotalAmount * Number(appliedPromoCode.discount_percentage)) / 100
        : 0;

    // Calculate total after discount and delivery charge
    const totalAmount = subtotalAmount - discountAmount + deliveryCharge;

    const handlePromoCodeApplied = (promoCode: PromoCode | null) => {
        setAppliedPromoCode(promoCode);
    };

    const onSubmit = async (data: CheckoutFormValues) => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        try {
            const orderItems: OrderItem[] = cartItems.map((item) => {
                if (item.selectedVariant?.id) {
                    return {
                        variant_id: item.selectedVariant.id,
                        quantity: item.quantity,
                        price: item.selectedVariant.price,
                    };
                } else {
                    return {
                        product_id: item.product.id,
                        quantity: item.quantity,
                        price: item.product.price.toString(),
                    };
                }
            });

            const orderData: CreateOrderRequest = {
                customer_name: data.customer_name,
                customer_email: data.customer_email,
                customer_phone: data.customer_phone,
                customer_address: data.customer_address,
                city: data.city,
                shipping_address: data.same_as_customer_address
                    ? data.customer_address
                    : data.shipping_address || "",
                shipping_city: data.same_as_customer_address
                    ? data.city
                    : data.shipping_city || "",
                total_amount: totalAmount.toFixed(2),
                delivery_charge: deliveryCharge.toFixed(2),
                items: orderItems,
                payment_type: "cod",
                ...(data.note && { note: data.note }),
                ...(appliedPromoCode && {
                    promo_code: appliedPromoCode.id,
                    discount_amount: discountAmount.toFixed(2),
                }),
            };

            const order = await createOrderMutation.mutateAsync({
                orderData,
                includeToken: isAuthenticated,
            });

            setIsOrderPlaced(true);
            toast.success("Order placed successfully! Pay on delivery.");
            clearCart();
            router.push(`/checkout/success/${order.id}`); // Redirect to success page
        } catch (error) {
            console.error("Order creation failed:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    const OrderSummaryContent = () => (
        <div className="space-y-4">
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {cartItems.map((item, index) => {
                    const displayPrice =
                        item.selectedVariant?.price || item.product.price;
                    const cartItemKey = `${item.product.id}-${item.selectedVariant?.id || "no-variant"}-${index}`;

                    return (
                        <div
                            key={cartItemKey}
                            className="flex gap-4 border-b border-gray-100 pb-4 last:border-b-0"
                        >
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border">
                                <Image
                                    src={item.product.thumbnail_image || ""}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h4 className="text-sm leading-tight font-medium line-clamp-1">
                                        {item.product.name}
                                    </h4>

                                    {item.selectedVariant &&
                                        item.selectedVariant.option_values && (
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                {Object.entries(item.selectedVariant.option_values).map(
                                                    ([optionName, optionValue]) => (
                                                        <Badge
                                                            key={optionName}
                                                            variant="secondary"
                                                            className="px-1 text-[10px] capitalize bg-primary/5 text-primary border-none"
                                                        >
                                                            {optionName}: {optionValue}
                                                        </Badge>
                                                    ),
                                                )}
                                            </div>
                                        )}

                                    <p className="mt-1 text-[10px] text-muted-foreground font-bold">
                                        QTY: {item.quantity}
                                    </p>
                                </div>

                                <div className="mt-1 flex items-end justify-between">
                                    <div className="text-xs font-bold text-foreground">
                                        RS.
                                        {(Number(displayPrice) * item.quantity).toLocaleString(
                                            "en-IN",
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Separator />

            <PromoCodeInput
                onPromoCodeApplied={handlePromoCodeApplied}
                appliedPromoCode={appliedPromoCode}
            />

            <Separator />

            <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Subtotal</span>
                    <span className="font-bold">
                        Rs.{Number(subtotalAmount).toLocaleString("en-IN")}
                    </span>
                </div>

                {appliedPromoCode && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground font-medium">
                            Discount ({appliedPromoCode.discount_percentage}%)
                        </span>
                        <span className="font-bold text-green-600">
                            -Rs.{Number(discountAmount).toLocaleString("en-IN")}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Delivery</span>
                    <span className="font-bold">
                        Rs.{Number(deliveryCharge).toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
                <span className="text-lg  font-bold">Total</span>
                <div className="text-right">
                    <span className="text-lg  font-bold text-primary">
                        Rs.{Number(totalAmount).toLocaleString("en-IN")}
                    </span>
                </div>
            </div>

            <div className="pt-4">
                <div className="flex items-center gap-2 p-3 border-2 border-primary bg-primary/5 rounded-xl mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Check size={16} />
                    </div>
                    <div>
                        <p className="font-bold text-xs  tracking-wider">
                            Cash on Delivery
                        </p>
                        <p className="text-[10px] text-muted-foreground font-medium">
                            Pay when you receive
                        </p>
                    </div>
                </div>

                <Button
                    type="submit"
                    form="checkout-form"
                    className="w-full h-14 rounded-xl text-lg  shadow-lg shadow-primary/10 transition-transform active:scale-[0.98]"
                    disabled={isSubmitting || createOrderMutation.isPending}
                >
                    {isSubmitting || createOrderMutation.isPending
                        ? "Processing..."
                        : `PLACE ORDER`}
                </Button>
            </div>
        </div>
    );

    if (isOrderPlaced) {
        return <CheckoutSuccessSkeleton />;
    }

    if (cartItems.length === 0) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center px-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">
                    Add components to your cart to see them here.
                </p>
                <Button onClick={() => router.push("/collections")}>
                    Return to Shop
                </Button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="mb-12">
                <h1 className="text-4xl  text-foreground">Checkout</h1>
            </div>

            <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3">
                {/* Shipping Information */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-none bg-transparent">
                        <CardHeader className="px-0 pt-0">
                            <CardTitle className="text-2xl font-bold">
                                Shipping Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <form
                                id="checkout-form"
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="customer_name"
                                            className="text-xs   tracking-widest text-muted-foreground"
                                        >
                                            Full Name
                                        </Label>
                                        <Input
                                            id="customer_name"
                                            placeholder="Enter your full name"
                                            className="h-12 rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors"
                                            {...register("customer_name")}
                                        />
                                        {errors.customer_name && (
                                            <p className="text-xs font-bold text-destructive">
                                                {errors.customer_name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="customer_email"
                                            className="text-xs   tracking-widest text-muted-foreground"
                                        >
                                            Email
                                        </Label>
                                        <Input
                                            id="customer_email"
                                            type="email"
                                            placeholder="your@email.com"
                                            className="h-12 rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors"
                                            {...register("customer_email")}
                                        />
                                        {errors.customer_email && (
                                            <p className="text-xs font-bold text-destructive">
                                                {errors.customer_email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="customer_phone"
                                            className="text-xs   tracking-widest text-muted-foreground"
                                        >
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="customer_phone"
                                            placeholder="98********"
                                            className="h-12 rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors"
                                            {...register("customer_phone")}
                                        />
                                        {errors.customer_phone && (
                                            <p className="text-xs font-bold text-destructive">
                                                {errors.customer_phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs   tracking-widest text-muted-foreground">
                                            City/District
                                        </Label>
                                        <Popover
                                            open={openBillingCity}
                                            onOpenChange={setOpenBillingCity}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openBillingCity}
                                                    className={cn(
                                                        "w-full h-12 justify-between rounded-xl border-border bg-secondary/30 font-medium",
                                                        !cityDistrict && "text-muted-foreground",
                                                    )}
                                                    disabled={isSubmitting || isLoadingDeliveryCharges}
                                                >
                                                    {cityDistrict || "Select city/district"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl"
                                                align="start"
                                            >
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search..."
                                                        value={searchQuery}
                                                        onValueChange={setSearchQuery}
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty>No results found.</CommandEmpty>
                                                        <CommandGroup className="max-h-64 overflow-auto">
                                                            {citiesDistricts.map((city) => (
                                                                <CommandItem
                                                                    key={city}
                                                                    value={city}
                                                                    onSelect={() => {
                                                                        setValue("city", city);
                                                                        setOpenBillingCity(false);
                                                                        setSearchQuery("");
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            cityDistrict === city
                                                                                ? "opacity-100"
                                                                                : "opacity-0",
                                                                        )}
                                                                    />
                                                                    {city}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        {errors.city && (
                                            <p className="text-xs font-bold text-destructive">
                                                {errors.city.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="customer_address"
                                        className="text-xs   tracking-widest text-muted-foreground"
                                    >
                                        Full Address
                                    </Label>
                                    <Textarea
                                        id="customer_address"
                                        placeholder="Area, Street, House No."
                                        className="rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors min-h-[100px]"
                                        {...register("customer_address")}
                                    />
                                    {errors.customer_address && (
                                        <p className="text-xs font-bold text-destructive">
                                            {errors.customer_address.message}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2 bg-secondary/20 p-4 rounded-xl">
                                    <Checkbox
                                        id="same_as_customer_address"
                                        checked={sameAsCustomerAddress}
                                        onCheckedChange={(checked) =>
                                            setValue("same_as_customer_address", checked === true)
                                        }
                                    />
                                    <Label
                                        htmlFor="same_as_customer_address"
                                        className="text-sm font-bold cursor-pointer"
                                    >
                                        Shipping address same as billing
                                    </Label>
                                </div>

                                {!sameAsCustomerAddress && (
                                    <div className="space-y-6 animate-in slide-in-from-top-2">
                                        <div className="space-y-2">
                                            <Label className="text-xs   tracking-widest text-muted-foreground">
                                                Shipping City/District
                                            </Label>
                                            <Popover
                                                open={openShippingCity}
                                                onOpenChange={setOpenShippingCity}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-full h-12 justify-between rounded-xl border-border bg-secondary/30 font-medium",
                                                            !shippingCityDistrict && "text-muted-foreground",
                                                        )}
                                                    >
                                                        {shippingCityDistrict || "Select shipping city"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search..."
                                                            value={searchQuery}
                                                            onValueChange={setSearchQuery}
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>No results found.</CommandEmpty>
                                                            <CommandGroup className="max-h-64 overflow-auto">
                                                                {citiesDistricts.map((city) => (
                                                                    <CommandItem
                                                                        key={city}
                                                                        value={city}
                                                                        onSelect={() => {
                                                                            setValue("shipping_city", city);
                                                                            setOpenShippingCity(false);
                                                                            setSearchQuery("");
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                shippingCityDistrict === city
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0",
                                                                            )}
                                                                        />
                                                                        {city}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="shipping_address"
                                                className="text-xs   tracking-widest text-muted-foreground"
                                            >
                                                Shipping Address
                                            </Label>
                                            <Textarea
                                                id="shipping_address"
                                                placeholder="Enter your shipping address"
                                                className="rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors min-h-[100px]"
                                                {...register("shipping_address")}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="note"
                                        className="text-xs   tracking-widest text-muted-foreground"
                                    >
                                        Order Notes (Optional)
                                    </Label>
                                    <Textarea
                                        id="note"
                                        placeholder="Instructions for delivery..."
                                        className="rounded-xl border-border bg-secondary/30 focus:bg-background transition-colors"
                                        {...register("note")}
                                    />
                                    <p className="text-[10px] text-right font-bold text-muted-foreground ">
                                        {watch("note")?.length || 0} / 500
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Desktop: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <Card className="rounded-3xl border-border/50 shadow-xl shadow-secondary/20 overflow-hidden">
                            <CardHeader className="bg-secondary/20 border-b border-border/50">
                                <CardTitle className="text-xl font-bold">
                                    Order Summary
                                </CardTitle>
                                <CardDescription className="font-medium">
                                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <OrderSummaryContent />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutContent;