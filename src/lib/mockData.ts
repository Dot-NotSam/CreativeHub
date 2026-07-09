import { User, Project, Job, FeedPost, Connection } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Chen",
    username: "sarahchen",
    role: "Lead UI/UX Designer",
    company: "DesignOS",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop&q=80",
    bio: "Crafting beautiful design systems and intuitive mobile experiences. Ex-Apple, Ex-Framer.",
    location: "San Francisco, CA",
    skills: ["Design Systems", "Figma", "Mobile Design", "Prototyping", "User Research", "Interaction Design"],
    connectionsCount: 1420,
    portfolioViews: 24890,
    aboutMe: "I am a digital product designer with over 8 years of experience. I specialize in building scalable design systems that bridge the gap between design and engineering. Currently, I lead the core product design team at DesignOS, where we are redefining creative tooling.",
    experience: [
      {
        id: "exp-1",
        role: "Lead Product Designer",
        company: "DesignOS",
        startDate: "2023",
        endDate: "Present",
        description: "Leading the design system team, managing 4 product designers, and collaborating with engineering to build our web and desktop applications."
      },
      {
        id: "exp-2",
        role: "Senior Product Designer",
        company: "Framer",
        startDate: "2020",
        endDate: "2023",
        description: "Designed UI/UX features for Framer Canvas and layout engine. Pioneered responsive design components."
      },
      {
        id: "exp-3",
        role: "UI/UX Designer",
        company: "Apple",
        startDate: "2018",
        endDate: "2020",
        description: "Worked within the iOS core apps team focusing on Calendar and Reminders visual redesigns."
      }
    ],
    socials: {
      website: "https://sarahchen.design",
      behance: "https://behance.net/sarahchen",
      dribbble: "https://dribbble.net/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen"
    }
  },
  {
    id: "user-2",
    name: "Alex Kovacs",
    username: "alexkovacs",
    role: "3D Visual Artist",
    company: "Dimension Studio",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&h=400&fit=crop&q=80",
    bio: "Creating surreal digital landscapes and abstract 3D compositions. Specialized in Blender & Octane Render.",
    location: "Berlin, Germany",
    skills: ["Blender", "Octane Render", "Cinema4D", "Texturing", "Digital Lighting", "Houdini", "Concept Art"],
    connectionsCount: 890,
    portfolioViews: 18450,
    aboutMe: "Independent 3D artist collaborating with brands worldwide to create visually arresting marketing art and product visuals. Inspired by brutalist architecture, space, and organic geometric forms.",
    experience: [
      {
        id: "exp-4",
        role: "Senior 3D Artist",
        company: "Dimension Studio",
        startDate: "2022",
        endDate: "Present",
        description: "Directing 3D campaigns for consumer tech brands. Creating high-fidelity key visuals and product launches."
      },
      {
        id: "exp-5",
        role: "3D Generalist",
        company: "Freelance / Self-employed",
        startDate: "2019",
        endDate: "2022",
        description: "Delivered customized 3D illustrations, cover art, and game assets for various international clients."
      }
    ],
    socials: {
      website: "https://alexkovacs.art",
      behance: "https://behance.net/alexkovacs",
      linkedin: "https://linkedin.com/in/alexkovacs"
    }
  },
  {
    id: "user-3",
    name: "Marcus Vance",
    username: "marcusv",
    role: "Creative Developer",
    company: "Active Theory",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=400&fit=crop&q=80",
    bio: "Breathing life into designs using WebGL, Three.js, and custom shaders. Pixel perfectionist.",
    location: "London, UK",
    skills: ["WebGL", "Three.js", "React Three Fiber", "GLSL Shaders", "GSAP", "Next.js", "TypeScript"],
    connectionsCount: 2310,
    portfolioViews: 41200,
    aboutMe: "I build interactive web experiences that push the boundaries of what's possible in the browser. I work at the intersection of graphic design, 3D math, and frontend engineering.",
    experience: [
      {
        id: "exp-6",
        role: "Senior Interactive Developer",
        company: "Active Theory",
        startDate: "2021",
        endDate: "Present",
        description: "Building award-winning WebGL micro-sites, VR browser environments, and high-performance React applications."
      },
      {
        id: "exp-7",
        role: "Frontend Developer",
        company: "Locomotive",
        startDate: "2019",
        endDate: "2021",
        description: "Crafted interactive websites using ScrollTrigger, custom WebGL transitions, and static site generators. Won multiple Awwwards."
      }
    ],
    socials: {
      website: "https://marcusv.dev",
      github: "https://github.com/marcusv",
      linkedin: "https://linkedin.com/in/marcusv"
    }
  },
  {
    id: "user-4",
    name: "Elena Rostova",
    username: "elenarostova",
    role: "Illustrator & Brand Artist",
    company: "Studio Bloom",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&h=400&fit=crop&q=80",
    bio: "Vibrant colors, botanical motifs, and bold character designs. Drawing stories for editorial & brands.",
    location: "Paris, France",
    skills: ["Vector Illustration", "Adobe Illustrator", "Procreate", "Branding", "Editorial Design", "Packaging Design"],
    connectionsCount: 650,
    portfolioViews: 12100,
    aboutMe: "Illustrator with a love for rich textures and organic lines. Working with publishers, cosmetic brands, and digital publications to convey feeling through illustration.",
    experience: [
      {
        id: "exp-8",
        role: "Illustrator & Co-founder",
        company: "Studio Bloom",
        startDate: "2021",
        endDate: "Present",
        description: "Co-directing a boutique illustration studio working on brand campaigns, packaging, and children's books."
      },
      {
        id: "exp-9",
        role: "Lead Illustrator",
        company: "Maison&Objet",
        startDate: "2018",
        endDate: "2021",
        description: "Created seasonal visual campaigns, posters, and print publications for the design fair."
      }
    ],
    socials: {
      website: "https://elenarostova.com",
      behance: "https://behance.net/elenarostova",
      dribbble: "https://dribbble.net/elenarostova",
      linkedin: "https://linkedin.com/in/elenarostova"
    }
  },
  {
    id: "user-5",
    name: "Maya Patel",
    username: "mayapatel",
    role: "Motion Designer",
    company: "Framer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&h=400&fit=crop&q=80",
    bio: "Animating interfaces, products, and brand stories. Expert in After Effects, Cinema4D, and Lottie.",
    location: "New York, NY",
    skills: ["After Effects", "Lottie Animation", "Cinema4D", "UI Animation", "Character Rigging", "Premiere Pro"],
    connectionsCount: 1100,
    portfolioViews: 21900,
    aboutMe: "Motion designer dedicated to making user experiences delightful and interactive. I translate UI designs into smooth, communicative animations that explain features in seconds.",
    experience: [
      {
        id: "exp-10",
        role: "Lead Motion Designer",
        company: "Framer",
        startDate: "2022",
        endDate: "Present",
        description: "Defining Framer's video presence, onboarding animations, and product marketing motion assets."
      },
      {
        id: "exp-11",
        role: "Motion Designer",
        company: "Duolingo",
        startDate: "2020",
        endDate: "2022",
        description: "Animated character responses, UI gamification animations, and social media ad creatives."
      }
    ],
    socials: {
      dribbble: "https://dribbble.net/mayapatel",
      linkedin: "https://linkedin.com/in/mayapatel"
    }
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    title: "DesignOS Design System 2.0",
    description: "A comprehensive redesign of the DesignOS component library, featuring over 150 responsive web components, automated dark mode token translations, and a highly accessible WCAG AAA compliant color scheme.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "UI/UX",
    likes: 428,
    views: 12050,
    creatorId: "user-1",
    publishDate: "2026-05-15",
    tools: ["Figma", "Tokens Studio", "Storybook"]
  },
  {
    id: "proj-2",
    title: "Neoterra: Surreal Brutalist Architecture",
    description: "An exploratory 3D render series that merges brutalist architecture blocks with organic landscapes and metallic structures, visualizing a dystopian colony on a distant metallic moon.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "3D Art",
    likes: 512,
    views: 9480,
    creatorId: "user-2",
    publishDate: "2026-06-20",
    tools: ["Blender", "Octane Render", "Photoshop"]
  },
  {
    id: "proj-3",
    title: "Zenith Real Estate: 3D Interactive WebGL",
    description: "An immersive WebGL portfolio site for high-end architectures, featuring an interactive 3D map, 360-degree rotation of properties, and beautiful physics-based transitions built on custom shaders.",
    coverImage: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "Creative Dev",
    likes: 890,
    views: 24500,
    creatorId: "user-3",
    publishDate: "2026-06-02",
    tools: ["WebGL", "Three.js", "React Three Fiber", "GSAP"]
  },
  {
    id: "proj-4",
    title: "Botanical Spirits: Craft Gin Brand",
    description: "A complete visual identity and packaging system for an organic gin distillery. Custom vector illustrations represent native flora and capture the essence of high-end herbal ingredients.",
    coverImage: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "Illustration",
    likes: 312,
    views: 7200,
    creatorId: "user-4",
    publishDate: "2026-04-10",
    tools: ["Illustrator", "Photoshop", "Procreate"]
  },
  {
    id: "proj-5",
    title: "Framer Onboarding Micro-Animations",
    description: "A series of elegant, micro-interactions and interactive loop animations designed to simplify user onboarding in Framer. Integrated using high-performance Lottie JSON files.",
    coverImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "Motion Graphics",
    likes: 490,
    views: 11300,
    creatorId: "user-5",
    publishDate: "2026-07-01",
    tools: ["After Effects", "Lottie", "Figma"]
  },
  {
    id: "proj-6",
    title: "Metropolis: Neon Cyber City",
    description: "A breathtaking cyberpunk cityscape rendering, exploring complex emission maps, detailed building geometry, and custom simulated neon signage in dark volumetric fog.",
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "3D Art",
    likes: 360,
    views: 6420,
    creatorId: "user-2",
    publishDate: "2026-07-04",
    tools: ["Cinema4D", "Octane Render"]
  },
  {
    id: "proj-7",
    title: "E-Commerce XR Concept Shop",
    description: "An experimental 3D product customizer built on the web, letting users view shoes in AR, swap colors interactively, and interact with realistic leather textures.",
    coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80"
    ],
    category: "Creative Dev",
    likes: 678,
    views: 15300,
    creatorId: "user-3",
    publishDate: "2026-06-25",
    tools: ["WebGL", "Three.js", "Blender", "Next.js"]
  }
];

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "Linear",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop&q=80", // Accent graphic as company logo
    location: "Remote (Global)",
    salaryRange: "$140,000 - $180,000",
    type: "Full-time",
    description: "We are looking for a Senior Product Designer to join our core product team. You will lead design initiatives, help refine our visual interface, and design features that simplify issue tracking and project management for thousands of developers.",
    requirements: [
      "5+ years of experience designing complex SaaS applications.",
      "A stunning portfolio showcasing interactive UI, visual layouts, and detailed system designs.",
      "Expert knowledge of Figma, typography, and clean layout patterns.",
      "Experience partnering closely with frontend engineers."
    ],
    skills: ["Figma", "SaaS Design", "UI Design", "Information Architecture"],
    postedDate: "2 days ago",
    applied: false
  },
  {
    id: "job-2",
    title: "3D Artist & Motion Designer",
    company: "Vercel",
    logo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=100&h=100&fit=crop&q=80",
    location: "New York, NY (Hybrid)",
    salaryRange: "$130,000 - $165,000",
    type: "Full-time",
    description: "Vercel is looking for a creative 3D Artist and Motion Designer to join our brand design studio. You will craft the visual assets, teaser videos, and key graphic renders for major releases, landing pages, and developer conference keynotes.",
    requirements: [
      "Proficient in Cinema4D, Blender, Octane Render, and After Effects.",
      "Ability to create high-concept, sleek abstract renders matching Vercel's dark brand aesthetics.",
      "Experience optimizing 3D assets for WebGL and browser performance is a huge plus."
    ],
    skills: ["Blender", "Cinema4D", "After Effects", "Octane Render"],
    postedDate: "3 days ago",
    applied: false
  },
  {
    id: "job-3",
    title: "Creative Frontend Developer",
    company: "Active Theory",
    logo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop&q=80",
    location: "Los Angeles, CA (Onsite)",
    salaryRange: "$110,000 - $145,000",
    type: "Full-time",
    description: "Active Theory is seeking a talented Frontend Engineer with a passion for creative coding. You will build interactive promotional campaigns, 3D worlds, and rich, immersive scroll-based layouts using WebGL and Canvas technologies.",
    requirements: [
      "Strong understanding of JavaScript, TypeScript, and React.",
      "Extensive experience with Three.js, GSAP, and GLSL shaders.",
      "Strong eye for animation timing, easing, and micro-interactions."
    ],
    skills: ["WebGL", "Three.js", "GSAP", "React", "TypeScript"],
    postedDate: "1 week ago",
    applied: false
  },
  {
    id: "job-4",
    title: "Lead Brand Illustrator",
    company: "Notion",
    logo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&h=100&fit=crop&q=80",
    location: "San Francisco, CA (Hybrid)",
    salaryRange: "$120,000 - $155,000",
    type: "Contract",
    description: "We are seeking a Lead Illustrator to direct Notion's illustrations and visual guides. You will create custom vectors, guide our character illustration styles, and create artwork that explains Notion features to millions of daily active users.",
    requirements: [
      "Stunning illustration style matching Notion's minimalist/retro editorial aesthetic.",
      "Advanced proficiency in vector design in Illustrator and sketch rendering in Procreate.",
      "Experience managing and compiling brand style assets."
    ],
    skills: ["Adobe Illustrator", "Procreate", "Vector Design", "Branding"],
    postedDate: "5 days ago",
    applied: false
  }
];

