"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  TrendingUp,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

const roleContent = {
  creator: {
    title: "Start Growing",
    subtitle: "Launch your first campaign and watch your content go viral.",
    benefits: [
      {
        icon: TrendingUp,
        text: "Exponential reach across all platforms",
      },
      { icon: Users, text: "Access to thousands of vetted clippers" },
      { icon: Zap, text: "AI-powered content distribution" },
      {
        icon: DollarSign,
        text: "Only pay for verified impressions",
      },
    ],
    gradient: "from-purple-600 via-indigo-600 to-blue-600",
  },
  clipper: {
    title: "Start Earning",
    subtitle: "Get paid to distribute viral content across your socials.",
    benefits: [
      { icon: DollarSign, text: "Earn per verified impression" },
      { icon: TrendingUp, text: "Access premium creator content" },
      { icon: Zap, text: "Fast, transparent payments" },
      {
        icon: Users,
        text: "Join a community of top clippers",
      },
    ],
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
  },
};

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "clipper" ? "clipper" : "creator";

  const [role, setRole] = useState<"creator" | "clipper">(initialRole);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const r = searchParams.get("role");
    if (r === "clipper" || r === "creator") setRole(r);
  }, [searchParams]);

  const content = roleContent[role];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreed) {
      setError("Please agree to the terms");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            role: role,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        router.push(`/dashboard/${role}`);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative z-10">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
              <svg
                width="16"
                height="16"
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
            <span className="text-lg font-bold text-white">
              Clip<span className="text-primary">Bull</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">
            Create your account
          </h1>
          <p className="text-zinc-500 mb-8">
            Sign up as a{" "}
            <span className="text-primary font-medium capitalize">{role}</span>{" "}
            to get started
          </p>

          {/* Role Toggle */}
          <div className="flex gap-2 p-1 bg-[#0a0a12] rounded-xl border border-white/[0.06] mb-8">
            <button
              type="button"
              onClick={() => setRole("creator")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                role === "creator"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Creator
            </button>
            <button
              type="button"
              onClick={() => setRole("clipper")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                role === "clipper"
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Clipper
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#0a0a12] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                placeholder="e.g. clipmaster99"
              />
            </div>

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
                className="w-full h-12 px-4 rounded-xl bg-[#0a0a12] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-[#0a0a12] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                  placeholder="Min 6 characters"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-zinc-400 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[#0a0a12] border border-white/[0.08] text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                placeholder="Confirm your password"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-[#0a0a12] text-primary focus:ring-primary/25 cursor-pointer accent-[#7C3AED]"
              />
              <label htmlFor="terms" className="text-xs text-zinc-500 cursor-pointer">
                I agree to ClipBull&apos;s{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
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
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          <p className="text-sm text-zinc-600 text-center mt-8">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-[0.06]`}
        />
        <motion.div
          key={role}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-md px-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          <p className="text-zinc-400 mb-10 text-lg">{content.subtitle}</p>

          <div className="space-y-5">
            {content.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <benefit.icon size={18} className="text-primary" />
                </div>
                <span className="text-sm text-zinc-300">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-8 pt-8 border-t border-white/[0.06]">
            <div>
              <div className="text-2xl font-bold text-white">10M+</div>
              <div className="text-[11px] text-zinc-600 uppercase tracking-wider">
                Impressions
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-[11px] text-zinc-600 uppercase tracking-wider">
                Clippers
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">₦2M+</div>
              <div className="text-[11px] text-zinc-600 uppercase tracking-wider">
                Paid out
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
