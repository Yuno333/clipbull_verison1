"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const cards = [
  "TUKKA — Where content goes to explode",
  "TUKKA — Distribution on demand",
  "Creators upload. Clippers spread. Your content goes viral.",
  "Grow faster without ads, agencies, or influencers",
  "Creators get reach. Clippers get paid. Everyone wins.",
];

export function VisionStack() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovering]);

  return (
    <section className="py-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
      {/* Subtle background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full opacity-20 pointer-events-none"
      />

      <div className="relative w-full max-w-md h-[200px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            whileHover={{
              scale: 1.02,
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
              "absolute inset-0 m-auto w-[90%] md:w-full h-full cursor-pointer",
              "rounded-2xl border border-white/10",
              "bg-[#0a0a12]",
              "flex items-center justify-center p-8 text-center"
            )}
          >
            <h3 className="text-xl md:text-2xl font-medium text-white tracking-wide leading-relaxed">
              {cards[index]}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Stack depth indicators — flat, no blur */}
        <div className="absolute top-4 left-4 right-4 bottom-[-16px] bg-white/[0.02] rounded-2xl border border-white/5 z-[-1] scale-95 opacity-50" />
        <div className="absolute top-8 left-8 right-8 bottom-[-32px] bg-white/[0.01] rounded-2xl border border-white/5 z-[-2] scale-90 opacity-20" />
      </div>
    </section>
  );
}
