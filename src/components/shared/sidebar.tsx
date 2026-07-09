"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { 
  Home, 
  Compass, 
  Users, 
  Briefcase, 
  User, 
  LogOut, 
  Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useApp();

  const navItems = [
    { name: "Feed", href: "/dashboard", icon: Home },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Connections", href: "/connections", icon: Users },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-card-border bg-black/60 backdrop-blur-xl lg:flex lg:flex-col justify-between">
      {/* Top Section */}
      <div className="flex flex-col gap-6 px-6 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-white font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            CH
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              CreativeHub
            </h1>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Networking Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5 mt-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:text-white hover:bg-card-border/50 border border-transparent"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r bg-primary" />
                )}
                <Icon className={cn(
                  "h-4.5 w-4.5 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-white"
                )} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-4 border-t border-card-border bg-card/10">
        <div className="flex items-center justify-between p-2 rounded-xl bg-card/40 border border-card-border/40">
          <Link href="/profile" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-9 w-9 rounded-full object-cover border border-card-border group-hover:border-primary/50 transition-colors"
            />
            <div className="flex flex-col text-left max-w-[120px]">
              <span className="text-xs font-semibold text-white truncate leading-none mb-1 group-hover:text-primary transition-colors">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate leading-none">
                {currentUser.role}
              </span>
            </div>
          </Link>

          <Link
            href="/"
            title="Log out"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
        
        {/* Azure Ready Ribbon */}
        <div className="mt-3 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-[10px] text-emerald-400 font-medium select-none">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Azure Ready
        </div>
      </div>
    </aside>
  );
}
