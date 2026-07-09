"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Sparkles, 
  Edit3, 
  Calendar, 
  Layers, 
  Briefcase,
  Users,
  Eye,
  Heart,
  X,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyProfilePage() {
  const { currentUser, projects, updateCurrentUser, likeProject } = useApp();
  
  // Tab state: "works" | "experience" | "about"
  const [activeTab, setActiveTab] = useState<"works" | "experience" | "about">("works");
  
  // Edit Profile modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editRole, setEditRole] = useState(currentUser.role);
  const [editLocation, setEditLocation] = useState(currentUser.location);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editAbout, setEditAbout] = useState(currentUser.aboutMe);

  // Selected project for modal overlay
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: editName,
      role: editRole,
      location: editLocation,
      bio: editBio,
      aboutMe: editAbout
    });
    setEditModalOpen(false);
  };

  // Filter projects belonging to current user
  const userProjects = projects.filter(p => p.creatorId === currentUser.id);

  // Selected project helper
  const selectedProject = projects.find(p => p.id === selectedProjectId);

  return (
    <div className="space-y-6">
      {/* COVER BANNER & PROFILE HEAD */}
      <div className="rounded-2xl border border-card-border bg-[#09090b]/40 overflow-hidden relative shadow-lg">
        {/* Cover image */}
        <div className="h-40 sm:h-56 bg-cover bg-center relative" style={{ backgroundImage: `url('${currentUser.banner}')` }}>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Profile Info Row */}
        <div className="p-6 pt-0 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mt-[-40px] sm:mt-[-50px]">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover border-4 border-[#030303] shadow-xl relative z-10"
            />
            <div className="mb-2 space-y-1">
              <h2 className="text-xl font-bold text-white leading-none">{currentUser.name}</h2>
              <span className="text-xs font-semibold text-primary block">{currentUser.role}</span>
              <p className="flex items-center justify-center sm:justify-start gap-1 text-[10px] text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                {currentUser.location}
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <button
            onClick={() => setEditModalOpen(true)}
            className="mb-2 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-card hover:bg-card-hover border border-card-border hover:border-card-border-hover text-xs font-bold text-white transition-all shadow-md"
          >
            <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
            Edit Profile
          </button>
        </div>

        {/* Dynamic Bio Description */}
        <div className="px-6 pb-6 text-center sm:text-left">
          <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
            {currentUser.bio}
          </p>
          
          {/* Social icons */}
          <div className="flex items-center justify-center sm:justify-start gap-3 mt-4 text-muted-foreground">
            {currentUser.socials.website && (
              <a href={currentUser.socials.website} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Globe className="h-4.5 w-4.5" />
              </a>
            )}
            {currentUser.socials.linkedin && (
              <a href={currentUser.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            )}
            {currentUser.socials.github && (
              <a href={currentUser.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github className="h-4.5 w-4.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* DISSOLVED TAB LAYOUT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Area (8 cols): Tabs & Dynamic Tab Views */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs header */}
          <div className="flex items-center gap-6 border-b border-card-border/60 pb-1.5">
            <button
              onClick={() => setActiveTab("works")}
              className={cn(
                "pb-3.5 text-xs font-semibold relative transition-colors leading-none",
                activeTab === "works" ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
              )}
            >
              Projects ({userProjects.length})
              {activeTab === "works" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={cn(
                "pb-3.5 text-xs font-semibold relative transition-colors leading-none",
                activeTab === "experience" ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
              )}
            >
              Experience
              {activeTab === "experience" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={cn(
                "pb-3.5 text-xs font-semibold relative transition-colors leading-none",
                activeTab === "about" ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
              )}
            >
              About
              {activeTab === "about" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
              )}
            </button>
          </div>

          {/* Tab Views */}
          <div>
            {/* WORKS TAB */}
            {activeTab === "works" && (
              userProjects.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-card-border rounded-2xl bg-card/10">
                  <Layers className="h-8 w-8 text-muted-foreground/60 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-white">No projects published</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the &quot;Share Work&quot; button in the header to publish your first design asset!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userProjects.map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => setSelectedProjectId(proj.id)}
                      className="group rounded-2xl border border-card-border bg-[#09090b]/55 overflow-hidden hover:border-card-border-hover card-shadow transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={proj.coverImage} alt={proj.title} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-primary/20 border border-primary/25 px-2.5 py-1 rounded-full">
                            View Details
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between border-t border-card-border bg-card/20">
                        <span className="text-[10px] font-bold text-white truncate max-w-[150px]">{proj.title}</span>
                        <div className="flex items-center gap-2.5 text-[9px] text-muted-foreground font-semibold">
                          <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" /> {proj.likes}</span>
                          <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" /> {proj.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* EXPERIENCE TAB */}
            {activeTab === "experience" && (
              <div className="relative border-l border-card-border/80 pl-6 ml-2 space-y-8">
                {currentUser.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* timeline node icon */}
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-[#030303] border-2 border-primary" />
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white">{exp.role}</h4>
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-muted-foreground bg-card/50 border border-card-border px-2 py-0.5 rounded-md">
                          <Calendar className="h-3 w-3" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-primary">{exp.company}</span>
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed max-w-xl">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> My Creative Journey
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line max-w-xl">
                    {currentUser.aboutMe}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
                    Verified Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentUser.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-primary font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Area (4 cols): Stats Card Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md space-y-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5 border-b border-card-border/60 pb-2">
              <FileText className="h-4 w-4 text-primary" />
              Creative Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground">Portfolio Items</span>
                <span className="text-xs font-bold text-white">{userProjects.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground">Profile Reach</span>
                <span className="text-xs font-bold text-white">{currentUser.portfolioViews} views</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-muted-foreground">Connections Network</span>
                <span className="text-xs font-bold text-white">{currentUser.connectionsCount} members</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL DIALOG */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-card border border-card-border rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-card-border">
              <div className="flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Creative Role
                  </label>
                  <input
                    type="text"
                    required
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Brief Bio Summary
                </label>
                <input
                  type="text"
                  required
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  About Me Story
                </label>
                <textarea
                  rows={4}
                  value={editAbout}
                  onChange={(e) => setEditAbout(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-card-border border border-transparent hover:border-card-border text-xs text-muted-foreground hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all shadow-md shadow-primary/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PORTFOLIO DETAIL OVERLAY */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="my-8 w-full max-w-4xl bg-card border border-card-border rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 z-10 px-6 py-4 glass border-b border-card-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover border border-card-border"
                />
                <div className="flex flex-col text-left leading-none">
                  <h3 className="text-xs font-bold text-white">{selectedProject.title}</h3>
                  <span className="text-[9px] text-muted-foreground mt-1">
                    Published by <strong className="text-white font-medium">{currentUser.name}</strong> • {selectedProject.category}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {selectedProject.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-card-border bg-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt="" className="w-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-card-border/60">
                <div className="md:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Project Concept
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Tools & Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tools.map((tool) => (
                        <span key={tool} className="px-2.5 py-1 rounded-lg bg-card-border/60 border border-card-border text-[10px] font-mono text-zinc-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 space-y-6">
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

                    <button
                      onClick={() => likeProject(selectedProject.id)}
                      className="w-full py-2 bg-primary hover:bg-primary/95 rounded-lg text-xs font-bold text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
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
