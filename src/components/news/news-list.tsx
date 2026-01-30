"use client";

import React from "react";
import { useBlogs } from "@/hooks/use-blogs";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NewsList() {
  const { data: blogsData, isLoading } = useBlogs();
  const blogs = blogsData?.results || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {[1, 2, 3, 4, 5, 6].map((i) => (
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

  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-500 font-light tracking-widest  text-[10px]">
          No stories available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
      {blogs.map((blog, index) => (
        <motion.div
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/news/${blog.slug}`} className="block">
            <div className="aspect-[4/5] overflow-hidden mb-8 relative">
              <Image
                src={blog.thumbnail_image || "/placeholder-blog.jpg"}
                alt={blog.title}
                fill
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
  );
}
