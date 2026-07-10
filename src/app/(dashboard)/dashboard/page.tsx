"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useApp } from "@/lib/AppContext";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Image as ImageIcon, 
  Briefcase, 
  Users, 
  Eye, 
  Sparkles, 
  Send,
  Cloud,
  ChevronRight,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// Presets for post composer image attachments
const POST_IMAGE_PRESETS = [
  { name: "UI Preview", url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&fit=crop&q=80" },
  { name: "3D Visual", url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&fit=crop&q=80" },
  { name: "Studio Render", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop&q=80" }
];

export default function DashboardPage() {
  const { 
    currentUser, 
    feedPosts, 
    users, 
    jobs, 
    connections, 
    toggleConnect, 
    addPost, 
    likePost 
  } = useApp();

  // Post composer state
  const [newPostText, setNewPostText] = useState("");
  const [selectedPresetImage, setSelectedPresetImage] = useState<string | null>(null);
  const [showImagePresets, setShowImagePresets] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPresetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Comments state map: { [postId]: list of mock comments }
  const [postComments, setPostComments] = useState<Record<string, Array<{ author: string; avatar: string; text: string }>>>({
    "post-1": [
      { author: "Alex Kovacs", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80", text: "This design system is incredibly clean, Sarah! Love the dark mode token system." },
      { author: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80", text: "Can't wait to inspect the Storybook implementation. Nice work." }
    ]
  });
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    addPost(newPostText, selectedPresetImage || undefined);
    setNewPostText("");
    setSelectedPresetImage(null);
    setShowImagePresets(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    
    const newComment = {
      author: currentUser.name,
      avatar: currentUser.avatar,
      text: commentInput
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
    setCommentInput("");
  };

  // Find user detail helper
  const getUserDetails = (userId: string) => {
    if (userId === currentUser.id) return currentUser;
    return users.find(u => u.id === userId) || currentUser;
  };

  // Filter out suggestions (not current user, and connections is "none")
  const suggestedUsers = users
    .filter(u => u.id !== currentUser.id && (connections[u.id] === "none" || !connections[u.id]))
    .slice(0, 3);

  // Recommended jobs
  const featuredJobs = jobs.slice(0, 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 8 columns: Main feed and post composer */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* POST COMPOSER */}
        <div className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-4 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.avatar}
                alt=""
                className="h-10 w-10 rounded-full object-cover border border-card-border shrink-0"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Share a project update, ask a question, or talk design trends..."
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-muted-foreground outline-none resize-none border-none focus:ring-0 p-1"
                />
              </div>
            </div>

            {/* Selected image preview */}
            {selectedPresetImage && (
              <div className="relative rounded-xl overflow-hidden h-40 border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedPresetImage} alt="Attachment" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedPresetImage(null)}
                  className="absolute top-2.5 right-2.5 px-2 py-1 bg-black/70 hover:bg-black text-[10px] text-white rounded-lg border border-card-border"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Hidden native file input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Presets Grid */}
            {showImagePresets && (
              <div className="p-3.5 rounded-xl bg-black/40 border border-card-border space-y-2">
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider block">
                  Select Visual Attachment
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {POST_IMAGE_PRESETS.map((img) => (
                    <button
                      key={img.name}
                      type="button"
                      onClick={() => setSelectedPresetImage(img.url)}
                      className={cn(
                        "relative h-14 rounded-lg overflow-hidden border transition-all",
                        selectedPresetImage === img.url ? "border-primary" : "border-card-border hover:border-muted"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center border border-dashed border-card-border hover:border-primary/50 hover:bg-primary/5 rounded-lg h-14 text-[9px] font-bold text-muted-foreground hover:text-white transition-all cursor-pointer"
                  >
                    <ImageIcon className="h-4 w-4 mb-1 text-primary" />
                    Upload File
                  </button>
                </div>
              </div>
            )}

            {/* Composer Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-card-border/60">
              <button
                type="button"
                onClick={() => setShowImagePresets(!showImagePresets)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground hover:text-white hover:bg-card-border border border-transparent hover:border-card-border transition-all"
              >
                <ImageIcon className="h-4 w-4" />
                Add Media
              </button>
              
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="px-4 py-1.5 rounded-lg bg-primary disabled:opacity-50 hover:bg-primary/95 text-xs font-bold text-white transition-all shadow-md shadow-primary/20"
              >
                Share to Feed
              </button>
            </div>
          </form>
        </div>

        {/* FEED POSTS LIST */}
        <div className="flex flex-col gap-4">
          {feedPosts.map((post) => {
            const author = getUserDetails(post.authorId);
            const isLiked = post.likedByMe;
            const comments = postComments[post.id] || [];
            const isCommentsOpen = activeCommentPostId === post.id;

            return (
              <div 
                key={post.id} 
                className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md flex flex-col gap-4 animate-in fade-in-50 duration-200"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link href={author.id === currentUser.id ? "/profile" : `/profile/${author.id}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="h-9 w-9 rounded-full object-cover border border-card-border hover:border-primary/50 transition-colors"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link 
                        href={author.id === currentUser.id ? "/profile" : `/profile/${author.id}`}
                        className="text-xs font-bold text-white hover:text-primary transition-colors leading-none"
                      >
                        {author.name}
                      </Link>
                      <span className="text-[10px] text-muted-foreground mt-1">
                        {author.role} {author.company ? `at ${author.company}` : ""}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] text-muted-foreground/60">{post.timestamp}</span>
                </div>

                {/* Content */}
                <p className="text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Embedded Image (Optional) */}
                {post.mediaUrl && (
                  <div className="rounded-xl overflow-hidden max-h-96 border border-card-border bg-black/20 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.mediaUrl} 
                      alt="Shared media" 
                      className="w-full object-cover hover:scale-[1.01] transition-transform duration-500" 
                    />
                  </div>
                )}

                {/* Interaction Actions */}
                <div className="flex items-center gap-6 pt-2 border-t border-card-border/40 text-xs text-muted-foreground font-semibold">
                  <button 
                    onClick={() => likePost(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 hover:text-white transition-colors group",
                      isLiked ? "text-red-400 hover:text-red-300" : ""
                    )}
                  >
                    <Heart className={cn("h-4.5 w-4.5 group-hover:scale-105 transition-transform", isLiked ? "fill-red-400 stroke-red-400" : "")} />
                    {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                  </button>

                  <button 
                    onClick={() => setActiveCommentPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <MessageSquare className="h-4.5 w-4.5" />
                    {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                  </button>

                  <button className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto">
                    <Share2 className="h-4.5 w-4.5" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                </div>

                {/* Comment Section Panel */}
                {isCommentsOpen && (
                  <div className="mt-2 pt-4 border-t border-card-border/60 space-y-4">
                    {/* Comments List */}
                    <div className="space-y-3">
                      {comments.map((comment, index) => (
                        <div key={index} className="flex gap-3 items-start bg-black/20 p-2.5 rounded-xl border border-card-border/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={comment.avatar} alt="" className="h-7 w-7 rounded-full object-cover shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-white leading-none block">{comment.author}</span>
                            <p className="text-[11px] text-zinc-300 leading-relaxed">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Write Comment Box */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddComment(post.id);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-card-border text-[11px] text-white outline-none focus:border-primary/50 transition-colors"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="p-2 rounded-lg bg-primary hover:bg-primary/95 text-white flex items-center justify-center transition-all shadow-md shadow-primary/10"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right 4 columns: Side Widgets */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        
        {/* PROFILE CARD SUMMARY WIDGET */}
        <div className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md text-center flex flex-col items-center">
          <div className="h-12 w-full bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl border border-card-border/40 relative overflow-hidden mb-[-24px]">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-14 w-14 rounded-full object-cover border-2 border-background shadow-lg mb-3 relative z-10"
          />

          <h3 className="text-xs font-bold text-white leading-none mb-1">{currentUser.name}</h3>
          <span className="text-[10px] text-muted-foreground font-medium mb-4">{currentUser.role}</span>

          <div className="grid grid-cols-2 gap-4 w-full py-3 border-t border-b border-card-border/60 text-left mb-4">
            <div>
              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">Connections</span>
              <span className="text-xs font-black text-white mt-1.5 block">
                {connectionsCountHelper(currentUser.connectionsCount, connections)}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider block">Profile Views</span>
              <span className="text-xs font-black text-white mt-1.5 block">{currentUser.portfolioViews}</span>
            </div>
          </div>

          <Link
            href="/profile"
            className="w-full py-2 bg-card hover:bg-card-hover border border-card-border hover:border-card-border-hover rounded-xl text-[11px] font-bold text-white transition-colors"
          >
            Manage Profile
          </Link>
        </div>

        {/* SUGGESTED CREATIVES WIDGET */}
        {suggestedUsers.length > 0 && (
          <div className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-card-border/60">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                Expand Your Network
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {suggestedUsers.map((user) => {
                const status = connections[user.id] || "none";
                return (
                  <div key={user.id} className="flex items-center justify-between gap-3">
                    <Link href={`/profile/${user.id}`} className="flex items-center gap-2.5 group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover border border-card-border group-hover:border-primary/50 transition-colors shrink-0" />
                      <div className="flex flex-col text-left max-w-[100px] sm:max-w-[140px]">
                        <span className="text-xs font-semibold text-white leading-none truncate group-hover:text-primary transition-colors">{user.name}</span>
                        <span className="text-[9px] text-muted-foreground truncate mt-0.5">{user.role}</span>
                      </div>
                    </Link>
                    
                    <button
                      onClick={() => toggleConnect(user.id)}
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold transition-all border",
                        status === "pending_outgoing"
                          ? "bg-transparent text-muted-foreground border-card-border cursor-not-allowed"
                          : "bg-white text-black hover:bg-zinc-200 border-white"
                      )}
                    >
                      {status === "pending_outgoing" ? "Pending" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CREATIVE OPPORTUNITIES WIDGET */}
        <div className="p-5 rounded-2xl bg-card/60 border border-card-border shadow-md space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-card-border/60">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Briefcase className="h-4 w-4 text-primary" />
              Hot Job Opportunities
            </h3>
            <Link href="/jobs" className="text-[10px] text-primary hover:underline flex items-center gap-0.5">
              View all
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {featuredJobs.map((job) => (
              <div key={job.id} className="flex gap-3 items-start bg-black/20 p-2.5 rounded-xl border border-card-border/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={job.logo} alt="" className="h-7 w-7 rounded object-cover shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white leading-none">{job.title}</h4>
                  <span className="text-[10px] text-muted-foreground block">{job.company} • {job.location}</span>
                  {job.applied ? (
                    <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-indigo-400 mt-1">
                      <Check className="h-2.5 w-2.5" /> Applied
                    </span>
                  ) : (
                    <Link href="/jobs" className="text-[9px] font-bold text-primary hover:underline block mt-1">
                      Apply Now
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Connections Count Helper
function connectionsCountHelper(baseCount: number, connectionsMap: Record<string, string>) {
  let count = baseCount;
  Object.values(connectionsMap).forEach(status => {
    if (status === "connected") count++;
  });
  return count;
}
