"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useTranslation } from "@/i18n/LanguageContext";

interface BlogLikeButtonProps {
  blogId: string;
  initialLikes?: number;
}

export default function BlogLikeButton({
  blogId,
  initialLikes = 0,
}: BlogLikeButtonProps) {
  const { isRtl, language } = useTranslation();
  const [likes, setLikes] = useState<number>(initialLikes);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showBurst, setShowBurst] = useState<boolean>(false);

  const isAr = language === "ar";
  const storageKey = `liked_blog_${blogId}`;

  // Read like state from localStorage on mount and fetch fresh count
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === "true") {
        setHasLiked(true);
      }
    } catch {
      // localStorage may be disabled in private browsing
    }

    // Fetch live like count from server
    fetch(`/api/blogs/${encodeURIComponent(blogId)}/like`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.likes === "number") {
          setLikes(data.likes);
        }
      })
      .catch(() => {});
  }, [blogId, storageKey]);

  const handleToggleLike = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const willLike = !hasLiked;
    const increment = willLike ? 1 : -1;
    const optimisticLikes = Math.max(0, likes + increment);

    // Optimistic UI update
    setHasLiked(willLike);
    setLikes(optimisticLikes);

    if (willLike) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 900);
    }

    try {
      if (willLike) {
        localStorage.setItem(storageKey, "true");
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignore localStorage error
    }

    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(blogId)}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: willLike ? "like" : "unlike", increment }),
      });

      if (res.ok) {
        const data = await res.json();
        if (typeof data.likes === "number") {
          setLikes(data.likes);
        }
      } else {
        // Rollback on failure
        setHasLiked(!willLike);
        setLikes(likes);
      }
    } catch (error) {
      console.warn("Failed to sync like with server:", error);
      // Rollback on network failure
      setHasLiked(!willLike);
      setLikes(likes);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full my-12 p-6 sm:p-8 rounded-3xl bg-[#0f1118]/90 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/10 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 blur-[80px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Callout copy */}
        <div className="flex flex-col text-center sm:text-start">
          <h3
            className={`text-lg sm:text-xl font-medium text-white mb-1.5 ${
              isRtl ? "tracking-normal" : "tracking-tight"
            }`}
          >
            {isAr
              ? "هل أعجبك هذا المقال والشرح التقني؟"
              : "Did you find this article insightful?"}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            {isAr
              ? "اضغط على زر الإعجاب لتشجيعنا على كتابة المزيد من المقالات الهندسية بدون أي تسجيل."
              : "Leave a quick like to support free technical engineering write-ups. No sign-in required!"}
          </p>
        </div>

        {/* The Animated Like Button Container */}
        <div className="relative flex items-center">
          {/* Floating burst particles */}
          <AnimatePresence>
            {showBurst && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 1.2,
                      x: Math.cos((deg * Math.PI) / 180) * 45,
                      y: Math.sin((deg * Math.PI) / 180) * 45,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute text-rose-400 text-xs"
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={handleToggleLike}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label={hasLiked ? "Unlike article" : "Like article"}
            className={`relative flex items-center gap-3 px-6 py-3.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300 shadow-xl cursor-pointer ${
              hasLiked
                ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/25 ring-2 ring-rose-400/40"
                : "bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-rose-400/40"
            }`}
          >
            {/* Heart Icon with spring bounce */}
            <motion.div
              animate={hasLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className="text-xl sm:text-2xl"
            >
              {hasLiked ? (
                <IoHeart className="text-white drop-shadow-md" />
              ) : (
                <IoHeartOutline className="text-rose-400 group-hover:text-rose-300" />
              )}
            </motion.div>

            {/* Label */}
            <span className="font-normal">
              {hasLiked
                ? isAr
                  ? "أعجبك المقال"
                  : "Liked"
                : isAr
                ? "إعجاب"
                : "Like"}
            </span>

            {/* Live Count Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
                hasLiked
                  ? "bg-white/25 text-white"
                  : "bg-white/10 text-neutral-300"
              }`}
            >
              {likes}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
