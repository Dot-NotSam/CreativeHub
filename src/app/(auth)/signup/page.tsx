"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { ArrowRight, User, Briefcase, MapPin, Mail, Lock } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { updateCurrentUser } = useApp();

  const [name, setName] = useState("");
  const [role, setRole] = useState("UI/UX Designer");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !email) return;

    setLoading(true);

    setTimeout(() => {
      // Set the dynamic user profile data to showcase during the demo!
      updateCurrentUser({
        name,
        role,
        location,
        bio: `Professional ${role} exploring creative frontiers.`,
        aboutMe: `Hello, I'm ${name}. I work as a ${role} based out of ${location}. Let's connect and build something awesome together!`,
        skills: role === "UI/UX Designer" 
          ? ["Figma", "User Research", "Prototyping", "Design Systems"] 
          : role === "3D Artist" 
          ? ["Blender", "Cinema4D", "Octane Render", "Texturing"] 
          : role === "Creative Developer"
          ? ["React", "Three.js", "WebGL", "TypeScript"]
          : ["Creative Writing", "Copywriting", "UX Writing"],
        connectionsCount: 0,
        portfolioViews: 1,
        experience: [
          {
            id: `exp-${Date.now()}`,
            role: role,
            company: "Independent Studio",
            startDate: "2025",
            endDate: "Present",
            description: "Working on freelance design and creative challenges."
          }
        ]
      });

      setLoading(false);
      router.push("/dashboard");
    }, 800);
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
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 hover:scale-[1.01]"
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
