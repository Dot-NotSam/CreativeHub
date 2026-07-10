"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Compass, Users, Sparkles, Database, Cloud, Zap, Check, Briefcase } from "lucide-react";
import Logo from "@/components/shared/logo";

export default function LandingPage() {
  const { isAuthenticated, loginAsDemo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleDemoClick = () => {
    loginAsDemo();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-foreground grid-bg relative flex flex-col justify-between overflow-x-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-gradient from-primary/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[350px] -right-[200px] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* Landing Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full glass-nav px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo className="h-9 w-9 group-hover:scale-105 transition-transform duration-300" />
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-none">
              CreativeHub
            </h1>
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
              Creatives Network
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-xs font-bold text-black transition-all shadow-md shadow-white/5 hover:scale-[1.02]"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto pt-20 pb-16">
        {/* Onboarding announcement badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-accent font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          Professional Networking Platform for Creative Professionals
        </div>

        {/* Hero Title */}
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Where Creatives <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-indigo-400">
            Network & Showcase
          </span> Their Craft.
        </h2>

        {/* Hero Subtitle */}
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed mb-10">
          The premium networking platform engineered specifically for UI/UX designers, 3D artists, illustrators, motion designers, and creative developers. Build connections, display assets, and discover opportunities.
        </p>

        {/* Hero CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 w-full sm:w-auto">
          <button
            onClick={handleDemoClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary/95 text-xs font-bold text-white transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] cursor-pointer"
          >
            Continue as Demo
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-zinc-900 border border-card-border hover:bg-zinc-800 text-xs font-bold text-white transition-all hover:scale-[1.02] text-center"
          >
            Create Free Account
          </Link>
        </div>

        {/* Mock UI layout frame preview */}
        <div className="w-full border-t border-card-border pt-12 text-left">
          <div className="relative h-60 sm:h-96 w-full rounded-xl overflow-hidden mt-2 bg-[#050505] flex items-center justify-center">
            {/* Overlay of visual graphic */}
            <div className="absolute inset-0 grid grid-cols-3 gap-3 p-4 opacity-70">
              <div className="rounded-lg bg-card-border/30 border border-card-border/40 overflow-hidden">
                <div className="h-2/3 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&fit=crop&q=80')` }} />
                <div className="p-3 space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-card-border/75" />
                  <div className="h-2 w-1/2 rounded bg-card-border/40" />
                </div>
              </div>
              <div className="rounded-lg bg-card-border/30 border border-card-border/40 overflow-hidden">
                <div className="h-2/3 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&fit=crop&q=80')` }} />
                <div className="p-3 space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-card-border/75" />
                  <div className="h-2 w-1/2 rounded bg-card-border/40" />
                </div>
              </div>
              <div className="rounded-lg bg-card-border/30 border border-card-border/40 overflow-hidden">
                <div className="h-2/3 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&fit=crop&q=80')` }} />
                <div className="p-3 space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-card-border/75" />
                  <div className="h-2 w-1/2 rounded bg-card-border/40" />
                </div>
              </div>
            </div>

            {/* Floating visual detail mock */}
            <div className="relative z-10 w-80 p-5 rounded-2xl bg-card border border-primary/30 shadow-2xl flex flex-col items-center text-center animate-bounce duration-[6000ms]">
              <div className="absolute top-3 right-3 flex items-center gap-1 text-[9px] text-accent font-bold px-1.5 py-0.5 rounded bg-accent/10 border border-accent/25">
                <Users className="h-3 w-3" /> Connect
              </div>
              
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80"
                alt="Sarah Chen avatar"
                className="h-16 w-16 rounded-full object-cover border border-card-border shadow-lg shadow-black"
              />
              <h4 className="text-xs font-bold text-white mt-3 leading-none">Sarah Chen</h4>
              <span className="text-[10px] text-primary mt-1 font-semibold">Lead UI/UX Designer</span>
              <p className="text-[10px] text-muted-foreground mt-2 px-4 leading-normal">
                &ldquo;DesignOS Design System 2.0 has just been published. Check it out!&rdquo;
              </p>
              
              <div className="mt-4 pt-3 w-full border-t border-card-border flex items-center justify-around text-[10px] text-muted-foreground font-semibold">
                <span>1.4k Connections</span>
                <span>•</span>
                <span>24k Portfolio Views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Modules Features Grid */}
        <div className="w-full border-t border-card-border pt-16 pb-8 text-left relative z-10">
          <div className="max-w-xl mb-12">
            <span className="text-[9px] uppercase font-bold text-primary tracking-wider">Features Showcase</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Engineered for the Creative Ecosystem
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              CreativeHub bridges the gap between clean professional networking profiles and immersive visual portfolios.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-card/60 border border-card-border flex flex-col gap-4 hover:border-primary/30 hover:bg-card-hover/40 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-primary/5 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Visual Portfolio Board</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">
                  Display high-resolution galleries, tool stacks, and wireframes. Filter dynamically by creative category.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card/60 border border-card-border flex flex-col gap-4 hover:border-primary/30 hover:bg-card-hover/40 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-accent/5 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Professional Connections</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">
                  Expand your professional contacts list, approve incoming request links, and follow industry peers.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card/60 border border-card-border flex flex-col gap-4 hover:border-primary/30 hover:bg-card-hover/40 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Creative Opportunities</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">
                  Discover job board listings sorted by salary tiers, remote preferences, and skill tags. Apply instantly.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card/60 border border-card-border flex flex-col gap-4 hover:border-primary/30 hover:bg-card-hover/40 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-violet-500/5 border border-violet-500/20 text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Interactive Feed Stream</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">
                  Publish project updates, upload custom file attachments, comment on threads, and toggle reaction stats.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tailored Roles Section */}
        <div className="w-full border-t border-card-border pt-16 pb-12 text-center relative z-10">
          <span className="text-[9px] uppercase font-bold text-accent tracking-wider">Tailored Spaces</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 max-w-lg mx-auto leading-tight">
            Designed for Specialized Creative Crafts
          </h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-xl mx-auto">
            Traditional professional platforms group all roles together. CreativeHub categorizes portfolios and tools by your exact craft.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-4xl mx-auto">
            {["UI/UX Designers", "3D Visual Artists", "Graphic Designers", "Illustrators", "Video Editors", "Writers", "Sound Designers", "3D Animators", "Creative Developers", "Product Designers"].map((role) => (
              <span
                key={role}
                className="px-4 py-2 rounded-full bg-card-border/30 border border-card-border/60 text-[10px] font-bold text-white hover:border-primary/40 hover:bg-primary/5 transition-all select-none"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="relative z-10 w-full py-8 px-6 border-t border-card-border bg-[#030303] flex items-center justify-between gap-4">
        <span className="text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} CreativeHub. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
