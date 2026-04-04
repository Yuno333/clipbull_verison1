"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  delta?: number; // percent change e.g. +12 or -5
  iconColor?: string;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  iconColor = "text-primary",
  delay = 0,
  prefix = "",
  suffix = "",
}: KpiCardProps) {
  const isPositive = delta !== undefined && delta > 0;
  const isNegative = delta !== undefined && delta < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className="group relative bg-[#0a0a0a] border border-white/6 rounded-2xl p-5 hover:border-white/12 hover:bg-[#0d0d0d] transition-all duration-300 overflow-hidden"
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-white font-mono tracking-tight">
            {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
          </p>
          {delta !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                isPositive && "text-emerald-400",
                isNegative && "text-red-400",
                !isPositive && !isNegative && "text-zinc-500"
              )}
            >
              {isPositive && <TrendingUp size={11} />}
              {isNegative && <TrendingDown size={11} />}
              {!isPositive && !isNegative && <Minus size={11} />}
              {delta > 0 ? "+" : ""}{delta}% vs last month
            </div>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/8 shrink-0",
            iconColor
          )}
        >
          <Icon size={18} className={iconColor} />
        </div>
      </div>
    </motion.div>
  );
}
