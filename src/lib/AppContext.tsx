"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Project, Job, FeedPost, Connection } from "@/types";
import { mockUsers, mockProjects, mockJobs, mockFeedPosts } from "./mockData";
import { useAuth } from "@/lib/AuthContext";

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
  const { user: authUser, updateSessionUser } = useAuth();

  // Fallback profile if session not loaded yet
  const defaultUser: User = {
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
    aboutMe: "Hi, I'm Alex. I am a freelance creative developer. Let's build something awesome.",
    experience: [],
    socials: {}
  };

  const currentUser = authUser || defaultUser;

  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [connections, setConnections] = useState<Record<string, "connected" | "pending_incoming" | "pending_outgoing" | "none">>({});
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize and load from localStorage
  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem("creativehub_data_users");
      if (savedUsers) {
        const parsedUsers = JSON.parse(savedUsers);
        if (parsedUsers.length < mockUsers.length) {
          const existingIds = new Set(parsedUsers.map((u: any) => u.id));
          const missingUsers = mockUsers.filter(u => !existingIds.has(u.id));
          const updatedUsers = [...parsedUsers, ...missingUsers];
          setUsers(updatedUsers);
          localStorage.setItem("creativehub_data_users", JSON.stringify(updatedUsers));
        } else {
          setUsers(parsedUsers);
        }
      } else {
        setUsers(mockUsers);
        localStorage.setItem("creativehub_data_users", JSON.stringify(mockUsers));
      }

      const savedProjects = localStorage.getItem("creativehub_data_projects");
      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        if (parsedProjects.length < mockProjects.length) {
          const existingIds = new Set(parsedProjects.map((p: any) => p.id));
          const missingProjects = mockProjects.filter(p => !existingIds.has(p.id));
          const updatedProjects = [...parsedProjects, ...missingProjects];
          setProjects(updatedProjects);
          localStorage.setItem("creativehub_data_projects", JSON.stringify(updatedProjects));
        } else {
          setProjects(parsedProjects);
        }
      } else {
        setProjects(mockProjects);
        localStorage.setItem("creativehub_data_projects", JSON.stringify(mockProjects));
      }

      const savedJobs = localStorage.getItem("creativehub_data_jobs");
      if (savedJobs) {
        setJobs(JSON.parse(savedJobs));
      } else {
        setJobs(mockJobs);
        localStorage.setItem("creativehub_data_jobs", JSON.stringify(mockJobs));
      }

      const savedFeed = localStorage.getItem("creativehub_data_feed");
      if (savedFeed) {
        const parsedFeed = JSON.parse(savedFeed);
        if (parsedFeed.length < mockFeedPosts.length) {
          const existingIds = new Set(parsedFeed.map((p: any) => p.id));
          const missingPosts = mockFeedPosts.filter(p => !existingIds.has(p.id));
          const updatedFeed = [...parsedFeed, ...missingPosts];
          setFeedPosts(updatedFeed);
          localStorage.setItem("creativehub_data_feed", JSON.stringify(updatedFeed));
        } else {
          setFeedPosts(parsedFeed);
        }
      } else {
        setFeedPosts(mockFeedPosts);
        localStorage.setItem("creativehub_data_feed", JSON.stringify(mockFeedPosts));
      }

      const savedConn = localStorage.getItem("creativehub_data_connections");
      if (savedConn) {
        setConnections(JSON.parse(savedConn));
      } else {
        const initialConnections: Record<string, "connected" | "pending_incoming" | "pending_outgoing" | "none"> = {};
        mockUsers.forEach(user => {
          if (user.id === "user-2" || user.id === "user-5") {
            initialConnections[user.id] = "connected";
          } else if (user.id === "user-3") {
            initialConnections[user.id] = "pending_outgoing";
          } else {
            initialConnections[user.id] = "none";
          }
        });
        setConnections(initialConnections);
        localStorage.setItem("creativehub_data_connections", JSON.stringify(initialConnections));
      }
    } catch (error) {
      console.error("Failed to load creativehub persistence data:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes back to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("creativehub_data_users", JSON.stringify(users));
  }, [users, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("creativehub_data_projects", JSON.stringify(projects));
  }, [projects, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("creativehub_data_jobs", JSON.stringify(jobs));
  }, [jobs, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("creativehub_data_feed", JSON.stringify(feedPosts));
  }, [feedPosts, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("creativehub_data_connections", JSON.stringify(connections));
  }, [connections, isInitialized]);

  const updateCurrentUser = (userData: Partial<User>) => {
    updateSessionUser(userData);
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
        updateSessionUser({
          connectionsCount: Math.max(0, (authUser?.connectionsCount || 0) - 1)
        });
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
    updateSessionUser({
      connectionsCount: (authUser?.connectionsCount || 0) + 1
    });
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
    updateSessionUser({
      connectionsCount: Math.max(0, (authUser?.connectionsCount || 0) - 1)
    });
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
