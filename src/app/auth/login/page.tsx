"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { authenticateAdmin } from "@/lib/admin-actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);
    try {
      // 1. Check if it's the Admin logging in
      const adminAuth = await authenticateAdmin(email, password);
      if (adminAuth.success) {
        router.push("/dashboard/admin");
        return;
      }

      // 2. Otherwise default to Supabase
      const supabase = createClient();
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (data.user) {
        const role = data.user.user_metadata?.role || "creator";
        router.push(`/dashboard/${role}`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L8 6H4l4 4-2 8h4l2-4 2 4h4l-2-8 4-4h-4L12 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white">
              Clip<span className="text-primary">Bull</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-zinc-500">Log in to your ClipBull account</p>
        </div>

        {/* Card */}
        <div className="bg-[#0a0a12] border border-white/[0.06] rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#050508] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-400"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-[#050508] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm shadow-[0_0_30px_rgba(124,58,237,0.3)] gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Log in
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-sm text-zinc-600 text-center mt-8">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup?role=creator"
            className="text-primary hover:underline font-medium"
          >
            Sign up as Creator
          </Link>{" "}
          or{" "}
          <Link
            href="/auth/signup?role=clipper"
            className="text-primary hover:underline font-medium"
          >
            Clipper
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
