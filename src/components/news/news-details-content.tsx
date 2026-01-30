"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight } from "lucide-react";

import { BlogPost } from "@/types/blog";

interface BlogDetailContentProps {
  blog: BlogPost;
}

export default function BlogDetailContent({ blog }: BlogDetailContentProps) {
  return (
    <article className="max-w-5xl mx-auto px-10">
      {/* Breadcrumbs & Category */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center space-x-2 text-[10px]   font-bold text-neutral-400">
          <Link href="/news" className="hover:text-black transition-colors">
            News
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-neutral-600">{blog.title}</span>
        </div>
        <div className="text-[10px]   font-bold text-neutral-400">
          {blog.tags?.[0]?.name || "Collections & Campaigns"}
        </div>
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-7xl md:text-8xl  mb-16 tracking-tight leading-[1.1]"
      >
        {blog.title}
      </motion.h1>

      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="relative aspect-[16/9] mb-16 overflow-hidden bg-neutral-100"
      >
        <Image
          src={blog.thumbnail_image || "/placeholder-blog.jpg"}
          alt={blog.thumbnail_image_alt_description || blog.title}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
          priority
        />
      </motion.div>

      {/* Meta Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/10 pb-12 mb-16 space-y-8 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-neutral-100 border border-neutral-100">
            <Image
              src="/placeholder-avatar.jpg"
              alt="Author"
              fill
              className="object-cover grayscale"
            />
          </div>
          <div>
            <h4 className="text-[10px]   font-bold">
              {blog.author
                ? `${blog.author.first_name} ${blog.author.last_name}`
                : "Fashion Editor"}
            </h4>
            <p className="text-[10px]  tracking-[0.1em] text-neutral-400">
              Sofia Maren
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 h-3 text-neutral-300" />
            <span className="text-[10px]   font-bold text-neutral-500">
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-3 h-3 text-neutral-300" />
            <span className="text-[10px]   font-bold text-neutral-500">
              {blog.time_to_read || "7 min"} read
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="prose prose-neutral max-w-none prose-h2: prose-h2:text-4xl prose-h2:tracking-tight prose-p:text-lg prose-p:font-light prose-p:leading-relaxed prose-p:opacity-80 blog-content-rich"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
