"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useValidatePromoCode } from "@/hooks/use-promo-code-validate";
import { PromoCode } from "@/types/promo-code-validate";
import { toast } from "sonner";
import { X, Check } from "lucide-react";

interface PromoCodeInputProps {
    onPromoCodeApplied: (promoCode: PromoCode | null) => void;
    appliedPromoCode: PromoCode | null;
}

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({
    onPromoCodeApplied,
    appliedPromoCode,
}) => {
    const [promoCode, setPromoCode] = useState("");
    const validatePromoCodeMutation = useValidatePromoCode();

    const handleApplyPromoCode = async () => {
        if (!promoCode.trim()) {
            toast.error("Please enter a promo code");
            return;
        }

        try {
            const response = await validatePromoCodeMutation.mutateAsync({
                code: promoCode,
            });

            if (response.valid && response.promo_code) {
                onPromoCodeApplied(response.promo_code);
                toast.success("Promo code applied successfully!");
                setPromoCode("");
            } else {
                toast.error(response.message || "Invalid promo code");
            }
        } catch (error) {
            console.error("Promo code validation failed:", error);
            toast.error("Failed to validate promo code");
        }
    };

    const handleRemovePromoCode = () => {
        onPromoCodeApplied(null);
        toast.info("Promo code removed");
    };

    return (
        <div className="space-y-3">
            {!appliedPromoCode ? (
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        onClick={handleApplyPromoCode}
                        disabled={validatePromoCodeMutation.isPending}
                        variant="outline"
                        className="mt-1 flex-none"
                    >
                        {validatePromoCodeMutation.isPending ? "Validating..." : "Apply"}
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1 rounded-full">
                            <Check className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-primary">{appliedPromoCode.code}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                                {appliedPromoCode.discount_percentage}% Discount Applied
                            </p>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemovePromoCode}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
};