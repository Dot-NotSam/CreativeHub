"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, Compass, Users, Sparkles, Database, Cloud, Zap, Check } from "lucide-react";
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

  const azureFeatures = [
    {
      title: "Azure Blob Storage",
      desc: "Conceptually houses ultra-high-resolution portfolio media, supporting 3D models, videos, and raw images.",
      icon: Cloud,
    },
    {
      title: "Azure SQL Database",
      desc: "Designed to store relational user tables, networking states, job postings, and connection maps.",
      icon: Database,
    },
    {
      title: "Azure CDN & Front Door",
      desc: "Caches image-heavy portfolio items globally to guarantee sub-second load times for recruiters.",
      icon: Zap,
    }
  ];

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
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-card hover:bg-card-hover text-xs font-bold text-white border border-card-border hover:border-card-border-hover transition-all"
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            Create Account
          </Link>
        </div>

        {/* Product preview deck card */}
        <div className="relative w-full max-w-4xl p-2 rounded-2xl border border-card-border bg-[#09090b]/50 shadow-2xl backdrop-blur-xl mb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          {/* Header styling mimics a browser frame */}
          <div className="flex items-center gap-1.5 pb-2.5 px-3 border-b border-card-border/60">
            <div className="h-2 w-2 rounded-full bg-red-500/80" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
            <div className="h-2 w-2 rounded-full bg-green-500/80" />
            <div className="ml-4 h-4 w-40 rounded bg-card-border/60" />
          </div>
          
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

        {/* Azure Architecture Section */}
        <div className="w-full border-t border-card-border pt-16 text-left">
          <div className="max-w-xl mb-12">
            <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider">Azure Cloud Alignment</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Architected for Enterprise Scalability
            </h3>
            <p className="text-xs text-muted-foreground mt-2">
              CreativeHub is designed with a cloud-native architecture capable of scaling through Azure services.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {azureFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-5 rounded-2xl bg-card border border-card-border/80 flex flex-col gap-3.5 hover:border-card-border-hover transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
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
