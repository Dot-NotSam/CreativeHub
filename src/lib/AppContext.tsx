"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Project, Job, FeedPost, Connection } from "@/types";
import { mockUsers, mockProjects, mockJobs, mockFeedPosts } from "./mockData";

// Define the shape of our context state
interface AppContextType {
  currentUser: User;
  users: User[];
  projects: Project[];
  jobs: Job[];
  feedPosts: FeedPost[];
  connections: Record<string, "connected" | "pending_incoming" | "pending_outgoing" | "none">;
  
  // Actions
  updateCurrentUser: (userData: Partial<User>) => void;
  likeProject: (projectId: string) => void;
  likePost: (postId: string) => void;
  addPost: (content: string, mediaUrl?: string) => void;
  addProject: (title: string, description: string, coverImage: string, category: string, tools: string[]) => void;
  applyToJob: (jobId: string) => void;
  toggleConnect: (userId: string) => void;
  acceptConnection: (userId: string) => void;
  removeConnection: (userId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Current user represents the active session profile
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-current",
    name: "Alex Mercer",
    username: "alexmercer",
    role: "Creative Developer",
    company: "Freelance Studio",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop&q=80",
    bio: "Building immersive WebGL experiences and pushing CSS to its absolute limits.",
    location: "New York, NY",
    skills: ["React", "Three.js", "TailwindCSS", "TypeScript", "Next.js", "WebGL"],
    connectionsCount: 342,
    portfolioViews: 5120,
    aboutMe: "Hi, I'm Alex. I am a freelance creative developer. I collaborate with designers to turn interactive canvas mockups into fluid, performant, and award-winning browser realities.",
    experience: [
      {
        id: "exp-c1",
        role: "Creative Developer",
        company: "Self-Employed",
        startDate: "2024",
        endDate: "Present",
        description: "Delivering customized web interactions, shaders, and animations for branding and startup launches."
      }
    ],
    socials: {
      website: "https://mercer.dev",
      github: "https://github.com/alexmercer",
      linkedin: "https://linkedin.com/in/alexmercer"
    }
  });

  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  
  // Connection map: { [userId]: status }
  const [connections, setConnections] = useState<Record<string, "connected" | "pending_incoming" | "pending_outgoing" | "none">>({});

  // Initialize data on mount
  useEffect(() => {
    setUsers(mockUsers);
    setProjects(mockProjects);
    setJobs(mockJobs);
    setFeedPosts(mockFeedPosts);

    // Initial relationships map
    const initialConnections: Record<string, "connected" | "pending_incoming" | "pending_outgoing" | "none"> = {};
    mockUsers.forEach(user => {
      // Setup some default connections for a rich dashboard look
      if (user.id === "user-2" || user.id === "user-5") {
        initialConnections[user.id] = "connected";
      } else if (user.id === "user-3") {
        initialConnections[user.id] = "pending_outgoing";
      } else {
        initialConnections[user.id] = "none";
      }
    });
    setConnections(initialConnections);
  }, []);

  const updateCurrentUser = (userData: Partial<User>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  const likeProject = (projectId: string) => {
    setProjects(prev =>
      prev.map(proj =>
        proj.id === projectId ? { ...proj, likes: proj.likes + 1 } : proj
      )
    );
  };

  const likePost = (postId: string) => {
    setFeedPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const isLiked = post.likedByMe;
          return {
            ...post,
            likedByMe: !isLiked,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      })
    );
  };

  const addPost = (content: string, mediaUrl?: string) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorId: currentUser.id,
      content,
      mediaUrl,
      type: mediaUrl ? "project_share" : "text",
      likes: 0,
      commentsCount: 0,
      likedByMe: false,
      timestamp: "Just now"
    };
    setFeedPosts(prev => [newPost, ...prev]);
  };

  const addProject = (
    title: string,
    description: string,
    coverImage: string,
    category: string,
    tools: string[]
  ) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title,
      description,
      coverImage: coverImage || "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
      gallery: [coverImage || "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80"],
      category,
      likes: 0,
      views: 1,
      creatorId: currentUser.id,
      publishDate: new Date().toISOString().split("T")[0],
      tools
    };
    setProjects(prev => [newProj, ...prev]);
    
    // Also post it to the feed automatically!
    const newPost: FeedPost = {
      id: `post-${Date.now() + 1}`,
      authorId: currentUser.id,
      content: `Just published a new project: "${title}"! Check out the details in my portfolio.`,
      mediaUrl: newProj.coverImage,
      type: "project_share",
      projectId: newProj.id,
      likes: 0,
      commentsCount: 0,
      likedByMe: false,
      timestamp: "Just now"
    };
    setFeedPosts(prev => [newPost, ...prev]);
  };

  const applyToJob = (jobId: string) => {
    setJobs(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, applied: true } : job
      )
    );
  };

  const toggleConnect = (userId: string) => {
    setConnections(prev => {
      const currentStatus = prev[userId] || "none";
      let nextStatus: "connected" | "pending_incoming" | "pending_outgoing" | "none" = "none";

      if (currentStatus === "none") {
        nextStatus = "pending_outgoing";
      } else if (currentStatus === "pending_outgoing") {
        nextStatus = "none";
      } else if (currentStatus === "connected") {
        nextStatus = "none";
        // Decrement connection count
        setUsers(prevUsers =>
          prevUsers.map(u =>
            u.id === userId
              ? { ...u, connectionsCount: Math.max(0, u.connectionsCount - 1) }
              : u
          )
        );
        setCurrentUser(c => ({
          ...c,
          connectionsCount: Math.max(0, c.connectionsCount - 1)
        }));
      }

      return {
        ...prev,
        [userId]: nextStatus
      };
    });
  };

  const acceptConnection = (userId: string) => {
    setConnections(prev => ({
      ...prev,
      [userId]: "connected"
    }));

    // Increment connection counts
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId ? { ...u, connectionsCount: u.connectionsCount + 1 } : u
      )
    );
    setCurrentUser(c => ({
      ...c,
      connectionsCount: c.connectionsCount + 1
    }));
  };

  const removeConnection = (userId: string) => {
    setConnections(prev => ({
      ...prev,
      [userId]: "none"
    }));

    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === userId
          ? { ...u, connectionsCount: Math.max(0, u.connectionsCount - 1) }
          : u
      )
    );
    setCurrentUser(c => ({
      ...c,
      connectionsCount: Math.max(0, c.connectionsCount - 1)
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        projects,
        jobs,
        feedPosts,
        connections,
        updateCurrentUser,
        likeProject,
        likePost,
        addPost,
        addProject,
        applyToJob,
        toggleConnect,
        acceptConnection,
        removeConnection
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
