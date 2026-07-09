export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string; // "Present" or date
  description: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;          // e.g., "UI/UX Designer", "3D Artist", "Creative Developer"
  company?: string;      // Current employer/studio if any
  avatar: string;        // Profile picture URL
  banner: string;        // Cover banner URL
  bio: string;
  location: string;
  skills: string[];
  connectionsCount: number;
  portfolioViews: number;
  aboutMe: string;
  experience: Experience[];
  socials: {
    website?: string;
    behance?: string;
    dribbble?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  gallery: string[];     // Array of URLs for full portfolio view
  category: string;      // "UI/UX", "3D Art", "Illustration", "Motion Graphics", "Creative Dev"
  likes: number;
  views: number;
  creatorId: string;     // Links to User.id
  publishDate: string;
  tools: string[];       // e.g., ["Figma", "Blender", "WebGL", "Three.js"]
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;      // e.g., "New York, NY (Hybrid)"
  salaryRange: string;   // e.g., "$120k - $150k"
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  skills: string[];
  postedDate: string;
  applied: boolean;      // Mock applied status
}

export interface FeedPost {
  id: string;
  authorId: string;      // Links to User.id
  content: string;
  mediaUrl?: string;     // Optional attached image/video
  type: "text" | "project_share" | "job_alert";
  projectId?: string;    // Links to Project.id if project_share
  likes: number;
  commentsCount: number;
  likedByMe: boolean;
  timestamp: string;
}

export interface Connection {
  userId: string;        // Target user ID
  status: "connected" | "pending_incoming" | "pending_outgoing" | "none";
}
