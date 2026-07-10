"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/AppContext";
import { useAuth } from "@/lib/AuthContext";
import Logo from "@/components/shared/logo";
import { 
  Search, 
  Plus, 
  Bell, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  Check,
  Home,
  Compass,
  Users,
  Briefcase,
  User,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

// Presets for the "Share Work" cover image selector
const IMAGE_PRESETS = [
  {
    name: "Sleek Dark UI",
    url: "https://images.unsplash.com/photo-1541462608141-2ff030a64e43?w=800&auto=format&fit=crop&q=80",
    category: "UI/UX"
  },
  {
    name: "Brutalist 3D Composition",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    category: "3D Art"
  },
  {
    name: "Neon Vector Illustration",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    category: "Illustration"
  },
  {
    name: "Dynamic After Effects Render",
    url: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
    category: "Motion Graphics"
  }
];

export default function Header() {
  const pathname = usePathname();
  const { currentUser, addProject, users, projects } = useApp();
  const { logout } = useAuth();
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Notifications state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      sender: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
      action: "liked your comment on her design system post",
      time: "2h ago",
      unread: true
    },
    {
      id: "notif-2",
      sender: "Linear",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&q=80",
      action: "viewed your application for Senior Product Designer",
      time: "1d ago",
      unread: true
    },
    {
      id: "notif-3",
      sender: "Alex Kovacs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
      action: "requested to connect with you",
      time: "2d ago",
      unread: true
    }
  ]);

  // "Share Work" modal state
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("UI/UX");
  const [projDesc, setProjDesc] = useState("");
  const [projCover, setProjCover] = useState(IMAGE_PRESETS[0].url);
  const [projTools, setProjTools] = useState("");
  
  const projectFileInputRef = useRef<HTMLInputElement>(null);

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjCover(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Click outside handlers
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    
    const toolsArray = projTools
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);
      
    addProject(projTitle, projDesc, projCover, projCategory, toolsArray);
    
    // Reset form
    setProjTitle("");
    setProjDesc("");
    setProjTools("");
    setProjCover(IMAGE_PRESETS[0].url);
    setShareModalOpen(false);
  };

  const handleClearNotifications = () => {
    setUnreadNotifications(0);
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Filtered search results
  const matchingUsers = searchQuery
    ? users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  const matchingProjects = searchQuery
    ? projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav px-6 py-3.5 flex items-center justify-between">
        {/* Left side: Mobile Menu Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border transition-colors border border-card-border"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-sm font-bold text-white tracking-tight">CreativeHub</span>
          </Link>

          {/* Desktop Search Engine */}
          <div ref={searchRef} className="hidden md:block relative w-80">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search creatives, skills, projects..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-card/60 hover:bg-card/85 focus:bg-black/80 text-xs text-white placeholder-muted-foreground border border-card-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
              />
            </div>

            {/* Search results dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-xl bg-card border border-card-border shadow-xl shadow-black/80 flex flex-col gap-3 max-h-[360px] overflow-y-auto">
                {matchingUsers.length === 0 && matchingProjects.length === 0 ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    No results for &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <>
                    {matchingUsers.length > 0 && (
                      <div>
                        <div className="px-2 pb-1 text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-card-border/60">
                          Creatives
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {matchingUsers.map(user => (
                            <Link
                              key={user.id}
                              href={`/profile/${user.id}`}
                              onClick={() => {
                                setShowSearchResults(false);
                                setSearchQuery("");
                              }}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-border/60 transition-colors"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
                              <div className="flex flex-col">
                                <span className="text-xs font-semibold text-white leading-none">{user.name}</span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">{user.role}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {matchingProjects.length > 0 && (
                      <div>
                        <div className="px-2 pb-1 text-[10px] uppercase font-bold text-muted-foreground tracking-wider border-b border-card-border/60">
                          Projects
                        </div>
                        <div className="flex flex-col gap-1 mt-1">
                          {matchingProjects.map(proj => (
                            <div
                              key={proj.id}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-border/60 transition-colors cursor-pointer"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={proj.coverImage} alt={proj.title} className="h-7 w-12 rounded object-cover" />
                              <div className="flex flex-col max-w-[200px]">
                                <span className="text-xs font-semibold text-white truncate leading-none">{proj.title}</span>
                                <span className="text-[10px] text-muted-foreground mt-0.5">{proj.category}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Quick upload button */}
          <button
            onClick={() => setShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all shadow-md hover:shadow-primary/30"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Share Work</span>
          </button>

          {/* Notifications button */}
          <div ref={notificationsRef} className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-full bg-card hover:bg-card-border text-muted-foreground hover:text-white border border-card-border transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background animate-pulse" />
              )}
            </button>

            {/* Notifications Popover */}
            {notificationsOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 p-2 rounded-xl bg-card border border-card-border shadow-xl shadow-black/80 flex flex-col z-50">
                <div className="flex items-center justify-between p-2 border-b border-card-border">
                  <span className="text-xs font-bold text-white">Notifications</span>
                  {unreadNotifications > 0 && (
                    <button
                      onClick={handleClearNotifications}
                      className="text-[10px] text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1 mt-1 max-h-[300px] overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex gap-3 p-2.5 rounded-lg transition-colors border border-transparent",
                        notif.unread ? "bg-primary/5 border-primary/10" : "hover:bg-card-border/40"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={notif.avatar} alt="" className="h-7 w-7 rounded-full object-cover mt-0.5" />
                      <div className="flex flex-col">
                        <p className="text-[11px] text-muted-foreground leading-snug">
                          <strong className="text-white font-semibold">{notif.sender}</strong> {notif.action}
                        </p>
                        <span className="text-[9px] text-muted-foreground/60 mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User profile shortcut (Desktop) */}
          <Link
            href="/profile"
            className="hidden lg:block border border-card-border hover:border-primary/50 rounded-full transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          </Link>
        </div>
      </header>

      {/* MOBILE SIDE NAVIGATION OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-md">
          <div className="w-72 bg-card border-r border-card-border p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
            <div>
              {/* Header inside Mobile Menu */}
              <div className="flex items-center justify-between pb-6 border-b border-card-border">
                <Link href="/" className="flex items-center gap-2">
                  <Logo className="h-8 w-8" />
                  <span className="text-sm font-bold text-white">CreativeHub</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border transition-colors border border-card-border"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-1.5 mt-8">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border",
                    pathname === "/dashboard" ? "bg-primary/10 border-primary/20 text-primary" : "text-muted-foreground hover:text-white border-transparent"
                  )}
                >
                  <Home className="h-4.5 w-4.5" />
                  Feed
                </Link>
                <Link
                  href="/explore"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border",
                    pathname.startsWith("/explore") ? "bg-primary/10 border-primary/20 text-primary" : "text-muted-foreground hover:text-white border-transparent"
                  )}
                >
                  <Compass className="h-4.5 w-4.5" />
                  Explore
                </Link>
                <Link
                  href="/connections"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border",
                    pathname.startsWith("/connections") ? "bg-primary/10 border-primary/20 text-primary" : "text-muted-foreground hover:text-white border-transparent"
                  )}
                >
                  <Users className="h-4.5 w-4.5" />
                  Connections
                </Link>
                <Link
                  href="/jobs"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border",
                    pathname.startsWith("/jobs") ? "bg-primary/10 border-primary/20 text-primary" : "text-muted-foreground hover:text-white border-transparent"
                  )}
                >
                  <Briefcase className="h-4.5 w-4.5" />
                  Jobs
                </Link>
                <Link
                  href="/profile"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border",
                    pathname === "/profile" ? "bg-primary/10 border-primary/20 text-primary" : "text-muted-foreground hover:text-white border-transparent"
                  )}
                >
                  <User className="h-4.5 w-4.5" />
                  Profile
                </Link>
              </nav>
            </div>

            {/* Profile widget in mobile sidebar */}
            <div className="pt-4 border-t border-card-border">
              <div className="flex items-center justify-between p-2 rounded-xl bg-card-border/30">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentUser.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <div className="flex flex-col text-left max-w-[120px]">
                    <span className="text-xs font-semibold text-white truncate leading-none mb-1">{currentUser.name}</span>
                    <span className="text-[10px] text-muted-foreground truncate leading-none">{currentUser.role}</span>
                  </div>
                </div>
                 <button
                   onClick={logout}
                   className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 cursor-pointer"
                   title="Log out"
                 >
                   <LogOut className="h-4 w-4" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SHARE WORK DIALOG MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-card border border-card-border rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-card-border">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <h3 className="text-sm font-bold text-white">Share Portfolio Work</h3>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="space-y-4 mt-4">
              {/* Project Title */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Virtual Space Render"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                />
              </div>

              {/* Category & Tools */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Category
                  </label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                  >
                    <option value="UI/UX">UI/UX</option>
                    <option value="3D Art">3D Art</option>
                    <option value="Illustration">Illustration</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Creative Dev">Creative Dev</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Tools Used
                  </label>
                  <input
                    type="text"
                    placeholder="Figma, Spline, Three.js"
                    value={projTools}
                    onChange={(e) => setProjTools(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Tell other creatives about the challenge, layout decisions, or rendering configurations..."
                  rows={3}
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors resize-none"
                />
              </div>

              {/* Cover Image Preset Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Choose Cover Art Preset
                </label>
                
                {/* Hidden native file input */}
                <input
                  type="file"
                  ref={projectFileInputRef}
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  className="hidden"
                />

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setProjCover(preset.url)}
                      className={cn(
                        "relative h-16 rounded-lg overflow-hidden border-2 transition-all flex flex-col justify-end text-left p-1 text-[9px] font-bold",
                        projCover === preset.url ? "border-primary scale-[1.02]" : "border-card-border/60 hover:border-card-border"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preset.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50" />
                      <span className="relative z-10 text-white truncate leading-none">{preset.name}</span>
                      {projCover === preset.url && (
                        <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-2 w-2 text-white" />
                        </span>
                      )}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => projectFileInputRef.current?.click()}
                    className={cn(
                      "relative h-16 rounded-lg overflow-hidden border-2 border-dashed transition-all flex flex-col items-center justify-center text-center p-1 text-[9px] font-bold cursor-pointer",
                      !IMAGE_PRESETS.some(p => p.url === projCover) ? "border-primary bg-primary/5 text-white" : "border-card-border/60 hover:border-card-border text-muted-foreground hover:text-white"
                    )}
                  >
                    {!IMAGE_PRESETS.some(p => p.url === projCover) ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={projCover} alt="" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-black/60" />
                        <span className="relative z-10 text-white truncate leading-none">Custom Image</span>
                        <span className="absolute top-1 right-1 h-3.5 w-3.5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="h-2 w-2 text-white" />
                        </span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4.5 w-4.5 mb-1 text-primary animate-pulse" />
                        <span>Upload File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setShareModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-card-border border border-transparent hover:border-card-border text-xs text-muted-foreground hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all shadow-md hover:shadow-primary/30 flex items-center gap-1"
                >
                  <Layers className="h-3.5 w-3.5" />
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
