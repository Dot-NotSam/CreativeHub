"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mimic API delay
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-foreground grid-bg flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 pointer-events-none radial-glow z-0" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2 mb-8 group z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-white font-black shadow-lg">
          CH
        </div>
        <div className="text-left">
          <h1 className="text-md font-bold tracking-tight text-white leading-none">
            CreativeHub
          </h1>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Prototype Authentication
          </span>
        </div>
      </Link>

      {/* Login Box */}
      <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-card-border p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-white">Welcome back</h2>
          <p className="text-xs text-muted-foreground mt-1">Enter your details to sign in</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-xs font-bold text-black transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-card-border/60"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">
            <span className="bg-[#09090b] px-3">or Demo evaluation</span>
          </div>
        </div>

        {/* Demo Fast Login Trigger */}
        <button
          onClick={handleDemoLogin}
          type="button"
          className="w-full p-4 rounded-xl bg-primary/10 border border-primary/20 hover:border-primary/40 text-left flex items-start gap-3.5 group transition-all"
        >
          <div className="h-9 w-9 rounded-full bg-primary/20 text-accent flex items-center justify-center shrink-0">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              One-click Evaluator Login
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </h4>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
              Login immediately as **Alex Mercer (Creative Dev)** with preloaded connections, jobs, and portfolios.
            </p>
          </div>
        </button>

        <div className="text-center mt-6 pt-4 border-t border-card-border/40">
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
