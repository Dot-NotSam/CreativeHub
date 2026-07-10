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
import { useAuth } from "@/lib/AuthContext";
import Logo from "@/components/shared/logo";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useApp();
  const { logout } = useAuth();

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
          <Logo className="h-10 w-10 group-hover:scale-105 transition-transform duration-300" />
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
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all relative group/item",
                  isActive
                    ? "bg-primary/10 text-accent border border-primary/20 shadow-md shadow-primary/5"
                    : "text-muted-foreground hover:text-white hover:bg-card-border border border-transparent"
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", isActive ? "text-accent animate-pulse-subtle" : "text-muted-foreground group-hover/item:text-white transition-colors")} />
                {item.name}
                {isActive && (
                  <div className="absolute right-3.5 h-1.5 w-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div className="px-6 py-6 border-t border-card-border">
        <div className="flex items-center justify-between p-2 rounded-xl bg-card-border/40 hover:bg-card-border/60 transition-all border border-card-border/50 group">
          <Link href="/profile" className="flex items-center gap-3 max-w-[150px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt=""
              className="h-8.5 w-8.5 rounded-full object-cover ring-2 ring-card-border group-hover:ring-primary/40 transition-all"
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

          <button
            onClick={logout}
            title="Log out"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
