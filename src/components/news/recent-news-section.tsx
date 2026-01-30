"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRecentBlogs } from "@/hooks/use-blogs";
import { motion } from "framer-motion";

interface RecentBlogsSectionProps {
  currentBlogId?: number;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentBlogs?: any[];
  isLoading?: boolean;
}

export default function RecentBlogsSection({
  currentBlogId,
  recentBlogs: initialBlogs,
  isLoading: initialLoading,
}: RecentBlogsSectionProps) {
  const { data: hookBlogs, isLoading: hookLoading } = useRecentBlogs();
  const blogs = initialBlogs || hookBlogs || [];
  const isLoading = initialLoading || hookLoading;

  // Filter current blog & take top 3
  const displayBlogs = blogs
    .filter((blog) => blog.id !== currentBlogId)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-neutral-100 mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-neutral-100 w-32" />
              <div className="h-8 bg-neutral-100 w-full" />
              <div className="h-16 bg-neutral-100 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!displayBlogs.length) return null;

  return (
    <div className="max-w-5xl mx-auto px-10 pt-60">
      <h2 className="text-7xl md:text-8xl  mb-3 tracking-tight leading-[1.1]">
        Continue Reading
      </h2>
      <p className="text-[10px]   font-bold text-neutral-400 mb-10">
        Discover new perspectives, inspirations, and reflections, a closer look
        into the world and rhythm of Verin.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20 ">
        {displayBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/blog/${blog.slug}`} className="block">
              <div className="mb-3">
                <Image
                  src={blog.thumbnail_image || "/images/placeholder.svg"}
                  alt={blog.title}
                  height={400}
                  width={400}
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[8px]   font-bold">
                    {blog.tags?.[0]?.name || "Story"}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-[10px]   font-bold text-neutral-400">
                    {new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <span className="text-[10px]   font-bold text-neutral-400">
                    {blog.time_to_read || "5 min"} read
                  </span>
                </div>
                <h2 className="text-2xl  group-hover:italic transition-all duration-300 leading-tight">
                  {blog.title}
                </h2>
                <p className="text-sm text-neutral-500 line-clamp-2 font-light leading-relaxed">
                  {blog.meta_description}
                </p>
                <div className="pt-2">
                  <span className="text-[10px]   font-bold border-b border-black/10 pb-1 group-hover:border-black transition-colors">
                    Read Story
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
