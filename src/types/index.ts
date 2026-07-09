export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  company?: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  skills: string[];
  connectionsCount: number;
  portfolioViews: number;
  aboutMe: string;
  experience: Experience[];
  socials: {
    website?: string;
    github?: string;
    linkedin?: string;
    dribbble?: string;
    behance?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  gallery: string[];
  category: string;
  likes: number;
  views: number;
  creatorId: string;
  publishDate: string;
  tools: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salaryRange: string;
  logo: string;
  postedDate: string;
  description: string;
  requirements: string[];
  skills: string[];
  applied: boolean;
}

export interface FeedPost {
  id: string;
  authorId: string;
  content: string;
  mediaUrl?: string;
  type: "text" | "project_share" | "job_alert";
  likes: number;
  commentsCount: number;
  likedByMe: boolean;
  timestamp: string;
  projectId?: string;
}

export interface Connection {
  id?: string;
  userId: string;
  status: "connected" | "pending_incoming" | "pending_outgoing" | "none";
}
