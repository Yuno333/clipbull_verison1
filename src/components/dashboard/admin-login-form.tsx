"use client";

import { useState } from "react";
import { authenticateAdmin } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Lock, User, ArrowRight } from "lucide-react";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await authenticateAdmin(email, password);
      if (result.success) {
        window.location.reload(); // Refresh to let Server Component layout pick up the cookie
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch {
      setError("Something went error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,_rgba(124,58,237,0.05),_transparent_40%)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Shield size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-zinc-500">Please enter your credentials to access the platform core.</p>
        </div>

        <div className="bg-[#0a0a12] border border-white/[0.06] rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <User size={14} className="text-zinc-600" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-700 font-medium"
                placeholder="admin@clipbull.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Lock size={14} className="text-zinc-600" />
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-white/[0.02] border border-white/[0.08] rounded-xl px-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-zinc-700 font-medium"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)] gap-2 group cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600 font-medium uppercase tracking-widest">
          Secure Administrator Portal
        </p>
      </motion.div>
    </div>
  );
}
