"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "speed",
    label: "Visual Complexity",
    left: "Minimal",
    right: "Balanced",
    icon: Zap,
    color: "text-primary",
  },
  {
    id: "reach",
    label: "Interactions",
    left: "Simple",
    right: "Complex",
    icon: Globe,
    color: "text-primary",
  },
  {
    id: "moderation",
    label: "Tone",
    left: "Casual",
    right: "Professional",
    icon: Shield,
    color: "text-primary",
  },
  {
    id: "analytics",
    label: "Payout",
    left: "Fixed",
    right: "Crescendo",
    icon: BarChart3,
    color: "text-primary",
  },
];

export function FeatureEvolution() {
  const [levels, setLevels] = useState<Record<string, number>>({
    speed: 65,
    reach: 40,
    moderation: 80,
    analytics: 55,
  });

  const handleSliderChange = (id: string, value: string) => {
    setLevels((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <section className="py-16 px-4 bg-transparent relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Refine Your Style
          </h2>
          <p className="text-muted-foreground">
            Adjust the parameters to match your brand&apos;s voice.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Controls */}
          <div className="space-y-8">
            {features.map((feature) => (
              <div key={feature.id} className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span
                    className={cn(
                      "transition-colors",
                      levels[feature.id] < 50
                        ? "text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    {feature.left}
                  </span>
                  <span
                    className={cn(
                      "transition-colors",
                      levels[feature.id] > 50
                        ? feature.color
                        : "text-muted-foreground"
                    )}
                  >
                    {feature.right}
                  </span>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-300 bg-gradient-to-r from-primary to-primary-light rounded-full"
                    style={{ width: `${levels[feature.id]}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={levels[feature.id]}
                    onChange={(e) =>
                      handleSliderChange(feature.id, e.target.value)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label={feature.label}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow pointer-events-none transition-all duration-300"
                    style={{
                      left: `calc(${levels[feature.id]}% - 8px)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preview Card */}
          <div className="relative">

            <div className="relative bg-[#0a0a12] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-primary-light to-transparent opacity-40" />

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600" />
                  <div>
                    <div className="h-3 w-24 bg-white/10 rounded mb-1.5" />
                    <div className="h-2 w-16 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 bg-green-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-3 w-full bg-white/[0.06] rounded" />
                  <div className="h-3 w-3/4 bg-white/[0.06] rounded" />
                  <div className="h-3 w-1/2 bg-white/[0.06] rounded" />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      Shares
                    </div>
                    <div className="text-lg font-bold text-white">
                      {(levels.speed * 65).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      Views
                    </div>
                    <div className="text-lg font-bold text-white">
                      {(levels.reach * 3200).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">
                      Earned
                    </div>
                    <div className="text-lg font-bold text-primary">
                      ${(levels.analytics * 8.5).toFixed(0)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg border border-white/5 bg-black/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield
                      size={16}
                      className={
                        levels.moderation > 60
                          ? "text-green-500"
                          : "text-gray-500"
                      }
                    />
                    <span className="text-xs text-muted-foreground">
                      Fraud Protection
                    </span>
                  </div>
                  <span className="text-xs font-medium text-white">
                    {levels.moderation > 80
                      ? "AI Active (99.9%)"
                      : levels.moderation > 40
                      ? "Standard"
                      : "Basic"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
