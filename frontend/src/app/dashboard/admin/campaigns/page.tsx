"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Megaphone, Eye, Pause, Play, CheckCircle, ExternalLink, Ban, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useTitle } from "@/lib/title-context";

interface AdmCampaign {
  id: string;
  name: string;
  creator: string;
  budget: number;
  spent: number;
  clips: number;
  impressions: number;
  status: string;
}

export default function CampaignsPage() {
  useTitle("Global Campaigns", "Monitor all active and historical campaigns across the platform.");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "active" | "paused" | "completed" | "pending">("all");
  const [campaigns, setCampaigns] = useState<AdmCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    setLoading(true);
    const supabase = createClient();
    
    // Fetch campaigns joined with profiles for creator name
    const { data, error } = await supabase
      .from('campaigns')
      .select(`
        id,
        title,
        budget,
        spent,
        impressions,
        status,
        profiles!creator_id ( username )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formatted = data.map((c: any) => ({
        id: c.id,
        name: c.title,
        creator: c.profiles?.username || "Unknown",
        budget: c.budget,
        spent: c.spent,
        clips: 0, // Placeholder
        impressions: c.impressions,
        status: c.status
      }));
      setCampaigns(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('campaigns')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: newStatus } : c));
    }
  };

  const filteredCampaigns = campaigns.filter(camp => {
    const matchesSearch = camp.name.toLowerCase().includes(search.toLowerCase()) || 
                         camp.creator.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || camp.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="opacity-0 h-0 overflow-hidden absolute">
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Global Campaigns</h1>
            <p className="text-zinc-400 text-sm">Monitor all active and historical campaigns across the platform.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex p-1 bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-x-auto">
              {(["all", "pending", "active", "paused", "completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all shrink-0",
                    activeTab === tab 
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                      : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Filter campaigns by name or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-all"
          />
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
             <div className="py-16 text-center text-zinc-500">
               <Loader2 size={32} className="animate-spin mx-auto mb-2" />
               Loading campaigns...
             </div>
          ) : filteredCampaigns.map((camp, i) => (
            <motion.div 
              key={camp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row lg:items-center gap-6"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      {camp.name}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-zinc-500">Created by <span className="text-zinc-300 font-medium">{camp.creator}</span></p>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md",
                    camp.status === 'active' ? 'text-emerald-400 bg-emerald-500/10' : 
                    camp.status === 'paused' ? 'text-amber-400 bg-amber-500/10' : 
                    camp.status === 'pending' ? 'text-blue-400 bg-blue-500/10' : 
                    'text-zinc-400 bg-white/5'
                  )}>
                    {camp.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Budget</div>
                    <div className="text-sm font-semibold text-white">₦{camp.budget?.toLocaleString() || 0}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Spent</div>
                    <div className="text-sm font-semibold text-zinc-300">₦{camp.spent?.toLocaleString() || 0}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Clips</div>
                    <div className="text-sm font-semibold text-zinc-300">{camp.clips}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold mb-1">Reach</div>
                    <div className="text-sm font-semibold text-cyan-400">{camp.impressions} <span className="text-[10px] text-zinc-600 ml-0.5">imps</span></div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="lg:w-48">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">Usage</span>
                  <span className="text-xs font-bold text-white">{camp.budget > 0 ? Math.round((camp.spent/camp.budget)*100) : 0}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${camp.budget > 0 ? Math.round((camp.spent/camp.budget)*100) : 0}%` }}
                    className="h-full bg-cyan-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                <button className="flex-1 lg:flex-none p-2.5 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                  <Eye size={18} />
                </button>

                {camp.status === 'pending' && (
                  <button onClick={() => updateStatus(camp.id, 'active')} className="flex-1 lg:flex-none p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/10">
                    <CheckCircle size={18} />
                  </button>
                )}

                {camp.status === 'active' ? (
                  <button onClick={() => updateStatus(camp.id, 'paused')} className="flex-1 lg:flex-none p-2.5 rounded-xl bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-all border border-amber-500/10">
                    <Pause size={18} />
                  </button>
                ) : camp.status === 'paused' ? (
                  <button onClick={() => updateStatus(camp.id, 'active')} className="flex-1 lg:flex-none p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all border border-emerald-500/10">
                    <Play size={18} />
                  </button>
                ) : null}

                {camp.status !== 'rejected' && (
                  <button onClick={() => updateStatus(camp.id, 'rejected')} className="flex-1 lg:flex-none p-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all border border-rose-500/10">
                    <Ban size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          {!loading && filteredCampaigns.length === 0 && (
             <div className="py-16 text-center text-zinc-600">
               No campaigns found matching your criteria.
             </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
