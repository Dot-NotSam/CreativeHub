"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { 
  Search, 
  Heart, 
  Eye, 
  X, 
  Sparkles,
  ArrowUpRight,
  Layers,
  Calendar,
  Compass,
  Link as LinkIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ExplorePage() {
  const { projects, users, likeProject, connections, toggleConnect } = useApp();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected project state for modal
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Creative categories
  const categories = ["All", "UI/UX", "3D Art", "Illustration", "Motion Graphics", "Creative Dev"];

  // Fetch creator detail helper
  const getCreator = (creatorId: string) => {
    return users.find(u => u.id === creatorId) || {
      id: "unknown",
      name: "Anonymous Creator",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80",
      role: "Digital Specialist"
    };
  };

  // Filter projects based on activeCategory and searchQuery
  const filteredProjects = projects.filter(proj => {
    const matchesCategory = activeCategory === "All" || proj.category === activeCategory;
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      proj.tools.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const projectCreator = selectedProject ? getCreator(selectedProject.creatorId) : null;
  const connectionStatus = projectCreator ? (connections[projectCreator.id] || "none") : "none";

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-card-border/60">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            Discover Creative Portfolios
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Browse through award-winning designs, 3D renderings, and interactive developments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects, tools (e.g. Blender)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-card/60 hover:bg-card/85 focus:bg-black/80 text-xs text-white placeholder-muted-foreground border border-card-border focus:border-primary/50 transition-all outline-none"
          />
        </div>
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0",
              activeCategory === cat
                ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                : "bg-card/40 border-card-border text-muted-foreground hover:text-white hover:bg-card-border/60"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-card-border rounded-2xl bg-card/10">
          <Layers className="h-8 w-8 text-muted-foreground/60 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white">No projects found</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search criteria or category filter tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const creator = getCreator(proj.creatorId);

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className="group rounded-2xl border border-card-border bg-[#09090b]/55 overflow-hidden hover:border-card-border-hover card-shadow transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Glassmorphic hover details */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <div className="text-center space-y-3">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/20 border border-primary/25 uppercase">
                        {proj.category}
                      </span>
                      <h4 className="text-xs font-bold text-white max-w-[220px] line-clamp-1 leading-snug">
                        {proj.title}
                      </h4>
                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                        <span>View Details</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 flex items-center justify-between border-t border-card-border bg-card/20">
                  <div className="flex items-center gap-2 max-w-[140px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creator.avatar}
                      alt=""
                      className="h-6 w-6 rounded-full object-cover border border-card-border"
                    />
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[10px] font-bold text-white truncate">{proj.title}</span>
                      <span className="text-[8px] text-muted-foreground mt-0.5 truncate">by {creator.name}</span>
                    </div>
                  </div>

                  {/* Likes / Views count */}
                  <div className="flex items-center gap-3 text-[9px] text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {proj.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {proj.views}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PORTFOLIO DETAIL MODAL OVERLAY */}
      {selectedProject && projectCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-4xl bg-card border border-card-border rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            {/* Sticky Header inside modal */}
            <div className="sticky top-0 z-10 px-6 py-4 glass border-b border-card-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projectCreator.avatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover border border-card-border"
                />
                <div className="flex flex-col text-left leading-none">
                  <h3 className="text-xs font-bold text-white">{selectedProject.title}</h3>
                  <span className="text-[9px] text-muted-foreground mt-1">
                    Published by <strong className="text-white font-medium">{projectCreator.name}</strong> • {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              
              {/* Media Gallery / Multiple Images */}
              <div className="space-y-4">
                {selectedProject.gallery.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-card-border bg-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`Gallery image ${idx + 1}`}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Grid: Left Description, Right Creator info & stats */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-card-border/60">
                {/* Left Area (8 cols): Description & Details */}
                <div className="md:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Project Concept
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tools Used */}
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tools & Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tools.map((tool: string) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-lg bg-card-border/60 border border-card-border text-[10px] font-mono text-zinc-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Area (4 cols): Creator card details & stats */}
                <div className="md:col-span-4 space-y-6">
                  {/* Creator Card Widget */}
                  <div className="p-4 rounded-xl bg-black/40 border border-card-border space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
                      The Designer
                    </span>
                    <div className="flex items-center gap-3">
                      <Link 
                        href={projectCreator.id === "user-current" ? "/profile" : `/profile/${projectCreator.id}`}
                        onClick={() => setSelectedProjectId(null)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={projectCreator.avatar}
                          alt=""
                          className="h-11 w-11 rounded-full object-cover border border-card-border hover:border-primary/50 transition-colors"
                        />
                      </Link>
                      <div className="flex flex-col text-left max-w-[130px]">
                        <Link 
                          href={projectCreator.id === "user-current" ? "/profile" : `/profile/${projectCreator.id}`}
                          onClick={() => setSelectedProjectId(null)}
                          className="text-xs font-bold text-white hover:text-primary transition-colors leading-none truncate"
                        >
                          {projectCreator.name}
                        </Link>
                        <span className="text-[9px] text-muted-foreground truncate mt-1">{projectCreator.role}</span>
                      </div>
                    </div>

                    {/* Connect Toggle Button */}
                    {projectCreator.id !== "user-current" && (
                      <button
                        onClick={() => toggleConnect(projectCreator.id)}
                        className={cn(
                          "w-full py-1.5 rounded-lg text-xs font-bold transition-all border",
                          connectionStatus === "connected"
                            ? "bg-transparent text-primary border-primary/20"
                            : connectionStatus === "pending_outgoing"
                            ? "bg-transparent text-muted-foreground border-card-border cursor-not-allowed"
                            : "bg-white text-black hover:bg-zinc-200 border-white"
                        )}
                      >
                        {connectionStatus === "connected" 
                          ? "Connected" 
                          : connectionStatus === "pending_outgoing"
                          ? "Requested"
                          : "Connect"}
                      </button>
                    )}
                  </div>

                  {/* Project Metrics Widget */}
                  <div className="p-4 rounded-xl bg-black/40 border border-card-border space-y-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
                      Project Stats
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="leading-none">
                          <span className="text-[8px] text-muted-foreground uppercase block font-bold">Likes</span>
                          <span className="text-xs font-black text-white mt-1 block">{selectedProject.likes}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="leading-none">
                          <span className="text-[8px] text-muted-foreground uppercase block font-bold">Views</span>
                          <span className="text-xs font-black text-white mt-1 block">{selectedProject.views}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Like Project trigger */}
                    <button
                      onClick={() => likeProject(selectedProject.id)}
                      className="w-full py-2 bg-primary hover:bg-primary/95 rounded-lg text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/10 hover:scale-[1.01]"
                    >
                      <Heart className="h-4 w-4 fill-white/10" />
                      Appreciate Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
