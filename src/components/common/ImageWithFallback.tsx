"use client";

import React, { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { getImageUrl } from "@/config/site";
import { Image as ImageIcon } from "lucide-react";
import { ImageManagerModal } from "@/components/builder/ImageManagerModal";
import { updateImageMap } from "@/services/image-service";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends ImageProps {
    fallbackSrc: string;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, fallbackSrc, alt, className, ...rest } = props;
    const initialSrc = typeof src === 'string' ? getImageUrl(src) : src;
    const [imgSrc, setImgSrc] = useState(initialSrc);
    const [showManager, setShowManager] = useState(false);
    const [managerTab, setManagerTab] = useState<"library" | "upload">("library");

    useEffect(() => {
        setImgSrc(typeof src === 'string' ? getImageUrl(src) : src);
    }, [src]);

    const handleImageSelect = async (newPath: string) => {
        if (!rest.id) return;

        try {
            await updateImageMap(rest.id, newPath);
            setImgSrc(getImageUrl(newPath));
            toast.success("Image updated successfully");
        } catch {
            toast.error("Failed to update image map");
        }
    };

    const isEditable = !!rest.id;

    const imageElement = (
        <Image
            {...rest}
            className={cn(className, isEditable ? "cursor-pointer" : "")}
            src={imgSrc}
            alt={alt}
            onClick={(e) => {
                if (rest.id) {
                    console.log("Image selected:", rest.id);
                }
                if (rest.onClick) {
                    rest.onClick(e);
                }
            }}
            onError={() => {
                if (imgSrc !== fallbackSrc) {
                    setImgSrc(fallbackSrc);
                }
            }}
        />
    );

    if (!isEditable) {
        return imageElement;
    }

    return (
        <div className={cn("relative group inline-block", props.fill ? "w-full h-full" : "")}>
            {imageElement}

            <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-40 cursor-pointer"
                onClick={() => {
                    setManagerTab("library");
                    setShowManager(true);
                }}
            >
                <div className="bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg hover:bg-white transition-colors">
                    <ImageIcon className="h-4 w-4 text-black" />
                    <span className="text-sm font-medium text-black">Change Image</span>
                </div>
            </div>

            <ImageManagerModal
                isOpen={showManager}
                onClose={() => setShowManager(false)}
                initialTab={managerTab}
                onSelect={handleImageSelect}
            />
        </div>
    );
};

export default ImageWithFallback;