export const mockFeedPosts: FeedPost[] = [
  {
    id: "post-1",
    authorId: "user-1",
    content: "Excited to share the major release of DesignOS Design System v2.0! We've overhauled the layout patterns, expanded dark-mode capabilities, and integrated directly with Figma variables. Feedback is welcome!",
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    type: "project_share",
    projectId: "proj-1",
    likes: 120,
    commentsCount: 22,
    likedByMe: false,
    timestamp: "2 hours ago"
  },
  {
    id: "post-2",
    authorId: "user-2",
    content: "Finished another brutalist geometry study. Rendered with Octane in Cinema4D. Playing around with volumetrics and concrete textures in volumetric clouds. What do you think of the scale?",
    mediaUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
    type: "project_share",
    projectId: "proj-2",
    likes: 85,
    commentsCount: 14,
    likedByMe: true,
    timestamp: "4 hours ago"
  },
  {
    id: "post-3",
    authorId: "user-3",
    content: "Just finalized the Three.js optimizations for the new Zenith website. Reduced GPU overload by 40% using geometry instancing and compressed GLTF files. Performance is key in WebGL!",
    type: "text",
    likes: 210,
    commentsCount: 38,
    likedByMe: false,
    timestamp: "1 day ago"
  },
  {
    id: "post-4",
    authorId: "user-5",
    content: "We're expanding the design team at Framer! Looking for a product motion designer who lives and breathes interactive micro-animations. Check the jobs tab or DM me if you're interested!",
    type: "job_alert",
    likes: 67,
    commentsCount: 12,
    likedByMe: false,
    timestamp: "2 days ago"
  }
];

export const mockConnections: Connection[] = [
  { userId: "user-2", status: "connected" },
  { userId: "user-3", status: "pending_outgoing" },
  { userId: "user-4", status: "none" },
  { userId: "user-5", status: "connected" }
];
