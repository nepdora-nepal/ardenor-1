"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  limit?: number;
}

export default function ProductGridSkeleton({ limit = 4 }: Props) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: limit || 5 }).map((_, i) => (
            <div key={i} className="group">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
