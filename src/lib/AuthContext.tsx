"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (
    name: string,
    role: string,
    location: string,
    email: string,
    password?: string
  ) => Promise<boolean>;
  loginAsDemo: () => void;
  logout: () => void;
  updateSessionUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const demoUser: User = {
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
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("creativehub_session");
      if (storedSession) {
        setUser(JSON.parse(storedSession));
      }
    } catch (error) {
      console.error("Failed to restore auth session:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Fetch users database in localStorage
      const usersJson = localStorage.getItem("creativehub_users");
      const registeredUsers: Array<User & { email: string }> = usersJson 
        ? JSON.parse(usersJson) 
        : [];

      // Check if user exists
      const matchedUser = registeredUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (matchedUser) {
        // Strip out email for the public User model session
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email: _e, ...userModel } = matchedUser;
        
        setUser(userModel);
        localStorage.setItem("creativehub_session", JSON.stringify(userModel));
        return true;
      }

      // If they input the demo email (e.g. alex@creativehub.com), log in as demo
      if (email.toLowerCase() === "alex@creativehub.com" || email.toLowerCase() === "demo@creativehub.com") {
        loginAsDemo();
        return true;
      }

      return false;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    role: string,
    location: string,
    email: string,
    password?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const usersJson = localStorage.getItem("creativehub_users");
      const registeredUsers: Array<User & { email: string }> = usersJson 
        ? JSON.parse(usersJson) 
        : [];

      // Check if email already registered
      if (registeredUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return false;
      }

      const id = `user-custom-${Date.now()}`;
      const username = name.toLowerCase().replace(/\s/g, "");

      const newUser: User = {
        id,
        name,
        username,
        role,
        bio: `Professional ${role} exploring creative frontiers.`,
        location,
        avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzE4MTgxYiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDAiIHI9IjE4IiBmaWxsPSIjNzE3MTdhIi8+PHBhdGggZD0iTTIyIDgwYzAtMTUgMTItMjUgMjgtMjVzMjggMTAgMjggMjUiIGZpbGw9IiM3MTcxN2EiLz48L3N2Zz4=", // Premium SVG user placeholder
        banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop&q=80",
        skills: role === "UI/UX Designer" 
          ? ["Figma", "User Research", "Prototyping", "Design Systems"] 
          : role === "3D Artist" 
          ? ["Blender", "Cinema4D", "Octane Render", "Texturing"] 
          : role === "Creative Developer"
          ? ["React", "Three.js", "WebGL", "TypeScript"]
          : ["Creative Writing", "Copywriting", "UX Writing"],
        connectionsCount: 0,
        portfolioViews: 1,
        aboutMe: `Hello, I'm ${name}. I work as a ${role} based out of ${location}. Let's connect and build something awesome together!`,
        experience: [
          {
            id: `exp-${Date.now()}`,
            role: role,
            company: "Independent Studio",
            startDate: "2025",
            endDate: "Present",
            description: "Working on freelance design and creative challenges."
          }
        ],
        socials: {
          website: `https://${username}.design`,
          linkedin: `https://linkedin.com/in/${username}`,
          github: `https://github.com/${username}`
        }
      };

      // Save to database
      const newRegisteredUser = { ...newUser, email };
      registeredUsers.push(newRegisteredUser);
      localStorage.setItem("creativehub_users", JSON.stringify(registeredUsers));

      // Login immediately
      setUser(newUser);
      localStorage.setItem("creativehub_session", JSON.stringify(newUser));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = () => {
    setUser(demoUser);
    localStorage.setItem("creativehub_session", JSON.stringify(demoUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("creativehub_session");
  };

  const updateSessionUser = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...userData
    };

    setUser(updatedUser);
    localStorage.setItem("creativehub_session", JSON.stringify(updatedUser));

    // Also update in registered database if it's a registered user
    try {
      const usersJson = localStorage.getItem("creativehub_users");
      if (usersJson) {
        const registeredUsers: Array<User & { email: string }> = JSON.parse(usersJson);
        const updatedUsersList = registeredUsers.map((u) => {
          if (u.id === user.id) {
            return {
              ...u,
              ...userData
            };
          }
          return u;
        });
        localStorage.setItem("creativehub_users", JSON.stringify(updatedUsersList));
      }
    } catch (e) {
      console.error("Failed to update database profile:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginAsDemo,
        logout,
        updateSessionUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
