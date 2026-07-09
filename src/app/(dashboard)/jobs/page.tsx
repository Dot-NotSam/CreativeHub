"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/AppContext";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Search, 
  X, 
  Check, 
  Sparkles,
  ArrowUpRight,
  FileText,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobsPage() {
  const { jobs, applyToJob, currentUser } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All");

  // Selected job for detailed panel / drawer
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobs[0]?.id || null);

  // Application Modal state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyCoverLetter, setApplyCoverLetter] = useState("");
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);

  const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Remote"];

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = activeType === "All" || 
      (activeType === "Remote" && job.type === "Remote") ||
      job.type === activeType;

    return matchesSearch && matchesType;
  });

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId) return;

    setIsSubmittingApp(true);
    
    // Simulate application processing
    setTimeout(() => {
      applyToJob(selectedJobId);
      setIsSubmittingApp(false);
      setApplyModalOpen(false);
      setApplyCoverLetter("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-card-border/60">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Creative Opportunities
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Discover active design, animation, and engineering openings curated for creatives.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search job titles, skills, studios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-card/60 hover:bg-card/85 focus:bg-black/80 text-xs text-white placeholder-muted-foreground border border-card-border focus:border-primary/50 transition-all outline-none"
          />
        </div>
      </div>

      {/* JOB TYPE SELECTOR */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {jobTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0",
              activeType === type
                ? "bg-primary border-primary text-white"
                : "bg-card/40 border-card-border text-muted-foreground hover:text-white hover:bg-card-border/60"
            )}
          >
            {type}
          </button>
        ))}
      </div>

      {/* DUAL WORKSPACE SPLIT GRID */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-card-border rounded-2xl bg-card/10">
          <Briefcase className="h-8 w-8 text-muted-foreground/60 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white">No opportunities match your filter</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Try adjusting your search criteria or type tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Job Listings List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 max-h-[70vh] overflow-y-auto pr-2">
            {filteredJobs.map((job) => {
              const isSelected = job.id === selectedJobId;

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer text-left flex gap-3.5 relative",
                    isSelected
                      ? "bg-primary/5 border-primary/40 shadow-md shadow-primary/5"
                      : "bg-card/40 border-card-border hover:border-card-border-hover"
                  )}
                >
                  {/* Company Logo mock */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={job.logo}
                    alt=""
                    className="h-9 w-9 rounded object-cover border border-card-border shrink-0 mt-0.5"
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-white leading-tight truncate">{job.title}</h4>
                      <span className="text-[9px] text-muted-foreground/80 shrink-0">{job.postedDate}</span>
                    </div>
                    <span className="text-[10px] text-primary font-semibold block leading-none">{job.company}</span>
                    
                    <div className="flex flex-wrap gap-2 text-[9px] text-muted-foreground mt-1">
                      <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {job.location}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><DollarSign className="h-3 w-3" /> {job.salaryRange}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 mt-1 border-t border-card-border/30">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-card-border text-[8px] font-semibold text-zinc-300">
                        {job.type}
                      </span>
                      {job.applied && (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-indigo-400">
                          <Check className="h-3 w-3" /> Applied
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-primary rounded-l" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (7 cols): Selected Job Detailed Description Pane */}
          <div className="lg:col-span-7 hidden lg:block">
            {selectedJob ? (
              <div className="p-6 rounded-2xl bg-card/60 border border-card-border shadow-md space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-card-border/60">
                  <div className="flex gap-4 items-start">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedJob.logo}
                      alt={selectedJob.company}
                      className="h-12 w-12 rounded object-cover border border-card-border"
                    />
                    <div className="text-left space-y-1.5">
                      <h3 className="text-sm font-bold text-white leading-tight">{selectedJob.title}</h3>
                      <span className="text-xs font-semibold text-primary block leading-none">{selectedJob.company}</span>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-0.5"><MapPin className="h-3.5 w-3.5" /> {selectedJob.location}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5" /> {selectedJob.salaryRange}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Trigger */}
                  <button
                    onClick={() => {
                      if (!selectedJob.applied) setApplyModalOpen(true);
                    }}
                    disabled={selectedJob.applied}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 shrink-0",
                      selectedJob.applied 
                        ? "bg-transparent text-indigo-400 border-indigo-500/20 cursor-not-allowed" 
                        : "bg-white border-white text-black hover:bg-zinc-200"
                    )}
                  >
                    {selectedJob.applied ? (
                      <>
                        <Check className="h-4 w-4" /> Applied
                      </>
                    ) : (
                      <>
                        Easy Apply
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Description content */}
                <div className="space-y-4 text-left">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Overview
                    </span>
                    <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Requirements list */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Requirements
                    </span>
                    <ul className="list-disc list-inside space-y-1.5 pl-1.5">
                      {selectedJob.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="text-xs text-zinc-300 leading-relaxed list-item">
                          <span className="ml-[-4px]">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills badges */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
                      Required Stack & Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedJob.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-lg bg-card-border/60 border border-card-border text-[9px] font-semibold text-zinc-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center border border-card-border rounded-2xl bg-card/10">
                <Briefcase className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                <p className="text-xs text-muted-foreground mt-2">Select a job listing to view full description details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AZURE COMPLIANCE ANCHOR */}
      <div className="p-4 rounded-2xl bg-indigo-950/10 border border-indigo-500/10 flex items-center gap-3 text-left">
        <Sparkles className="h-5 w-5 text-indigo-400 shrink-0" />
        <div className="space-y-0.5">
          <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Azure Functions Serverless Application Processing</h4>
          <p className="text-[10px] text-muted-foreground leading-normal">
            Easy Apply operations trigger serverless **Azure Functions** which compile candidate dossiers, copy CVs to **Azure Blob Storage**, and execute matchmaking algorithms using semantic vector embeddings on creative indexes.
          </p>
        </div>
      </div>

      {/* EASY APPLY CONFIRMATION DIALOG MODAL */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-card border border-card-border rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-card-border">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
                Apply for {selectedJob.title}
              </h3>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4 mt-4">
              {/* Profile Resume Confirmation */}
              <div className="p-3 rounded-xl bg-black/40 border border-card-border flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-white block leading-none mb-1">Confirm Portfolio Resume</span>
                    <span className="text-[9px] text-muted-foreground block">{currentUser.name.toLowerCase().replace(/\s/g, "-")}-cv.pdf</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-full">
                  <Check className="h-3 w-3" /> Attached
                </span>
              </div>

              {/* Pitch Letter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 text-left">
                  Short Pitch / Cover Note
                </label>
                <textarea
                  required
                  placeholder={`Hi ${selectedJob.company} team! I am excited to apply. With my skills in ${currentUser.skills.slice(0, 3).join(", ")}...`}
                  rows={4}
                  value={applyCoverLetter}
                  onChange={(e) => setApplyCoverLetter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-card-border focus:border-primary/50 text-xs text-white outline-none transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-card-border border border-transparent hover:border-card-border text-xs text-muted-foreground hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingApp}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary/90 text-xs font-bold text-white transition-all shadow-md shadow-primary/20 flex items-center gap-1.5"
                >
                  {isSubmittingApp ? "Submitting..." : "Submit Application"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
