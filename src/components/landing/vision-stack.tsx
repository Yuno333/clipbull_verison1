"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const cards = [
  "ClipBull — Where content goes to explode",
  "ClipBull — Distribution on demand",
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
      {/* Background Soft Lighting - Purple */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/15 blur-[120px] rounded-full opacity-30 pointer-events-none mix-blend-screen animate-glow-pulse"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 blur-[80px] rounded-full opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md h-[200px] flex items-center justify-center perspective-[1000px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, scale: 1.1, filter: "blur(10px)" }}
            whileHover={{
              scale: 1.05,
              rotateX: 5,
              boxShadow: "0 20px 40px rgba(124,58,237,0.2)",
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={cn(
              "absolute inset-0 m-auto w-[90%] md:w-full h-full cursor-pointer",
              "rounded-2xl border border-primary/20 shadow-[0_8px_32px_0_rgba(124,58,237,0.15)]",
              "bg-white/5 backdrop-blur-xl",
              "flex items-center justify-center p-8 text-center",
              "ring-1 ring-primary/10"
            )}
          >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-t-2xl" />
            <h3 className="text-xl md:text-2xl font-medium text-white tracking-wide leading-relaxed drop-shadow-sm">
              {cards[index]}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Stack Depth Effect */}
        <div className="absolute top-4 left-4 right-4 bottom-[-16px] bg-primary/5 rounded-2xl border border-primary/5 z-[-1] scale-95 opacity-50 backdrop-blur-sm" />
        <div className="absolute top-8 left-8 right-8 bottom-[-32px] bg-primary/5 rounded-2xl border border-primary/5 z-[-2] scale-90 opacity-20 backdrop-blur-sm" />
      </div>
    </section>
  );
}
