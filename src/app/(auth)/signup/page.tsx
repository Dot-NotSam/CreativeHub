"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ArrowRight, User, Briefcase, MapPin, Mail, Lock, AlertCircle } from "lucide-react";
import Logo from "@/components/shared/logo";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated } = useAuth();

  const [name, setName] = useState("");
  const [role, setRole] = useState("UI/UX Designer");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !email) return;

    setLoading(true);
    setError("");

    try {
      const success = await signup(name, role, location, email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Email already registered. Try signing in or use another email.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during profile registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-foreground grid-bg flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 pointer-events-none radial-glow z-0" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-2 mb-8 group z-10">
        <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300" />
        <div className="text-left">
          <h1 className="text-md font-bold tracking-tight text-white leading-none">
            CreativeHub
          </h1>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Create Creative Profile
          </span>
        </div>
      </Link>

      {/* Signup Box */}
      <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-card-border p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-white">Create your profile</h2>
          <p className="text-xs text-muted-foreground mt-1">Configure your mock account for the demo</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-2 text-[11px] text-red-400 text-left items-start">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>

          {/* Creative Specialty & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Specialty
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-[11px] text-white outline-none transition-colors appearance-none"
                >
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="3D Artist">3D Artist</option>
                  <option value="Creative Developer">Creative Dev</option>
                  <option value="Writer & Copywriter">Writer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="Tokyo, JP"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
          >
            {loading ? "Initializing..." : "Create Profile & Enter"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-card-border/40">
          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
