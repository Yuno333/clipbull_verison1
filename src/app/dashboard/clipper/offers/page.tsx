"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Filter, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTitle } from "@/lib/title-context";

const ALL_NICHES = ["All", "Meme", "Politics", "Content Creation", "Crypto", "Finance", "General"];

interface Campaign {
  id: string;
  title: string;
  description: string;
  niche: string;
  cpm: number;
  budget: number;
  spent: number;
  max_clippers: number | null;
  clippers_joined: number;
}

export default function AvailableOffersPage() {
  const [niche, setNiche] = useState("All");
  const [minCpm, setMinCpm] = useState("");
  const [maxCpm, setMaxCpm] = useState("");
  const [offers, setOffers] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useTitle("Available Offers", "Browse campaigns matching your niche profile");

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      const supabase = createClient();
      
      const { data: userAuth } = await supabase.auth.getUser();
      const userId = userAuth.user?.id;

      // Fetch active campaigns
      let query = supabase
        .from('campaigns')
        .select('*')
        .eq('status', 'active');

      const { data, error } = await query;
      
      if (!error && data) {
        // Here we could filter out campaigns the clipper has already accepted
        // For simplicity in UI MVP, we'll just show all active
        setOffers(data as any);
      }
      setLoading(false);
    };

    fetchOffers();
  }, []);

  const filtered = offers.filter((o) => {
    if (niche !== "All" && o.niche !== niche) return false;
    if (minCpm && o.cpm < parseInt(minCpm)) return false;
    if (maxCpm && o.cpm > parseInt(maxCpm)) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 space-y-6">
        <div className="opacity-0 h-0 overflow-hidden absolute">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Available Offers</h1>
          <p className="text-zinc-400 text-sm">Browse campaigns matching your niche profile</p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Filter size={13} />
            Filter:
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_NICHES.map((n) => (
              <button
                key={n}
                onClick={() => setNiche(n)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                  niche === n
                    ? "bg-primary/15 border-primary/40 text-primary"
                    : "bg-white/5 border-white/8 text-zinc-400 hover:text-white hover:bg-white/8"
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-1">
            <input
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40"
              placeholder="Min ₦"
              value={minCpm}
              onChange={(e) => setMinCpm(e.target.value)}
              type="number"
            />
            <span className="text-zinc-600 text-xs">—</span>
            <input
              className="w-20 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/40"
              placeholder="Max ₦"
              value={maxCpm}
              onChange={(e) => setMaxCpm(e.target.value)}
              type="number"
            />
          </div>
        </motion.div>

        {/* Offer Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5">
                  {["Campaign", "Niche", "CPM", "Budget Left", "Clippers", "Action"].map((h) => (
                    <th key={h} className={`text-xs font-medium text-zinc-500 px-5 py-3.5 uppercase tracking-wider ${h === "Action" ? "text-center" : "text-left"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-zinc-500">
                      <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                      Loading offers...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-zinc-600 text-sm">
                      No offers match your filters
                    </td>
                  </tr>
                ) : (
                  filtered.map((o, i) => (
                    <motion.tr
                      key={o.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-white/2 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-white">{o.title}</div>
                        <div className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-xs">{o.description}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/8 px-2 py-1 rounded-md">
                          {o.niche}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-white font-semibold">₦{o.cpm.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="font-mono text-white text-xs">₦{(o.budget - o.spent).toLocaleString()}</div>
                        <div className="h-1 w-20 bg-white/8 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${Math.max(0, Math.min(100, ((o.budget - o.spent) / o.budget) * 100))}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-5 py-4 text-zinc-400 text-xs">
                        {o.clippers_joined || 0}{o.max_clippers ? `/${o.max_clippers}` : ""}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <Link
                          href={`/dashboard/clipper/offers/${o.id}`}
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-orange-300 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 px-3 py-1.5 rounded-lg transition-all"
                        >
                          View / Join
                          <ArrowRight size={12} />
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
